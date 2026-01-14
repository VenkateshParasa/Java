export default {
  title: "Day 40: Configuration Management - Assessment",
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
      description: "Choose the correct answer for each question.",
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Java class is primarily used to read properties from a configuration file?',
          options: [
            'java.util.Properties',
            'java.io.FileReader',
            'java.util.HashMap',
            'java.io.BufferedReader'
          ],
          correctAnswer: 0,
          explanation: 'The java.util.Properties class is specifically designed to handle property files. It extends Hashtable and provides methods like load(), getProperty(), and setProperty() to work with key-value pairs stored in .properties files.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct way to load a properties file using FileInputStream?',
          options: [
            'properties.load(new FileInputStream("config.properties"));',
            'properties.read(new FileInputStream("config.properties"));',
            'properties.open(new FileInputStream("config.properties"));',
            'properties.import(new FileInputStream("config.properties"));'
          ],
          correctAnswer: 0,
          explanation: 'The load() method of the Properties class is used to read property list (key and element pairs) from the input byte stream. It accepts an InputStream as a parameter, commonly a FileInputStream for reading from files.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method retrieves a property value with a default fallback if the key is not found?',
          options: [
            'getProperty(String key, String defaultValue)',
            'get(String key, String defaultValue)',
            'fetch(String key, String defaultValue)',
            'retrieve(String key, String defaultValue)'
          ],
          correctAnswer: 0,
          explanation: 'The getProperty(String key, String defaultValue) method searches for the property with the specified key. If the key is not found, it returns the default value provided as the second parameter, preventing null pointer exceptions.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the standard file extension for Java properties files?',
          options: [
            '.properties',
            '.prop',
            '.config',
            '.cfg'
          ],
          correctAnswer: 0,
          explanation: 'The .properties extension is the standard convention for Java property files. These files contain key-value pairs in the format key=value and are commonly used for configuration management in Java applications.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In a properties file, what character is used to write comments?',
          options: [
            '# or !',
            '//',
            '/*',
            '--'
          ],
          correctAnswer: 0,
          explanation: 'Properties files support comments using either # (hash) or ! (exclamation mark) at the beginning of a line. These characters indicate that the rest of the line should be ignored when loading the properties.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Maven profile element specifies when a profile should be activated?',
          options: [
            '<activation>',
            '<trigger>',
            '<condition>',
            '<enable>'
          ],
          correctAnswer: 0,
          explanation: 'The <activation> element in Maven profiles defines the conditions under which a profile should be automatically activated. It can include criteria like JDK version, operating system, property presence, or file existence.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'How do you access system properties in Java code?',
          options: [
            'System.getProperty("propertyName")',
            'System.getSystemProperty("propertyName")',
            'Properties.getSystem("propertyName")',
            'Runtime.getProperty("propertyName")'
          ],
          correctAnswer: 0,
          explanation: 'System.getProperty("propertyName") is the method to retrieve system properties in Java. System properties include information like user.dir, os.name, java.version, and can also include custom properties set via -D flags.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the best practice for storing sensitive information like passwords in configuration files?',
          options: [
            'Use environment variables or encrypted properties',
            'Store them in plain text properties files',
            'Hardcode them in the test classes',
            'Write them in comments for reference'
          ],
          correctAnswer: 0,
          explanation: 'Sensitive information should never be stored in plain text. Best practices include using environment variables, encrypted property values, secret management tools (like HashiCorp Vault), or secure credential stores. This prevents accidental exposure in version control systems.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which command-line flag is used to set a system property when running Java applications?',
          options: [
            '-D',
            '-P',
            '-S',
            '-V'
          ],
          correctAnswer: 0,
          explanation: 'The -D flag is used to set system properties from the command line. For example, "java -Denv=prod -jar app.jar" sets the "env" property to "prod". This is commonly used for environment-specific configurations.',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the primary purpose of using a ConfigReader or ConfigManager class?',
          options: [
            'Centralize configuration loading and provide a single point of access',
            'Encrypt all configuration values',
            'Validate user input from web forms',
            'Generate random test data'
          ],
          correctAnswer: 0,
          explanation: 'A ConfigReader or ConfigManager class implements the Singleton pattern to provide centralized configuration management. It loads properties once, provides easy access throughout the application, handles exceptions, and can implement caching and lazy loading.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method would you use to check if a specific property exists in a Properties object?',
          options: [
            'containsKey(Object key)',
            'hasProperty(String key)',
            'exists(String key)',
            'isPresent(String key)'
          ],
          correctAnswer: 0,
          explanation: 'The containsKey(Object key) method inherited from Hashtable is used to check if a specific key exists in the Properties object. It returns true if the key is present, false otherwise, helping avoid null values.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'In a Maven POM file, where should environment-specific profiles be defined?',
          options: [
            'Within the <profiles> section',
            'Within the <build> section',
            'Within the <dependencies> section',
            'Within the <properties> section'
          ],
          correctAnswer: 0,
          explanation: 'Maven profiles are defined within the <profiles> section of the pom.xml file. Each <profile> can contain its own properties, dependencies, plugins, and build configurations that are activated based on specified conditions.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the advantage of using ResourceBundle over Properties for configuration?',
          options: [
            'Better support for internationalization and locale-specific resources',
            'Faster file reading performance',
            'Automatic encryption of values',
            'Built-in database connectivity'
          ],
          correctAnswer: 0,
          explanation: 'ResourceBundle is designed for internationalization (i18n) and can automatically load locale-specific property files. It follows naming conventions like messages_en.properties, messages_fr.properties, making it ideal for multi-language applications.',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which separator is commonly used in properties files to assign values to keys?',
          options: [
            'Both = (equals) and : (colon)',
            'Only = (equals)',
            'Only : (colon)',
            '-> (arrow)'
          ],
          correctAnswer: 0,
          explanation: 'Properties files support both = (equals) and : (colon) as key-value separators. For example, both "browser=chrome" and "browser:chrome" are valid. Whitespace around separators is ignored during parsing.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the best location to store properties files in a Maven project?',
          options: [
            'src/main/resources or src/test/resources',
            'src/main/java',
            'src/main/config',
            'Root directory of the project'
          ],
          correctAnswer: 0,
          explanation: 'The src/main/resources directory is the standard Maven location for application resources including properties files. Files here are automatically copied to the classpath. For test-specific configs, use src/test/resources.',
          points: 3
        }
      ]
    },
    {
      title: "Section B: True/False Questions",
      description: "Determine whether each statement is true or false.",
      questions: [
        {
          id: 'q16',
          type: 'truefalse',
          mode: ['full'],
          question: 'Properties files can only store String values, not complex objects.',
          correctAnswer: true,
          explanation: 'True. Properties files store data in text format as key-value pairs where both keys and values are Strings. Complex objects must be serialized or stored in other formats like JSON or XML.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'Environment variables take precedence over properties file values in a configuration hierarchy.',
          correctAnswer: true,
          explanation: 'True. Following the 12-factor app methodology, environment variables typically override properties file values. This allows environment-specific configurations without modifying files, which is crucial for containerized deployments.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'It is a good practice to commit sensitive credentials to version control systems if they are in a properties file.',
          correctAnswer: false,
          explanation: 'False. Sensitive credentials should never be committed to version control systems, regardless of format. Use environment variables, secret management tools, or encrypted stores. Add properties files with credentials to .gitignore.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'The Properties class load() method automatically closes the InputStream after reading.',
          correctAnswer: false,
          explanation: 'False. The load() method does not close the InputStream. It is the programmer\'s responsibility to close the stream, typically using a try-with-resources statement to ensure proper resource management and prevent memory leaks.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'Maven profiles can be activated using command-line arguments with the -P flag.',
          correctAnswer: true,
          explanation: 'True. Maven profiles can be activated from the command line using the -P flag followed by the profile ID. For example, "mvn test -Pqa" activates the "qa" profile. Multiple profiles can be activated by separating them with commas.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'The getProperty() method returns an empty string if the property key is not found.',
          correctAnswer: false,
          explanation: 'False. The getProperty(String key) method returns null if the property is not found. To avoid null values, use getProperty(String key, String defaultValue) which returns the default value when the key is not present.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Properties files support multi-line values using the backslash (\\) continuation character.',
          correctAnswer: true,
          explanation: 'True. Properties files support multi-line values by ending a line with a backslash (\\). The next line is treated as a continuation of the value. This is useful for long URLs, paths, or descriptions.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'ConfigReader classes should typically implement the Singleton design pattern.',
          correctAnswer: true,
          explanation: 'True. ConfigReader classes commonly implement Singleton pattern to ensure only one instance exists, avoiding repeated file reading and maintaining consistent configuration state throughout the application lifecycle.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'System properties set with -D flags persist across different Java application runs.',
          correctAnswer: false,
          explanation: 'False. System properties set using -D flags are only available for that specific JVM instance and application run. They do not persist to subsequent runs. For persistent configuration, use properties files or environment variables.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'It is possible to load multiple properties files and merge them into a single Properties object.',
          correctAnswer: true,
          explanation: 'True. Multiple properties files can be loaded into the same Properties object by calling load() multiple times. Later loads will override duplicate keys from earlier loads, enabling configuration layering and inheritance.',
          points: 2
        }
      ]
    },
    {
      title: "Section C: Fill in the Blank Questions",
      description: "Complete the code or statements with the correct terms.",
      questions: [
        {
          id: 'q26',
          type: 'fillblank',
          mode: ['full'],
          question: 'To read environment variables in Java, use the System.____("VARIABLE_NAME") method.',
          correctAnswer: 'getenv',
          explanation: 'The System.getenv("VARIABLE_NAME") method retrieves the value of an environment variable. Unlike getProperty() which accesses system properties, getenv() accesses operating system environment variables.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'The typical naming convention for environment-specific properties files is config-____.properties (e.g., config-dev.properties, config-prod.properties).',
          correctAnswer: 'env',
          explanation: 'The common pattern is to use config-{environment}.properties where {environment} represents dev, qa, staging, prod, etc. This makes it easy to identify and load the appropriate configuration file based on the current environment.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'In a properties file, the ____ method of Properties class is used to save properties to an output stream.',
          correctAnswer: 'store',
          explanation: 'The store(OutputStream out, String comments) method writes the properties list to an output stream. It is the counterpart to load() and can be used to persist modified properties back to a file.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'When using ClassLoader to load properties files from the classpath, use getClass().getClassLoader().getResourceAsStream("____").',
          correctAnswer: 'config.properties',
          explanation: 'The getResourceAsStream() method loads resources from the classpath. When properties files are in src/main/resources, they should be referenced by their filename like "config.properties" without any path prefix.',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'In Maven profiles, the <activeByDefault>____</activeByDefault> tag makes a profile active when no other profile is explicitly specified.',
          correctAnswer: 'true',
          explanation: 'Setting <activeByDefault>true</activeByDefault> in a profile\'s activation section makes it the default profile. This profile will be used unless another profile is explicitly activated via command line or other activation criteria.',
          points: 4
        }
      ]
    },
    {
      title: "Section D: Short Answer Questions",
      description: "Provide detailed answers demonstrating your understanding.",
      questions: [
        {
          id: 'q31',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the configuration hierarchy strategy where system properties override environment variables, which override properties files. Why is this approach beneficial for test automation?',
          keywords: ['hierarchy', 'override', 'flexibility', 'environment', 'precedence', 'deployment', 'CI/CD', 'container'],
          minKeywords: 3,
          sampleAnswer: 'Configuration hierarchy establishes a precedence order where system properties (highest) override environment variables, which override properties files (lowest). This approach is beneficial because: 1) Properties files provide default configurations for all environments, 2) Environment variables allow environment-specific overrides without code changes (crucial for Docker/Kubernetes), 3) System properties enable runtime overrides for debugging or one-time tests, and 4) This hierarchy supports CI/CD pipelines where different levels need different configuration sources. For example, developers use properties files locally, QA environment uses environment variables in containers, and specific test runs can override with -D flags. This layered approach provides flexibility while maintaining security and ease of deployment.',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Design a ConfigReader class that implements the Singleton pattern and loads properties from config.properties. Include proper exception handling and explain each component.',
          keywords: ['singleton', 'private constructor', 'static instance', 'getInstance', 'Properties', 'FileInputStream', 'try-catch', 'exception handling'],
          minKeywords: 4,
          sampleAnswer: 'A ConfigReader singleton implementation includes: 1) A private static instance variable to hold the single instance, 2) A private constructor that loads the properties file using try-catch-with-resources for proper resource management, 3) A public static getInstance() method with synchronized block or double-checked locking to ensure thread-safety, 4) Public getter methods like getProperty(String key) that delegate to the Properties object, and 5) Exception handling that wraps IOException in RuntimeException with meaningful messages. The singleton pattern ensures the properties file is read only once, improving performance and maintaining consistent state. The private constructor prevents external instantiation, and getInstance() provides global access. Proper exception handling in the constructor prevents application startup with invalid configurations.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe how to set up Maven profiles for three environments (dev, qa, prod) with different property values. What are the activation methods and best practices?',
          keywords: ['profiles', 'pom.xml', 'activation', 'properties', 'environment', 'command-line', '-P flag', 'activeByDefault', 'filtering'],
          minKeywords: 4,
          sampleAnswer: 'Maven profiles for multiple environments are set up in pom.xml within the <profiles> section. Each profile has: 1) Unique ID (dev, qa, prod), 2) <properties> section defining environment-specific values like URLs, credentials, etc., 3) <activation> section specifying when to activate (activeByDefault, system property, file existence), and 4) Optional resource filtering to replace placeholders in properties files. Activation methods include: command-line with -Pqa, active by default for dev profile, or property-based like -Denv=prod. Best practices: Use activeByDefault for dev, keep sensitive data out of profiles (use environment variables instead), document activation methods in README, use resource filtering to inject profile properties into config files, and validate profile-specific configurations in pre-integration tests. This approach enables seamless environment switching without code changes.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What are the security considerations when managing configuration files in test automation? Discuss sensitive data handling, version control, and access control.',
          keywords: ['sensitive data', 'encryption', 'version control', 'gitignore', 'environment variables', 'secrets management', 'vault', 'access control', 'credentials'],
          minKeywords: 4,
          sampleAnswer: 'Security considerations for configuration management include: 1) Never commit sensitive data (passwords, API keys, tokens) to version control - add config files with credentials to .gitignore, 2) Use environment variables or dedicated secrets management tools (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault) for sensitive values, 3) Encrypt sensitive properties using tools like Jasypt or SOPS if they must be stored, 4) Implement role-based access control (RBAC) for configuration files in CI/CD systems, 5) Use separate configurations for each environment with minimal privileges, 6) Rotate credentials regularly and audit configuration access, 7) Store example/template config files (config.properties.example) in version control with placeholder values, and 8) Scan repositories for accidentally committed secrets using tools like git-secrets or truffleHog. Following these practices prevents credential exposure and maintains security compliance.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Compare and contrast properties files (.properties) with other configuration formats (JSON, YAML, XML) for Selenium test automation. When would you choose each format?',
          keywords: ['properties', 'JSON', 'YAML', 'XML', 'simple', 'complex', 'hierarchy', 'nested', 'readability', 'parsing', 'structure'],
          minKeywords: 4,
          sampleAnswer: 'Configuration format comparison: 1) Properties files - Simple key-value pairs, flat structure, native Java support via Properties class, best for simple configurations with no nesting. Use when: configurations are simple, backward compatibility needed, or quick setup required. 2) JSON - Supports nested structures, arrays, and data types, widely used in APIs, parsed with libraries like Jackson or Gson. Use when: hierarchical data needed, API-based configurations, or JavaScript integration required. 3) YAML - Human-readable, supports complex structures, less verbose than JSON/XML, popular in CI/CD (Docker, Kubernetes). Use when: complex nested configurations needed, human readability is priority, or working with containerized environments. 4) XML - Verbose but self-documenting, supports validation with XSD, traditional enterprise choice. Use when: legacy systems integration, schema validation required, or working with enterprise tools. For Selenium automation, properties files work well for simple browser/URL configs, while YAML is preferred for complex test data structures and CI/CD integration.',
          points: 8
        }
      ]
    }
  ]
};
