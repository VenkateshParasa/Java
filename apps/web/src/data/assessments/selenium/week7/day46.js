export default {
  title: "Day 46: API Testing Integration - Assessment",
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
          question: 'What does REST stand for in API architecture?',
          options: [
            'Remote Execution State Transfer',
            'Representational State Transfer',
            'Request Execute State Transaction',
            'Representational Service Technology'
          ],
          correctAnswer: 1,
          explanation: 'REST stands for Representational State Transfer. It is an architectural style for designing networked applications that relies on stateless, client-server communication protocol, typically HTTP.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which HTTP method is used to retrieve data from a REST API without modifying it?',
          options: [
            'POST',
            'PUT',
            'GET',
            'DELETE'
          ],
          correctAnswer: 2,
          explanation: 'GET is the HTTP method used to retrieve data from a server. It is idempotent and should not modify any resources. GET requests typically do not have a request body.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Java library is most commonly used for REST API automation testing?',
          options: [
            'HTTPClient',
            'REST Assured',
            'Apache HTTP',
            'JAX-RS'
          ],
          correctAnswer: 1,
          explanation: 'REST Assured is the most popular Java library for REST API testing. It provides a domain-specific language (DSL) that makes writing and maintaining API tests simple and readable.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct REST Assured syntax to specify the base URI?',
          options: [
            'RestAssured.baseURL = "https://api.example.com"',
            'RestAssured.baseURI = "https://api.example.com"',
            'RestAssured.setBaseURI("https://api.example.com")',
            'RestAssured.uri("https://api.example.com")'
          ],
          correctAnswer: 1,
          explanation: 'In REST Assured, baseURI is the static property used to set the base URI. The correct syntax is RestAssured.baseURI = "https://api.example.com". This sets the base URL for all subsequent requests.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which HTTP status code indicates a successful resource creation?',
          options: [
            '200 OK',
            '201 Created',
            '204 No Content',
            '202 Accepted'
          ],
          correctAnswer: 1,
          explanation: '201 Created indicates that the request has been fulfilled and resulted in a new resource being created. This is typically returned after POST requests that create new resources.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In REST Assured, which method is used to extract JSON response values?',
          options: [
            'getJson()',
            'extract().response().jsonPath()',
            'json().extract()',
            'response.getJson()'
          ],
          correctAnswer: 1,
          explanation: 'In REST Assured, extract().response().jsonPath() is used to extract the response and access JSON values. You can then use methods like getString(), getInt() to retrieve specific values from the response.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which authentication method sends credentials with every request in the Authorization header?',
          options: [
            'Session-based authentication',
            'Cookie-based authentication',
            'Basic Authentication',
            'Form-based authentication'
          ],
          correctAnswer: 2,
          explanation: 'Basic Authentication encodes username and password in Base64 and sends them in the Authorization header with every request. Format: "Authorization: Basic <base64-encoded-credentials>".',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the primary benefit of hybrid testing (API + UI)?',
          options: [
            'Reduces overall test execution time',
            'Makes tests more complex',
            'Eliminates the need for UI testing',
            'Requires fewer test environments'
          ],
          correctAnswer: 0,
          explanation: 'Hybrid testing combines API and UI tests. APIs are used for fast test data setup and validation, while UI tests focus on user workflows. This significantly reduces overall test execution time while maintaining comprehensive coverage.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In REST Assured, which method is used to set request headers?',
          options: [
            'setHeader()',
            'addHeader()',
            'header() or headers()',
            'withHeader()'
          ],
          correctAnswer: 2,
          explanation: 'REST Assured uses header() for single header and headers() for multiple headers. Example: given().header("Content-Type", "application/json") or given().headers("header1", "value1", "header2", "value2").',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which HTTP method is idempotent and used to update an entire resource?',
          options: [
            'POST',
            'PUT',
            'PATCH',
            'UPDATE'
          ],
          correctAnswer: 1,
          explanation: 'PUT is idempotent and used to update an entire resource. Making the same PUT request multiple times will produce the same result. PUT typically replaces the entire resource with the request payload.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of RequestSpecification in REST Assured?',
          options: [
            'To specify the response format',
            'To define reusable request configurations like base URI, headers, and authentication',
            'To validate response schemas',
            'To execute the request'
          ],
          correctAnswer: 1,
          explanation: 'RequestSpecification is used to define reusable request configurations including base URI, headers, authentication, query parameters, etc. This promotes code reusability and maintains consistency across tests.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'Which library is commonly used with REST Assured for JSON schema validation?',
          options: [
            'json-validator',
            'json-schema-validator',
            'schema-validator',
            'rest-schema'
          ],
          correctAnswer: 1,
          explanation: 'json-schema-validator is used with REST Assured for JSON schema validation. It allows validating API responses against predefined JSON schemas using the matchesJsonSchema() matcher.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct way to send a JSON request body in REST Assured?',
          options: [
            'given().json(jsonString).post()',
            'given().body(jsonString).post()',
            'given().requestBody(jsonString).post()',
            'given().payload(jsonString).post()'
          ],
          correctAnswer: 1,
          explanation: 'The body() method is used to set the request body in REST Assured. Example: given().body(jsonString).when().post("/endpoint"). REST Assured automatically serializes objects to JSON if Content-Type is set.',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which HTTP status code range indicates client errors?',
          options: [
            '2xx',
            '3xx',
            '4xx',
            '5xx'
          ],
          correctAnswer: 2,
          explanation: '4xx status codes indicate client errors. Common examples: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found. These indicate the client sent an invalid or unauthorized request.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'In a hybrid test approach, when should APIs be used instead of UI for test setup?',
          options: [
            'Never, always use UI',
            'For creating test data and setting up application state',
            'Only for negative testing',
            'Only when UI is not available'
          ],
          correctAnswer: 1,
          explanation: 'APIs should be used for test data creation and application state setup in hybrid testing. This is faster and more reliable than UI-based setup, allowing UI tests to focus on actual user workflows and validations.',
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
          question: 'REST APIs are stateless, meaning each request contains all information necessary to process it.',
          correctAnswer: true,
          explanation: 'True. RESTful services are stateless - each request from client to server must contain all information needed to understand and process the request. The server does not store client context between requests.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'The HTTP POST method is idempotent, meaning multiple identical requests have the same effect as a single request.',
          correctAnswer: false,
          explanation: 'False. POST is not idempotent. Multiple identical POST requests typically create multiple resources, while idempotent methods (GET, PUT, DELETE) produce the same result regardless of how many times they are executed.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'REST Assured can automatically serialize Java objects to JSON when sending request bodies.',
          correctAnswer: true,
          explanation: 'True. REST Assured can automatically serialize Java objects (POJOs) to JSON when Content-Type is set to application/json. It uses Jackson or Gson for serialization, eliminating the need for manual JSON string creation.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'OAuth 2.0 tokens should be hardcoded in test scripts for convenience.',
          correctAnswer: false,
          explanation: 'False. OAuth tokens and any credentials should never be hardcoded. They should be stored in configuration files, environment variables, or secure vaults, and loaded at runtime to maintain security.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'JSON Path expressions in REST Assured can be used to extract nested values from complex JSON responses.',
          correctAnswer: true,
          explanation: 'True. REST Assured supports JSON Path expressions to navigate and extract values from nested JSON structures. Example: jsonPath().getString("user.address.city") extracts a deeply nested value.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'In hybrid testing, UI tests should always create their own test data through the UI.',
          correctAnswer: false,
          explanation: 'False. In hybrid testing, APIs should be used to create test data quickly and reliably. UI tests should focus on testing user interactions and workflows, not data setup, which is faster and more stable via APIs.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'ResponseSpecification in REST Assured can be used to define expected response validations that apply to multiple tests.',
          correctAnswer: true,
          explanation: 'True. ResponseSpecification allows defining reusable response expectations like status codes, headers, or response time limits. These specifications can be applied across multiple tests for consistency.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'The HTTP DELETE method should include a request body containing the resource to be deleted.',
          correctAnswer: false,
          explanation: 'False. DELETE requests typically identify the resource to delete via the URL path or query parameters, not the request body. Most servers ignore or reject DELETE requests with bodies as it violates REST conventions.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'API tests generally execute faster than UI tests, making them ideal for regression testing.',
          correctAnswer: true,
          explanation: 'True. API tests execute significantly faster than UI tests as they bypass the browser layer and test business logic directly. This makes them ideal for regression testing, especially in CI/CD pipelines.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'JSON schema validation ensures that the API response structure matches the expected format and data types.',
          correctAnswer: true,
          explanation: 'True. JSON schema validation verifies that the response structure, field names, data types, required fields, and constraints match the defined schema. This ensures API contract compliance across versions.',
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
          question: 'In REST Assured, the __________ method is used to start building a request specification.',
          correctAnswer: 'given',
          explanation: 'The given() method is the starting point for building a REST Assured request. It follows the given-when-then pattern: given() for request setup, when() for action, and then() for assertions.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'The HTTP status code __________ indicates that the requested resource was not found on the server.',
          correctAnswer: '404',
          explanation: '404 Not Found indicates that the server cannot find the requested resource. This is one of the most common HTTP status codes and typically means the URL path is incorrect or the resource has been deleted.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: '__________ is a token-based authentication mechanism where the token is sent in the Authorization header as "Bearer <token>".',
          correctAnswer: 'OAuth',
          explanation: 'OAuth (typically OAuth 2.0) uses bearer tokens sent in the Authorization header. Format: "Authorization: Bearer <access_token>". This is more secure than Basic Authentication and supports token expiration and refresh.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ HTTP method is used to partially update a resource, unlike PUT which replaces the entire resource.',
          correctAnswer: 'PATCH',
          explanation: 'PATCH is used for partial updates to a resource. While PUT replaces the entire resource, PATCH only modifies the fields specified in the request body, leaving other fields unchanged.',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'In REST Assured, __________ is used to navigate and extract values from JSON responses using path expressions.',
          correctAnswer: 'JsonPath',
          explanation: 'JsonPath in REST Assured provides methods to extract values from JSON responses using path expressions. Example: jsonPath().getString("user.name") extracts the name field from the user object.',
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
          question: 'Explain the structure of a REST Assured test using the Given-When-Then pattern. Provide a complete example for testing a POST endpoint that creates a user.',
          keywords: ['given', 'when', 'then', 'baseURI', 'header', 'body', 'post', 'statusCode', 'assertThat', 'contentType', 'extract', 'response'],
          minKeywords: 3,
          sampleAnswer: 'REST Assured follows the Given-When-Then pattern for API testing: GIVEN sets up the request (base URI, headers, body, authentication), WHEN executes the action (HTTP method and endpoint), THEN validates the response (status code, body, headers). Example: given().baseUri("https://api.example.com").header("Content-Type", "application/json").body("{\\"name\\": \\"John\\", \\"email\\": \\"john@example.com\\"}").when().post("/users").then().statusCode(201).body("name", equalTo("John")).body("email", equalTo("john@example.com")). This creates a user and validates the 201 status code and response body fields.',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe how to implement RequestSpecification and ResponseSpecification in REST Assured to create reusable configurations. Include code examples.',
          keywords: ['RequestSpecification', 'ResponseSpecification', 'RequestSpecBuilder', 'ResponseSpecBuilder', 'baseUri', 'header', 'expect', 'spec', 'build', 'setBaseUri', 'addHeader'],
          minKeywords: 3,
          sampleAnswer: 'RequestSpecification and ResponseSpecification provide reusable configurations. RequestSpecification example: RequestSpecification reqSpec = new RequestSpecBuilder().setBaseUri("https://api.example.com").addHeader("Content-Type", "application/json").addHeader("Authorization", "Bearer token123").build(); ResponseSpecification resSpec = new ResponseSpecBuilder().expectStatusCode(200).expectContentType(ContentType.JSON).expectResponseTime(lessThan(3000L)).build(); Usage: given().spec(reqSpec).when().get("/users").then().spec(resSpec). This eliminates duplication by defining common configurations once and reusing them across tests. You can also set global specs using RestAssured.requestSpecification and RestAssured.responseSpecification.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to perform JSON schema validation in REST Assured. What are the benefits and what dependencies are required?',
          keywords: ['schema', 'validation', 'json-schema-validator', 'matchesJsonSchema', 'JsonSchemaFactory', 'classpath', 'file', 'contract', 'structure', 'data types', 'required fields'],
          minKeywords: 3,
          sampleAnswer: 'JSON schema validation in REST Assured verifies that API responses match expected structure and data types. Required dependency: io.rest-assured:json-schema-validator. Create a JSON schema file defining structure, data types, and constraints. Example validation: given().when().get("/users/1").then().assertThat().body(matchesJsonSchema(new File("schemas/user-schema.json"))). Benefits include: (1) Validates response structure automatically, (2) Ensures API contract compliance, (3) Catches breaking changes early, (4) Validates field data types and required fields, (5) Supports complex nested structures. The schema can also be loaded from classpath using matchesJsonSchemaInClasspath("user-schema.json"). This is crucial for API contract testing and preventing breaking changes.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe a hybrid testing strategy where APIs are used for test setup and UI tests verify user workflows. Provide a specific example scenario with implementation details.',
          keywords: ['hybrid', 'API', 'UI', 'setup', 'test data', 'workflow', 'faster', 'Selenium', 'POST', 'create', 'verify', 'performance', 'maintenance'],
          minKeywords: 3,
          sampleAnswer: 'Hybrid testing combines API and UI testing for optimal efficiency. Scenario: E-commerce order testing. Step 1: Use API to create test data - POST /users to create user account, POST /products to create product, POST /cart to add product to cart. This setup happens in seconds via APIs. Step 2: Use Selenium UI test to verify the actual user workflow - login through UI, navigate to cart page, verify product displays correctly, proceed to checkout, complete payment form. Step 3: Use API for assertions - GET /orders to verify order was created with correct details. Benefits: (1) Faster execution - data setup via API is 10x faster than UI, (2) More reliable - APIs are stable, no UI flakiness during setup, (3) Better focus - UI tests focus on user experience validation, (4) Easier maintenance - API changes don\'t break UI test data setup. Implementation: Create utility methods like createUserViaAPI(), addProductToCartViaAPI() that return IDs for use in UI tests.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to handle different authentication methods in REST Assured including Basic Auth, Bearer Token, and OAuth2. Provide code examples for each.',
          keywords: ['authentication', 'Basic', 'Bearer', 'OAuth', 'auth', 'token', 'header', 'Authorization', 'preemptive', 'username', 'password', 'oauth2'],
          minKeywords: 3,
          sampleAnswer: 'REST Assured supports multiple authentication methods: (1) Basic Authentication: given().auth().basic("username", "password").when().get("/secure/endpoint") or given().auth().preemptive().basic("username", "password") for preemptive authentication that sends credentials with every request. (2) Bearer Token Authentication: given().auth().oauth2("access_token_here").when().get("/api/data") or manually: given().header("Authorization", "Bearer access_token_here"). (3) OAuth 2.0: given().auth().oauth2(accessToken).when().get("/protected/resource"). For obtaining tokens, make a POST request to token endpoint: String token = given().formParam("grant_type", "client_credentials").formParam("client_id", "id").formParam("client_secret", "secret").post("/oauth/token").jsonPath().getString("access_token"). Best practice: Store credentials in configuration files or environment variables, never hardcode. Create utility methods for authentication that can be reused across tests.',
          points: 8
        }
      ]
    }
  ]
};
