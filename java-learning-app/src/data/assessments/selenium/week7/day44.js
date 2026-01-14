export default {
  title: "Day 44: CI/CD Integration - Assessment",
  passingScore: 70,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45
    }
  },
  sections: [
    {
      title: "Section A: Multiple Choice Questions",
      description: "Choose the best answer for each question (3 points each)",
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What does CI/CD stand for in software development?',
          options: [
            'Continuous Integration/Continuous Delivery',
            'Code Integration/Code Deployment',
            'Continuous Installation/Continuous Development',
            'Central Integration/Central Delivery'
          ],
          correctAnswer: 0,
          explanation: 'CI/CD stands for Continuous Integration/Continuous Delivery (or Deployment). CI automates code integration and testing, while CD automates the delivery/deployment of applications to production environments.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which file is used to define pipeline configuration in Jenkins using Pipeline as Code?',
          options: [
            'jenkins.config',
            'Jenkinsfile',
            'pipeline.yml',
            'build.xml'
          ],
          correctAnswer: 1,
          explanation: 'Jenkinsfile is the standard file used to define Jenkins pipeline configuration as code. It can be written in Declarative or Scripted pipeline syntax and is typically stored in the project repository.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In GitHub Actions, what is the correct file extension and location for workflow files?',
          options: [
            '.github/workflows/*.yml or *.yaml',
            '.github/actions/*.json',
            '.workflows/*.yml',
            'github/workflows/*.xml'
          ],
          correctAnswer: 0,
          explanation: 'GitHub Actions workflow files must be placed in the .github/workflows/ directory with .yml or .yaml extension. GitHub automatically detects and executes these workflows based on defined triggers.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the primary benefit of integrating automated tests in a CI/CD pipeline?',
          options: [
            'Reduces the need for manual testing',
            'Provides immediate feedback on code quality and catches bugs early',
            'Eliminates all bugs from production',
            'Replaces the need for version control'
          ],
          correctAnswer: 1,
          explanation: 'The primary benefit is providing immediate feedback on code quality and catching bugs early in the development cycle. This enables faster bug fixes, reduces integration issues, and improves overall code quality before deployment.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Jenkins plugin is essential for publishing TestNG test results?',
          options: [
            'JUnit Plugin',
            'TestNG Results Plugin',
            'Maven Plugin',
            'Build Pipeline Plugin'
          ],
          correctAnswer: 1,
          explanation: 'The TestNG Results Plugin is specifically designed to publish and display TestNG test results in Jenkins. It provides detailed reports including test methods, groups, and failure information.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In a Jenkins Declarative Pipeline, which section defines the stages of the pipeline?',
          options: [
            'steps { }',
            'stages { }',
            'pipeline { }',
            'jobs { }'
          ],
          correctAnswer: 1,
          explanation: 'The stages { } section contains all the stages of a Declarative Pipeline. Each stage represents a phase of the pipeline (e.g., Build, Test, Deploy) and contains steps to execute.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the purpose of the "on" keyword in GitHub Actions workflow files?',
          options: [
            'To enable or disable the workflow',
            'To specify when the workflow should be triggered',
            'To define environment variables',
            'To set workflow permissions'
          ],
          correctAnswer: 1,
          explanation: 'The "on" keyword specifies the events that trigger the workflow execution, such as push, pull_request, schedule, workflow_dispatch, etc. It controls when and under what conditions the workflow runs.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Maven command is typically used in CI/CD pipelines to run Selenium tests?',
          options: [
            'mvn compile',
            'mvn test',
            'mvn install',
            'mvn deploy'
          ],
          correctAnswer: 1,
          explanation: 'The "mvn test" command compiles the test source code and runs unit and integration tests, including Selenium tests. It is the standard command for executing tests in Maven-based projects within CI/CD pipelines.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the purpose of artifacts in CI/CD pipelines?',
          options: [
            'To delete old build files',
            'To store and preserve build outputs like test reports and screenshots for later access',
            'To compile source code',
            'To manage environment variables'
          ],
          correctAnswer: 1,
          explanation: 'Artifacts are files produced during pipeline execution (like test reports, screenshots, logs, compiled binaries) that are stored and preserved. They can be downloaded, analyzed, or used in subsequent stages or jobs.',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In GitLab CI/CD, what is the name of the configuration file?',
          options: [
            'gitlab-ci.yml',
            '.gitlab-ci.yml',
            'pipeline.yml',
            'gitlab.config'
          ],
          correctAnswer: 1,
          explanation: '.gitlab-ci.yml is the configuration file for GitLab CI/CD pipelines. It must be placed in the repository root and defines jobs, stages, scripts, and other pipeline configuration.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'Which post-build action should be configured in Jenkins to archive test reports and screenshots?',
          options: [
            'Build Trigger',
            'Archive the artifacts',
            'Send Email',
            'Deploy to Server'
          ],
          correctAnswer: 1,
          explanation: 'The "Archive the artifacts" post-build action preserves specified files (test reports, screenshots, logs) after the build completes. Archived artifacts remain accessible through the Jenkins UI for analysis and debugging.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct syntax to define a parameter in a Jenkins Declarative Pipeline?',
          options: [
            'parameters { string(name: "BROWSER", defaultValue: "chrome") }',
            'param { BROWSER = "chrome" }',
            'variables { BROWSER: "chrome" }',
            'define { parameter BROWSER = "chrome" }'
          ],
          correctAnswer: 0,
          explanation: 'The parameters { } block with parameter type functions like string(), choice(), boolean() is used to define build parameters in Declarative Pipeline. Parameters can be accessed as params.PARAMETERNAME in the pipeline.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'In GitHub Actions, how do you specify that a job should run on an Ubuntu Linux environment?',
          options: [
            'os: ubuntu-latest',
            'runs-on: ubuntu-latest',
            'environment: ubuntu-latest',
            'platform: ubuntu-latest'
          ],
          correctAnswer: 1,
          explanation: 'The "runs-on" keyword specifies the runner environment for a job. Common values include ubuntu-latest, windows-latest, macos-latest, or specific versions like ubuntu-22.04.',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of the "agent" directive in a Jenkins Declarative Pipeline?',
          options: [
            'To define test agents for Selenium Grid',
            'To specify where and how the pipeline should execute',
            'To create user accounts',
            'To configure network agents'
          ],
          correctAnswer: 1,
          explanation: 'The "agent" directive specifies where the pipeline or stage should execute - on any available agent, a specific agent with certain labels, in a Docker container, etc. It controls the execution environment.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'Which Azure DevOps component is used to define CI/CD pipelines?',
          options: [
            'Azure Boards',
            'Azure Repos',
            'Azure Pipelines',
            'Azure Artifacts'
          ],
          correctAnswer: 2,
          explanation: 'Azure Pipelines is the Azure DevOps service for defining and running CI/CD pipelines. It supports YAML-based pipeline definitions and can build, test, and deploy to multiple platforms and clouds.',
          points: 3
        }
      ]
    },
    {
      title: "Section B: True/False Questions",
      description: "Indicate whether each statement is true or false (2 points each)",
      questions: [
        {
          id: 'q16',
          type: 'truefalse',
          mode: ['full'],
          question: 'Jenkins requires a Jenkinsfile to be stored in the project repository for Pipeline as Code to work.',
          correctAnswer: true,
          explanation: 'True. For Pipeline as Code (also called Pipeline from SCM), the Jenkinsfile must be stored in the project repository. This allows version control of pipeline configuration alongside application code.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'GitHub Actions workflows can only be triggered by push and pull request events.',
          correctAnswer: false,
          explanation: 'False. GitHub Actions supports numerous trigger events including push, pull_request, schedule (cron), workflow_dispatch (manual), release, issues, and many more. This provides flexible workflow automation.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'In CI/CD pipelines, it is best practice to fail the build if any test fails.',
          correctAnswer: true,
          explanation: 'True. Failing the build on test failures prevents broken code from progressing through the pipeline and potentially reaching production. This maintains code quality gates and ensures issues are addressed immediately.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'Docker containers can be used in CI/CD pipelines to provide consistent test execution environments.',
          correctAnswer: true,
          explanation: 'True. Docker containers provide isolated, consistent, and reproducible environments for test execution. They ensure tests run in the same environment across different pipeline executions and machines.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'Jenkins Declarative Pipeline and Scripted Pipeline syntax are completely interchangeable.',
          correctAnswer: false,
          explanation: 'False. While both define pipelines, they have different syntax and structure. Declarative Pipeline uses a more structured, opinionated syntax, while Scripted Pipeline uses Groovy and provides more flexibility but requires more programming knowledge.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'Parallel execution of test jobs in CI/CD pipelines can significantly reduce overall pipeline execution time.',
          correctAnswer: true,
          explanation: 'True. Running independent test suites or stages in parallel (e.g., different browser tests, unit vs integration tests) reduces total execution time, providing faster feedback to developers.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Environment variables in CI/CD pipelines should be used to store sensitive data like passwords and API keys.',
          correctAnswer: false,
          explanation: 'False. While environment variables can store configuration, sensitive data should be stored in secure credential managers or secret management systems (like Jenkins Credentials, GitHub Secrets, Azure Key Vault) with encryption and access control.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'GitLab CI/CD can automatically run pipelines when code is pushed to the repository.',
          correctAnswer: true,
          explanation: 'True. GitLab CI/CD automatically triggers pipelines on push events by default. The .gitlab-ci.yml file defines the pipeline configuration, and GitLab runners execute the defined jobs.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'Test reports should be published as artifacts in CI/CD pipelines for historical tracking and analysis.',
          correctAnswer: true,
          explanation: 'True. Publishing test reports as artifacts allows teams to review test results, track trends over time, debug failures, and maintain historical records of test execution across different builds and environments.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'CI/CD pipelines can only run tests on the same machine where Jenkins is installed.',
          correctAnswer: false,
          explanation: 'False. CI/CD systems support distributed execution using agents/nodes/runners. Tests can run on multiple remote machines, cloud instances, or containers, enabling parallel execution and scalability.',
          points: 2
        }
      ]
    },
    {
      title: "Section C: Fill in the Blanks",
      description: "Complete each statement with the correct term (4 points each)",
      questions: [
        {
          id: 'q26',
          type: 'fillblank',
          mode: ['full'],
          question: 'In Jenkins, the __________ block in a Declarative Pipeline defines cleanup actions that run regardless of pipeline success or failure.',
          correctAnswer: 'post',
          explanation: 'The "post" block defines actions to execute after stages complete. It supports conditions like always, success, failure, unstable, and cleanup, allowing for conditional cleanup, notifications, and artifact handling.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'In GitHub Actions, the __________ keyword is used to define individual tasks within a job.',
          correctAnswer: 'steps',
          explanation: 'The "steps" keyword contains a sequence of tasks to execute in a job. Each step can run commands (using "run") or use actions (using "uses") to perform specific operations.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The Maven Surefire plugin generates test reports in __________ format which can be consumed by CI/CD tools.',
          correctAnswer: 'XML',
          explanation: 'Maven Surefire plugin generates test reports in XML format (surefire-reports directory). These XML reports follow standard formats like JUnit XML that CI/CD tools can parse and display.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'In GitLab CI/CD, individual units of work are called __________ and they are organized into stages.',
          correctAnswer: 'jobs',
          explanation: 'Jobs are the fundamental building blocks in GitLab CI/CD. Each job contains scripts to execute and runs in a separate environment. Jobs in the same stage run in parallel by default.',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ command is commonly used in CI/CD pipelines to download project dependencies before running tests.',
          correctAnswer: 'mvn clean install',
          explanation: 'The "mvn clean install" command removes previous build artifacts (clean), compiles code, runs tests, and installs the package in the local repository (install), preparing the project for test execution.',
          points: 4
        }
      ]
    },
    {
      title: "Section D: Short Answer Questions",
      description: "Provide detailed answers for each question (8 points each)",
      questions: [
        {
          id: 'q31',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe the structure of a basic Jenkins Declarative Pipeline for running Selenium tests. Include the essential sections and their purposes.',
          keywords: ['pipeline', 'agent', 'stages', 'stage', 'steps', 'post', 'sh', 'mvn', 'test', 'junit', 'archiveArtifacts', 'environment', 'tools'],
          minKeywords: 3,
          sampleAnswer: 'A basic Jenkins Declarative Pipeline includes: (1) pipeline { } - the root block containing the entire pipeline definition. (2) agent - specifies where to execute (any, specific label, or docker). (3) tools - defines build tools like Maven or JDK. (4) environment - sets environment variables for the pipeline. (5) stages { } - contains all pipeline stages. (6) stage("Test") { } - individual stages like Checkout, Build, Test, Deploy. (7) steps { } - contains actual commands like sh "mvn clean test". (8) post { } - defines cleanup actions with conditions: always { archiveArtifacts "target/surefire-reports/**" }, success { }, failure { }. Example: pipeline { agent any; tools { maven "Maven3" }; stages { stage("Test") { steps { sh "mvn clean test" } } }; post { always { junit "**/surefire-reports/*.xml" } } }',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to configure a GitHub Actions workflow to run Selenium tests on multiple browsers in parallel. Include the YAML structure.',
          keywords: ['matrix', 'strategy', 'browser', 'parallel', 'runs-on', 'steps', 'checkout', 'setup-java', 'mvn', 'upload-artifact', 'fail-fast'],
          minKeywords: 3,
          sampleAnswer: 'To run tests on multiple browsers in parallel using GitHub Actions, use the strategy.matrix feature: (1) Define a matrix with browser values. (2) Use ${{ matrix.browser }} to reference values. (3) Set fail-fast: false to run all combinations even if one fails. Example YAML: name: Selenium Tests; on: [push]; jobs: test: runs-on: ubuntu-latest; strategy: matrix: browser: [chrome, firefox, edge]; fail-fast: false; steps: - uses: actions/checkout@v3; - uses: actions/setup-java@v3 with: java-version: 11; - name: Run Tests run: mvn test -Dbrowser=${{ matrix.browser }}; - uses: actions/upload-artifact@v3 with: name: test-reports-${{ matrix.browser }}; path: target/surefire-reports/. This creates separate jobs for each browser running concurrently.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What are the best practices for managing test reports and screenshots in CI/CD pipelines? Explain at least four practices.',
          keywords: ['artifacts', 'archive', 'publish', 'HTML', 'TestNG', 'JUnit', 'timestamp', 'retention', 'separate', 'directory', 'conditional', 'failure', 'ExtentReports'],
          minKeywords: 3,
          sampleAnswer: 'Best practices for managing test reports and screenshots in CI/CD: (1) Archive as Artifacts - Use pipeline artifact mechanisms (archiveArtifacts in Jenkins, upload-artifact in GitHub Actions) to preserve reports and screenshots after build completion. (2) Organized Directory Structure - Store reports in standardized directories like target/surefire-reports, test-output, screenshots/, making them easy to locate and archive. (3) Publish Test Results - Use plugins/actions to publish test results (JUnit, TestNG Results Plugin, publish-test-results action) for visual representation in pipeline UI. (4) Conditional Screenshot Capture - Take screenshots only on test failures to save space and processing time. (5) Timestamp and Build Identification - Include build number and timestamp in artifact names for version tracking. (6) Retention Policies - Configure artifact retention periods to balance storage costs with historical data needs. (7) HTML Reports - Generate HTML reports (ExtentReports, Allure) alongside XML for better visualization. (8) Separate Artifacts by Test Suite/Browser - Create separate artifact collections for different test categories for easier analysis.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe how to configure GitLab CI/CD to run Selenium tests with proper stages, caching, and artifact management. Provide configuration examples.',
          keywords: ['.gitlab-ci.yml', 'stages', 'job', 'script', 'cache', 'paths', 'artifacts', 'image', 'docker', 'maven', 'test', 'dependencies', 'reports'],
          minKeywords: 3,
          sampleAnswer: 'GitLab CI/CD configuration for Selenium tests in .gitlab-ci.yml: (1) Define stages: stages: - build - test - report. (2) Configure cache for Maven dependencies: cache: paths: - .m2/repository. (3) Create build job: build: stage: build; image: maven:3.8-jdk-11; script: - mvn clean compile; artifacts: paths: - target/; expire_in: 1 hour. (4) Create test job: test: stage: test; dependencies: - build; script: - mvn test; artifacts: when: always; paths: - target/surefire-reports/; - screenshots/; reports: junit: target/surefire-reports/TEST-*.xml; expire_in: 1 week. (5) Use Docker images for consistent environments. (6) Set artifact expiration to manage storage. (7) Use "dependencies" to fetch artifacts from previous stages. (8) Configure reports section for native GitLab test result integration. (9) Use "when: always" for artifacts to collect reports even on failure.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the concept of pipeline parameterization for test automation and how to implement it in Jenkins and GitHub Actions. Include practical examples.',
          keywords: ['parameters', 'input', 'variable', 'browser', 'environment', 'choice', 'string', 'workflow_dispatch', 'inputs', 'params', 'system property', 'dynamic'],
          minKeywords: 3,
          sampleAnswer: 'Pipeline parameterization allows dynamic configuration of test execution. In Jenkins: Use parameters block in Declarative Pipeline: parameters { choice(name: "BROWSER", choices: ["chrome", "firefox", "edge"], description: "Browser"); string(name: "TEST_SUITE", defaultValue: "smoke", description: "Suite"); choice(name: "ENV", choices: ["dev", "qa", "prod"]) }. Access via ${params.BROWSER} and pass to tests: sh "mvn test -Dbrowser=${params.BROWSER} -Dsuite=${params.TEST_SUITE} -Denv=${params.ENV}". In GitHub Actions: Use workflow_dispatch with inputs: on: workflow_dispatch: inputs: browser: type: choice; options: [chrome, firefox, edge]; default: chrome; environment: type: choice; options: [dev, qa, prod]. Access via ${{ github.event.inputs.browser }} in steps: run: mvn test -Dbrowser=${{ github.event.inputs.browser }}. Benefits: (1) Reusable pipelines for different configurations. (2) Manual trigger with custom parameters. (3) Flexibility to run specific test suites or browsers. (4) Environment-specific test execution. (5) Reduced pipeline duplication.',
          points: 8
        }
      ]
    }
  ]
};
