# Day 44: CI/CD Integration for Test Automation

## Table of Contents
1. [Learning Objectives](#learning-objectives)
2. [Introduction to CI/CD for Test Automation](#introduction-to-cicd-for-test-automation)
3. [Why CI/CD Matters for Testing](#why-cicd-matters-for-testing)
4. [CI/CD Concepts and Terminology](#cicd-concepts-and-terminology)
5. [Popular CI/CD Tools Overview](#popular-cicd-tools-overview)
6. [Jenkins Integration](#jenkins-integration)
7. [GitHub Actions for Test Automation](#github-actions-for-test-automation)
8. [GitLab CI/CD](#gitlab-cicd)
9. [Azure DevOps Pipelines](#azure-devops-pipelines)
10. [Environment Configuration](#environment-configuration)
11. [Test Result Publishing](#test-result-publishing)
12. [Notifications Integration](#notifications-integration)
13. [Best Practices for CI/CD Automation](#best-practices-for-cicd-automation)
14. [Common Challenges and Solutions](#common-challenges-and-solutions)
15. [Complete Pipeline Examples](#complete-pipeline-examples)
16. [Practical Exercises](#practical-exercises)
17. [Key Takeaways](#key-takeaways)
18. [Interview Questions](#interview-questions)

---

## Learning Objectives

By the end of this lesson, you will be able to:

1. Understand the fundamentals of CI/CD and its importance in test automation
2. Set up Jenkins for automated test execution with pipeline as code
3. Configure GitHub Actions workflows for cross-browser testing
4. Implement GitLab CI/CD pipelines with Docker integration
5. Create Azure DevOps pipelines for test automation
6. Manage environment-specific configurations in CI/CD
7. Integrate test reporting tools with CI/CD pipelines
8. Set up notifications for test results (Email, Slack, Teams)
9. Implement parametrized builds for flexible test execution
10. Configure parallel test execution in CI/CD
11. Handle test artifacts and screenshots in pipelines
12. Manage secrets and credentials securely
13. Implement scheduled test runs and triggers
14. Debug and troubleshoot CI/CD pipeline failures
15. Apply CI/CD best practices for test automation

---

## Introduction to CI/CD for Test Automation

Continuous Integration and Continuous Deployment/Delivery (CI/CD) are practices that enable teams to deliver code changes more frequently and reliably. When integrated with test automation, CI/CD ensures that every code change is automatically tested, providing rapid feedback to development teams.

### What is CI/CD?

**Continuous Integration (CI)**: The practice of automatically building and testing code every time a team member commits changes to version control.

**Continuous Delivery (CD)**: The practice of automatically preparing code changes for release to production.

**Continuous Deployment**: The practice of automatically deploying every change that passes all stages of the production pipeline.

### CI/CD Pipeline Stages

```
Code Commit → Build → Unit Tests → Integration Tests →
UI Tests → Security Tests → Performance Tests → Deploy to Staging →
Deploy to Production
```

### Traditional vs CI/CD Testing

**Traditional Testing**:
- Manual test execution
- Tests run after development is complete
- Long feedback cycles
- Inconsistent test environments
- Manual deployment processes

**CI/CD Testing**:
- Automated test execution on every commit
- Tests run in parallel with development
- Immediate feedback
- Consistent, reproducible environments
- Automated deployment with verification

---

## Why CI/CD Matters for Testing

### Benefits of CI/CD for Test Automation

1. **Early Bug Detection**: Catch bugs immediately after code changes
2. **Faster Feedback**: Developers get instant feedback on code quality
3. **Reduced Manual Effort**: Automated test execution eliminates manual testing
4. **Consistent Environments**: Tests run in standardized environments
5. **Quality Gates**: Automated quality checks before deployment
6. **Parallel Execution**: Run tests simultaneously for faster results
7. **Version Control**: Track test results and trends over time
8. **Risk Reduction**: Catch issues before production deployment
9. **Cost Savings**: Reduce cost of finding and fixing bugs
10. **Team Collaboration**: Improve communication with automated reports

### Impact on Software Quality

```
Without CI/CD:
- Bug discovery: Days/Weeks after code change
- Fix cost: High (harder to identify root cause)
- Release frequency: Monthly/Quarterly
- Quality confidence: Low

With CI/CD:
- Bug discovery: Minutes/Hours after code change
- Fix cost: Low (immediate context)
- Release frequency: Daily/Multiple times per day
- Quality confidence: High
```

---

## CI/CD Concepts and Terminology

### Key Concepts

**Pipeline**: A series of automated steps that code goes through from commit to deployment.

**Job**: A single unit of work in a pipeline (e.g., run tests, build application).

**Stage**: A logical grouping of jobs (e.g., build stage, test stage, deploy stage).

**Artifact**: Files generated during pipeline execution (test reports, screenshots, logs).

**Trigger**: Events that start pipeline execution (commit, pull request, schedule).

**Agent/Runner**: The machine or container that executes pipeline jobs.

**Environment**: A set of configuration values for different deployment targets (dev, staging, production).

### Pipeline Types

**Build Pipeline**:
```yaml
stages:
  - compile
  - unit-test
  - package
  - publish
```

**Test Pipeline**:
```yaml
stages:
  - setup
  - smoke-tests
  - regression-tests
  - report
```

**Deployment Pipeline**:
```yaml
stages:
  - build
  - test
  - deploy-staging
  - integration-test
  - deploy-production
```

---

## Popular CI/CD Tools Overview

### 1. Jenkins
- **Type**: Self-hosted, open-source
- **Pros**: Highly customizable, large plugin ecosystem, mature
- **Cons**: Requires maintenance, complex setup
- **Best For**: Enterprise environments, complex workflows

### 2. GitHub Actions
- **Type**: Cloud-based, integrated with GitHub
- **Pros**: Easy setup, excellent GitHub integration, free for public repos
- **Cons**: Limited to GitHub, pricing for private repos
- **Best For**: Projects already on GitHub, quick setup

### 3. GitLab CI/CD
- **Type**: Integrated with GitLab, can be self-hosted
- **Pros**: Complete DevOps platform, built-in container registry
- **Cons**: Learning curve for GitLab platform
- **Best For**: Teams using GitLab, Docker-based workflows

### 4. Azure DevOps
- **Type**: Cloud-based, Microsoft product
- **Pros**: Excellent Microsoft ecosystem integration, scalable
- **Cons**: Complex pricing, steep learning curve
- **Best For**: Microsoft stack, enterprise teams

### 5. CircleCI
- **Type**: Cloud-based
- **Pros**: Fast, great Docker support, easy configuration
- **Cons**: Pricing for larger teams
- **Best For**: Docker-based projects, fast builds

### 6. Travis CI
- **Type**: Cloud-based
- **Pros**: Simple configuration, good for open source
- **Cons**: Limited free tier, slower builds
- **Best For**: Open source projects, simple workflows

---

## Jenkins Integration

### Installing Jenkins

**Using Docker**:
```bash
# Pull Jenkins Docker image
docker pull jenkins/jenkins:lts

# Run Jenkins container
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
```

**On Ubuntu**:
```bash
# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt update
sudo apt install jenkins
```

### Initial Jenkins Setup

1. **Access Jenkins**: Navigate to `http://localhost:8080`
2. **Unlock Jenkins**: Use initial admin password from `/var/jenkins_home/secrets/initialAdminPassword`
3. **Install Plugins**: Install suggested plugins
4. **Create Admin User**: Set up first admin user
5. **Configure System**: Set Java, Maven, Git paths

### Installing Required Plugins

```groovy
// Navigate to: Manage Jenkins → Manage Plugins → Available

Essential Plugins:
- Maven Integration Plugin
- Git Plugin
- Pipeline Plugin
- TestNG Results Plugin
- HTML Publisher Plugin
- Email Extension Plugin
- Slack Notification Plugin
- Blue Ocean (modern UI)
```

### Creating a Freestyle Job

**Step-by-Step**:
1. New Item → Freestyle Project
2. **Source Code Management**:
   - Git Repository URL
   - Credentials
   - Branch to build

3. **Build Triggers**:
   - Poll SCM: `H/5 * * * *` (every 5 minutes)
   - GitHub hook trigger
   - Build periodically: `H 2 * * *` (daily at 2 AM)

4. **Build Environment**:
   - Delete workspace before build
   - Add timestamps to console output

5. **Build Steps**:
   ```bash
   # Clean and compile
   mvn clean compile

   # Run tests
   mvn test -Dsurefire.suiteXmlFiles=testng.xml
   ```

6. **Post-build Actions**:
   - Publish TestNG Results: `**/testng-results.xml`
   - Email notification
   - Archive artifacts: `**/screenshots/*, **/reports/*`

### Creating Jenkins Pipeline (Declarative)

**Basic Pipeline**:
```groovy
// Jenkinsfile
pipeline {
    agent any

    tools {
        maven 'Maven-3.8.6'
        jdk 'JDK-11'
    }

    parameters {
        choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'edge'],
               description: 'Browser to run tests')
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'],
               description: 'Environment to test')
        string(name: 'TEST_SUITE', defaultValue: 'testng.xml',
               description: 'TestNG suite file')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building project...'
                sh 'mvn clean compile'
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running tests on ${params.BROWSER} in ${params.ENVIRONMENT}"
                sh """
                    mvn test \
                    -Dbrowser=${params.BROWSER} \
                    -Denvironment=${params.ENVIRONMENT} \
                    -Dsurefire.suiteXmlFiles=${params.TEST_SUITE}
                """
            }
        }

        stage('Generate Reports') {
            steps {
                echo 'Generating test reports...'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'target/extent-reports',
                    reportFiles: 'extent-report.html',
                    reportName: 'Extent Report'
                ])
            }
        }
    }

    post {
        always {
            echo 'Archiving artifacts...'
            archiveArtifacts artifacts: '**/target/*.jar, **/screenshots/*',
                           allowEmptyArchive: true

            echo 'Publishing TestNG results...'
            publishTestNG reportFilenamePattern: '**/testng-results.xml'
        }

        success {
            echo 'Tests passed successfully!'
            emailext(
                subject: "✅ Tests Passed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Tests completed successfully.\n\nBuild URL: ${env.BUILD_URL}",
                to: 'team@example.com'
            )
        }

        failure {
            echo 'Tests failed!'
            emailext(
                subject: "❌ Tests Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Tests failed.\n\nBuild URL: ${env.BUILD_URL}",
                to: 'team@example.com',
                attachLog: true
            )
        }
    }
}
```

### Advanced Jenkins Pipeline

**Parallel Execution**:
```groovy
pipeline {
    agent any

    stages {
        stage('Parallel Tests') {
            parallel {
                stage('Chrome Tests') {
                    agent { label 'windows' }
                    steps {
                        sh 'mvn test -Dbrowser=chrome -DsuiteFile=smoke.xml'
                    }
                }

                stage('Firefox Tests') {
                    agent { label 'linux' }
                    steps {
                        sh 'mvn test -Dbrowser=firefox -DsuiteFile=smoke.xml'
                    }
                }

                stage('Edge Tests') {
                    agent { label 'windows' }
                    steps {
                        sh 'mvn test -Dbrowser=edge -DsuiteFile=smoke.xml'
                    }
                }
            }
        }
    }
}
```

**Matrix Build**:
```groovy
pipeline {
    agent any

    stages {
        stage('Matrix Test') {
            matrix {
                axes {
                    axis {
                        name 'BROWSER'
                        values 'chrome', 'firefox', 'edge'
                    }
                    axis {
                        name 'OS'
                        values 'windows', 'linux', 'mac'
                    }
                }

                stages {
                    stage('Test') {
                        steps {
                            echo "Testing on ${BROWSER} - ${OS}"
                            sh """
                                mvn test \
                                -Dbrowser=${BROWSER} \
                                -Dos=${OS}
                            """
                        }
                    }
                }
            }
        }
    }
}
```

### Jenkins with Docker

**Jenkinsfile with Docker**:
```groovy
pipeline {
    agent {
        docker {
            image 'maven:3.8.6-openjdk-11'
            args '-v /root/.m2:/root/.m2'
        }
    }

    stages {
        stage('Build and Test') {
            steps {
                sh 'mvn clean test'
            }
        }
    }
}
```

**Multi-Container Setup**:
```groovy
pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                script {
                    docker.image('selenium/standalone-chrome:latest').withRun('-p 4444:4444') { c ->
                        docker.image('maven:3.8.6-openjdk-11').inside("--link ${c.id}:selenium") {
                            sh '''
                                mvn clean test \
                                -Dselenium.hub.url=http://selenium:4444/wd/hub
                            '''
                        }
                    }
                }
            }
        }
    }
}
```

### Jenkinsfile with Selenium Grid

```groovy
pipeline {
    agent any

    environment {
        SELENIUM_HUB = 'http://selenium-hub:4444'
    }

    stages {
        stage('Start Selenium Grid') {
            steps {
                sh '''
                    docker-compose -f docker-compose-grid.yml up -d
                    sleep 10
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh """
                    mvn test \
                    -Dselenium.hub.url=${SELENIUM_HUB} \
                    -Dparallel=methods \
                    -DthreadCount=5
                """
            }
        }
    }

    post {
        always {
            sh 'docker-compose -f docker-compose-grid.yml down'
        }
    }
}
```

---

## GitHub Actions for Test Automation

### GitHub Actions Basics

**Directory Structure**:
```
.github/
└── workflows/
    ├── smoke-tests.yml
    ├── regression-tests.yml
    └── nightly-tests.yml
```

### Basic Workflow File

**.github/workflows/selenium-tests.yml**:
```yaml
name: Selenium Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  workflow_dispatch:  # Manual trigger

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up JDK 11
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'
        cache: maven

    - name: Install Chrome
      uses: browser-actions/setup-chrome@latest

    - name: Run tests
      run: mvn clean test -Dbrowser=chrome

    - name: Upload test reports
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-reports
        path: |
          target/surefire-reports/
          target/extent-reports/
          target/screenshots/

    - name: Publish test results
      if: always()
      uses: dorny/test-reporter@v1
      with:
        name: Test Results
        path: target/surefire-reports/*.xml
        reporter: java-junit
```

### Matrix Strategy for Cross-Browser Testing

```yaml
name: Cross-Browser Tests

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        browser: [chrome, firefox, edge]
        java: [11, 17]
        exclude:
          - os: macos-latest
            browser: edge

    steps:
    - uses: actions/checkout@v3

    - name: Set up JDK ${{ matrix.java }}
      uses: actions/setup-java@v3
      with:
        java-version: ${{ matrix.java }}
        distribution: 'temurin'

    - name: Setup Browser
      uses: browser-actions/setup-${{ matrix.browser }}@latest

    - name: Run tests
      run: |
        mvn test \
          -Dbrowser=${{ matrix.browser }} \
          -Dos=${{ matrix.os }}

    - name: Upload results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-results-${{ matrix.os }}-${{ matrix.browser }}-java${{ matrix.java }}
        path: target/surefire-reports/
```

### GitHub Actions with Selenium Grid

```yaml
name: Tests with Selenium Grid

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      selenium-hub:
        image: selenium/hub:4.15.0
        ports:
          - 4444:4444

      chrome:
        image: selenium/node-chrome:4.15.0
        env:
          SE_EVENT_BUS_HOST: selenium-hub
          SE_EVENT_BUS_PUBLISH_PORT: 4442
          SE_EVENT_BUS_SUBSCRIBE_PORT: 4443

      firefox:
        image: selenium/node-firefox:4.15.0
        env:
          SE_EVENT_BUS_HOST: selenium-hub
          SE_EVENT_BUS_PUBLISH_PORT: 4442
          SE_EVENT_BUS_SUBSCRIBE_PORT: 4443

    steps:
    - uses: actions/checkout@v3

    - name: Set up JDK
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'

    - name: Wait for Grid
      run: |
        timeout 60 bash -c 'until curl -s http://localhost:4444/wd/hub/status | grep -q "ready"; do sleep 2; done'

    - name: Run tests
      run: |
        mvn test \
          -Dselenium.hub.url=http://localhost:4444 \
          -Dparallel=methods \
          -DthreadCount=4

    - name: Upload reports
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-reports
        path: target/extent-reports/
```

### Reusable Workflows

**.github/workflows/reusable-test.yml**:
```yaml
name: Reusable Test Workflow

on:
  workflow_call:
    inputs:
      browser:
        required: true
        type: string
      environment:
        required: true
        type: string
      suite-file:
        required: false
        type: string
        default: 'testng.xml'
    secrets:
      test-user:
        required: true
      test-password:
        required: true

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup JDK
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'

    - name: Run tests
      env:
        TEST_USER: ${{ secrets.test-user }}
        TEST_PASSWORD: ${{ secrets.test-password }}
      run: |
        mvn test \
          -Dbrowser=${{ inputs.browser }} \
          -Denvironment=${{ inputs.environment }} \
          -Dsurefire.suiteXmlFiles=${{ inputs.suite-file }}
```

**Calling Reusable Workflow**:
```yaml
name: Call Reusable Workflow

on:
  push:
    branches: [ main ]

jobs:
  smoke-tests:
    uses: ./.github/workflows/reusable-test.yml
    with:
      browser: chrome
      environment: dev
      suite-file: smoke-tests.xml
    secrets:
      test-user: ${{ secrets.TEST_USER }}
      test-password: ${{ secrets.TEST_PASSWORD }}

  regression-tests:
    uses: ./.github/workflows/reusable-test.yml
    with:
      browser: firefox
      environment: staging
      suite-file: regression-tests.xml
    secrets:
      test-user: ${{ secrets.TEST_USER }}
      test-password: ${{ secrets.TEST_PASSWORD }}
```

### GitHub Actions with Artifacts

```yaml
name: Tests with Artifacts

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup JDK
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'

    - name: Run tests
      run: mvn clean test

    - name: Upload screenshots
      if: failure()
      uses: actions/upload-artifact@v3
      with:
        name: failure-screenshots
        path: target/screenshots/
        retention-days: 30

    - name: Upload test reports
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-reports
        path: |
          target/surefire-reports/
          target/extent-reports/
        retention-days: 30

    - name: Upload logs
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-logs
        path: target/logs/
        retention-days: 7

    - name: Comment PR with results
      if: github.event_name == 'pull_request'
      uses: actions/github-script@v6
      with:
        script: |
          const fs = require('fs');
          const testResults = fs.readFileSync('target/surefire-reports/testng-results.xml', 'utf8');
          // Parse and post results as PR comment
```

---

## GitLab CI/CD

### Basic GitLab CI Configuration

**.gitlab-ci.yml**:
```yaml
stages:
  - build
  - test
  - report

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"

cache:
  paths:
    - .m2/repository/
    - target/

build:
  stage: build
  image: maven:3.8.6-openjdk-11
  script:
    - mvn clean compile
  artifacts:
    paths:
      - target/
    expire_in: 1 hour

test:
  stage: test
  image: maven:3.8.6-openjdk-11
  script:
    - mvn test -Dbrowser=chrome
  artifacts:
    when: always
    paths:
      - target/surefire-reports/
      - target/extent-reports/
      - target/screenshots/
    reports:
      junit: target/surefire-reports/TEST-*.xml
    expire_in: 30 days

report:
  stage: report
  image: alpine:latest
  script:
    - echo "Tests completed"
  dependencies:
    - test
```

### GitLab CI with Docker

```yaml
stages:
  - test

variables:
  SELENIUM_HUB: "http://selenium__hub:4444"
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"

test-chrome:
  stage: test
  image: maven:3.8.6-openjdk-11
  services:
    - name: selenium/standalone-chrome:latest
      alias: selenium-hub
  script:
    - mvn test -Dselenium.hub.url=$SELENIUM_HUB -Dbrowser=chrome
  artifacts:
    when: always
    reports:
      junit: target/surefire-reports/TEST-*.xml
    paths:
      - target/extent-reports/
      - target/screenshots/

test-firefox:
  stage: test
  image: maven:3.8.6-openjdk-11
  services:
    - name: selenium/standalone-firefox:latest
      alias: selenium-hub
  script:
    - mvn test -Dselenium.hub.url=$SELENIUM_HUB -Dbrowser=firefox
  artifacts:
    when: always
    reports:
      junit: target/surefire-reports/TEST-*.xml
```

### GitLab CI with Selenium Grid

```yaml
stages:
  - setup
  - test
  - cleanup

setup-grid:
  stage: setup
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker-compose -f docker-compose-grid.yml up -d
    - sleep 15
  artifacts:
    paths:
      - docker-compose-grid.yml

test-parallel:
  stage: test
  image: maven:3.8.6-openjdk-11
  variables:
    SELENIUM_HUB: "http://docker:4444"
  script:
    - |
      mvn test \
        -Dselenium.hub.url=$SELENIUM_HUB \
        -Dparallel=methods \
        -DthreadCount=5
  parallel:
    matrix:
      - BROWSER: [chrome, firefox, edge]
        SUITE: [smoke, regression, sanity]
  artifacts:
    when: always
    reports:
      junit: target/surefire-reports/TEST-*.xml
    paths:
      - target/

cleanup-grid:
  stage: cleanup
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker-compose -f docker-compose-grid.yml down
  when: always
```

### GitLab CI with Manual Triggers

```yaml
stages:
  - test-auto
  - test-manual
  - deploy

automated-tests:
  stage: test-auto
  script:
    - mvn test -Dsuite=smoke
  rules:
    - if: '$CI_PIPELINE_SOURCE == "push"'

manual-regression:
  stage: test-manual
  script:
    - mvn test -Dsuite=regression
  when: manual
  allow_failure: false

manual-full-suite:
  stage: test-manual
  script:
    - mvn test -Dsuite=full
  when: manual
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'

deploy-staging:
  stage: deploy
  script:
    - echo "Deploying to staging"
  environment:
    name: staging
  rules:
    - if: '$CI_COMMIT_BRANCH == "develop"'
      when: on_success
```

### GitLab CI with Schedules

```yaml
# In GitLab UI: CI/CD → Schedules → New schedule
# Schedule variable: SCHEDULED_TEST = "true"

stages:
  - test

smoke-tests:
  stage: test
  script:
    - mvn test -Dsuite=smoke
  rules:
    - if: '$CI_PIPELINE_SOURCE == "push"'
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'

nightly-regression:
  stage: test
  script:
    - mvn test -Dsuite=regression
  rules:
    - if: '$SCHEDULED_TEST == "true" && $CI_COMMIT_BRANCH == "main"'

weekly-full-suite:
  stage: test
  script:
    - mvn test -Dsuite=full
  rules:
    - if: '$SCHEDULED_TEST == "weekly"'
```

---

## Azure DevOps Pipelines

### Classic Pipeline (YAML)

**azure-pipelines.yml**:
```yaml
trigger:
  branches:
    include:
      - main
      - develop

pr:
  branches:
    include:
      - main

pool:
  vmImage: 'ubuntu-latest'

variables:
  MAVEN_CACHE_FOLDER: $(Pipeline.Workspace)/.m2/repository
  MAVEN_OPTS: '-Dmaven.repo.local=$(MAVEN_CACHE_FOLDER)'

stages:
- stage: Build
  jobs:
  - job: BuildJob
    steps:
    - task: Maven@3
      inputs:
        mavenPomFile: 'pom.xml'
        goals: 'clean compile'
        options: '-B'
        javaHomeOption: 'JDKVersion'
        jdkVersionOption: '1.11'
        mavenVersionOption: 'Default'
        mavenOptions: '$(MAVEN_OPTS)'

    - task: PublishPipelineArtifact@1
      inputs:
        targetPath: 'target'
        artifact: 'build-output'

- stage: Test
  dependsOn: Build
  jobs:
  - job: TestJob
    steps:
    - task: DownloadPipelineArtifact@2
      inputs:
        artifact: 'build-output'
        path: 'target'

    - task: Maven@3
      inputs:
        mavenPomFile: 'pom.xml'
        goals: 'test'
        options: '-Dbrowser=chrome -DsuiteFile=testng.xml'
        testResultsFiles: '**/surefire-reports/TEST-*.xml'
        javaHomeOption: 'JDKVersion'
        jdkVersionOption: '1.11'

    - task: PublishTestResults@2
      condition: always()
      inputs:
        testResultsFormat: 'JUnit'
        testResultsFiles: '**/surefire-reports/TEST-*.xml'
        failTaskOnFailedTests: true
        testRunTitle: 'Selenium Test Results'

    - task: PublishPipelineArtifact@1
      condition: always()
      inputs:
        targetPath: 'target/extent-reports'
        artifact: 'test-reports'

    - task: PublishPipelineArtifact@1
      condition: failed()
      inputs:
        targetPath: 'target/screenshots'
        artifact: 'failure-screenshots'
```

### Multi-Stage Pipeline

```yaml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

stages:
- stage: Build
  displayName: 'Build Stage'
  jobs:
  - job: Build
    displayName: 'Build Job'
    steps:
    - task: Maven@3
      displayName: 'Maven Build'
      inputs:
        goals: 'clean compile'

- stage: SmokeTest
  displayName: 'Smoke Tests'
  dependsOn: Build
  jobs:
  - job: SmokeTests
    steps:
    - task: Maven@3
      inputs:
        goals: 'test'
        options: '-Dsuite=smoke'

- stage: RegressionTest
  displayName: 'Regression Tests'
  dependsOn: SmokeTest
  condition: succeeded()
  jobs:
  - job: RegressionTests
    strategy:
      matrix:
        Chrome:
          browser: 'chrome'
        Firefox:
          browser: 'firefox'
        Edge:
          browser: 'edge'
    steps:
    - task: Maven@3
      inputs:
        goals: 'test'
        options: '-Dbrowser=$(browser) -Dsuite=regression'

- stage: Report
  displayName: 'Generate Reports'
  dependsOn: RegressionTest
  condition: always()
  jobs:
  - job: GenerateReport
    steps:
    - task: PublishTestResults@2
      inputs:
        testResultsFormat: 'JUnit'
        testResultsFiles: '**/TEST-*.xml'
```

### Azure DevOps with Selenium Grid

```yaml
trigger:
  - main

resources:
  containers:
  - container: selenium-hub
    image: selenium/hub:4.15.0
    ports:
      - 4444:4444

  - container: chrome-node
    image: selenium/node-chrome:4.15.0
    env:
      SE_EVENT_BUS_HOST: selenium-hub
      SE_EVENT_BUS_PUBLISH_PORT: 4442
      SE_EVENT_BUS_SUBSCRIBE_PORT: 4443

pool:
  vmImage: 'ubuntu-latest'

stages:
- stage: Test
  jobs:
  - job: TestWithGrid
    services:
      selenium-hub: selenium-hub
      chrome-node: chrome-node
    steps:
    - script: |
        curl --retry 10 --retry-delay 5 --retry-connrefused \
          http://localhost:4444/wd/hub/status
      displayName: 'Wait for Selenium Grid'

    - task: Maven@3
      displayName: 'Run Tests'
      inputs:
        goals: 'test'
        options: |
          -Dselenium.hub.url=http://localhost:4444 \
          -Dparallel=methods \
          -DthreadCount=4
```

### Parametrized Azure Pipeline

```yaml
parameters:
- name: browser
  displayName: 'Browser'
  type: string
  default: 'chrome'
  values:
    - chrome
    - firefox
    - edge

- name: environment
  displayName: 'Environment'
  type: string
  default: 'dev'
  values:
    - dev
    - staging
    - prod

- name: suite
  displayName: 'Test Suite'
  type: string
  default: 'smoke'
  values:
    - smoke
    - regression
    - full

trigger: none  # Disable automatic triggers

pool:
  vmImage: 'ubuntu-latest'

stages:
- stage: Test
  jobs:
  - job: RunTests
    displayName: 'Run ${{ parameters.suite }} tests on ${{ parameters.browser }}'
    steps:
    - task: Maven@3
      inputs:
        goals: 'test'
        options: |
          -Dbrowser=${{ parameters.browser }} \
          -Denvironment=${{ parameters.environment }} \
          -Dsuite=${{ parameters.suite }}
```

---

## Environment Configuration

### Managing Environment Variables

**Jenkins**:
```groovy
pipeline {
    agent any

    environment {
        // Global environment variables
        BASE_URL = credentials('base-url')
        API_KEY = credentials('api-key')
        TEST_ENV = 'staging'
    }

    stages {
        stage('Test') {
            environment {
                // Stage-specific variables
                BROWSER = 'chrome'
            }
            steps {
                sh """
                    mvn test \
                    -Dbase.url=${BASE_URL} \
                    -Dapi.key=${API_KEY} \
                    -Denvironment=${TEST_ENV} \
                    -Dbrowser=${BROWSER}
                """
            }
        }
    }
}
```

**GitHub Actions**:
```yaml
name: Tests with Environments

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to test'
        required: true
        type: choice
        options:
          - dev
          - staging
          - production

jobs:
  test:
    runs-on: ubuntu-latest
    environment: ${{ github.event.inputs.environment }}

    steps:
    - uses: actions/checkout@v3

    - name: Run tests
      env:
        BASE_URL: ${{ secrets.BASE_URL }}
        API_KEY: ${{ secrets.API_KEY }}
        DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
      run: |
        mvn test \
          -Dbase.url=$BASE_URL \
          -Dapi.key=$API_KEY \
          -Denvironment=${{ github.event.inputs.environment }}
```

**GitLab CI**:
```yaml
variables:
  GLOBAL_VAR: "global-value"

.test_template:
  script:
    - |
      mvn test \
        -Dbase.url=$BASE_URL \
        -Denvironment=$CI_ENVIRONMENT_NAME

test-dev:
  extends: .test_template
  environment:
    name: development
  variables:
    BASE_URL: "https://dev.example.com"

test-staging:
  extends: .test_template
  environment:
    name: staging
  variables:
    BASE_URL: "https://staging.example.com"
  when: manual

test-prod:
  extends: .test_template
  environment:
    name: production
  variables:
    BASE_URL: "https://example.com"
  when: manual
  only:
    - main
```

### Configuration Files per Environment

**config/dev.properties**:
```properties
base.url=https://dev.example.com
api.url=https://api-dev.example.com
browser=chrome
implicit.wait=10
explicit.wait=20
page.load.timeout=30
```

**config/staging.properties**:
```properties
base.url=https://staging.example.com
api.url=https://api-staging.example.com
browser=chrome
implicit.wait=15
explicit.wait=30
page.load.timeout=45
```

**Loading Configuration in Pipeline**:
```groovy
pipeline {
    agent any

    parameters {
        choice(name: 'ENV', choices: ['dev', 'staging', 'prod'])
    }

    stages {
        stage('Test') {
            steps {
                sh """
                    mvn test \
                    -Dconfig.file=config/${params.ENV}.properties
                """
            }
        }
    }
}
```

---

## Test Result Publishing

### TestNG Results

**Jenkins**:
```groovy
post {
    always {
        publishTestNG reportFilenamePattern: '**/testng-results.xml',
                      escapeTestDescp: true,
                      escapeExceptionMsg: true
    }
}
```

**GitHub Actions**:
```yaml
- name: Publish Test Results
  uses: EnricoMi/publish-unit-test-result-action@v2
  if: always()
  with:
    files: |
      target/surefire-reports/TEST-*.xml
    check_name: Test Results
    comment_title: Test Statistics
```

**GitLab CI**:
```yaml
test:
  script:
    - mvn test
  artifacts:
    when: always
    reports:
      junit: target/surefire-reports/TEST-*.xml
    paths:
      - target/extent-reports/
```

### ExtentReports Publishing

**Jenkins HTML Publisher**:
```groovy
post {
    always {
        publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'target/extent-reports',
            reportFiles: 'extent-report.html',
            reportName: 'Extent Report',
            reportTitles: 'Test Execution Report'
        ])
    }
}
```

**GitHub Actions Pages**:
```yaml
- name: Deploy Report to GitHub Pages
  if: always()
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./target/extent-reports
    destination_dir: reports/${{ github.run_number }}

- name: Comment PR with Report Link
  if: github.event_name == 'pull_request'
  uses: actions/github-script@v6
  with:
    script: |
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: '📊 [View Test Report](https://your-username.github.io/your-repo/reports/${{ github.run_number }}/extent-report.html)'
      })
```

### Allure Reports

**Jenkins with Allure**:
```groovy
pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                sh 'mvn clean test'
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'target/allure-results']]
            ])
        }
    }
}
```

**GitHub Actions with Allure**:
```yaml
- name: Run tests
  run: mvn clean test

- name: Load test report history
  uses: actions/checkout@v3
  if: always()
  continue-on-error: true
  with:
    ref: gh-pages
    path: gh-pages

- name: Build test report
  uses: simple-elf/allure-report-action@v1.7
  if: always()
  with:
    gh_pages: gh-pages
    allure_history: allure-history
    allure_results: target/allure-results

- name: Publish test report
  uses: peaceiris/actions-gh-pages@v3
  if: always()
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_branch: gh-pages
    publish_dir: allure-history
```

---

## Notifications Integration

### Email Notifications

**Jenkins Email Extension**:
```groovy
post {
    success {
        emailext(
            subject: "✅ Build Successful: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
            body: """
                <h2>Build Successful</h2>
                <p><b>Job:</b> ${env.JOB_NAME}</p>
                <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                <p><b>Duration:</b> ${currentBuild.durationString}</p>
                <p><a href="${env.BUILD_URL}">View Build</a></p>
                <p><a href="${env.BUILD_URL}testReport">View Test Report</a></p>
            """,
            to: 'team@example.com',
            mimeType: 'text/html'
        )
    }

    failure {
        emailext(
            subject: "❌ Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
            body: """
                <h2>Build Failed</h2>
                <p><b>Job:</b> ${env.JOB_NAME}</p>
                <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                <p><b>Failed Stage:</b> ${env.STAGE_NAME}</p>
                <p><a href="${env.BUILD_URL}console">View Console Output</a></p>
                <h3>Recent Changes:</h3>
                <pre>${currentBuild.changeSets}</pre>
            """,
            to: 'team@example.com, ${DEFAULT_RECIPIENTS}',
            mimeType: 'text/html',
            attachLog: true
        )
    }
}
```

**GitHub Actions Email**:
```yaml
- name: Send Email Notification
  if: always()
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: 'Test Results: ${{ job.status }}'
    to: team@example.com
    from: ci-cd@example.com
    body: |
      Build ${{ github.run_number }} completed with status: ${{ job.status }}

      Repository: ${{ github.repository }}
      Branch: ${{ github.ref }}
      Commit: ${{ github.sha }}

      View details: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
    attachments: target/extent-reports/extent-report.html
```

### Slack Notifications

**Jenkins Slack**:
```groovy
post {
    success {
        slackSend(
            channel: '#test-automation',
            color: 'good',
            message: """
                ✅ Build Successful
                Job: ${env.JOB_NAME}
                Build: ${env.BUILD_NUMBER}
                Duration: ${currentBuild.durationString}
                <${env.BUILD_URL}|View Build>
            """
        )
    }

    failure {
        slackSend(
            channel: '#test-automation',
            color: 'danger',
            message: """
                ❌ Build Failed
                Job: ${env.JOB_NAME}
                Build: ${env.BUILD_NUMBER}
                Failed Stage: ${env.STAGE_NAME}
                <${env.BUILD_URL}console|View Console>
                <!here> Build needs attention
            """
        )
    }
}
```

**GitHub Actions Slack**:
```yaml
- name: Slack Notification
  if: always()
  uses: slackapi/slack-github-action@v1.24.0
  with:
    channel-id: 'test-automation'
    payload: |
      {
        "text": "Test Results: ${{ job.status }}",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Test Results*\nStatus: ${{ job.status }}\nBranch: ${{ github.ref }}"
            }
          },
          {
            "type": "section",
            "fields": [
              {
                "type": "mrkdwn",
                "text": "*Repository:*\n${{ github.repository }}"
              },
              {
                "type": "mrkdwn",
                "text": "*Commit:*\n${{ github.sha }}"
              }
            ]
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "View Build"
                },
                "url": "${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
              }
            ]
          }
        ]
      }
  env:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
```

### Microsoft Teams Notifications

**Jenkins Teams**:
```groovy
post {
    always {
        office365ConnectorSend(
            webhookUrl: "${env.TEAMS_WEBHOOK_URL}",
            status: currentBuild.currentResult,
            message: "Build ${env.BUILD_NUMBER} ${currentBuild.currentResult}",
            factDefinitions: [
                [name: "Job", template: "${env.JOB_NAME}"],
                [name: "Build Number", template: "${env.BUILD_NUMBER}"],
                [name: "Duration", template: "${currentBuild.durationString}"],
                [name: "Status", template: "${currentBuild.currentResult}"]
            ],
            potentialAction: [
                [
                    "@type": "OpenUri",
                    name: "View Build",
                    targets: [[os: "default", uri: "${env.BUILD_URL}"]]
                ]
            ]
        )
    }
}
```

**GitHub Actions Teams**:
```yaml
- name: Microsoft Teams Notification
  if: always()
  uses: jdcargile/ms-teams-notification@v1.3
  with:
    github-token: ${{ github.token }}
    ms-teams-webhook-uri: ${{ secrets.MS_TEAMS_WEBHOOK_URI }}
    notification-summary: Test execution ${{ job.status }}
    notification-color: ${{ job.status == 'success' && '28a745' || 'dc3545' }}
    timezone: America/New_York
```

---

## Best Practices for CI/CD Automation

### 1. Pipeline Design Principles

```yaml
# Good: Fail fast
stages:
  - validate    # Check code style, syntax
  - build      # Compile code
  - unit-test  # Fast unit tests
  - integration-test
  - ui-test    # Slower UI tests last

# Good: Use caching
cache:
  paths:
    - .m2/repository/
    - node_modules/
    - target/

# Good: Parallel execution
parallel:
  matrix:
    - BROWSER: [chrome, firefox]
      SUITE: [smoke, regression]
```

### 2. Test Organization

```yaml
# Separate test suites by purpose
smoke-tests:
  script: mvn test -Dsuite=smoke
  rules:
    - if: '$CI_PIPELINE_SOURCE == "push"'

regression-tests:
  script: mvn test -Dsuite=regression
  rules:
    - if: '$CI_PIPELINE_SOURCE == "schedule"'

# Run critical tests first
stages:
  - critical-tests
  - standard-tests
  - extended-tests
```

### 3. Resource Management

```groovy
// Clean up resources
post {
    always {
        // Stop containers
        sh 'docker-compose down'

        // Clean workspace
        cleanWs()

        // Release agents
        node {
            // Release node resources
        }
    }
}
```

### 4. Security Best Practices

```yaml
# Use secrets management
variables:
  API_KEY: ${CI_SECRET_API_KEY}  # Never hardcode

# Mask sensitive data in logs
script:
  - echo "Logging in..."
  - mvn test -Dpassword=***MASKED***

# Use protected branches
rules:
  - if: '$CI_COMMIT_BRANCH == "main"'
    when: manual  # Require approval for production
```

### 5. Performance Optimization

```yaml
# Use artifacts efficiently
artifacts:
  expire_in: 7 days  # Don't keep artifacts forever
  paths:
    - target/surefire-reports/  # Only necessary files

# Optimize Docker layers
FROM maven:3.8.6-openjdk-11
RUN mvn dependency:go-offline  # Cache dependencies
COPY . .
RUN mvn clean compile
```

### 6. Monitoring and Reporting

```groovy
// Track metrics
post {
    always {
        // Test metrics
        junit testResults: '**/TEST-*.xml'

        // Code coverage
        jacoco execPattern: '**/jacoco.exec'

        // Performance metrics
        perfReport sourceDataFiles: '**/performance.jtl'
    }
}
```

### 7. Version Control

```yaml
# Tag successful builds
after_script:
  - |
    if [ "$CI_PIPELINE_STATUS" == "success" ]; then
      git tag "build-${CI_PIPELINE_ID}"
      git push origin "build-${CI_PIPELINE_ID}"
    fi

# Track test versions
script:
  - echo "Test Framework Version: $(cat version.txt)" >> build-info.txt
```

---

## Common Challenges and Solutions

### Challenge 1: Flaky Tests

**Problem**: Tests pass locally but fail in CI/CD.

**Solutions**:
```groovy
// Implement retry logic
pipeline {
    agent any

    stages {
        stage('Test') {
            options {
                retry(3)
            }
            steps {
                sh 'mvn test'
            }
        }
    }
}

// Use TestNG retry analyzer
@Test(retryAnalyzer = RetryAnalyzer.class)
public void flakyTest() {
    // Test logic
}

// Increase timeouts
mvn test -Dimplicit.wait=20 -Dexplicit.wait=30
```

### Challenge 2: Long Build Times

**Problem**: Pipeline takes too long to execute.

**Solutions**:
```yaml
# Parallel execution
parallel:
  - job: test-chrome
    script: mvn test -Dbrowser=chrome
  - job: test-firefox
    script: mvn test -Dbrowser=firefox

# Test sharding
test-shard-1:
  script: mvn test -Dgroups=group1
test-shard-2:
  script: mvn test -Dgroups=group2

# Smart test selection
script:
  - git diff --name-only HEAD~1 > changed_files.txt
  - mvn test -DtestFile=changed_files.txt  # Run only affected tests
```

### Challenge 3: Resource Constraints

**Problem**: Not enough agents/runners to execute all jobs.

**Solutions**:
```yaml
# Queue management
concurrency:
  group: ${{ github.ref }}
  cancel-in-progress: true  # Cancel old runs

# Resource allocation
test:
  resource_group: selenium-grid
  script: mvn test

# Conditional execution
rules:
  - if: '$CI_COMMIT_BRANCH == "main"'
    when: always
  - if: '$CI_COMMIT_BRANCH != "main"'
    when: manual  # Save resources on non-main branches
```

### Challenge 4: Environment Setup

**Problem**: Complex environment setup required.

**Solutions**:
```dockerfile
# Use Docker for consistency
FROM maven:3.8.6-openjdk-11

# Install dependencies
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    chromium \
    chromium-driver

# Set up environment
ENV CHROME_BIN=/usr/bin/chromium
ENV CHROMEDRIVER_PATH=/usr/bin/chromedriver

WORKDIR /app
COPY . .
RUN mvn clean compile

CMD ["mvn", "test"]
```

### Challenge 5: Debugging CI Failures

**Problem**: Difficult to debug failures in CI environment.

**Solutions**:
```yaml
# Enhanced logging
script:
  - mvn test -X  # Debug mode
  - cat target/logs/test-execution.log

# Save debugging artifacts
artifacts:
  when: on_failure
  paths:
    - target/screenshots/
    - target/logs/
    - target/page-sources/

# Enable SSH debugging
script:
  - curl -sS https://gist.githubusercontent.com/.../debug.sh | bash
  # Wait for SSH connection to debug interactively
```

### Challenge 6: Cross-Browser Inconsistencies

**Problem**: Tests behave differently across browsers in CI.

**Solutions**:
```yaml
# Use Selenium Grid
services:
  - selenium/hub:latest
  - selenium/node-chrome:latest
  - selenium/node-firefox:latest
  - selenium/node-edge:latest

# Browser-specific configurations
test-chrome:
  variables:
    BROWSER_VERSION: "latest"
    SCREEN_RESOLUTION: "1920x1080"
  script:
    - mvn test -Dbrowser=chrome

# Explicit waits instead of implicit
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.presenceOfElementLocated(locator));
```

---

## Complete Pipeline Examples

### Example 1: End-to-End Jenkins Pipeline

```groovy
@Library('shared-library') _

pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'])
        choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'edge', 'all'])
        choice(name: 'SUITE', choices: ['smoke', 'regression', 'full'])
        booleanParam(name: 'SEND_NOTIFICATIONS', defaultValue: true)
        booleanParam(name: 'DEPLOY_AFTER_TEST', defaultValue: false)
    }

    environment {
        MAVEN_OPTS = '-Dmaven.repo.local=.m2/repository'
        BASE_URL = credentials("${params.ENVIRONMENT}-base-url")
        API_KEY = credentials("${params.ENVIRONMENT}-api-key")
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out from ${env.GIT_BRANCH}"
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building project...'
                sh 'mvn clean compile -DskipTests'
            }
        }

        stage('Unit Tests') {
            steps {
                echo 'Running unit tests...'
                sh 'mvn test -Dtest=*UnitTest'
            }
        }

        stage('Setup Selenium Grid') {
            steps {
                echo 'Starting Selenium Grid...'
                sh '''
                    docker-compose -f docker-compose-grid.yml up -d
                    sleep 15
                    curl --retry 5 --retry-delay 3 http://localhost:4444/wd/hub/status
                '''
            }
        }

        stage('Integration Tests') {
            parallel {
                stage('Chrome Tests') {
                    when {
                        expression { params.BROWSER == 'chrome' || params.BROWSER == 'all' }
                    }
                    steps {
                        runTests('chrome', params.SUITE)
                    }
                }

                stage('Firefox Tests') {
                    when {
                        expression { params.BROWSER == 'firefox' || params.BROWSER == 'all' }
                    }
                    steps {
                        runTests('firefox', params.SUITE)
                    }
                }

                stage('Edge Tests') {
                    when {
                        expression { params.BROWSER == 'edge' || params.BROWSER == 'all' }
                    }
                    steps {
                        runTests('edge', params.SUITE)
                    }
                }
            }
        }

        stage('Generate Reports') {
            steps {
                echo 'Generating test reports...'
                publishHTML([
                    reportDir: 'target/extent-reports',
                    reportFiles: 'extent-report.html',
                    reportName: 'Extent Report'
                ])

                allure([
                    results: [[path: 'target/allure-results']]
                ])
            }
        }

        stage('Deploy') {
            when {
                expression { params.DEPLOY_AFTER_TEST && currentBuild.result == 'SUCCESS' }
            }
            steps {
                echo "Deploying to ${params.ENVIRONMENT}..."
                sh "./deploy.sh ${params.ENVIRONMENT}"
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker-compose -f docker-compose-grid.yml down'

            publishTestNG reportFilenamePattern: '**/testng-results.xml'

            archiveArtifacts artifacts: '''
                target/surefire-reports/**,
                target/extent-reports/**,
                target/screenshots/**,
                target/logs/**
            ''', allowEmptyArchive: true

            cleanWs()
        }

        success {
            script {
                if (params.SEND_NOTIFICATIONS) {
                    notifySuccess()
                }
            }
        }

        failure {
            script {
                if (params.SEND_NOTIFICATIONS) {
                    notifyFailure()
                }
            }
        }
    }
}

def runTests(browser, suite) {
    sh """
        mvn test \
        -Dbrowser=${browser} \
        -Denvironment=${params.ENVIRONMENT} \
        -Dsuite=${suite} \
        -Dbase.url=${BASE_URL} \
        -Dapi.key=${API_KEY} \
        -Dselenium.hub.url=http://localhost:4444
    """
}

def notifySuccess() {
    emailext(
        subject: "✅ Tests Passed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
        body: """
            <h2>Tests Passed Successfully</h2>
            <p><b>Environment:</b> ${params.ENVIRONMENT}</p>
            <p><b>Browser:</b> ${params.BROWSER}</p>
            <p><b>Suite:</b> ${params.SUITE}</p>
            <p><a href="${env.BUILD_URL}">View Build</a></p>
            <p><a href="${env.BUILD_URL}Extent_20Report">View Test Report</a></p>
        """,
        to: 'team@example.com',
        mimeType: 'text/html'
    )

    slackSend(
        channel: '#test-automation',
        color: 'good',
        message: "✅ Tests Passed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
    )
}

def notifyFailure() {
    emailext(
        subject: "❌ Tests Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
        body: """
            <h2>Tests Failed</h2>
            <p><b>Environment:</b> ${params.ENVIRONMENT}</p>
            <p><b>Browser:</b> ${params.BROWSER}</p>
            <p><b>Suite:</b> ${params.SUITE}</p>
            <p><a href="${env.BUILD_URL}console">View Console</a></p>
        """,
        to: 'team@example.com',
        mimeType: 'text/html',
        attachLog: true
    )

    slackSend(
        channel: '#test-automation',
        color: 'danger',
        message: "❌ Tests Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}\n<!here> Attention required"
    )
}
```

### Example 2: Complete GitHub Actions Workflow

```yaml
name: Comprehensive Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to test'
        required: true
        type: choice
        options:
          - dev
          - staging
          - production
      browser:
        description: 'Browser'
        required: true
        type: choice
        options:
          - chrome
          - firefox
          - edge
          - all
      suite:
        description: 'Test suite'
        required: true
        type: choice
        options:
          - smoke
          - regression
          - full

env:
  JAVA_VERSION: '11'
  MAVEN_OPTS: '-Dmaven.repo.local=.m2/repository'

jobs:
  setup:
    runs-on: ubuntu-latest
    outputs:
      environment: ${{ steps.set-env.outputs.environment }}
      browser: ${{ steps.set-browser.outputs.browser }}
      suite: ${{ steps.set-suite.outputs.suite }}
    steps:
      - id: set-env
        run: |
          if [ "${{ github.event_name }}" == "workflow_dispatch" ]; then
            echo "environment=${{ github.event.inputs.environment }}" >> $GITHUB_OUTPUT
          else
            echo "environment=dev" >> $GITHUB_OUTPUT
          fi

      - id: set-browser
        run: |
          if [ "${{ github.event_name }}" == "workflow_dispatch" ]; then
            echo "browser=${{ github.event.inputs.browser }}" >> $GITHUB_OUTPUT
          else
            echo "browser=chrome" >> $GITHUB_OUTPUT
          fi

      - id: set-suite
        run: |
          if [ "${{ github.event_name }}" == "schedule" ]; then
            echo "suite=regression" >> $GITHUB_OUTPUT
          elif [ "${{ github.event_name }}" == "workflow_dispatch" ]; then
            echo "suite=${{ github.event.inputs.suite }}" >> $GITHUB_OUTPUT
          else
            echo "suite=smoke" >> $GITHUB_OUTPUT
          fi

  build:
    needs: setup
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up JDK ${{ env.JAVA_VERSION }}
        uses: actions/setup-java@v3
        with:
          java-version: ${{ env.JAVA_VERSION }}
          distribution: 'temurin'
          cache: maven

      - name: Build project
        run: mvn clean compile -DskipTests

      - name: Upload build artifact
        uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: target/

  test:
    needs: [setup, build]
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest]
        browser: [chrome, firefox]
        include:
          - os: windows-latest
            browser: edge

    services:
      selenium-hub:
        image: selenium/hub:4.15.0
        ports:
          - 4444:4444

    steps:
      - uses: actions/checkout@v3

      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          java-version: ${{ env.JAVA_VERSION }}
          distribution: 'temurin'
          cache: maven

      - name: Download build artifact
        uses: actions/download-artifact@v3
        with:
          name: build-output
          path: target/

      - name: Setup Browser
        uses: browser-actions/setup-${{ matrix.browser }}@latest

      - name: Run tests
        env:
          BASE_URL: ${{ secrets[format('{0}_BASE_URL', needs.setup.outputs.environment)] }}
          API_KEY: ${{ secrets[format('{0}_API_KEY', needs.setup.outputs.environment)] }}
        run: |
          mvn test \
            -Dbrowser=${{ matrix.browser }} \
            -Denvironment=${{ needs.setup.outputs.environment }} \
            -Dsuite=${{ needs.setup.outputs.suite }} \
            -Dbase.url=$BASE_URL \
            -Dapi.key=$API_KEY

      - name: Upload test reports
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-reports-${{ matrix.os }}-${{ matrix.browser }}
          path: |
            target/surefire-reports/
            target/extent-reports/

      - name: Upload screenshots on failure
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: failure-screenshots-${{ matrix.os }}-${{ matrix.browser }}
          path: target/screenshots/

  report:
    needs: test
    if: always()
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Download all artifacts
        uses: actions/download-artifact@v3
        with:
          path: artifacts/

      - name: Publish test results
        uses: EnricoMi/publish-unit-test-result-action@v2
        with:
          files: artifacts/**/surefire-reports/TEST-*.xml
          check_name: Test Results
          comment_title: Test Statistics

      - name: Deploy report to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: artifacts/test-reports-ubuntu-latest-chrome/extent-reports
          destination_dir: reports/${{ github.run_number }}

      - name: Comment PR with results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const reportUrl = `https://${context.repo.owner}.github.io/${context.repo.repo}/reports/${context.runNumber}/extent-report.html`;
            const body = `## Test Results 📊\n\n[View Detailed Report](${reportUrl})`;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: body
            });

  notify:
    needs: [test, report]
    if: always()
    runs-on: ubuntu-latest
    steps:
      - name: Send Slack notification
        uses: slackapi/slack-github-action@v1.24.0
        with:
          channel-id: 'test-automation'
          payload: |
            {
              "text": "Test Results: ${{ needs.test.result }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Test Execution Complete*\nStatus: ${{ needs.test.result }}\nWorkflow: ${{ github.workflow }}"
                  }
                },
                {
                  "type": "actions",
                  "elements": [
                    {
                      "type": "button",
                      "text": {"type": "plain_text", "text": "View Build"},
                      "url": "${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
                    }
                  ]
                }
              ]
            }
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
```

### Example 3: GitLab CI Complete Pipeline

```yaml
image: maven:3.8.6-openjdk-11

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=$CI_PROJECT_DIR/.m2/repository"
  SELENIUM_HUB: "http://selenium-hub:4444"

stages:
  - validate
  - build
  - test
  - report
  - deploy

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - .m2/repository/
    - target/

validate:
  stage: validate
  script:
    - mvn validate
    - mvn checkstyle:check
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_COMMIT_BRANCH == "main"'

build:
  stage: build
  script:
    - mvn clean compile -DskipTests
  artifacts:
    paths:
      - target/
    expire_in: 1 hour

.test_template: &test_template
  stage: test
  services:
    - name: selenium/standalone-chrome:latest
      alias: selenium-hub
  script:
    - |
      mvn test \
        -Dselenium.hub.url=$SELENIUM_HUB \
        -Dbrowser=$BROWSER \
        -Denvironment=$ENVIRONMENT \
        -Dsuite=$SUITE
  artifacts:
    when: always
    reports:
      junit: target/surefire-reports/TEST-*.xml
    paths:
      - target/surefire-reports/
      - target/extent-reports/
      - target/screenshots/
    expire_in: 30 days

smoke-tests-dev:
  <<: *test_template
  variables:
    BROWSER: "chrome"
    ENVIRONMENT: "dev"
    SUITE: "smoke"
  rules:
    - if: '$CI_PIPELINE_SOURCE == "push"'

regression-tests-staging:
  <<: *test_template
  variables:
    BROWSER: "chrome"
    ENVIRONMENT: "staging"
    SUITE: "regression"
  rules:
    - if: '$CI_PIPELINE_SOURCE == "schedule"'
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual

cross-browser-tests:
  stage: test
  parallel:
    matrix:
      - BROWSER: [chrome, firefox]
        SUITE: [smoke, regression]
  script:
    - |
      mvn test \
        -Dbrowser=$BROWSER \
        -Dsuite=$SUITE
  artifacts:
    when: always
    reports:
      junit: target/surefire-reports/TEST-*.xml

generate-report:
  stage: report
  image: alpine:latest
  dependencies:
    - smoke-tests-dev
    - regression-tests-staging
  script:
    - echo "Aggregating test reports..."
  artifacts:
    paths:
      - target/extent-reports/
  rules:
    - when: always

pages:
  stage: deploy
  dependencies:
    - generate-report
  script:
    - mkdir -p public
    - cp -r target/extent-reports/* public/
  artifacts:
    paths:
      - public
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'

notify-slack:
  stage: deploy
  image: curlimages/curl:latest
  script:
    - |
      curl -X POST $SLACK_WEBHOOK_URL \
        -H 'Content-Type: application/json' \
        -d "{
          \"text\": \"Pipeline $CI_PIPELINE_ID completed with status: $CI_JOB_STATUS\",
          \"attachments\": [{
            \"color\": \"$([[ $CI_JOB_STATUS == 'success' ]] && echo 'good' || echo 'danger')\",
            \"fields\": [
              {\"title\": \"Project\", \"value\": \"$CI_PROJECT_NAME\", \"short\": true},
              {\"title\": \"Branch\", \"value\": \"$CI_COMMIT_BRANCH\", \"short\": true}
            ]
          }]
        }"
  rules:
    - when: always
```

---

## Common Mistakes to Avoid

### 1. Not Using Headless Browser Mode in CI/CD Pipelines

**Problem:**
```java
// Running with visible browser in CI environment
ChromeOptions options = new ChromeOptions();
// No headless configuration
WebDriver driver = new ChromeDriver(options);
```

**Why It's Wrong:**
- CI/CD servers typically don't have GUI/display capabilities
- Causes "cannot open display" errors in Linux environments
- Wastes resources rendering browser UI unnecessarily
- May cause tests to fail inconsistently in containerized environments

**Correct Approach:**
```java
public class CIFriendlyDriverFactory {

    public static WebDriver createDriver() {
        ChromeOptions options = new ChromeOptions();

        // Detect CI environment and configure accordingly
        if (isRunningInCI()) {
            // Headless mode for CI
            options.addArguments("--headless=new");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            options.addArguments("--disable-gpu");
            options.addArguments("--window-size=1920,1080");

            // Additional stability arguments for CI
            options.addArguments("--disable-extensions");
            options.addArguments("--disable-infobars");
            options.addArguments("--disable-browser-side-navigation");
        }

        return new ChromeDriver(options);
    }

    private static boolean isRunningInCI() {
        // Check common CI environment variables
        return System.getenv("CI") != null ||
               System.getenv("JENKINS_HOME") != null ||
               System.getenv("GITHUB_ACTIONS") != null ||
               System.getenv("GITLAB_CI") != null;
    }
}
```

---

### 2. Hardcoding Environment-Specific Configuration in Code

**Problem:**
```java
public class TestConfig {
    // Hardcoded values that work only in local environment
    private static final String BASE_URL = "http://localhost:8080";
    private static final String DB_URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String CHROME_DRIVER_PATH = "/Users/myuser/drivers/chromedriver";

    public static String getBaseUrl() {
        return BASE_URL;
    }
}
```

**Why It's Wrong:**
- Tests fail when running in CI/CD with different environments (staging, production URLs)
- Different team members and CI servers have different local paths
- Cannot run same tests across multiple environments without code changes
- Violates the principle of environment-agnostic test design

**Correct Approach:**
```java
public class EnvironmentConfig {

    private Properties properties;

    public EnvironmentConfig() {
        properties = new Properties();
        loadConfiguration();
    }

    private void loadConfiguration() {
        String environment = System.getProperty("env", "local");
        String configFile = "config-" + environment + ".properties";

        try (InputStream input = getClass().getClassLoader()
                .getResourceAsStream(configFile)) {
            if (input == null) {
                throw new RuntimeException("Unable to find " + configFile);
            }
            properties.load(input);

            // Override with environment variables if present (CI priority)
            overrideWithEnvVars();

        } catch (IOException e) {
            throw new RuntimeException("Error loading configuration", e);
        }
    }

    private void overrideWithEnvVars() {
        // Allow environment variables to override properties
        String baseUrl = System.getenv("BASE_URL");
        if (baseUrl != null) {
            properties.setProperty("base.url", baseUrl);
        }

        String dbUrl = System.getenv("DB_URL");
        if (dbUrl != null) {
            properties.setProperty("db.url", dbUrl);
        }
    }

    public String getBaseUrl() {
        return properties.getProperty("base.url");
    }

    public String getDbUrl() {
        return properties.getProperty("db.url");
    }
}

// Usage in Jenkinsfile:
// mvn test -Denv=staging -DBASE_URL=${STAGING_URL}
```

---

### 3. Not Implementing Proper Timeout and Retry Mechanisms for CI Flakiness

**Problem:**
```java
@Test
public void testLogin() {
    driver.get("https://example.com/login");
    // Direct interaction without waiting - flaky in CI
    driver.findElement(By.id("username")).sendKeys("testuser");
    driver.findElement(By.id("password")).sendKeys("password");
    driver.findElement(By.id("loginButton")).click();

    // No retry logic for transient failures
    Assert.assertTrue(driver.getCurrentUrl().contains("dashboard"));
}
```

**Why It's Wrong:**
- CI environments may have network latency or resource constraints
- No handling of temporary failures (network glitches, service restarts)
- Tests marked as failed even when they would pass on retry
- Creates noise in CI reports with false negatives

**Correct Approach:**
```java
public class CIOptimizedTest {

    private WebDriverWait wait;
    private static final int DEFAULT_TIMEOUT = 20; // Higher timeout for CI
    private static final int POLL_INTERVAL = 500;

    @BeforeMethod
    public void setup() {
        WebDriver driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
        wait.pollingEvery(Duration.ofMillis(POLL_INTERVAL));

        // Ignore specific exceptions during polling
        wait.ignoring(StaleElementReferenceException.class)
            .ignoring(NoSuchElementException.class);
    }

    @Test(retryAnalyzer = RetryAnalyzer.class)
    public void testLogin() {
        driver.get("https://example.com/login");

        // Explicit waits for all interactions
        WebElement username = wait.until(ExpectedConditions.presenceOfElementLocated(
            By.id("username")));
        username.sendKeys("testuser");

        WebElement password = wait.until(ExpectedConditions.presenceOfElementLocated(
            By.id("password")));
        password.sendKeys("password");

        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(
            By.id("loginButton")));
        loginButton.click();

        // Wait for navigation with retry
        wait.until(ExpectedConditions.urlContains("dashboard"));
    }
}

// Retry Analyzer for CI flakiness
public class RetryAnalyzer implements IRetryAnalyzer {

    private int retryCount = 0;
    private static final int MAX_RETRY_COUNT = 2;

    @Override
    public boolean retry(ITestResult result) {
        // Only retry in CI environment, not locally
        if (!isCI()) {
            return false;
        }

        if (retryCount < MAX_RETRY_COUNT) {
            retryCount++;
            System.out.println("Retrying test: " + result.getName() +
                             " for the " + retryCount + " time");
            return true;
        }
        return false;
    }

    private boolean isCI() {
        return System.getenv("CI") != null;
    }
}
```

---

### 4. Ignoring Pipeline Failure Notifications and Monitoring

**Problem:**
```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'mvn clean test'
            }
        }
    }
    // No post-build actions - team unaware of failures
}
```

**Why It's Wrong:**
- Team doesn't get immediate notification when tests fail
- Failures go unnoticed until someone manually checks
- No trend analysis or historical data collection
- Cannot track flaky tests or regression patterns

**Correct Approach:**
```groovy
pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '30'))
    }

    stages {
        stage('Test') {
            steps {
                sh 'mvn clean test'
            }
        }
    }

    post {
        always {
            // Publish test results
            junit '**/target/surefire-reports/*.xml'

            // Publish HTML report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'target/surefire-reports',
                reportFiles: 'index.html',
                reportName: 'Test Report'
            ])

            // Archive screenshots for failed tests
            archiveArtifacts artifacts: '**/screenshots/**/*.png',
                            allowEmptyArchive: true
        }

        success {
            // Notify on success (optional, or only after fixing)
            slackSend(
                color: 'good',
                message: "✅ Build #${env.BUILD_NUMBER} succeeded\\nBranch: ${env.BRANCH_NAME}"
            )
        }

        failure {
            // Critical: Always notify on failure
            emailext(
                subject: "🚨 Test Failure: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    Build failed!

                    Job: ${env.JOB_NAME}
                    Build Number: ${env.BUILD_NUMBER}
                    Build URL: ${env.BUILD_URL}

                    Check console output for details.
                """,
                to: '${DEFAULT_RECIPIENTS}',
                attachLog: true
            )

            slackSend(
                color: 'danger',
                message: "❌ Build #${env.BUILD_NUMBER} FAILED\\n" +
                        "Job: ${env.JOB_NAME}\\n" +
                        "URL: ${env.BUILD_URL}console"
            )
        }

        unstable {
            // Notify on unstable (some tests failed)
            slackSend(
                color: 'warning',
                message: "⚠️ Build #${env.BUILD_NUMBER} is UNSTABLE\\n" +
                        "Some tests failed. Check report."
            )
        }
    }
}
```

---

### 5. Not Parallelizing Tests in CI Pipeline

**Problem:**
```groovy
pipeline {
    stages {
        stage('Test') {
            steps {
                // Sequential execution - wastes time
                sh 'mvn test -Dsurefire.suiteXmlFiles=smoke-tests.xml'
                sh 'mvn test -Dsurefire.suiteXmlFiles=regression-tests.xml'
                sh 'mvn test -Dsurefire.suiteXmlFiles=api-tests.xml'
            }
        }
    }
}
```

**Why It's Wrong:**
- Tests run sequentially, significantly increasing build time
- CI resources (CPU cores) are underutilized
- Slow feedback loop delays development
- Doesn't scale as test suite grows

**Correct Approach:**
```groovy
pipeline {
    agent any

    stages {
        stage('Parallel Test Execution') {
            parallel {
                stage('Smoke Tests') {
                    agent {
                        label 'test-node'
                    }
                    steps {
                        sh 'mvn test -Dsurefire.suiteXmlFiles=smoke-tests.xml'
                    }
                    post {
                        always {
                            junit '**/target/surefire-reports/smoke-*.xml'
                        }
                    }
                }

                stage('Regression Tests') {
                    agent {
                        label 'test-node'
                    }
                    steps {
                        sh 'mvn test -Dsurefire.suiteXmlFiles=regression-tests.xml'
                    }
                    post {
                        always {
                            junit '**/target/surefire-reports/regression-*.xml'
                        }
                    }
                }

                stage('API Tests') {
                    agent {
                        label 'test-node'
                    }
                    steps {
                        sh 'mvn test -Dsurefire.suiteXmlFiles=api-tests.xml'
                    }
                    post {
                        always {
                            junit '**/target/surefire-reports/api-*.xml'
                        }
                    }
                }
            }
        }
    }
}

// TestNG configuration for parallel execution
```

**TestNG Suite with Parallel Configuration:**
```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="CI Parallel Suite" parallel="tests" thread-count="5">
    <test name="Chrome Tests" parallel="methods" thread-count="3">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="tests.LoginTests"/>
            <class name="tests.SearchTests"/>
        </classes>
    </test>

    <test name="Firefox Tests" parallel="methods" thread-count="2">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="tests.LoginTests"/>
            <class name="tests.SearchTests"/>
        </classes>
    </test>
</suite>
```

---

### 6. Not Managing WebDriver Binaries Properly in CI

**Problem:**
```java
public class TestBase {
    @BeforeMethod
    public void setup() {
        // Expecting chromedriver to be manually installed
        System.setProperty("webdriver.chrome.driver",
                          "/usr/local/bin/chromedriver");
        driver = new ChromeDriver();
    }
}
```

**Why It's Wrong:**
- Requires manual installation of drivers on CI servers
- Driver version may not match browser version
- Breaks when browser auto-updates
- Different paths on different CI agents

**Correct Approach:**
```java
// Use WebDriverManager for automatic driver management
import io.github.bonigarcia.wdm.WebDriverManager;

public class CIDriverFactory {

    public static WebDriver createDriver(String browserType) {
        WebDriver driver;

        switch (browserType.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = getChromeOptions();
                driver = new ChromeDriver(chromeOptions);
                break;

            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions firefoxOptions = getFirefoxOptions();
                driver = new FirefoxDriver(firefoxOptions);
                break;

            default:
                throw new IllegalArgumentException("Unsupported browser: " + browserType);
        }

        return driver;
    }

    private static ChromeOptions getChromeOptions() {
        ChromeOptions options = new ChromeOptions();

        if (isCI()) {
            options.addArguments("--headless=new");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            options.addArguments("--disable-gpu");

            // Use specific Chrome version in CI for consistency
            String chromeVersion = System.getProperty("chrome.version");
            if (chromeVersion != null) {
                WebDriverManager.chromedriver().browserVersion(chromeVersion).setup();
            }
        }

        return options;
    }

    private static boolean isCI() {
        return "true".equals(System.getenv("CI"));
    }
}
```

**Maven POM Configuration:**
```xml
<dependencies>
    <!-- WebDriverManager for automatic driver management -->
    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.6.3</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.0.0-M9</version>
            <configuration>
                <systemPropertyVariables>
                    <!-- Pass browser version from CI environment -->
                    <chrome.version>${env.CHROME_VERSION}</chrome.version>
                    <webdriver.chrome.driver></webdriver.chrome.driver>
                </systemPropertyVariables>
            </configuration>
        </plugin>
    </plugins>
</build>
```

**Jenkinsfile with Driver Management:**
```groovy
pipeline {
    agent {
        docker {
            image 'selenium/standalone-chrome:latest'
        }
    }

    environment {
        CHROME_VERSION = '120.0.6099.109'
        CI = 'true'
    }

    stages {
        stage('Test') {
            steps {
                sh 'mvn clean test -Dchrome.version=${CHROME_VERSION}'
            }
        }
    }
}
```

---

## Beginner-Friendly Exercises

### Exercise 1: Create Your First Jenkins Pipeline (40 minutes)

**Objective**: Learn to set up Jenkins and create a basic declarative pipeline that runs Selenium tests automatically.

**Scenario**: Your team wants to automate test execution. You need to create a Jenkins pipeline that builds the project, runs smoke tests, and publishes results whenever code is pushed to the repository.

**Requirements**:
1. Set up Jenkins using Docker
2. Install required Jenkins plugins (Pipeline, Git, TestNG Results, HTML Publisher)
3. Create a new Pipeline job
4. Write a Jenkinsfile with the following stages:
   - Checkout code from Git
   - Build project with Maven
   - Run smoke tests (chrome browser)
   - Publish TestNG results
   - Archive test artifacts (screenshots, reports)
5. Configure email notifications on failure
6. Trigger the pipeline and verify results

**Code Template**:
```groovy
// Jenkinsfile
pipeline {
    agent any

    tools {
        maven 'Maven-3.8.6'  // TODO: Configure this in Jenkins Global Tool Configuration
        jdk 'JDK-11'         // TODO: Configure this in Jenkins Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                // TODO: Add checkout scm command
                echo 'Checking out code...'
            }
        }

        stage('Build') {
            steps {
                // TODO: Add Maven clean compile command
                echo 'Building project...'
            }
        }

        stage('Run Smoke Tests') {
            steps {
                echo 'Running smoke tests...'
                // TODO: Add Maven test command with:
                // -Dbrowser=chrome
                // -Dsurefire.suiteXmlFiles=smoke-tests.xml
            }
        }

        stage('Publish Reports') {
            steps {
                // TODO: Add publishHTML for extent reports
                // reportDir: 'target/extent-reports'
                // reportFiles: 'extent-report.html'
                // reportName: 'Test Report'
                echo 'Publishing reports...'
            }
        }
    }

    post {
        always {
            // TODO: Publish TestNG results
            // Pattern: '**/testng-results.xml'

            // TODO: Archive artifacts
            // artifacts: '**/screenshots/*, **/extent-reports/*'
        }

        failure {
            // TODO: Send email notification
            // subject: "Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
            // body: "Check console output at ${env.BUILD_URL}"
            // to: 'team@example.com'
        }
    }
}
```

**Expected Outcome**:
- Jenkins pipeline executes successfully
- All 4 stages complete (Checkout, Build, Run Smoke Tests, Publish Reports)
- TestNG results are visible in Jenkins
- ExtentReports HTML is accessible from Jenkins
- Screenshots are archived and downloadable
- Email notification sent on failure

**Common Mistakes to Avoid**:
1. **Forgetting to configure Maven/JDK in Jenkins Global Tool Configuration**: Always set up tools before referencing them in pipeline
2. **Not using absolute paths for reports**: Use `${WORKSPACE}/target/extent-reports` or relative paths from workspace root
3. **Missing 'always' condition for publishing results**: Test results should be published even if tests fail
4. **Hardcoding credentials**: Use Jenkins credentials plugin and credentials() function
5. **Not cleaning workspace**: Add `cleanWs()` in post block to prevent disk space issues

**Solution Approach**:
- Start by running Jenkins in Docker: `docker run -p 8080:8080 jenkins/jenkins:lts`
- Access Jenkins at http://localhost:8080 and complete initial setup
- Install suggested plugins + Pipeline, TestNG, HTML Publisher plugins
- Create a new Pipeline job and paste your Jenkinsfile
- For each TODO: Add the appropriate command (sh 'mvn ...', publishHTML(...), etc.)
- Test each stage individually by commenting out other stages
- Once working, enable email notifications using Email Extension plugin

---

### Exercise 2: GitHub Actions with Matrix Strategy (45 minutes)

**Objective**: Implement cross-browser testing using GitHub Actions matrix strategy to run tests in parallel on multiple browsers and operating systems.

**Scenario**: Your application must work on Chrome, Firefox, and Edge browsers across Windows, Linux, and macOS. Create a GitHub Actions workflow that tests all combinations automatically on every push.

**Requirements**:
1. Create `.github/workflows/cross-browser-tests.yml`
2. Configure matrix for 3 browsers (chrome, firefox, edge)
3. Configure matrix for 3 operating systems (ubuntu-latest, windows-latest, macos-latest)
4. Exclude invalid combinations (e.g., Edge on Linux)
5. Set up browser drivers automatically
6. Run tests in parallel
7. Upload test reports as artifacts for each combination
8. Display test results in GitHub Actions UI

**Code Template**:
```yaml
name: Cross-Browser Testing

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:  # Allow manual trigger

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false  # Continue other jobs even if one fails
      matrix:
        # TODO: Define matrix axes
        os: # Add: ubuntu-latest, windows-latest, macos-latest
        browser: # Add: chrome, firefox, edge
        exclude:
          # TODO: Exclude edge on macos-latest (not supported)
          # TODO: Exclude firefox on windows-latest (optional)

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up JDK 11
      uses: actions/setup-java@v3
      with:
        # TODO: Add java-version: '11'
        # TODO: Add distribution: 'temurin'
        # TODO: Add cache: 'maven'

    - name: Setup ${{ matrix.browser }} browser
      # TODO: Add browser setup action
      # For chrome: uses: browser-actions/setup-chrome@latest
      # For firefox: uses: browser-actions/setup-firefox@latest
      # For edge: uses: browser-actions/setup-edge@latest

    - name: Run tests on ${{ matrix.browser }}
      run: |
        # TODO: Add Maven test command with browser parameter
        # mvn clean test -Dbrowser=${{ matrix.browser }}

    - name: Upload test reports
      if: always()  # Upload even if tests fail
      uses: actions/upload-artifact@v3
      with:
        # TODO: Add dynamic artifact name
        # name: test-reports-${{ matrix.os }}-${{ matrix.browser }}
        # TODO: Add paths to upload
        # path: |
        #   target/surefire-reports/
        #   target/extent-reports/
        #   target/screenshots/

    - name: Upload screenshots on failure
      if: failure()
      # TODO: Upload screenshots from target/screenshots/
      # name: failure-screenshots-${{ matrix.os }}-${{ matrix.browser }}
```

**Expected Outcome**:
- Workflow creates multiple jobs (one for each valid matrix combination)
- Tests run in parallel on different OS/browser combinations
- Each job shows separate results in GitHub Actions UI
- Artifacts are uploaded with unique names for each combination
- Failed test screenshots are available for debugging
- Workflow completes even if some combinations fail (fail-fast: false)

**Common Mistakes to Avoid**:
1. **Not setting `fail-fast: false`**: One failure will cancel all other jobs, losing valuable cross-browser test data
2. **Missing conditional uploads**: Always use `if: always()` for test reports, `if: failure()` for failure screenshots
3. **Same artifact names for different matrix combinations**: Results in overwrites; use `${{ matrix.os }}-${{ matrix.browser }}` in artifact names
4. **Forgetting to cache Maven dependencies**: Add `cache: 'maven'` in setup-java step to speed up builds
5. **Not excluding invalid combinations**: Edge is not available on macOS, this will cause job failures

**Solution Approach**:
- Create the workflow file in your repo under `.github/workflows/cross-browser-tests.yml`
- Start with a simple matrix (just 2 browsers, 1 OS) and verify it works
- Gradually expand the matrix to more combinations
- Test the exclude feature by trying to exclude one combination
- Verify artifacts are uploaded with correct names by checking the Actions tab
- Add more browsers/OS as needed based on your requirements

---

### Exercise 3: Parameterized Pipeline with Environment Management (50 minutes)

**Objective**: Create a flexible CI/CD pipeline that accepts runtime parameters to control test execution across different environments and test suites.

**Scenario**: Your QA team needs to run different test suites (smoke, regression, full) on different environments (dev, staging, production) using different browsers. Create a parameterized Jenkins pipeline that provides this flexibility.

**Requirements**:
1. Add parameters for Browser, Environment, and Test Suite
2. Load environment-specific configuration from properties files
3. Pass parameters to Maven test execution
4. Display selected parameters in build name
5. Send customized email notifications with parameter details
6. Implement conditional logic based on parameters (e.g., only allow prod tests manually)

**Code Template**:
```groovy
pipeline {
    agent any

    tools {
        maven 'Maven-3.8.6'
        jdk 'JDK-11'
    }

    parameters {
        // TODO: Add choice parameter 'BROWSER'
        // choices: ['chrome', 'firefox', 'edge', 'safari']
        // description: 'Select browser for test execution'

        // TODO: Add choice parameter 'ENVIRONMENT'
        // choices: ['dev', 'staging', 'production']
        // description: 'Select target environment'

        // TODO: Add choice parameter 'TEST_SUITE'
        // choices: ['smoke', 'regression', 'full']
        // description: 'Select test suite to run'

        // TODO: Add boolean parameter 'SEND_EMAIL'
        // defaultValue: true
        // description: 'Send email notification after execution'
    }

    environment {
        // TODO: Load config file based on ENVIRONMENT parameter
        // CONFIG_FILE = "config/${params.ENVIRONMENT}.properties"
    }

    stages {
        stage('Validate Parameters') {
            steps {
                script {
                    echo "Selected Parameters:"
                    echo "Browser: ${params.BROWSER}"
                    echo "Environment: ${params.ENVIRONMENT}"
                    echo "Test Suite: ${params.TEST_SUITE}"

                    // TODO: Add validation - if ENVIRONMENT is 'production'
                    // and TEST_SUITE is 'full', require manual approval
                    // Use input() function for approval
                }
            }
        }

        stage('Load Configuration') {
            steps {
                script {
                    echo "Loading configuration for ${params.ENVIRONMENT}"
                    // TODO: Check if config file exists
                    // def configExists = fileExists("${CONFIG_FILE}")
                    // if (!configExists) { error("Config file not found") }
                }
            }
        }

        stage('Build') {
            steps {
                // TODO: Add Maven compile command
            }
        }

        stage('Execute Tests') {
            steps {
                script {
                    echo "Running ${params.TEST_SUITE} tests on ${params.BROWSER} in ${params.ENVIRONMENT}"

                    // TODO: Build Maven command with parameters
                    // sh """
                    //     mvn test \
                    //     -Dbrowser=${params.BROWSER} \
                    //     -Denvironment=${params.ENVIRONMENT} \
                    //     -Dconfig.file=${CONFIG_FILE} \
                    //     -Dsurefire.suiteXmlFiles=${params.TEST_SUITE}-tests.xml
                    // """
                }
            }
        }

        stage('Publish Results') {
            steps {
                // TODO: Publish TestNG results
                // TODO: Publish HTML report
                // Set report name to include parameters for clarity
            }
        }
    }

    post {
        always {
            script {
                // TODO: Update build display name with parameters
                // currentBuild.displayName = "#${env.BUILD_NUMBER} - ${params.BROWSER} - ${params.ENVIRONMENT} - ${params.TEST_SUITE}"

                // TODO: Archive artifacts with categorized folder structure
                // archiveArtifacts artifacts: """
                //     target/${params.ENVIRONMENT}/${params.TEST_SUITE}/**
                // """, allowEmptyArchive: true
            }
        }

        success {
            script {
                if (params.SEND_EMAIL) {
                    // TODO: Send success email with parameters and results link
                    // emailext(
                    //     subject: "✅ Tests Passed - ${params.TEST_SUITE} on ${params.ENVIRONMENT}",
                    //     body: """Test execution completed successfully.
                    //              Browser: ${params.BROWSER}
                    //              Environment: ${params.ENVIRONMENT}
                    //              Suite: ${params.TEST_SUITE}
                    //              Build URL: ${env.BUILD_URL}""",
                    //     to: 'qa-team@example.com'
                    // )
                }
            }
        }

        failure {
            script {
                if (params.SEND_EMAIL) {
                    // TODO: Send failure email with detailed information
                }
            }
        }
    }
}
```

**Config Files to Create**:
```properties
# config/dev.properties
base.url=https://dev.example.com
api.url=https://api-dev.example.com
timeout=10

# config/staging.properties
base.url=https://staging.example.com
api.url=https://api-staging.example.com
timeout=15

# config/production.properties
base.url=https://example.com
api.url=https://api.example.com
timeout=20
```

**Expected Outcome**:
- Jenkins job shows parameter selection UI before execution
- Build name displays selected parameters (e.g., "#15 - chrome - staging - regression")
- Correct configuration file is loaded based on environment
- Tests execute with appropriate parameters
- Production + full suite combination requires manual approval
- Email notifications include parameter details
- Artifacts are organized by environment and suite

**Common Mistakes to Avoid**:
1. **Not validating parameter combinations**: Some combinations may not make sense (e.g., full suite in production)
2. **Hardcoding values instead of using parameters**: Always reference params.PARAMETER_NAME
3. **Missing config files**: Add file existence check before loading configuration
4. **Not updating build display name**: Makes it hard to identify builds in Jenkins history
5. **Forgetting to make parameters available in post blocks**: Parameters are accessible throughout the pipeline

**Solution Approach**:
- Create config directory with environment-specific property files first
- Add parameters one at a time and test each addition
- Use echo statements to verify parameter values are passed correctly
- Test with different parameter combinations to ensure flexibility
- Implement approval logic for sensitive combinations (production tests)
- Add comprehensive email templates that show all execution details

---

### Exercise 4: Scheduled CI/CD with Multiple Test Tiers (45 minutes)

**Objective**: Implement a comprehensive test scheduling strategy that runs different test suites at appropriate intervals (hourly smoke tests, nightly regression, weekly full suite).

**Scenario**: Your team needs continuous test coverage without overwhelming the CI/CD system. Implement a scheduling strategy where quick smoke tests run frequently, comprehensive regression tests run nightly, and full test suite runs weekly.

**Requirements**:
1. Create 3 separate GitHub Actions workflows:
   - Hourly smoke tests (critical paths only)
   - Nightly regression tests (full functionality)
   - Weekly full test suite (all tests + performance tests)
2. Configure appropriate cron schedules
3. Send different notifications based on schedule type
4. Store test history and track trends
5. Implement failure escalation (notify different teams based on severity)

**Code Template - Hourly Smoke Tests**:
```yaml
# .github/workflows/hourly-smoke-tests.yml
name: Hourly Smoke Tests

on:
  schedule:
    # TODO: Add cron schedule for every hour
    # Format: 'minute hour day month day-of-week'
    # Example: '0 * * * *' runs every hour at minute 0
    - cron: # Add your cron expression
  workflow_dispatch:  # Allow manual trigger

env:
  TEST_SUITE: smoke
  NOTIFICATION_CHANNEL: '#smoke-test-alerts'

jobs:
  smoke-tests:
    runs-on: ubuntu-latest
    timeout-minutes: 15  # Smoke tests should be fast

    steps:
    - uses: actions/checkout@v3

    - name: Set up JDK
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'
        cache: 'maven'

    - name: Setup Chrome
      uses: browser-actions/setup-chrome@latest

    - name: Run smoke tests
      run: |
        # TODO: Run only critical smoke tests
        # mvn test -Dsuite=smoke -Dbrowser=chrome -Dgroups=critical

    - name: Upload quick results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        # TODO: Add artifact name with timestamp
        # name: smoke-results-${{ github.run_number }}
        # path: target/surefire-reports/

    - name: Notify on failure
      if: failure()
      # TODO: Send Slack notification to smoke-test-alerts channel
      # Only notify on smoke test failures (critical issues)
```

**Code Template - Nightly Regression Tests**:
```yaml
# .github/workflows/nightly-regression.yml
name: Nightly Regression Tests

on:
  schedule:
    # TODO: Add cron for every day at 2 AM UTC
    # - cron: '0 2 * * *'
  workflow_dispatch:

env:
  TEST_SUITE: regression
  NOTIFICATION_CHANNEL: '#nightly-test-results'

jobs:
  regression-tests:
    runs-on: ${{ matrix.os }}
    timeout-minutes: 120  # Regression can take up to 2 hours

    strategy:
      fail-fast: false
      matrix:
        # TODO: Add matrix for cross-browser testing
        # os: [ubuntu-latest, windows-latest]
        # browser: [chrome, firefox, edge]

    steps:
    - uses: actions/checkout@v3

    - name: Set up JDK
      # TODO: Add Java setup with caching

    - name: Setup ${{ matrix.browser }}
      # TODO: Add browser setup for matrix.browser

    - name: Run regression tests
      run: |
        # TODO: Run full regression suite
        # mvn test -Dsuite=regression -Dbrowser=${{ matrix.browser }}

    - name: Generate test report
      if: always()
      # TODO: Generate comprehensive HTML report

    - name: Upload detailed results
      if: always()
      # TODO: Upload reports with browser and OS in artifact name

    - name: Publish test results
      if: always()
      uses: dorny/test-reporter@v1
      with:
        # TODO: Configure test reporter to show results in GitHub

  send-summary:
    needs: regression-tests
    if: always()
    runs-on: ubuntu-latest

    steps:
    - name: Send nightly summary
      # TODO: Aggregate results from all matrix jobs
      # TODO: Send comprehensive email with:
      # - Total tests run
      # - Pass/Fail rate
      # - Comparison with previous night
      # - Link to detailed reports
```

**Code Template - Weekly Full Suite**:
```yaml
# .github/workflows/weekly-full-suite.yml
name: Weekly Full Test Suite

on:
  schedule:
    # TODO: Add cron for every Sunday at 1 AM UTC
    # - cron: '0 1 * * 0'
  workflow_dispatch:

jobs:
  full-suite:
    runs-on: ubuntu-latest
    timeout-minutes: 240  # 4 hours for complete testing

    steps:
    - uses: actions/checkout@v3

    - name: Set up JDK
      # TODO: Add Java setup

    - name: Run full test suite
      run: |
        # TODO: Run all tests including:
        # - Functional tests
        # - Integration tests
        # - Performance tests
        # - Security tests
        # mvn verify -Psuite=full -Dinclude.performance=true

    - name: Generate comprehensive report
      if: always()
      # TODO: Generate detailed multi-page report with:
      # - Test results
      # - Code coverage
      # - Performance metrics
      # - Trend analysis

    - name: Archive weekly results
      if: always()
      # TODO: Upload artifacts with week number in name
      # name: weekly-results-week-${{ github.run_number }}

    - name: Publish to GitHub Pages
      if: always()
      uses: peaceiris/actions-gh-pages@v3
      with:
        # TODO: Publish report to GitHub Pages
        # destination_dir: reports/week-${{ github.run_number }}

    - name: Send executive summary
      if: always()
      # TODO: Send detailed email to leadership with:
      # - Week-over-week comparison
      # - Quality trends
      # - Areas of concern
      # - Link to published report
```

**Expected Outcome**:
- Smoke tests run every hour automatically
- Regression tests run every night at 2 AM
- Full suite runs every Sunday
- Each schedule type sends appropriate notifications
- Test results are archived with clear naming
- Trend data is available for analysis
- Different stakeholders receive relevant notifications

**Common Mistakes to Avoid**:
1. **Incorrect cron syntax**: Use https://crontab.guru to validate cron expressions; remember GitHub uses UTC time
2. **No timeout limits**: Always set timeout-minutes to prevent jobs from running indefinitely
3. **Missing fail-fast: false in nightly tests**: You want all browser combinations to complete, not fail on first error
4. **Not considering CI/CD load**: Running too many concurrent jobs can overwhelm runners; stagger schedules
5. **Same notification for all schedule types**: Smoke failures are critical (immediate attention), weekly is informational

**Solution Approach**:
- Start by creating the hourly smoke test workflow and verify the cron schedule works
- Add workflow_dispatch to all workflows for manual testing before schedules activate
- Test each workflow manually first using workflow_dispatch
- Gradually enable schedules starting with less frequent ones (weekly, then nightly, then hourly)
- Monitor resource usage and adjust schedules/timeouts as needed
- Set up different Slack channels or email lists for different schedule types
- Use GitHub Actions insights to track runner usage and optimize

---

### Exercise 5: Advanced CI/CD with Comprehensive Reporting (50 minutes)

**Objective**: Implement a complete CI/CD pipeline with multiple reporting tools (TestNG, ExtentReports, Allure) and automated report publishing to GitHub Pages with historical trending.

**Scenario**: Stakeholders need access to detailed test reports with historical trends. Implement a pipeline that generates multiple report formats, publishes them to GitHub Pages, and maintains test execution history.

**Requirements**:
1. Generate three types of reports: TestNG XML, ExtentReports HTML, Allure Reports
2. Publish all reports to GitHub Pages with unique URLs
3. Maintain report history (last 30 executions)
4. Create a landing page with links to all report types
5. Add test execution trends and charts
6. Send email/Slack notifications with report links
7. Implement report retention policy (delete old reports)

**Code Template**:
```yaml
# .github/workflows/comprehensive-reporting.yml
name: Tests with Comprehensive Reporting

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'
  workflow_dispatch:

jobs:
  test-and-report:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up JDK
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'
        cache: 'maven'

    - name: Run tests with all reporters
      run: |
        # TODO: Run tests with TestNG, ExtentReports, and Allure listeners
        # mvn clean test -Dlisteners=org.testng.reporters.XMLReporter,
        #   com.aventstack.extentreports.testng.listener.ExtentITestListenerAdapter,
        #   io.qameta.allure.testng.AllureTestNg

    - name: Generate ExtentReports
      if: always()
      run: |
        # TODO: ExtentReports should be auto-generated during test execution
        echo "ExtentReports generated at target/extent-reports/extent-report.html"

    - name: Generate Allure Report
      if: always()
      uses: simple-elf/allure-report-action@master
      with:
        # TODO: Configure Allure report generation
        # allure_results: target/allure-results
        # allure_history: allure-history
        # keep_reports: 30  # Keep last 30 reports

    - name: Create report index page
      if: always()
      run: |
        # TODO: Create an index.html that links to all report types
        # cat > target/reports/index.html << 'EOF'
        # <!DOCTYPE html>
        # <html>
        # <head><title>Test Reports</title></head>
        # <body>
        #   <h1>Test Execution Reports - Build #${{ github.run_number }}</h1>
        #   <h2>Report Types:</h2>
        #   <ul>
        #     <li><a href="extent-report.html">ExtentReports</a></li>
        #     <li><a href="allure-report/index.html">Allure Report</a></li>
        #     <li><a href="testng-report.html">TestNG Report</a></li>
        #   </ul>
        #   <p>Generated: $(date)</p>
        # </body>
        # </html>
        # EOF

    - name: Copy all reports to publish directory
      if: always()
      run: |
        # TODO: Organize all reports in a single directory
        # mkdir -p reports-to-publish
        # cp -r target/extent-reports/* reports-to-publish/
        # cp -r allure-history/* reports-to-publish/allure-report/
        # cp target/surefire-reports/index.html reports-to-publish/testng-report.html
        # cp target/reports/index.html reports-to-publish/

    - name: Upload reports as artifacts
      if: always()
      uses: actions/upload-artifact@v3
      with:
        # TODO: Upload all reports with build number in name
        # name: test-reports-build-${{ github.run_number }}
        # path: reports-to-publish/
        # retention-days: 30

    - name: Load previous report history
      if: always()
      uses: actions/checkout@v3
      continue-on-error: true
      with:
        # TODO: Checkout gh-pages branch to get historical data
        # ref: gh-pages
        # path: gh-pages-history

    - name: Update report history
      if: always()
      run: |
        # TODO: Update history.json with current execution results
        # - Read existing history.json
        # - Add current execution data
        # - Keep only last 30 executions
        # - Calculate trends (pass rate, execution time)
        echo "Updating report history..."

    - name: Generate trend charts
      if: always()
      run: |
        # TODO: Create charts showing:
        # - Pass/Fail trend over last 30 executions
        # - Execution time trend
        # - Flaky tests identification
        # Use Chart.js or similar library

    - name: Publish to GitHub Pages
      if: always()
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./reports-to-publish
        # TODO: Add destination directory with build number
        # destination_dir: reports/build-${{ github.run_number }}
        # keep_files: true  # Keep previous reports

    - name: Update GitHub Pages index
      if: always()
      run: |
        # TODO: Update main index.html on gh-pages with links to all builds
        # Show last 30 builds with:
        # - Build number
        # - Date/time
        # - Pass/Fail status
        # - Link to reports

    - name: Send notification with report links
      if: always()
      uses: dawidd6/action-send-mail@v3
      with:
        # TODO: Configure email with multiple report links
        # server_address: smtp.gmail.com
        # server_port: 465
        # username: ${{ secrets.EMAIL_USERNAME }}
        # password: ${{ secrets.EMAIL_PASSWORD }}
        # subject: Test Report - Build #${{ github.run_number }} - ${{ job.status }}
        # to: qa-team@example.com
        # body: |
        #   Test execution completed.
        #   Status: ${{ job.status }}
        #
        #   View Reports:
        #   - ExtentReports: https://your-username.github.io/your-repo/reports/build-${{ github.run_number }}/extent-report.html
        #   - Allure Report: https://your-username.github.io/your-repo/reports/build-${{ github.run_number }}/allure-report/
        #   - All Reports: https://your-username.github.io/your-repo/reports/build-${{ github.run_number }}/
        #
        # html: true

    - name: Comment on PR with report links
      if: github.event_name == 'pull_request'
      uses: actions/github-script@v6
      with:
        script: |
          // TODO: Create PR comment with:
          // - Test summary (X passed, Y failed)
          // - Links to all report types
          // - Comparison with base branch (if available)
          // const reportUrl = `https://${context.repo.owner}.github.io/${context.repo.repo}/reports/build-${context.runNumber}/`;
          // const body = `## Test Results\n\n[View Reports](${reportUrl})`;
          // github.rest.issues.createComment({...})

  cleanup-old-reports:
    needs: test-and-report
    if: always()
    runs-on: ubuntu-latest

    steps:
    - name: Cleanup old reports from GitHub Pages
      # TODO: Implement retention policy
      # - Checkout gh-pages branch
      # - List all report directories
      # - Delete reports older than 30 builds
      # - Commit and push changes
```

**Additional Files to Create**:

```javascript
// scripts/generate-trends.js
// TODO: Create script to generate trend charts
const fs = require('fs');

// Read history.json
// Calculate metrics:
// - Pass rate trend
// - Average execution time
// - Flaky test detection
// Generate Chart.js HTML

// Save to trends.html
```

```html
<!-- templates/report-index-template.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Test Reports - Build {{BUILD_NUMBER}}</title>
    <style>
        /* TODO: Add styling for professional-looking report index */
    </style>
</head>
<body>
    <h1>Test Execution Dashboard</h1>
    <!-- TODO: Add links to all report types -->
    <!-- TODO: Add test summary -->
    <!-- TODO: Add trend charts -->
</body>
</html>
```

**Expected Outcome**:
- Three different report formats are generated (TestNG, ExtentReports, Allure)
- All reports are published to GitHub Pages with unique URLs
- Landing page provides easy navigation between report types
- Historical data shows trends over last 30 executions
- Email notifications include links to all reports
- PR comments show test results with report links
- Old reports are automatically cleaned up (retention policy)
- Trend charts show pass rate and execution time over time

**Common Mistakes to Avoid**:
1. **Not using `keep_files: true` in GitHub Pages action**: Previous reports will be deleted
2. **Missing `if: always()` on report generation steps**: Reports won't be generated if tests fail
3. **Not handling concurrent builds**: Multiple builds can overwrite reports; use build numbers in paths
4. **Exposing sensitive data in reports**: Screenshots may contain credentials; sanitize before publishing
5. **Not implementing retention policy**: GitHub Pages has storage limits; clean up old reports

**Solution Approach**:
- Start with one report type (ExtentReports) and get it publishing to GitHub Pages
- Add additional report types one at a time
- Create the landing page after all report types are working
- Implement history tracking in a separate iteration
- Add trend charts once history data is accumulating
- Test the retention policy with a low threshold (e.g., keep 3 reports) before setting to 30
- Ensure GitHub Pages is enabled in repository settings
- Use a test repository first before implementing in production repository

---

## Key Takeaways

1. **CI/CD Fundamentals**: Understanding CI/CD concepts is essential for modern test automation
2. **Jenkins**: Most flexible and customizable, ideal for complex enterprise workflows
3. **GitHub Actions**: Best for projects on GitHub, easy to set up and maintain
4. **GitLab CI**: Excellent Docker integration, complete DevOps platform
5. **Azure DevOps**: Strong Microsoft ecosystem integration, enterprise-ready
6. **Pipeline as Code**: Store pipeline configuration in version control for traceability
7. **Parallel Execution**: Run tests in parallel to reduce execution time
8. **Matrix Builds**: Test across multiple browsers, OS, and configurations efficiently
9. **Artifacts**: Save test reports, screenshots, and logs for debugging
10. **Environment Management**: Use secrets and environment variables for different environments
11. **Notifications**: Keep teams informed with email, Slack, or Teams notifications
12. **Fail Fast**: Structure pipelines to fail quickly on critical issues
13. **Caching**: Use caching to speed up builds and reduce resource usage
14. **Docker Integration**: Containerize tests for consistency and portability
15. **Selenium Grid**: Use Grid in CI/CD for scalable cross-browser testing
16. **Retry Logic**: Implement retries for flaky tests but investigate root causes
17. **Security**: Never hardcode credentials, use secrets management
18. **Monitoring**: Track test execution trends and metrics over time
19. **Best Practices**: Follow CI/CD best practices for maintainable pipelines
20. **Continuous Improvement**: Regularly review and optimize pipeline performance

---

## Interview Questions

### Basic Level

1. **Q: What is the difference between Continuous Integration and Continuous Deployment?**
   - A: Continuous Integration (CI) is the practice of automatically building and testing code on every commit. Continuous Deployment (CD) extends CI by automatically deploying every change that passes all tests to production. Continuous Delivery is similar but requires manual approval before production deployment.

2. **Q: Why is CI/CD important for test automation?**
   - A: CI/CD provides: 1) Immediate feedback on code quality, 2) Early bug detection, 3) Automated test execution, 4) Consistent test environments, 5) Reduced manual effort, 6) Faster release cycles, 7) Better collaboration.

3. **Q: What is a pipeline in CI/CD?**
   - A: A pipeline is a series of automated steps (stages) that code goes through from commit to deployment. Typical stages include: checkout, build, test, security scan, and deploy.

### Intermediate Level

4. **Q: How do you handle environment-specific configurations in CI/CD?**
   - A: Use: 1) Environment variables, 2) Secrets management (Jenkins credentials, GitHub secrets), 3) Environment-specific property files, 4) CI/CD environment features, 5) Configuration management tools.

5. **Q: Explain how to implement parallel test execution in Jenkins.**
   - A: Use parallel blocks in Jenkinsfile:
   ```groovy
   stage('Parallel Tests') {
       parallel {
           stage('Chrome') { steps { sh 'mvn test -Dbrowser=chrome' } }
           stage('Firefox') { steps { sh 'mvn test -Dbrowser=firefox' } }
       }
   }
   ```

6. **Q: What are GitHub Actions matrix strategies?**
   - A: Matrix strategies allow running jobs with multiple configurations in parallel:
   ```yaml
   strategy:
     matrix:
       browser: [chrome, firefox, edge]
       os: [ubuntu, windows, macos]
   ```
   This creates 9 jobs (3 browsers × 3 OS).

7. **Q: How do you debug CI/CD pipeline failures?**
   - A: 1) Review console logs, 2) Check artifact outputs, 3) Examine screenshots, 4) Verify environment variables, 5) Run tests locally with same parameters, 6) Enable debug mode, 7) Use SSH debugging if available.

### Advanced Level

8. **Q: Design a CI/CD strategy for a large test automation framework with 1000+ tests.**
   - A: 1) Implement test categorization (smoke, regression, integration), 2) Use parallel execution with test sharding, 3) Run smoke tests on every commit (5-10 mins), 4) Run regression tests on schedule (nightly), 5) Use Selenium Grid for scalability, 6) Implement smart test selection based on code changes, 7) Set up multiple environments (dev, staging, prod), 8) Use caching for dependencies, 9) Implement test result trending, 10) Set up comprehensive notifications.

9. **Q: How would you optimize a CI/CD pipeline that takes 2 hours to complete?**
   - A: 1) Implement parallel execution, 2) Use test sharding/splitting, 3) Enable caching (Maven dependencies, Docker layers), 4) Optimize test code (remove unnecessary waits), 5) Use smart test selection, 6) Run critical tests first (fail fast), 7) Use more powerful agents/runners, 8) Containerize for consistency and speed, 9) Remove redundant stages, 10) Profile and identify bottlenecks.

10. **Q: Explain the concept of "Pipeline as Code" and its benefits.**
    - A: Pipeline as Code means storing CI/CD pipeline configuration in version control (Jenkinsfile, .gitlab-ci.yml). Benefits: 1) Version control for pipelines, 2) Code review for pipeline changes, 3) Consistency across environments, 4) Easy rollback, 5) Reusability, 6) Documentation, 7) Collaboration.

11. **Q: How do you handle flaky tests in CI/CD pipelines?**
    - A: 1) Implement retry logic (TestNG RetryAnalyzer), 2) Increase timeouts appropriately, 3) Use explicit waits instead of implicit, 4) Isolate test data, 5) Track and fix flaky tests (don't just retry), 6) Use stable test environments, 7) Implement proper synchronization, 8) Monitor flaky test patterns.

12. **Q: What is the role of Docker in CI/CD test automation?**
    - A: Docker provides: 1) Consistent test environments, 2) Easy Selenium Grid setup, 3) Isolated test execution, 4) Reproducible builds, 5) Faster agent/runner setup, 6) Version-controlled environments, 7) Scalability.

13. **Q: How do you implement security in CI/CD pipelines?**
    - A: 1) Use secrets management (never hardcode credentials), 2) Implement access controls, 3) Use protected branches, 4) Scan for vulnerabilities, 5) Audit pipeline changes, 6) Use signed commits, 7) Implement approval gates for production, 8) Mask sensitive data in logs.

14. **Q: Explain Selenium Grid integration in CI/CD with example.**
    - A: Set up Grid as service in pipeline:
    ```yaml
    services:
      selenium-hub:
        image: selenium/hub:latest
      chrome:
        image: selenium/node-chrome:latest
    ```
    Configure tests to use Grid:
    ```java
    RemoteWebDriver driver = new RemoteWebDriver(
        new URL("http://selenium-hub:4444"),
        new ChromeOptions()
    );
    ```
    Benefits: Parallel execution, cross-browser testing, scalability.

15. **Q: How would you implement a multi-stage deployment pipeline with automated testing at each stage?**
    - A:
    ```yaml
    stages:
      - Build
      - Unit Test
      - Deploy to Dev
      - Integration Test (Dev)
      - Deploy to Staging
      - Regression Test (Staging)
      - Performance Test (Staging)
      - Manual Approval
      - Deploy to Production
      - Smoke Test (Production)
      - Monitor
    ```
    Each stage has specific tests: Unit tests (fast, code-level), Integration tests (API/DB), Regression tests (full functionality), Smoke tests (critical paths), Performance tests (load/stress). Failed tests block progression to next stage.

---

## Navigation

- [Previous: Day 43 - Cross-Browser Testing](day43_cross_browser_testing.md)
- [Next: Day 45 - Capstone Project](day45_capstone_project.md)
- [Week 7 Overview](README.md)
- [Course Home](../../README.md)
