# Day 45: Docker & Containerization for Test Automation

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand Docker basics and containerization
- Set up Selenium Grid with Docker
- Run tests in Docker containers
- Create custom Docker images for testing
- Use Docker Compose for test infrastructure
- Implement containerized CI/CD pipelines
- Manage test environments with Docker

---

## 1. Introduction to Docker

### 1.1 What is Docker?

**Docker** is a platform for developing, shipping, and running applications in containers.

**Key Concepts:**
- **Container:** Lightweight, standalone package with everything needed to run software
- **Image:** Template for creating containers
- **Dockerfile:** Script to build Docker images
- **Docker Hub:** Registry for Docker images

**Benefits for Test Automation:**
```
✓ Consistent test environments
✓ Easy setup and teardown
✓ Parallel test execution
✓ Isolated test runs
✓ Version control for environments
✓ Scalable test infrastructure
```

### 1.2 Docker Installation

**Install Docker:**
```bash
# macOS
brew install docker

# Windows
# Download Docker Desktop from docker.com

# Linux (Ubuntu)
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Verify installation
docker --version
docker run hello-world
```

---

## 2. Selenium with Docker

### 2.1 Selenium Docker Images

**Official Selenium Images:**
```bash
# Standalone Chrome
docker pull selenium/standalone-chrome

# Standalone Firefox
docker pull selenium/standalone-firefox

# Standalone Edge
docker pull selenium/standalone-edge

# Selenium Hub
docker pull selenium/hub

# Chrome Node
docker pull selenium/node-chrome

# Firefox Node
docker pull selenium/node-firefox
```

### 2.2 Running Standalone Selenium

**Start Selenium Chrome Container:**
```bash
# Run standalone Chrome
docker run -d -p 4444:4444 -p 7900:7900 --shm-size="2g" \
  selenium/standalone-chrome:latest

# Access Selenium Grid Console
# http://localhost:4444

# Access VNC viewer (password: secret)
# http://localhost:7900
```

**Java Test with Docker Selenium:**
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.net.URL;

public class DockerSeleniumTest {
    
    private WebDriver driver;
    
    @BeforeMethod
    public void setup() throws Exception {
        // Connect to Docker Selenium
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setBrowserName("chrome");
        
        driver = new RemoteWebDriver(
            new URL("http://localhost:4444/wd/hub"),
            capabilities
        );
    }
    
    @Test
    public void testWithDockerSelenium() {
        driver.get("https://www.google.com");
        System.out.println("Title: " + driver.getTitle());
        Assert.assertTrue(driver.getTitle().contains("Google"));
    }
    
    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

---

## 3. Selenium Grid with Docker

### 3.1 Docker Compose for Selenium Grid

**docker-compose.yml:**
```yaml
version: '3'
services:
  selenium-hub:
    image: selenium/hub:latest
    container_name: selenium-hub
    ports:
      - "4444:4444"
      - "4442:4442"
      - "4443:4443"
    environment:
      - GRID_MAX_SESSION=10
      - GRID_BROWSER_TIMEOUT=300
      - GRID_TIMEOUT=300
    networks:
      - selenium-grid

  chrome:
    image: selenium/node-chrome:latest
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=5
    shm_size: '2gb'
    networks:
      - selenium-grid
    deploy:
      replicas: 2

  firefox:
    image: selenium/node-firefox:latest
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=5
    shm_size: '2gb'
    networks:
      - selenium-grid
    deploy:
      replicas: 2

  edge:
    image: selenium/node-edge:latest
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=5
    shm_size: '2gb'
    networks:
      - selenium-grid

networks:
  selenium-grid:
    driver: bridge
```

**Start Selenium Grid:**
```bash
# Start all services
docker-compose up -d

# Scale Chrome nodes
docker-compose up -d --scale chrome=3

# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### 3.2 Running Tests on Grid

```java
public class GridTest {
    
    private WebDriver driver;
    
    @Parameters({"browser"})
    @BeforeMethod
    public void setup(String browser) throws Exception {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setBrowserName(browser);
        
        driver = new RemoteWebDriver(
            new URL("http://localhost:4444/wd/hub"),
            capabilities
        );
    }
    
    @Test
    public void testOnGrid() {
        driver.get("https://example.com");
        Assert.assertTrue(driver.getTitle().length() > 0);
    }
    
    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**testng.xml for Parallel Execution:**
```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Grid Test Suite" parallel="tests" thread-count="3">
    
    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="tests.GridTest"/>
        </classes>
    </test>
    
    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="tests.GridTest"/>
        </classes>
    </test>
    
    <test name="Edge Tests">
        <parameter name="browser" value="MicrosoftEdge"/>
        <classes>
            <class name="tests.GridTest"/>
        </classes>
    </test>
    
</suite>
```

---

## 4. Custom Docker Images

### 4.1 Creating Custom Test Image

**Dockerfile:**
```dockerfile
# Base image with Java and Maven
FROM maven:3.8-openjdk-11

# Set working directory
WORKDIR /app

# Copy project files
COPY pom.xml .
COPY src ./src

# Download dependencies
RUN mvn dependency:go-offline

# Copy test configuration
COPY testng.xml .
COPY src/test/resources ./src/test/resources

# Set environment variables
ENV SELENIUM_HUB_URL=http://selenium-hub:4444/wd/hub
ENV BROWSER=chrome

# Run tests
CMD ["mvn", "clean", "test"]
```

**Build and Run:**
```bash
# Build image
docker build -t my-selenium-tests .

# Run tests
docker run --network selenium-grid my-selenium-tests

# Run with environment variables
docker run --network selenium-grid \
  -e BROWSER=firefox \
  -e SELENIUM_HUB_URL=http://selenium-hub:4444/wd/hub \
  my-selenium-tests
```

### 4.2 Multi-Stage Docker Build

```dockerfile
# Stage 1: Build
FROM maven:3.8-openjdk-11 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Test
FROM maven:3.8-openjdk-11
WORKDIR /app
COPY --from=build /app/target ./target
COPY testng.xml .
COPY src/test/resources ./src/test/resources

ENV SELENIUM_HUB_URL=http://selenium-hub:4444/wd/hub
CMD ["mvn", "test"]
```

---

## 5. Docker Compose for Complete Test Infrastructure

### 5.1 Comprehensive Setup

**docker-compose-full.yml:**
```yaml
version: '3.8'

services:
  # Selenium Hub
  selenium-hub:
    image: selenium/hub:latest
    container_name: selenium-hub
    ports:
      - "4444:4444"
    environment:
      - GRID_MAX_SESSION=20
      - GRID_BROWSER_TIMEOUT=300
    networks:
      - test-network

  # Chrome Nodes
  chrome:
    image: selenium/node-chrome:latest
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=3
    shm_size: '2gb'
    networks:
      - test-network
    deploy:
      replicas: 3

  # Firefox Nodes
  firefox:
    image: selenium/node-firefox:latest
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=3
    shm_size: '2gb'
    networks:
      - test-network
    deploy:
      replicas: 2

  # Test Runner
  test-runner:
    build:
      context: .
      dockerfile: Dockerfile
    depends_on:
      - selenium-hub
      - chrome
      - firefox
    environment:
      - SELENIUM_HUB_URL=http://selenium-hub:4444/wd/hub
      - BROWSER=chrome
      - PARALLEL_TESTS=true
    volumes:
      - ./test-results:/app/test-results
      - ./screenshots:/app/screenshots
    networks:
      - test-network

  # Report Server (Optional)
  report-server:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./test-results:/usr/share/nginx/html
    networks:
      - test-network

networks:
  test-network:
    driver: bridge

volumes:
  test-results:
  screenshots:
```

**Run Complete Infrastructure:**
```bash
# Start everything
docker-compose -f docker-compose-full.yml up -d

# Run tests
docker-compose -f docker-compose-full.yml run test-runner

# View reports
# http://localhost:8080

# Cleanup
docker-compose -f docker-compose-full.yml down -v
```

---

## 6. CI/CD Integration with Docker

### 6.1 Jenkins Pipeline with Docker

**Jenkinsfile:**
```groovy
pipeline {
    agent any
    
    stages {
        stage('Start Selenium Grid') {
            steps {
                sh 'docker-compose up -d selenium-hub chrome firefox'
                sh 'sleep 10' // Wait for grid to be ready
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'docker-compose run test-runner'
            }
        }
        
        stage('Publish Reports') {
            steps {
                publishHTML([
                    reportDir: 'test-results',
                    reportFiles: 'index.html',
                    reportName: 'Test Report'
                ])
            }
        }
    }
    
    post {
        always {
            sh 'docker-compose down'
        }
    }
}
```

### 6.2 GitHub Actions with Docker

**.github/workflows/test.yml:**
```yaml
name: Selenium Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up JDK 11
      uses: actions/setup-java@v2
      with:
        java-version: '11'
        distribution: 'adopt'
    
    - name: Start Selenium Grid
      run: |
        docker-compose up -d
        sleep 10
    
    - name: Run Tests
      run: mvn clean test
      env:
        SELENIUM_HUB_URL: http://localhost:4444/wd/hub
    
    - name: Upload Test Results
      if: always()
      uses: actions/upload-artifact@v2
      with:
        name: test-results
        path: target/surefire-reports
    
    - name: Stop Selenium Grid
      if: always()
      run: docker-compose down
```

---

## 7. Best Practices

### 7.1 Docker Best Practices for Testing

```dockerfile
# Use specific versions
FROM selenium/standalone-chrome:4.15.0

# Set shared memory size
--shm-size="2g"

# Use health checks
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:4444/wd/hub/status || exit 1

# Clean up after tests
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Use multi-stage builds
FROM maven:3.8-openjdk-11 AS build
# ... build stage
FROM openjdk:11-jre-slim
# ... runtime stage
```

### 7.2 Resource Management

```yaml
# docker-compose.yml
services:
  chrome:
    image: selenium/node-chrome:latest
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 1G
```

### 7.3 Environment Configuration

```bash
# .env file
SELENIUM_VERSION=4.15.0
CHROME_NODES=3
FIREFOX_NODES=2
MAX_SESSIONS=5
GRID_TIMEOUT=300
```

```yaml
# docker-compose.yml
services:
  chrome:
    image: selenium/node-chrome:${SELENIUM_VERSION}
    deploy:
      replicas: ${CHROME_NODES}
```

---

## 8. Troubleshooting

### 8.1 Common Issues

**Issue: Container exits immediately**
```bash
# Check logs
docker logs <container-id>

# Run interactively
docker run -it selenium/standalone-chrome /bin/bash
```

**Issue: Cannot connect to Selenium Hub**
```bash
# Check network
docker network ls
docker network inspect selenium-grid

# Verify hub is running
curl http://localhost:4444/wd/hub/status
```

**Issue: Out of memory**
```bash
# Increase shared memory
docker run --shm-size="2g" selenium/standalone-chrome

# Or in docker-compose
shm_size: '2gb'
```

### 8.2 Debugging Tests in Docker

```bash
# Access VNC to see browser
# http://localhost:7900 (password: secret)

# View real-time logs
docker-compose logs -f chrome

# Execute commands in running container
docker exec -it <container-id> /bin/bash

# Copy files from container
docker cp <container-id>:/path/to/file ./local/path
```

---

## 9. Key Takeaways

1. **Docker provides consistent test environments**
2. **Selenium Grid with Docker enables parallel execution**
3. **Custom images allow test environment versioning**
4. **Docker Compose simplifies infrastructure management**
5. **Containerization integrates well with CI/CD**
6. **Resource management is crucial for performance**

---

## 10. Practice Exercises

### Exercise 1: Basic Docker Selenium
Run a simple test using Docker Selenium standalone.

### Exercise 2: Selenium Grid Setup
Set up a Selenium Grid with 2 Chrome and 2 Firefox nodes.

### Exercise 3: Custom Test Image
Create a custom Docker image for your test project.

### Exercise 4: Docker Compose
Create a complete test infrastructure with Docker Compose.

### Exercise 5: CI/CD Integration
Integrate Docker-based tests into a CI/CD pipeline.

---

## Common Mistakes

### 1. Not Setting Shared Memory Size
- **Problem**: Running Chrome containers without increasing shared memory (--shm-size)
- **Why it's wrong**: Chrome crashes with "session deleted because of page crash" errors due to insufficient /dev/shm space
- **Correct approach**: Always set --shm-size="2g" when running Chrome containers, or use --disable-dev-shm-usage flag

### 2. Using 'latest' Tag in Production
- **Problem**: Using selenium/standalone-chrome:latest in production pipelines
- **Why it's wrong**: The 'latest' tag can change unexpectedly, breaking tests when new versions are released. Makes debugging difficult when issues arise
- **Correct approach**: Pin to specific versions (selenium/standalone-chrome:4.15.0), update versions intentionally after testing

### 3. Not Configuring Docker Networks Properly
- **Problem**: Running test containers and Selenium Grid on different networks or using default network
- **Why it's wrong**: Containers can't communicate, tests fail with connection errors, hard to debug network issues
- **Correct approach**: Create custom bridge networks, ensure all containers join the same network, use service names for DNS resolution

### 4. Ignoring Container Resource Limits
- **Problem**: Running containers without CPU and memory limits, allowing unlimited resource consumption
- **Why it's wrong**: Containers can consume all host resources, affecting other services, causing unpredictable performance
- **Correct approach**: Set appropriate resource limits in docker-compose (memory: 2G, cpus: '1.0'), monitor container resource usage

### 5. Not Handling Test Artifacts Properly
- **Problem**: Storing test results, screenshots, and logs inside containers that get deleted
- **Why it's wrong**: Losing test evidence, can't debug failures, no historical data for analysis
- **Correct approach**: Use Docker volumes to persist test artifacts to host, mount specific directories for screenshots and reports

### 6. Running Tests Before Grid is Ready
- **Problem**: Starting test execution immediately after docker-compose up without waiting for Selenium Grid
- **Why it's wrong**: Tests fail with connection refused errors, requires manual retries, wastes CI/CD time
- **Correct approach**: Implement health checks in docker-compose, add wait-for-it scripts, or poll Grid status endpoint before running tests

### 7. Not Cleaning Up Containers and Volumes
- **Problem**: Repeatedly running docker-compose up without cleaning old containers and volumes
- **Why it's wrong**: Consumes disk space, old containers interfere with new ones, port conflicts occur
- **Correct approach**: Use docker-compose down -v to remove volumes, implement cleanup in CI/CD, regularly prune unused resources

### 8. Hardcoding Hub URL in Test Code
- **Problem**: Hardcoding http://localhost:4444/wd/hub in test code instead of making it configurable
- **Why it's wrong**: Tests don't work in Docker network (localhost != selenium-hub), not flexible for different environments
- **Correct approach**: Use environment variables for Hub URL, configure based on execution context (local vs Docker vs CI/CD)

---

## Interview Questions

### Basic Level

1. **Q: What is Docker and why is it used in test automation?**
   - A: Docker is a containerization platform that packages applications and their dependencies into isolated containers. In test automation, it provides consistent test environments, easy setup/teardown, parallel execution capabilities, and eliminates "works on my machine" problems.

2. **Q: What is the difference between a Docker image and a Docker container?**
   - A: A Docker image is a read-only template containing the application and its dependencies, like a blueprint. A Docker container is a running instance of an image, like an actual building constructed from the blueprint. Multiple containers can be created from the same image.

3. **Q: What is Selenium Grid and how does Docker help with it?**
   - A: Selenium Grid is a tool for running tests in parallel across multiple machines and browsers. Docker simplifies Grid setup by providing pre-built containers for Hub and browser nodes that can be started with simple commands, eliminating manual installation and configuration.

### Intermediate Level

4. **Q: How do you configure Selenium tests to run on Docker Grid?**
   - A: Use RemoteWebDriver instead of local WebDriver, point to the Grid Hub URL (http://localhost:4444/wd/hub), set desired capabilities for browser choice, and configure network connectivity between test container and Grid containers using docker-compose networks.

5. **Q: Explain the purpose of docker-compose.yml in Selenium Grid setup.**
   - A: docker-compose.yml defines all Grid services (Hub and browser nodes) in one configuration file, specifies their relationships and dependencies, configures environment variables, sets up networking between services, manages resource allocation, and allows starting/stopping the entire Grid with single commands.

6. **Q: What is the purpose of shm_size in Docker Selenium containers?**
   - A: shm_size (shared memory size) prevents browser crashes in Docker containers. Browsers use /dev/shm for temporary files and shared memory. The default 64MB is too small, causing crashes. Setting shm_size to 2GB provides adequate space for browser operations.

7. **Q: How would you scale Selenium Grid nodes using Docker?**
   - A: Using docker-compose with the `--scale` flag (e.g., `docker-compose up -d --scale chrome=3`), or by defining `replicas` in the deploy section of docker-compose.yml. This creates multiple instances of browser nodes for increased parallel test capacity.

### Advanced Level

8. **Q: How do you create a custom Docker image for your test automation framework?**
   - A: Create a Dockerfile that: uses a base image with Java and Maven, sets working directory, copies pom.xml and source code, downloads dependencies, configures environment variables, exposes necessary ports, and defines the command to execute tests. Build with `docker build` and run with appropriate network and volume configurations.

9. **Q: Explain multi-stage Docker builds and their benefits for test automation.**
   - A: Multi-stage builds use multiple FROM statements in a Dockerfile, where each stage can serve a different purpose (build, test, runtime). Benefits include: smaller final image size (only runtime dependencies), separate build and test environments, better security (build tools not in production image), and faster subsequent builds with caching.

10. **Q: How would you integrate Docker-based Selenium Grid with a CI/CD pipeline?**
    - A: In the CI pipeline: install Docker and docker-compose, start Grid using `docker-compose up -d`, wait for Grid readiness using health checks or polling the status endpoint, run tests pointing to Grid URL, capture test results and artifacts, stop Grid with `docker-compose down`, and clean up volumes. Use environment variables to configure Grid URL and browser choices dynamically.

---

## Navigation

- **Previous:** [Day 44: Mobile Web Testing](./day44_mobile_web_testing.md)
- **Next:** [Day 46: Cloud Testing Platforms](./day46_cloud_testing.md)
- **Week 7 Home:** [Week 7 Overview](./README.md)

---

**Congratulations!** You've learned Docker containerization for test automation. Docker makes test environments consistent and scalable!

**Next:** Explore cloud testing platforms for even more scalability.