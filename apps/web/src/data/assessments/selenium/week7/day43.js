export default {
  title: "Day 43: Cross-Browser Testing & Selenium Grid - Assessment",
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
      id: 'section-a',
      title: 'Section A: Multiple Choice Questions',
      description: 'Choose the correct answer for each question (3 points each)',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the primary purpose of cross-browser testing?',
          options: [
            'To ensure the application works only on Chrome',
            'To verify that the application works consistently across different browsers',
            'To test browser download speeds',
            'To check browser security settings'
          ],
          correctAnswer: 1,
          explanation: 'Cross-browser testing ensures that a web application works consistently and correctly across different browsers (Chrome, Firefox, Safari, Edge) and their versions, providing a consistent user experience regardless of the browser used.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Selenium component is used to run tests on remote machines in different environments?',
          options: [
            'WebDriver',
            'RemoteWebDriver',
            'ChromeDriver',
            'LocalDriver'
          ],
          correctAnswer: 1,
          explanation: 'RemoteWebDriver is used to run tests on remote machines. It communicates with a remote Selenium server (Grid Hub) to execute tests on different machines, browsers, and platforms.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What are the two main components of Selenium Grid 4?',
          options: [
            'Master and Slave',
            'Hub and Node',
            'Server and Client',
            'Router and Session Map'
          ],
          correctAnswer: 3,
          explanation: 'Selenium Grid 4 architecture consists of Router, Distributor, Session Map, New Session Queue, and Node. However, it can still run in Hub-Node mode for backward compatibility. The modern Grid 4 uses Router and Session Map as key components among others.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which class is used to specify browser capabilities when using RemoteWebDriver?',
          options: [
            'BrowserOptions',
            'DesiredCapabilities',
            'ChromeOptions or FirefoxOptions',
            'BrowserSettings'
          ],
          correctAnswer: 2,
          explanation: 'Browser-specific options classes like ChromeOptions, FirefoxOptions, EdgeOptions, or SafariOptions are used to specify capabilities. DesiredCapabilities is deprecated in Selenium 4 in favor of these type-safe options classes.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the default port on which Selenium Grid Hub runs?',
          options: [
            '8080',
            '4444',
            '5555',
            '3000'
          ],
          correctAnswer: 1,
          explanation: 'Selenium Grid Hub runs on port 4444 by default. This is the port where RemoteWebDriver connects to send test execution requests. The Hub UI can be accessed at http://localhost:4444.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which command starts Selenium Grid in standalone mode?',
          options: [
            'java -jar selenium-server.jar standalone',
            'java -jar selenium-server.jar hub',
            'java -jar selenium-server.jar start',
            'java -jar selenium-server.jar run'
          ],
          correctAnswer: 0,
          explanation: 'The command "java -jar selenium-server.jar standalone" starts Selenium Grid in standalone mode, which combines Hub and Node functionality in a single process. This is useful for local testing and simpler setups.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the advantage of using Docker containers for Selenium Grid?',
          options: [
            'Tests run faster',
            'Easier setup, consistency, and scalability across environments',
            'No need for browser drivers',
            'Automatic test generation'
          ],
          correctAnswer: 1,
          explanation: 'Docker containers provide easier setup, consistency across different environments, isolation, scalability, and simplified configuration management. Pre-built Docker images contain all necessary dependencies including browsers and drivers.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which cloud-based platform is NOT commonly used for cross-browser testing?',
          options: [
            'BrowserStack',
            'Sauce Labs',
            'LambdaTest',
            'GitHub Actions'
          ],
          correctAnswer: 3,
          explanation: 'GitHub Actions is a CI/CD platform, not a cross-browser testing cloud service. BrowserStack, Sauce Labs, and LambdaTest are dedicated cloud platforms providing real browsers and devices for testing.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the purpose of setting browserName capability in RemoteWebDriver?',
          options: [
            'To download the browser',
            'To specify which browser the test should run on',
            'To set the browser download location',
            'To configure browser security'
          ],
          correctAnswer: 1,
          explanation: 'The browserName capability specifies which browser (chrome, firefox, safari, edge) the test should execute on when using RemoteWebDriver. The Grid uses this to route the test to an appropriate node.',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'How does Selenium Grid 4 differ from Grid 3?',
          options: [
            'Grid 4 only supports Chrome',
            'Grid 4 has improved architecture with separate components and supports Docker',
            'Grid 4 is slower than Grid 3',
            'Grid 4 does not support RemoteWebDriver'
          ],
          correctAnswer: 1,
          explanation: 'Selenium Grid 4 features a redesigned architecture with separate components (Router, Distributor, Session Map, etc.), native Docker support, improved observability, GraphQL support, and better resource management compared to Grid 3.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the role of the Node in Selenium Grid?',
          options: [
            'To manage test execution requests',
            'To register available browsers and execute tests on the local machine',
            'To store test results',
            'To compile test code'
          ],
          correctAnswer: 1,
          explanation: 'A Node registers itself with the Hub/Router, advertising available browsers and capabilities. When tests are assigned, the Node executes them on its local browsers and returns results to the Hub.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'Which parameter in RemoteWebDriver constructor specifies the Grid Hub URL?',
          options: [
            'First parameter - URL',
            'Second parameter - Capabilities',
            'Third parameter - Options',
            'It is automatically detected'
          ],
          correctAnswer: 0,
          explanation: 'The RemoteWebDriver constructor takes the Grid Hub URL as the first parameter: new RemoteWebDriver(new URL("http://localhost:4444"), options). This tells RemoteWebDriver where to send test execution requests.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of the --max-sessions parameter when starting a Grid Node?',
          options: [
            'Maximum browser windows',
            'Maximum number of concurrent test sessions the node can handle',
            'Maximum test duration',
            'Maximum number of retries'
          ],
          correctAnswer: 1,
          explanation: 'The --max-sessions parameter limits the number of concurrent test sessions a node can handle simultaneously. This prevents resource overload and ensures stable test execution based on machine capacity.',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which Docker Compose configuration allows scaling Grid nodes?',
          options: [
            'replicas or --scale parameter',
            'max-nodes parameter',
            'scale-up parameter',
            'node-count parameter'
          ],
          correctAnswer: 0,
          explanation: 'Docker Compose supports scaling services using the "replicas" option in the compose file or the "--scale" parameter in the command line: docker-compose up --scale chrome=5. This creates multiple instances of the specified node.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What information can be viewed on the Grid Console UI?',
          options: [
            'Only browser versions',
            'Node status, available browsers, active sessions, and queue',
            'Test code',
            'User passwords'
          ],
          correctAnswer: 1,
          explanation: 'The Grid Console UI (typically at http://localhost:4444) displays comprehensive information including registered nodes, available browsers and their versions, active test sessions, queued requests, and overall grid health.',
          points: 3
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Section B: True/False Questions',
      description: 'Indicate whether each statement is true or false (2 points each)',
      questions: [
        {
          id: 'q16',
          type: 'truefalse',
          mode: ['full'],
          question: 'RemoteWebDriver can only execute tests on the local machine.',
          correctAnswer: false,
          explanation: 'False. RemoteWebDriver is specifically designed to execute tests on remote machines. It sends commands to a Selenium server running on another machine or in the cloud, enabling distributed test execution.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'Selenium Grid allows parallel test execution across multiple browsers and platforms.',
          correctAnswer: true,
          explanation: 'True. Selenium Grid enables parallel test execution by distributing tests across multiple nodes running different browsers, browser versions, and operating systems, significantly reducing overall test execution time.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'Docker images for Selenium Grid come pre-configured with browsers and drivers.',
          correctAnswer: true,
          explanation: 'True. Official Selenium Docker images (selenium/standalone-chrome, selenium/node-firefox, etc.) come pre-configured with browsers and their corresponding WebDriver executables, eliminating manual setup.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'The Hub in Selenium Grid executes the actual test scripts on browsers.',
          correctAnswer: false,
          explanation: 'False. The Hub (or Router in Grid 4) acts as a central point that receives requests and routes them to appropriate Nodes. The Nodes are responsible for executing tests on actual browsers.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'Cross-browser testing only needs to be performed on the latest browser versions.',
          correctAnswer: false,
          explanation: 'False. Cross-browser testing should include multiple browser versions, especially those used by your target audience. Legacy browser support may be necessary depending on user demographics and business requirements.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'BrowserStack and Sauce Labs eliminate the need to maintain local Selenium Grid infrastructure.',
          correctAnswer: true,
          explanation: 'True. Cloud-based platforms like BrowserStack and Sauce Labs provide ready-to-use browsers, devices, and infrastructure as a service, eliminating the need to set up and maintain local Grid infrastructure.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Multiple nodes can register to the same Selenium Grid Hub.',
          correctAnswer: true,
          explanation: 'True. Multiple nodes, potentially on different machines with different browsers and platforms, can register to a single Hub. This creates a distributed testing environment for parallel execution.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Selenium Grid 4 requires separate hub and node setup and cannot run in standalone mode.',
          correctAnswer: false,
          explanation: 'False. Selenium Grid 4 supports standalone mode where Hub and Node functionality is combined in a single process. It can also run with separate components or in the traditional Hub-Node mode.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'ChromeOptions and FirefoxOptions classes allow setting browser-specific preferences and arguments.',
          correctAnswer: true,
          explanation: 'True. Browser-specific options classes (ChromeOptions, FirefoxOptions, EdgeOptions) provide methods to set preferences, arguments, extensions, and other browser-specific configurations for cross-browser testing.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'Docker Compose files can define multi-container Selenium Grid setups with hub and multiple node types.',
          correctAnswer: true,
          explanation: 'True. Docker Compose YAML files can define complete Grid setups including hub, chrome nodes, firefox nodes, edge nodes, and configure their networking, scaling, and dependencies in a single declarative configuration.',
          points: 2
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Section C: Fill in the Blank Questions',
      description: 'Complete each statement with the correct answer (4 points each)',
      questions: [
        {
          id: 'q26',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ class is used to execute tests on a remote Selenium Grid instead of locally.',
          correctAnswer: 'RemoteWebDriver',
          explanation: 'RemoteWebDriver is the WebDriver implementation used to connect to and execute tests on remote Selenium Grid instances. It extends WebDriver and communicates with Grid via HTTP.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'In Selenium Grid 4 architecture, the __________ component receives and routes test requests to appropriate nodes.',
          correctAnswer: 'Router',
          explanation: 'The Router is the entry point in Grid 4 architecture. It receives incoming test requests and routes them to appropriate components (Distributor, Session Map) based on the request type.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The command to start a Selenium Grid Hub is: java -jar selenium-server.jar __________.',
          correctAnswer: 'hub',
          explanation: 'The command "java -jar selenium-server.jar hub" starts the Grid in Hub mode. Nodes can then register to this Hub for distributed test execution.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'Docker containers provide __________, making it easier to maintain consistent test environments across different machines.',
          correctAnswer: 'isolation',
          explanation: 'Docker containers provide isolation, ensuring that each container has its own environment with specific browser versions, dependencies, and configurations, independent of the host machine or other containers.',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ capability is used to specify the browser name (chrome, firefox, edge) when creating RemoteWebDriver.',
          correctAnswer: 'browserName',
          explanation: 'The browserName capability specifies which browser should be used for test execution. It is set in the browser options and sent to Grid to match with available nodes.',
          points: 4
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Section D: Short Answer Questions',
      description: 'Provide detailed answers to the following questions (8 points each)',
      questions: [
        {
          id: 'q31',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the architecture of Selenium Grid 4 and describe the role of at least four key components (Router, Distributor, Session Map, Node).',
          keywords: ['Router', 'Distributor', 'Session Map', 'Node', 'New Session Queue', 'entry point', 'capabilities', 'session', 'execution', 'route', 'manage', 'assign'],
          minKeywords: 4,
          sampleAnswer: 'Selenium Grid 4 has a distributed architecture with the following key components: (1) Router - acts as the entry point for all requests (new session, existing session commands), routing them to appropriate components. (2) Distributor - receives new session requests from Router, matches requested capabilities with available Nodes, and assigns sessions. It maintains the New Session Queue for pending requests. (3) Session Map - stores the mapping between session IDs and the Nodes executing them, allowing Router to forward commands to the correct Node. (4) Node - registers available browsers and capabilities with Distributor, executes actual test commands on browsers, and reports status. (5) New Session Queue - holds pending session requests when all nodes are busy. (6) Event Bus - enables communication between components. This architecture provides better scalability, observability, and resource management compared to Grid 3.',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe how to set up a basic Selenium Grid with one Hub and two Nodes (Chrome and Firefox). Include the commands to start each component.',
          keywords: ['java -jar', 'selenium-server.jar', 'hub', 'node', 'port 4444', 'register', 'http://localhost:4444', 'chrome', 'firefox', 'detect-drivers', 'capabilities'],
          minKeywords: 3,
          sampleAnswer: 'To set up a basic Selenium Grid: Step 1 - Start the Hub: java -jar selenium-server.jar hub (runs on default port 4444). Step 2 - Start Chrome Node: java -jar selenium-server.jar node --detect-drivers true --hub http://localhost:4444 (registers Chrome browser with Hub). Step 3 - Start Firefox Node: On the same or different machine, run java -jar selenium-server.jar node --detect-drivers true --hub http://localhost:4444 --port 5555 (registers Firefox with Hub on a different port to avoid conflicts). The --detect-drivers flag automatically detects installed browsers and drivers. Nodes register their capabilities with the Hub. Verify setup by accessing http://localhost:4444/ui to see registered nodes and available browsers. Tests using RemoteWebDriver can now connect to http://localhost:4444 and run on either Chrome or Firefox based on specified capabilities.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to configure RemoteWebDriver to run tests on different browsers. Provide code examples for at least two browsers (Chrome and Firefox).',
          keywords: ['RemoteWebDriver', 'ChromeOptions', 'FirefoxOptions', 'new URL', 'http://localhost:4444', 'setBrowserName', 'capabilities', 'options', 'constructor'],
          minKeywords: 3,
          sampleAnswer: 'To configure RemoteWebDriver for different browsers, create browser-specific options and pass them to RemoteWebDriver constructor with Grid URL. Chrome example: ChromeOptions chromeOptions = new ChromeOptions(); chromeOptions.addArguments("--start-maximized"); WebDriver driver = new RemoteWebDriver(new URL("http://localhost:4444"), chromeOptions);. Firefox example: FirefoxOptions firefoxOptions = new FirefoxOptions(); firefoxOptions.addArguments("-private"); WebDriver driver = new RemoteWebDriver(new URL("http://localhost:4444"), firefoxOptions);. Edge example: EdgeOptions edgeOptions = new EdgeOptions(); edgeOptions.addArguments("--inprivate"); WebDriver driver = new RemoteWebDriver(new URL("http://localhost:4444"), edgeOptions);. For cross-browser testing, parameterize the browser type in TestNG using @Parameters or DataProvider, creating the appropriate options object based on the parameter. Grid matches the capabilities in options with available Nodes and routes the test accordingly.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe the process of setting up Selenium Grid using Docker and Docker Compose. What are the advantages of this approach?',
          keywords: ['Docker', 'Docker Compose', 'docker-compose.yml', 'selenium/hub', 'selenium/node-chrome', 'selenium/node-firefox', 'services', 'ports', 'depends_on', 'environment', 'consistent', 'isolated', 'scalable', 'easy setup'],
          minKeywords: 3,
          sampleAnswer: 'Setting up Selenium Grid with Docker Compose: Create a docker-compose.yml file defining services: (1) Hub service using selenium/hub image with port 4444 exposed. (2) Chrome node service using selenium/node-chrome image with SE_EVENT_BUS_HOST, SE_EVENT_BUS_PUBLISH_PORT, and SE_EVENT_BUS_SUBSCRIBE_PORT environment variables pointing to the hub. (3) Firefox node service using selenium/node-firefox with similar configuration. Add "depends_on: [hub]" to node services. Start with: docker-compose up --scale chrome=3 --scale firefox=2 to create multiple node instances. Advantages: (1) Consistent environment - pre-configured images with browsers and drivers, (2) Easy setup - single command to start entire Grid, (3) Isolation - each container is isolated, (4) Scalability - easily scale nodes up/down, (5) Version control - declarative configuration in docker-compose.yml, (6) Cross-platform - works consistently across different operating systems, (7) Resource efficiency - containers are lightweight, (8) Easy cleanup - docker-compose down removes everything.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Compare local Selenium Grid setup versus cloud-based solutions (BrowserStack, Sauce Labs). Discuss at least three advantages and two disadvantages of each approach.',
          keywords: ['local Grid', 'cloud', 'BrowserStack', 'Sauce Labs', 'infrastructure', 'maintenance', 'cost', 'scalability', 'control', 'setup', 'browser versions', 'devices', 'parallel', 'network'],
          minKeywords: 3,
          sampleAnswer: 'Local Selenium Grid - Advantages: (1) Full control over infrastructure and configurations, (2) No data leaves the organization (better for sensitive data), (3) No recurring cloud costs, (4) Better for internal applications not accessible from internet. Disadvantages: (1) Requires infrastructure investment and maintenance, (2) Limited browser and device variety, (3) Scaling requires adding physical resources, (4) Setup and maintenance overhead. Cloud Solutions (BrowserStack/Sauce Labs) - Advantages: (1) Instant access to hundreds of browsers, versions, and real devices, (2) No infrastructure setup or maintenance needed, (3) Easy scalability - handle high parallel execution, (4) Regular updates with latest browsers, (5) Additional features like video recording, network logs. Disadvantages: (1) Recurring subscription costs, (2) Data sent to third-party servers (security concerns), (3) Requires internet connectivity, (4) Applications must be accessible from cloud. Choice depends on project needs: Local Grid for internal apps with security requirements; Cloud for extensive browser/device coverage and zero maintenance.',
          points: 8
        }
      ]
    }
  ]
};
