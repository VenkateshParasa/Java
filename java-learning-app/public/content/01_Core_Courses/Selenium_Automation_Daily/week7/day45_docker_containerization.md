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

## Navigation

- **Previous:** [Day 44: Mobile Web Testing](./day44_mobile_web_testing.md)
- **Next:** [Day 46: Cloud Testing Platforms](./day46_cloud_testing.md)
- **Week 7 Home:** [Week 7 Overview](./README.md)

---

**Congratulations!** You've learned Docker containerization for test automation. Docker makes test environments consistent and scalable!

**Next:** Explore cloud testing platforms for even more scalability.