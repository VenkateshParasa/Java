export default {
  title: "Day 48: Performance & Security Testing Basics - Assessment",
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
          question: 'Which type of performance testing determines the maximum number of concurrent users a system can handle?',
          options: [
            'Load Testing',
            'Stress Testing',
            'Spike Testing',
            'Endurance Testing'
          ],
          correctAnswer: 1,
          explanation: 'Stress Testing is performed to determine the breaking point of an application by increasing load beyond normal operational capacity. It identifies the maximum number of concurrent users and the behavior when limits are exceeded.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the primary metric measured to assess application responsiveness in performance testing?',
          options: [
            'Throughput',
            'Response Time',
            'Error Rate',
            'CPU Utilization'
          ],
          correctAnswer: 1,
          explanation: 'Response Time is the primary metric for assessing application responsiveness. It measures the time taken from when a request is sent until the response is completely received, directly impacting user experience.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Apache JMeter component is used to send requests to a server?',
          options: [
            'Thread Group',
            'Sampler',
            'Listener',
            'Timer'
          ],
          correctAnswer: 1,
          explanation: 'Samplers in JMeter are used to send requests to servers. Common samplers include HTTP Request, JDBC Request, FTP Request, etc. Each sampler type handles specific protocols and request types.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is considered an acceptable page load time for optimal user experience?',
          options: [
            'Under 1 second',
            'Under 3 seconds',
            'Under 5 seconds',
            'Under 10 seconds'
          ],
          correctAnswer: 1,
          explanation: 'Under 3 seconds is the generally accepted threshold for optimal user experience. Google and various user experience studies show that users expect pages to load within 2-3 seconds, with abandonment rates increasing significantly beyond this.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which security testing type focuses on identifying vulnerabilities without exploiting them?',
          options: [
            'Penetration Testing',
            'Vulnerability Assessment',
            'Security Auditing',
            'Ethical Hacking'
          ],
          correctAnswer: 1,
          explanation: 'Vulnerability Assessment is a systematic process of identifying, quantifying, and prioritizing vulnerabilities in a system without actively exploiting them. It provides a comprehensive list of security weaknesses for remediation.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which vulnerability is ranked #1 in the OWASP Top 10 2021?',
          options: [
            'SQL Injection',
            'Cross-Site Scripting (XSS)',
            'Broken Access Control',
            'Security Misconfiguration'
          ],
          correctAnswer: 2,
          explanation: 'Broken Access Control is ranked #1 in OWASP Top 10 2021. It occurs when users can act outside their intended permissions, potentially accessing unauthorized functionality or data.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the primary defense against Cross-Site Scripting (XSS) attacks?',
          options: [
            'Using HTTPS',
            'Input validation and output encoding',
            'Strong passwords',
            'Regular backups'
          ],
          correctAnswer: 1,
          explanation: 'Input validation and output encoding are the primary defenses against XSS. Input validation ensures malicious scripts are rejected, while output encoding ensures that any data displayed is treated as data, not executable code.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which SQL injection prevention technique uses placeholders for user input?',
          options: [
            'Input filtering',
            'Stored procedures',
            'Parameterized queries',
            'Escaping characters'
          ],
          correctAnswer: 2,
          explanation: 'Parameterized queries (prepared statements) use placeholders for user input, ensuring that input is always treated as data rather than executable SQL code. This is the most effective defense against SQL injection.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the difference between Authentication and Authorization in security testing?',
          options: [
            'Authentication verifies identity, Authorization verifies permissions',
            'Authorization verifies identity, Authentication verifies permissions',
            'They are the same concept',
            'Authentication is for users, Authorization is for admins'
          ],
          correctAnswer: 0,
          explanation: 'Authentication verifies "who you are" (identity verification through credentials), while Authorization determines "what you can do" (permission verification for accessing resources or performing actions).',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which HTTP security header prevents clickjacking attacks?',
          options: [
            'Content-Security-Policy',
            'X-Frame-Options',
            'Strict-Transport-Security',
            'X-Content-Type-Options'
          ],
          correctAnswer: 1,
          explanation: 'X-Frame-Options header prevents clickjacking attacks by controlling whether a page can be displayed in a frame, iframe, or object. It can be set to DENY, SAMEORIGIN, or ALLOW-FROM to control framing behavior.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What does throughput measure in performance testing?',
          options: [
            'The time taken to process a single request',
            'The number of requests processed per unit of time',
            'The maximum number of concurrent users',
            'The amount of memory consumed'
          ],
          correctAnswer: 1,
          explanation: 'Throughput measures the number of requests or transactions processed per unit of time (e.g., requests per second, transactions per minute). It indicates the capacity and efficiency of the system under load.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'In JMeter, which component is used to add delays between requests to simulate realistic user behavior?',
          options: [
            'Sampler',
            'Timer',
            'Assertion',
            'Pre-Processor'
          ],
          correctAnswer: 1,
          explanation: 'Timers in JMeter add delays between requests to simulate realistic user think time. Common timers include Constant Timer, Gaussian Random Timer, and Uniform Random Timer.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Which performance testing metric indicates the percentage of failed requests?',
          options: [
            'Response Time',
            'Throughput',
            'Error Rate',
            'Latency'
          ],
          correctAnswer: 2,
          explanation: 'Error Rate (or Error Percentage) indicates the percentage of requests that failed during testing. It is calculated as (Failed Requests / Total Requests) × 100 and is crucial for assessing system reliability under load.',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of the Content-Security-Policy (CSP) header?',
          options: [
            'To enforce HTTPS connections',
            'To prevent MIME-type sniffing',
            'To control which resources can be loaded and executed',
            'To prevent session hijacking'
          ],
          correctAnswer: 2,
          explanation: 'Content-Security-Policy (CSP) header controls which resources (scripts, styles, images, etc.) can be loaded and executed on a web page. It provides protection against XSS, clickjacking, and other code injection attacks.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'Which OWASP vulnerability involves exposing sensitive data through improper encryption or access controls?',
          options: [
            'Broken Access Control',
            'Cryptographic Failures',
            'Security Misconfiguration',
            'Vulnerable and Outdated Components'
          ],
          correctAnswer: 1,
          explanation: 'Cryptographic Failures (formerly Sensitive Data Exposure) involves improper protection of sensitive data through weak encryption, lack of encryption, or improper key management. This is ranked #2 in OWASP Top 10 2021.',
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
          question: 'Load testing and stress testing are the same type of performance testing.',
          correctAnswer: false,
          explanation: 'False. Load testing evaluates system behavior under expected load conditions, while stress testing pushes the system beyond normal operational capacity to find breaking points. They serve different purposes.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'A lower response time always indicates better application performance.',
          correctAnswer: true,
          explanation: 'True. Response time measures how quickly an application responds to requests. Lower response times indicate faster processing and better user experience, which is a key performance indicator.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'JMeter can only be used for testing web applications.',
          correctAnswer: false,
          explanation: 'False. While JMeter is commonly used for web applications, it supports multiple protocols including HTTP, HTTPS, SOAP, REST, FTP, JDBC (databases), LDAP, JMS, SMTP, and more, making it versatile for various testing scenarios.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'Stored XSS attacks are more dangerous than reflected XSS because the malicious script is permanently stored on the target server.',
          correctAnswer: true,
          explanation: 'True. Stored (Persistent) XSS is more dangerous because the malicious script is permanently stored on the server (database, forum, comment field) and executed every time users access the affected page, potentially affecting many users.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'SQL injection attacks can be completely prevented by using stored procedures alone.',
          correctAnswer: false,
          explanation: 'False. While stored procedures help, they can still be vulnerable if constructed dynamically with unvalidated input. Complete prevention requires parameterized queries, input validation, least privilege access, and proper error handling.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'The OWASP Top 10 list is updated every year to reflect the latest security threats.',
          correctAnswer: false,
          explanation: 'False. The OWASP Top 10 is typically updated every 3-4 years, not annually. The most recent versions were released in 2021, 2017, and 2013. This allows for significant data collection and trend analysis.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Authentication testing should verify that users cannot access the system with invalid credentials.',
          correctAnswer: true,
          explanation: 'True. Authentication testing must verify both positive scenarios (valid credentials grant access) and negative scenarios (invalid credentials are rejected). Testing failed login attempts is crucial for security validation.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'The Strict-Transport-Security header forces browsers to use HTTPS for all communications with the server.',
          correctAnswer: true,
          explanation: 'True. HTTP Strict Transport Security (HSTS) header instructs browsers to only communicate with the server over HTTPS, preventing protocol downgrade attacks and cookie hijacking. It includes max-age directive for duration.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'Performance testing should only be conducted in production environments to get accurate results.',
          correctAnswer: false,
          explanation: 'False. Performance testing should primarily be conducted in dedicated test environments that mirror production. Testing in production risks system stability and user experience. Production monitoring is different from performance testing.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'Security testing is only necessary for applications that handle financial or personal data.',
          correctAnswer: false,
          explanation: 'False. All applications should undergo security testing regardless of data sensitivity. Security vulnerabilities can lead to system compromise, unauthorized access, data breaches, and reputational damage affecting any application type.',
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
          question: 'The __________ attack involves injecting malicious scripts into web pages viewed by other users.',
          correctAnswer: 'XSS',
          explanation: 'Cross-Site Scripting (XSS) attack involves injecting malicious scripts (typically JavaScript) into web pages that are viewed by other users. The script executes in the victim\'s browser, potentially stealing cookies, session tokens, or performing actions on behalf of the user.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'In JMeter, the __________ component is used to define the number of virtual users and test duration.',
          correctAnswer: 'Thread Group',
          explanation: 'Thread Group is the starting point of any JMeter test plan. It controls the number of threads (virtual users), ramp-up period, loop count, and duration of the test. Each thread represents one virtual user.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ metric measures the delay before a response starts to arrive after a request is sent.',
          correctAnswer: 'Latency',
          explanation: 'Latency (Time to First Byte - TTFB) measures the time from when a request is sent until the first byte of the response is received. It indicates network and server processing delays before data transmission begins.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ attack manipulates database queries by inserting malicious SQL code through application input fields.',
          correctAnswer: 'SQL Injection',
          explanation: 'SQL Injection attack occurs when an attacker inserts malicious SQL statements into application input fields, which are then executed by the database. This can lead to unauthorized data access, modification, or deletion.',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The HTTP header __________ prevents browsers from MIME-sniffing a response away from the declared content type.',
          correctAnswer: 'X-Content-Type-Options',
          explanation: 'X-Content-Type-Options header with value "nosniff" prevents browsers from MIME-type sniffing. It forces browsers to respect the Content-Type header, preventing certain types of attacks where malicious content is disguised as another type.',
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
          question: 'Explain how to set up and execute a basic load test in Apache JMeter. Include the key components needed and their configuration.',
          keywords: ['Thread Group', 'Sampler', 'HTTP Request', 'Listener', 'users', 'ramp-up', 'loop', 'View Results', 'Graph', 'configuration', 'test plan'],
          minKeywords: 3,
          sampleAnswer: 'To set up a basic load test in JMeter: (1) Create a Test Plan as the container for all test elements. (2) Add a Thread Group to define virtual users - configure number of threads (users), ramp-up period (time to start all users), and loop count (iterations). For example, 100 users with 10-second ramp-up. (3) Add an HTTP Request Sampler under Thread Group - configure server name/IP, port, protocol (HTTP/HTTPS), path, and method (GET/POST). Include any parameters or headers needed. (4) Add Listeners to view results - use View Results Tree for detailed request/response data, Summary Report for aggregate metrics, or Graph Results for visual representation. (5) Optionally add Timers (like Constant Timer) to simulate think time between requests. (6) Add Assertions to validate responses. (7) Save the test plan and click Run button to execute. Monitor response times, throughput, and error rates in listeners to analyze performance.',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe how to implement page load time monitoring in Selenium WebDriver. Include specific code approaches and performance metrics to capture.',
          keywords: ['Navigation', 'Timing', 'JavascriptExecutor', 'performance', 'loadEventEnd', 'navigationStart', 'window.performance', 'timestamp', 'System.currentTimeMillis', 'PageLoadStrategy'],
          minKeywords: 3,
          sampleAnswer: 'To implement page load time monitoring in Selenium: (1) Using Navigation Timing API - Execute JavaScript to access window.performance.timing object: JavascriptExecutor js = (JavascriptExecutor)driver; long loadTime = (Long)js.executeScript("return (window.performance.timing.loadEventEnd - window.performance.timing.navigationStart);"); This gives total page load time in milliseconds. (2) Using System timestamps - Record time before and after navigation: long startTime = System.currentTimeMillis(); driver.get(url); long endTime = System.currentTimeMillis(); long pageLoadTime = endTime - startTime; (3) Capture specific metrics: navigationStart, domLoading, domInteractive, domContentLoadedEventEnd, loadEventEnd for detailed performance breakdown. (4) Set PageLoadStrategy in DesiredCapabilities (NORMAL, EAGER, or NONE) to control when WebDriver returns control. (5) Use explicit waits with custom conditions for specific elements. (6) Log and report metrics: compare against thresholds, track trends over time, integrate with reporting frameworks. (7) Handle timeouts appropriately and capture performance even on slow loads.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to test for SQL Injection vulnerabilities in a web application. Include both manual testing techniques and automated approaches.',
          keywords: ['single quote', 'OR 1=1', 'payload', 'error message', 'time-based', 'boolean-based', 'UNION', 'SQLMap', 'parameterized', 'input validation', 'authentication bypass'],
          minKeywords: 3,
          sampleAnswer: 'Testing for SQL Injection vulnerabilities: Manual Testing: (1) Input validation - Enter single quote (\') in input fields to check for SQL errors. (2) Authentication bypass - Try payloads like admin\' OR \'1\'=\'1 or admin\'-- in login forms. (3) UNION-based injection - Use UNION SELECT statements to extract data: \' UNION SELECT username, password FROM users--. (4) Boolean-based blind injection - Test with conditions: \' AND 1=1-- (true) vs \' AND 1=2-- (false) and observe different responses. (5) Time-based blind injection - Use: \'; WAITFOR DELAY \'00:00:05\'-- or \'; SELECT SLEEP(5)-- to detect injection through response delays. (6) Error-based injection - Analyze database error messages for information disclosure. Automated Testing: (1) Use SQLMap tool to automatically detect and exploit SQL injection vulnerabilities: sqlmap -u "URL" --forms --batch. (2) Use Burp Suite with active scanner to test parameters. (3) OWASP ZAP for automated scanning. (4) Integrate security testing tools in CI/CD pipeline. Prevention verification: Ensure parameterized queries, input validation, proper error handling, and least privilege database access are implemented.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe comprehensive test scenarios for validating Authentication and Authorization in a web application. Include positive and negative test cases.',
          keywords: ['valid credentials', 'invalid credentials', 'role-based', 'permissions', 'session', 'token', 'logout', 'unauthorized access', 'brute force', 'password policy', 'lockout', 'privilege escalation'],
          minKeywords: 3,
          sampleAnswer: 'Authentication test scenarios: (1) Valid login - Verify user can login with correct username/password. (2) Invalid credentials - Test with wrong password, non-existent username, empty fields. (3) Case sensitivity - Verify password is case-sensitive. (4) Password policy - Test minimum length, complexity requirements, special characters. (5) Account lockout - Verify account locks after specified failed attempts (e.g., 5 attempts). (6) Session management - Verify session timeout after inactivity, validate session tokens are secure and invalidated on logout. (7) Remember me functionality - Test persistent sessions. (8) Multi-factor authentication - Verify OTP/2FA if implemented. (9) Logout - Ensure session is terminated and back button doesn\'t restore session. Authorization test scenarios: (1) Role-based access - Verify admin, manager, user roles have appropriate access levels. (2) Horizontal privilege escalation - User A cannot access User B\'s data by manipulating URLs/parameters. (3) Vertical privilege escalation - Regular user cannot access admin functions. (4) Resource access - Verify unauthorized users get 401/403 errors for protected resources. (5) Direct URL access - Test accessing protected pages directly without login. (6) API authorization - Verify API endpoints validate tokens/permissions. (7) Function-level access - Test create, read, update, delete operations per role. (8) Data-level access - Verify users only see their own data. Use tools like Burp Suite, Postman for API testing, and Selenium for UI validation.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to implement Cross-Site Scripting (XSS) testing in a Selenium automation framework. Include detection techniques and validation approaches.',
          keywords: ['script tag', 'alert', 'payload', '<script>', 'input fields', 'URL parameters', 'reflected', 'stored', 'DOM-based', 'sanitization', 'encoding', 'executeScript', 'JavascriptExecutor'],
          minKeywords: 3,
          sampleAnswer: 'Implementing XSS testing in Selenium: (1) Test for Reflected XSS - Inject payloads in input fields and URL parameters: <script>alert(\'XSS\')</script>, <img src=x onerror=alert(\'XSS\')>. Submit forms or navigate to URLs with payloads. Use Selenium to detect if script executes - check for alert dialogs using switchTo().alert() in try-catch block. (2) Test for Stored XSS - Enter malicious scripts in fields that store data (comments, profiles, messages). Navigate to pages displaying this data. Verify if script is executed when page loads. (3) Test for DOM-based XSS - Use JavascriptExecutor to inject scripts and check if DOM is manipulated: js.executeScript("document.write(\'<script>alert(\\\'XSS\\\');</script>\')"); (4) Validation techniques: Try multiple payload variations including encoded versions (URL encoding, HTML encoding, Unicode). Test different contexts: HTML tags, attributes, JavaScript strings, CSS. (5) Automated detection: Check page source for unencoded user input using driver.getPageSource(). Use assertions to verify input is properly encoded: assertFalse(pageSource.contains("<script>")); (6) Verify security headers: Check Content-Security-Policy header restricts script execution. (7) Test input validation: Verify special characters are rejected or sanitized. (8) Integration: Use OWASP ZAP proxy with Selenium to automatically detect XSS during test execution. Create dedicated security test suites with various XSS payloads from OWASP XSS Filter Evasion Cheat Sheet.',
          points: 8
        }
      ]
    }
  ]
};
