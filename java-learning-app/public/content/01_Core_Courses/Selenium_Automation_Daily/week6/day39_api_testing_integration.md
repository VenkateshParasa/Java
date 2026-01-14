# Day 46: API Testing Integration with Selenium Framework

## Learning Objectives

By the end of this session, you will be able to:

1. Understand the fundamentals of REST API testing and its importance in automation
2. Set up REST Assured library in your Selenium framework
3. Perform CRUD operations (GET, POST, PUT, DELETE) using REST Assured
4. Validate API responses including status codes, headers, and response bodies
5. Implement various authentication mechanisms (Basic, OAuth, Bearer tokens)
6. Parse and validate JSON and XML responses effectively
7. Perform JSON schema validation to ensure API contract compliance
8. Integrate API tests seamlessly with existing Selenium frameworks
9. Create hybrid test scenarios combining UI and API testing
10. Use APIs for efficient test data setup and teardown
11. Implement API mocking and stubbing for isolated testing
12. Generate comprehensive API test reports
13. Apply performance testing concepts to API tests
14. Handle complex API scenarios like file uploads and downloads
15. Implement best practices for maintainable API test automation

---

## Introduction to API Testing

### What is API Testing?

API (Application Programming Interface) testing is a type of software testing that validates Application Programming Interfaces. Unlike UI testing which tests the presentation layer, API testing focuses on the business logic layer of the software architecture.

**Key Characteristics:**

- **Direct Communication**: APIs allow direct communication between software components
- **Protocol-Based**: Most modern APIs use HTTP/HTTPS protocols (REST, SOAP, GraphQL)
- **Language-Independent**: APIs can be consumed by any programming language
- **Data-Centric**: Focuses on data exchange rather than user interface
- **Fast Execution**: API tests execute much faster than UI tests

### Types of API Testing

1. **Functional Testing**: Validates API functionality against requirements
2. **Integration Testing**: Tests API integration with other services
3. **Performance Testing**: Measures API response time and throughput
4. **Security Testing**: Validates authentication, authorization, and encryption
5. **Contract Testing**: Ensures API adheres to agreed specifications
6. **End-to-End Testing**: Tests complete workflows through APIs

### REST vs SOAP

| Aspect | REST | SOAP |
|--------|------|------|
| Protocol | Architectural style over HTTP | Protocol with strict standards |
| Data Format | JSON, XML, Plain Text | XML only |
| Performance | Faster, lightweight | Slower, more overhead |
| Flexibility | More flexible | Rigid structure |
| Usage | Modern web services | Enterprise applications |

---

## Why Combine UI and API Testing?

### Benefits of Hybrid Testing

1. **Comprehensive Coverage**: Tests both presentation and business logic layers
2. **Faster Test Execution**: Use API for setup/teardown instead of UI navigation
3. **Better Isolation**: Separate UI issues from backend logic issues
4. **Improved Reliability**: Reduce test flakiness by using APIs for data setup
5. **Enhanced Debugging**: Identify whether issues are in UI or backend
6. **Cost-Effective**: Optimize test execution time and resource usage

### When to Use API Testing

```
✓ Test data setup and cleanup
✓ Verify backend state changes after UI actions
✓ Test scenarios not accessible through UI
✓ Performance and load testing
✓ Security and authentication testing
✓ Third-party integration testing
✓ Microservices testing
```

### When to Use UI Testing

```
✓ Visual validations
✓ User interaction flows
✓ Browser-specific behavior
✓ Frontend functionality
✓ Accessibility testing
✓ End-to-end user journeys
```

### The Testing Pyramid

```
        /\
       /UI\        ← Few UI tests (slow, expensive)
      /────\
     / API  \      ← More API tests (faster, reliable)
    /────────\
   /   Unit   \    ← Most unit tests (fastest, cheapest)
  /────────────\
```

---

## REST API Concepts

### Understanding REST

**REST** (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server protocol (usually HTTP).

### HTTP Methods (CRUD Operations)

#### 1. GET - Retrieve Resources

```http
GET /api/users
GET /api/users/123
GET /api/users?role=admin&status=active
```

**Characteristics:**
- Safe: Doesn't modify server state
- Idempotent: Multiple identical requests have same effect
- Cacheable: Responses can be cached

#### 2. POST - Create Resources

```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "tester"
}
```

**Characteristics:**
- Not safe: Modifies server state
- Not idempotent: Multiple requests create multiple resources
- Not cacheable: Responses typically not cached

#### 3. PUT - Update/Replace Resources

```http
PUT /api/users/123
Content-Type: application/json

{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "role": "senior_tester"
}
```

**Characteristics:**
- Not safe: Modifies server state
- Idempotent: Multiple identical requests have same effect
- Replaces entire resource

#### 4. PATCH - Partial Update

```http
PATCH /api/users/123
Content-Type: application/json

{
  "email": "newemail@example.com"
}
```

**Characteristics:**
- Not safe: Modifies server state
- May be idempotent: Depends on implementation
- Updates only specified fields

#### 5. DELETE - Remove Resources

```http
DELETE /api/users/123
```

**Characteristics:**
- Not safe: Modifies server state
- Idempotent: Multiple identical requests have same effect
- Removes the specified resource

### HTTP Status Codes

#### Success Codes (2xx)
- **200 OK**: Request succeeded
- **201 Created**: Resource created successfully
- **204 No Content**: Successful request with no response body

#### Client Error Codes (4xx)
- **400 Bad Request**: Invalid request syntax
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Request conflicts with current state

#### Server Error Codes (5xx)
- **500 Internal Server Error**: Server encountered an error
- **502 Bad Gateway**: Invalid response from upstream server
- **503 Service Unavailable**: Server temporarily unavailable

### Request Components

```
GET /api/users/123?includeDetails=true HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
Accept: application/json
User-Agent: RestAssured/5.3.0

{
  "requestBody": "if applicable"
}
```

**Components:**
1. **HTTP Method**: GET, POST, PUT, DELETE
2. **URL/Endpoint**: /api/users/123
3. **Query Parameters**: ?includeDetails=true
4. **Headers**: Authorization, Content-Type, Accept
5. **Request Body**: JSON/XML payload (for POST/PUT)

---

## API Testing with REST Assured

### Setup and Dependencies

#### Maven Dependencies

```xml
<dependencies>
    <!-- REST Assured -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>rest-assured</artifactId>
        <version>5.3.0</version>
        <scope>test</scope>
    </dependency>

    <!-- JSON Path -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>json-path</artifactId>
        <version>5.3.0</version>
    </dependency>

    <!-- XML Path -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>xml-path</artifactId>
        <version>5.3.0</version>
    </dependency>

    <!-- JSON Schema Validator -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>json-schema-validator</artifactId>
        <version>5.3.0</version>
    </dependency>

    <!-- Gson for JSON parsing -->
    <dependency>
        <groupId>com.google.code.gson</groupId>
        <artifactId>gson</artifactId>
        <version>2.10.1</version>
    </dependency>

    <!-- Jackson for JSON parsing (alternative) -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.15.2</version>
    </dependency>

    <!-- Hamcrest for assertions -->
    <dependency>
        <groupId>org.hamcrest</groupId>
        <artifactId>hamcrest</artifactId>
        <version>2.2</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

#### Gradle Dependencies

```gradle
dependencies {
    testImplementation 'io.rest-assured:rest-assured:5.3.0'
    testImplementation 'io.rest-assured:json-path:5.3.0'
    testImplementation 'io.rest-assured:xml-path:5.3.0'
    testImplementation 'io.rest-assured:json-schema-validator:5.3.0'
    testImplementation 'com.google.code.gson:gson:2.10.1'
    testImplementation 'org.hamcrest:hamcrest:2.2'
}
```

### Basic REST Assured Test

```java
import io.restassured.RestAssured;
import io.restassured.response.Response;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import org.testng.annotations.Test;

public class BasicAPITest {

    @Test
    public void testGetRequest() {
        // Simple GET request
        given()
            .baseUri("https://jsonplaceholder.typicode.com")
        .when()
            .get("/posts/1")
        .then()
            .statusCode(200)
            .body("userId", equalTo(1))
            .body("id", equalTo(1))
            .body("title", notNullValue());
    }
}
```

### Request Specifications

#### Creating Reusable Request Specifications

```java
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.specification.RequestSpecification;
import io.restassured.http.ContentType;

public class RequestSpecConfig {

    public static RequestSpecification getBaseRequestSpec() {
        return new RequestSpecBuilder()
            .setBaseUri("https://api.example.com")
            .setBasePath("/api/v1")
            .setContentType(ContentType.JSON)
            .setAccept(ContentType.JSON)
            .addHeader("User-Agent", "RestAssured-Tests")
            .build();
    }

    public static RequestSpecification getAuthenticatedRequestSpec(String token) {
        return new RequestSpecBuilder()
            .addRequestSpecification(getBaseRequestSpec())
            .addHeader("Authorization", "Bearer " + token)
            .build();
    }
}
```

#### Using Request Specifications

```java
import io.restassured.specification.RequestSpecification;
import static io.restassured.RestAssured.*;

public class APITestWithSpecs {

    private RequestSpecification requestSpec;

    @BeforeClass
    public void setup() {
        requestSpec = RequestSpecConfig.getBaseRequestSpec();
    }

    @Test
    public void testWithRequestSpec() {
        given()
            .spec(requestSpec)
            .pathParam("userId", 123)
        .when()
            .get("/users/{userId}")
        .then()
            .statusCode(200);
    }
}
```

### Response Validations

#### Status Code Validation

```java
@Test
public void testStatusCodes() {
    // Success
    given()
        .baseUri("https://api.example.com")
    .when()
        .get("/users")
    .then()
        .statusCode(200);

    // Created
    given()
        .baseUri("https://api.example.com")
        .body("{\"name\": \"Test User\"}")
    .when()
        .post("/users")
    .then()
        .statusCode(201);

    // Not Found
    given()
        .baseUri("https://api.example.com")
    .when()
        .get("/users/99999")
    .then()
        .statusCode(404);
}
```

#### Header Validation

```java
@Test
public void testResponseHeaders() {
    given()
        .baseUri("https://api.example.com")
    .when()
        .get("/users")
    .then()
        .statusCode(200)
        .header("Content-Type", "application/json")
        .header("X-RateLimit-Limit", "1000")
        .header("Cache-Control", containsString("no-cache"))
        .headers("Server", notNullValue(),
                "Date", notNullValue());
}
```

#### Response Body Validation

```java
@Test
public void testResponseBody() {
    given()
        .baseUri("https://api.example.com")
    .when()
        .get("/users/123")
    .then()
        .statusCode(200)
        // Single field validation
        .body("id", equalTo(123))
        .body("name", equalTo("John Doe"))
        .body("email", endsWith("@example.com"))
        .body("status", isOneOf("active", "inactive"))

        // Multiple field validation
        .body("address.city", equalTo("New York"))
        .body("address.zipcode", matchesPattern("\\d{5}"))

        // Array validation
        .body("roles", hasSize(3))
        .body("roles", hasItem("admin"))
        .body("roles", containsInAnyOrder("admin", "tester", "developer"))

        // Collection validation
        .body("projects.name", hasItems("Project A", "Project B"))
        .body("projects.findAll { it.status == 'active' }.size()", equalTo(2));
}
```

#### Extracting Response Data

```java
@Test
public void testExtractResponseData() {
    // Extract entire response
    Response response =
        given()
            .baseUri("https://api.example.com")
        .when()
            .get("/users/123")
        .then()
            .statusCode(200)
            .extract()
            .response();

    // Extract specific values
    String name = response.path("name");
    int id = response.path("id");
    String email = response.jsonPath().getString("email");

    // Extract using JsonPath
    String city = response.jsonPath().getString("address.city");
    List<String> roles = response.jsonPath().getList("roles");

    // Use extracted data
    System.out.println("User: " + name + " (ID: " + id + ")");
    Assert.assertEquals(email, "john@example.com");
}
```

#### Complex Response Validation

```java
@Test
public void testComplexResponseValidation() {
    given()
        .baseUri("https://api.example.com")
    .when()
        .get("/users")
    .then()
        .statusCode(200)
        // Validate root level
        .body("size()", greaterThan(0))

        // Validate all items in array
        .body("id", everyItem(notNullValue()))
        .body("email", everyItem(containsString("@")))

        // Find specific items
        .body("find { it.email == 'john@example.com' }.name", equalTo("John Doe"))

        // Filter and validate
        .body("findAll { it.status == 'active' }.size()", greaterThan(5))

        // Nested validation
        .body("findAll { it.roles.contains('admin') }.size()", equalTo(3))

        // Sum validation
        .body("projects.sum { it.budget }", greaterThan(100000.0f));
}
```

### Authentication

#### Basic Authentication

```java
@Test
public void testBasicAuth() {
    given()
        .baseUri("https://api.example.com")
        .auth()
        .basic("username", "password")
    .when()
        .get("/secure/users")
    .then()
        .statusCode(200);
}

@Test
public void testPreemptiveBasicAuth() {
    // Sends credentials in first request (faster)
    given()
        .baseUri("https://api.example.com")
        .auth()
        .preemptive()
        .basic("username", "password")
    .when()
        .get("/secure/users")
    .then()
        .statusCode(200);
}
```

#### Bearer Token Authentication

```java
@Test
public void testBearerTokenAuth() {
    String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

    given()
        .baseUri("https://api.example.com")
        .header("Authorization", "Bearer " + token)
    .when()
        .get("/secure/users")
    .then()
        .statusCode(200);
}

@Test
public void testBearerTokenAuthWithMethod() {
    String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

    given()
        .baseUri("https://api.example.com")
        .auth()
        .oauth2(token)
    .when()
        .get("/secure/users")
    .then()
        .statusCode(200);
}
```

#### OAuth 2.0 Authentication

```java
public class OAuth2Helper {

    public static String getAccessToken(String clientId, String clientSecret) {
        Response response =
            given()
                .baseUri("https://auth.example.com")
                .contentType("application/x-www-form-urlencoded")
                .formParam("grant_type", "client_credentials")
                .formParam("client_id", clientId)
                .formParam("client_secret", clientSecret)
            .when()
                .post("/oauth/token")
            .then()
                .statusCode(200)
                .extract()
                .response();

        return response.jsonPath().getString("access_token");
    }
}

@Test
public void testOAuth2Authentication() {
    String token = OAuth2Helper.getAccessToken("my-client-id", "my-secret");

    given()
        .baseUri("https://api.example.com")
        .auth()
        .oauth2(token)
    .when()
        .get("/secure/users")
    .then()
        .statusCode(200);
}
```

#### API Key Authentication

```java
@Test
public void testAPIKeyInHeader() {
    given()
        .baseUri("https://api.example.com")
        .header("X-API-Key", "your-api-key-here")
    .when()
        .get("/users")
    .then()
        .statusCode(200);
}

@Test
public void testAPIKeyInQueryParam() {
    given()
        .baseUri("https://api.example.com")
        .queryParam("api_key", "your-api-key-here")
    .when()
        .get("/users")
    .then()
        .statusCode(200);
}
```

### Headers and Cookies

#### Working with Headers

```java
@Test
public void testCustomHeaders() {
    given()
        .baseUri("https://api.example.com")
        .header("Content-Type", "application/json")
        .header("Accept", "application/json")
        .header("X-Custom-Header", "CustomValue")
        .headers("X-Request-ID", "12345",
                "X-Client-Version", "1.0.0")
    .when()
        .get("/users")
    .then()
        .statusCode(200);
}

@Test
public void testDynamicHeaders() {
    Map<String, String> headers = new HashMap<>();
    headers.put("X-Request-ID", UUID.randomUUID().toString());
    headers.put("X-Timestamp", String.valueOf(System.currentTimeMillis()));

    given()
        .baseUri("https://api.example.com")
        .headers(headers)
    .when()
        .get("/users")
    .then()
        .statusCode(200);
}
```

#### Working with Cookies

```java
@Test
public void testWithCookies() {
    given()
        .baseUri("https://api.example.com")
        .cookie("session_id", "abc123xyz")
        .cookie("user_pref", "theme=dark")
    .when()
        .get("/users")
    .then()
        .statusCode(200);
}

@Test
public void testExtractAndUseCookies() {
    // Get cookies from login
    Response loginResponse =
        given()
            .baseUri("https://api.example.com")
            .body("{\"username\":\"user\",\"password\":\"pass\"}")
        .when()
            .post("/login")
        .then()
            .statusCode(200)
            .extract()
            .response();

    String sessionCookie = loginResponse.getCookie("JSESSIONID");

    // Use cookie in subsequent request
    given()
        .baseUri("https://api.example.com")
        .cookie("JSESSIONID", sessionCookie)
    .when()
        .get("/secure/profile")
    .then()
        .statusCode(200);
}
```

### JSON and XML Parsing

#### JSON Request Body

```java
@Test
public void testJSONRequestWithString() {
    String jsonBody = "{"
        + "\"name\": \"John Doe\","
        + "\"email\": \"john@example.com\","
        + "\"role\": \"tester\""
        + "}";

    given()
        .baseUri("https://api.example.com")
        .contentType(ContentType.JSON)
        .body(jsonBody)
    .when()
        .post("/users")
    .then()
        .statusCode(201);
}

@Test
public void testJSONRequestWithMap() {
    Map<String, Object> requestBody = new HashMap<>();
    requestBody.put("name", "John Doe");
    requestBody.put("email", "john@example.com");
    requestBody.put("role", "tester");

    given()
        .baseUri("https://api.example.com")
        .contentType(ContentType.JSON)
        .body(requestBody)
    .when()
        .post("/users")
    .then()
        .statusCode(201);
}

@Test
public void testJSONRequestWithPOJO() {
    User user = new User("John Doe", "john@example.com", "tester");

    given()
        .baseUri("https://api.example.com")
        .contentType(ContentType.JSON)
        .body(user)
    .when()
        .post("/users")
    .then()
        .statusCode(201);
}
```

#### JSON Response Parsing

```java
@Test
public void testJSONResponseParsing() {
    Response response =
        given()
            .baseUri("https://api.example.com")
        .when()
            .get("/users/123")
        .then()
            .statusCode(200)
            .extract()
            .response();

    // Using JsonPath
    JsonPath jsonPath = response.jsonPath();
    String name = jsonPath.getString("name");
    int id = jsonPath.getInt("id");
    List<String> roles = jsonPath.getList("roles");
    String city = jsonPath.getString("address.city");

    // Using response.path()
    String email = response.path("email");

    // Deserialize to POJO
    User user = response.as(User.class);

    // Complex JsonPath queries
    List<String> activeProjectNames = jsonPath.getList(
        "projects.findAll { it.status == 'active' }.name"
    );
}
```

#### Working with XML

```java
@Test
public void testXMLRequest() {
    String xmlBody = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
        + "<user>"
        + "  <name>John Doe</name>"
        + "  <email>john@example.com</email>"
        + "  <role>tester</role>"
        + "</user>";

    given()
        .baseUri("https://api.example.com")
        .contentType(ContentType.XML)
        .body(xmlBody)
    .when()
        .post("/users")
    .then()
        .statusCode(201);
}

@Test
public void testXMLResponseParsing() {
    Response response =
        given()
            .baseUri("https://api.example.com")
            .accept(ContentType.XML)
        .when()
            .get("/users/123")
        .then()
            .statusCode(200)
            .extract()
            .response();

    // Using XmlPath
    XmlPath xmlPath = response.xmlPath();
    String name = xmlPath.getString("user.name");
    int id = xmlPath.getInt("user.id");
    List<String> roles = xmlPath.getList("user.roles.role");
}

@Test
public void testXMLResponseValidation() {
    given()
        .baseUri("https://api.example.com")
        .accept(ContentType.XML)
    .when()
        .get("/users/123")
    .then()
        .statusCode(200)
        .body("user.name", equalTo("John Doe"))
        .body("user.id", equalTo("123"))
        .body("user.roles.role", hasSize(3));
}
```

#### Complex JSON Structures

```java
@Test
public void testComplexJSONRequest() {
    String complexJson = "{"
        + "\"user\": {"
        + "  \"name\": \"John Doe\","
        + "  \"email\": \"john@example.com\","
        + "  \"address\": {"
        + "    \"street\": \"123 Main St\","
        + "    \"city\": \"New York\","
        + "    \"zipcode\": \"10001\""
        + "  },"
        + "  \"roles\": [\"admin\", \"tester\"],"
        + "  \"projects\": ["
        + "    {\"id\": 1, \"name\": \"Project A\", \"status\": \"active\"},"
        + "    {\"id\": 2, \"name\": \"Project B\", \"status\": \"completed\"}"
        + "  ]"
        + "}"
        + "}";

    given()
        .baseUri("https://api.example.com")
        .contentType(ContentType.JSON)
        .body(complexJson)
    .when()
        .post("/users")
    .then()
        .statusCode(201)
        .body("user.id", notNullValue())
        .body("user.address.city", equalTo("New York"))
        .body("user.roles", hasSize(2))
        .body("user.projects[0].name", equalTo("Project A"));
}
```

### Schema Validation

#### JSON Schema Validation

Create a JSON schema file: `user-schema.json`

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 1
    },
    "address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "zipcode": { "type": "string", "pattern": "^\\d{5}$" }
      },
      "required": ["city"]
    }
  },
  "required": ["id", "name", "email"]
}
```

#### Schema Validation Test

```java
import static io.restassured.module.jsv.JsonSchemaValidator.*;

@Test
public void testJSONSchemaValidation() {
    given()
        .baseUri("https://api.example.com")
    .when()
        .get("/users/123")
    .then()
        .statusCode(200)
        .body(matchesJsonSchemaInClasspath("schemas/user-schema.json"));
}

@Test
public void testJSONSchemaValidationWithSettings() {
    given()
        .baseUri("https://api.example.com")
    .when()
        .get("/users/123")
    .then()
        .statusCode(200)
        .body(matchesJsonSchema(new File("schemas/user-schema.json"))
            .using(jsonSchemaFactory()
                .checkedValidation(true)));
}

@Test
public void testInlineSchemaValidation() {
    String schema = "{"
        + "\"type\": \"object\","
        + "\"properties\": {"
        + "  \"id\": {\"type\": \"integer\"},"
        + "  \"name\": {\"type\": \"string\"}"
        + "},"
        + "\"required\": [\"id\", \"name\"]"
        + "}";

    given()
        .baseUri("https://api.example.com")
    .when()
        .get("/users/123")
    .then()
        .statusCode(200)
        .body(matchesJsonSchema(schema));
}
```

---

## Integrating API Tests with Selenium Framework

### Framework Structure

```
src/
├── main/
│   └── java/
│       └── com/
│           └── automation/
│               ├── api/
│               │   ├── client/
│               │   │   ├── APIClient.java
│               │   │   └── APIEndpoints.java
│               │   ├── models/
│               │   │   ├── User.java
│               │   │   ├── Product.java
│               │   │   └── Order.java
│               │   ├── utils/
│               │   │   ├── RequestBuilder.java
│               │   │   ├── ResponseValidator.java
│               │   │   └── AuthHelper.java
│               │   └── config/
│               │       └── APIConfig.java
│               ├── ui/
│               │   ├── pages/
│               │   └── utils/
│               └── common/
│                   ├── config/
│                   └── utils/
└── test/
    └── java/
        └── com/
            └── automation/
                ├── api/
                │   └── tests/
                ├── ui/
                │   └── tests/
                └── hybrid/
                    └── tests/
```

### API Client Implementation

```java
package com.automation.api.client;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import static io.restassured.RestAssured.*;

public class APIClient {

    private String baseURI;
    private String basePath;
    private String authToken;

    public APIClient(String baseURI, String basePath) {
        this.baseURI = baseURI;
        this.basePath = basePath;
        RestAssured.baseURI = baseURI;
        RestAssured.basePath = basePath;
    }

    public void setAuthToken(String token) {
        this.authToken = token;
    }

    private RequestSpecification getRequestSpec() {
        RequestSpecification spec = given()
            .contentType("application/json")
            .accept("application/json");

        if (authToken != null && !authToken.isEmpty()) {
            spec.header("Authorization", "Bearer " + authToken);
        }

        return spec;
    }

    public Response get(String endpoint) {
        return getRequestSpec()
            .when()
            .get(endpoint)
            .then()
            .extract()
            .response();
    }

    public Response get(String endpoint, Map<String, String> queryParams) {
        return getRequestSpec()
            .queryParams(queryParams)
            .when()
            .get(endpoint)
            .then()
            .extract()
            .response();
    }

    public Response post(String endpoint, Object body) {
        return getRequestSpec()
            .body(body)
            .when()
            .post(endpoint)
            .then()
            .extract()
            .response();
    }

    public Response put(String endpoint, Object body) {
        return getRequestSpec()
            .body(body)
            .when()
            .put(endpoint)
            .then()
            .extract()
            .response();
    }

    public Response patch(String endpoint, Object body) {
        return getRequestSpec()
            .body(body)
            .when()
            .patch(endpoint)
            .then()
            .extract()
            .response();
    }

    public Response delete(String endpoint) {
        return getRequestSpec()
            .when()
            .delete(endpoint)
            .then()
            .extract()
            .response();
    }
}
```

### API Endpoints Class

```java
package com.automation.api.client;

public class APIEndpoints {

    // User endpoints
    public static final String USERS = "/users";
    public static final String USER_BY_ID = "/users/{userId}";
    public static final String USER_LOGIN = "/auth/login";
    public static final String USER_LOGOUT = "/auth/logout";

    // Product endpoints
    public static final String PRODUCTS = "/products";
    public static final String PRODUCT_BY_ID = "/products/{productId}";
    public static final String PRODUCT_SEARCH = "/products/search";

    // Order endpoints
    public static final String ORDERS = "/orders";
    public static final String ORDER_BY_ID = "/orders/{orderId}";
    public static final String USER_ORDERS = "/users/{userId}/orders";

    // Cart endpoints
    public static final String CART = "/cart";
    public static final String CART_ITEMS = "/cart/items";
    public static final String CART_ITEM_BY_ID = "/cart/items/{itemId}";
}
```

### Model Classes (POJOs)

```java
package com.automation.api.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {

    private Integer id;
    private String name;
    private String email;
    private String password;
    private String role;
    private Address address;

    // Constructors
    public User() {}

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    // Inner class for Address
    public static class Address {
        private String street;
        private String city;
        private String state;
        private String zipcode;

        // Getters and Setters
        public String getStreet() { return street; }
        public void setStreet(String street) { this.street = street; }

        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }

        public String getState() { return state; }
        public void setState(String state) { this.state = state; }

        public String getZipcode() { return zipcode; }
        public void setZipcode(String zipcode) { this.zipcode = zipcode; }
    }
}
```

```java
package com.automation.api.models;

public class Product {

    private Integer id;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private String category;
    private String imageUrl;

    // Constructors
    public Product() {}

    public Product(String name, Double price, Integer quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
```

### API Configuration

```java
package com.automation.api.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class APIConfig {

    private static Properties properties;
    private static final String CONFIG_FILE = "src/test/resources/api-config.properties";

    static {
        loadProperties();
    }

    private static void loadProperties() {
        properties = new Properties();
        try {
            FileInputStream fis = new FileInputStream(CONFIG_FILE);
            properties.load(fis);
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String getBaseURI() {
        return properties.getProperty("api.base.uri");
    }

    public static String getBasePath() {
        return properties.getProperty("api.base.path");
    }

    public static String getAuthEndpoint() {
        return properties.getProperty("api.auth.endpoint");
    }

    public static String getUsername() {
        return properties.getProperty("api.test.username");
    }

    public static String getPassword() {
        return properties.getProperty("api.test.password");
    }

    public static int getTimeout() {
        return Integer.parseInt(properties.getProperty("api.timeout", "30000"));
    }
}
```

### API Config Properties File

```properties
# api-config.properties
api.base.uri=https://api.example.com
api.base.path=/api/v1
api.auth.endpoint=/auth/login
api.test.username=test.user@example.com
api.test.password=Test@123
api.timeout=30000
```

---

## Hybrid Testing Scenarios (API + UI)

### Scenario 1: API Setup + UI Validation

```java
package com.automation.hybrid.tests;

import com.automation.api.client.APIClient;
import com.automation.api.models.User;
import com.automation.ui.pages.LoginPage;
import com.automation.ui.pages.DashboardPage;
import org.testng.annotations.Test;
import io.restassured.response.Response;
import static org.testng.Assert.*;

public class HybridUserTest extends BaseTest {

    @Test
    public void testCreateUserViaAPIAndLoginViaUI() {
        // Step 1: Create user via API
        User newUser = new User();
        newUser.setName("Test User");
        newUser.setEmail("testuser" + System.currentTimeMillis() + "@example.com");
        newUser.setPassword("Test@123");

        Response response = apiClient.post(APIEndpoints.USERS, newUser);
        assertEquals(response.getStatusCode(), 201, "User creation failed");

        Integer userId = response.jsonPath().getInt("id");
        assertNotNull(userId, "User ID should not be null");

        // Step 2: Login via UI
        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateTo();
        loginPage.login(newUser.getEmail(), newUser.getPassword());

        // Step 3: Verify UI shows correct user
        DashboardPage dashboard = new DashboardPage(driver);
        assertTrue(dashboard.isDisplayed(), "Dashboard should be displayed");
        assertEquals(dashboard.getLoggedInUserName(), newUser.getName());

        // Step 4: Cleanup via API
        Response deleteResponse = apiClient.delete(
            APIEndpoints.USER_BY_ID.replace("{userId}", userId.toString())
        );
        assertEquals(deleteResponse.getStatusCode(), 204, "User deletion failed");
    }
}
```

### Scenario 2: UI Action + API Verification

```java
@Test
public void testUIOrderCreationWithAPIVerification() {
    // Step 1: Login via UI
    LoginPage loginPage = new LoginPage(driver);
    loginPage.navigateTo();
    loginPage.login(testUser.getEmail(), testUser.getPassword());

    // Step 2: Create order via UI
    ProductPage productPage = new ProductPage(driver);
    productPage.navigateTo();
    productPage.addProductToCart("Laptop");

    CartPage cartPage = new CartPage(driver);
    cartPage.navigateTo();
    String orderNumber = cartPage.checkout();

    // Step 3: Verify order via API
    Response response = apiClient.get(
        APIEndpoints.USER_ORDERS.replace("{userId}", testUser.getId().toString())
    );
    assertEquals(response.getStatusCode(), 200);

    List<Map<String, Object>> orders = response.jsonPath().getList("$");
    boolean orderFound = orders.stream()
        .anyMatch(order -> order.get("orderNumber").equals(orderNumber));

    assertTrue(orderFound, "Order not found in API response");

    // Step 4: Verify order details
    Map<String, Object> order = orders.stream()
        .filter(o -> o.get("orderNumber").equals(orderNumber))
        .findFirst()
        .orElse(null);

    assertNotNull(order);
    assertEquals(order.get("status"), "pending");
    assertTrue(((List<?>) order.get("items")).size() > 0);
}
```

### Scenario 3: API Test Data Setup for UI Tests

```java
public class TestDataSetup {

    private APIClient apiClient;

    public TestDataSetup(APIClient apiClient) {
        this.apiClient = apiClient;
    }

    public User createTestUser() {
        User user = new User();
        user.setName("Test User " + System.currentTimeMillis());
        user.setEmail("user" + System.currentTimeMillis() + "@test.com");
        user.setPassword("Test@123");
        user.setRole("customer");

        Response response = apiClient.post(APIEndpoints.USERS, user);
        assertEquals(response.getStatusCode(), 201);

        return response.as(User.class);
    }

    public Product createTestProduct(String name, Double price) {
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setQuantity(100);
        product.setCategory("Electronics");

        Response response = apiClient.post(APIEndpoints.PRODUCTS, product);
        assertEquals(response.getStatusCode(), 201);

        return response.as(Product.class);
    }

    public void deleteUser(Integer userId) {
        apiClient.delete(APIEndpoints.USER_BY_ID.replace("{userId}", userId.toString()));
    }

    public void deleteProduct(Integer productId) {
        apiClient.delete(APIEndpoints.PRODUCT_BY_ID.replace("{productId}", productId.toString()));
    }
}
```

### Using Test Data Setup

```java
public class UITestWithAPISetup extends BaseTest {

    private TestDataSetup dataSetup;
    private User testUser;
    private Product testProduct;

    @BeforeClass
    public void setupTestData() {
        dataSetup = new TestDataSetup(apiClient);
        testUser = dataSetup.createTestUser();
        testProduct = dataSetup.createTestProduct("Test Laptop", 999.99);
    }

    @Test
    public void testProductPurchaseFlow() {
        // Login
        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateTo();
        loginPage.login(testUser.getEmail(), testUser.getPassword());

        // Search for product
        ProductPage productPage = new ProductPage(driver);
        productPage.searchProduct(testProduct.getName());

        // Add to cart
        assertTrue(productPage.isProductDisplayed(testProduct.getName()));
        productPage.addProductToCart(testProduct.getName());

        // Verify cart
        CartPage cartPage = new CartPage(driver);
        cartPage.navigateTo();
        assertTrue(cartPage.isProductInCart(testProduct.getName()));
        assertEquals(cartPage.getProductPrice(testProduct.getName()),
                    testProduct.getPrice());
    }

    @AfterClass
    public void cleanupTestData() {
        dataSetup.deleteUser(testUser.getId());
        dataSetup.deleteProduct(testProduct.getId());
    }
}
```

### Scenario 4: Parallel API and UI Validation

```java
@Test
public void testUserProfileUpdateBothAPIAndUI() {
    // Update user profile via API
    Map<String, String> updates = new HashMap<>();
    updates.put("name", "Updated Name");
    updates.put("phone", "+1234567890");

    Response apiResponse = apiClient.patch(
        APIEndpoints.USER_BY_ID.replace("{userId}", testUser.getId().toString()),
        updates
    );
    assertEquals(apiResponse.getStatusCode(), 200);

    // Verify via UI
    LoginPage loginPage = new LoginPage(driver);
    loginPage.navigateTo();
    loginPage.login(testUser.getEmail(), testUser.getPassword());

    ProfilePage profilePage = new ProfilePage(driver);
    profilePage.navigateTo();

    assertEquals(profilePage.getUserName(), "Updated Name");
    assertEquals(profilePage.getUserPhone(), "+1234567890");

    // Verify via API again
    Response getResponse = apiClient.get(
        APIEndpoints.USER_BY_ID.replace("{userId}", testUser.getId().toString())
    );

    assertEquals(getResponse.jsonPath().getString("name"), "Updated Name");
    assertEquals(getResponse.jsonPath().getString("phone"), "+1234567890");
}
```

---

## Test Data Setup Using APIs

### Database State Management

```java
public class DatabaseStateManager {

    private APIClient apiClient;

    public DatabaseStateManager(APIClient apiClient) {
        this.apiClient = apiClient;
    }

    /**
     * Setup initial state for test
     */
    public TestContext setupTestState() {
        TestContext context = new TestContext();

        // Create test user
        User user = createUser();
        context.setUser(user);

        // Create test products
        List<Product> products = createProducts(5);
        context.setProducts(products);

        // Create test orders
        Order order = createOrder(user.getId(), products.get(0).getId());
        context.setOrder(order);

        return context;
    }

    /**
     * Cleanup test state
     */
    public void cleanupTestState(TestContext context) {
        // Delete orders
        if (context.getOrder() != null) {
            deleteOrder(context.getOrder().getId());
        }

        // Delete products
        for (Product product : context.getProducts()) {
            deleteProduct(product.getId());
        }

        // Delete user
        if (context.getUser() != null) {
            deleteUser(context.getUser().getId());
        }
    }

    private User createUser() {
        User user = new User();
        user.setName("Test User " + UUID.randomUUID());
        user.setEmail("user" + System.currentTimeMillis() + "@test.com");
        user.setPassword("Test@123");

        Response response = apiClient.post(APIEndpoints.USERS, user);
        return response.as(User.class);
    }

    private List<Product> createProducts(int count) {
        List<Product> products = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            Product product = new Product();
            product.setName("Product " + i + " " + UUID.randomUUID());
            product.setPrice(100.0 + (i * 50));
            product.setQuantity(10);

            Response response = apiClient.post(APIEndpoints.PRODUCTS, product);
            products.add(response.as(Product.class));
        }
        return products;
    }

    private Order createOrder(Integer userId, Integer productId) {
        Map<String, Object> orderRequest = new HashMap<>();
        orderRequest.put("userId", userId);
        orderRequest.put("items", Arrays.asList(
            Map.of("productId", productId, "quantity", 1)
        ));

        Response response = apiClient.post(APIEndpoints.ORDERS, orderRequest);
        return response.as(Order.class);
    }

    private void deleteOrder(Integer orderId) {
        apiClient.delete(APIEndpoints.ORDER_BY_ID.replace("{orderId}", orderId.toString()));
    }

    private void deleteProduct(Integer productId) {
        apiClient.delete(APIEndpoints.PRODUCT_BY_ID.replace("{productId}", productId.toString()));
    }

    private void deleteUser(Integer userId) {
        apiClient.delete(APIEndpoints.USER_BY_ID.replace("{userId}", userId.toString()));
    }
}
```

### Test Context Class

```java
public class TestContext {

    private User user;
    private List<Product> products;
    private Order order;
    private Map<String, Object> additionalData;

    public TestContext() {
        this.products = new ArrayList<>();
        this.additionalData = new HashMap<>();
    }

    // Getters and Setters
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public List<Product> getProducts() { return products; }
    public void setProducts(List<Product> products) { this.products = products; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public void setData(String key, Object value) {
        additionalData.put(key, value);
    }

    public Object getData(String key) {
        return additionalData.get(key);
    }
}
```

### Using Test Context in Tests

```java
public class TestWithContext extends BaseTest {

    private DatabaseStateManager stateManager;
    private TestContext testContext;

    @BeforeClass
    public void setupTestEnvironment() {
        stateManager = new DatabaseStateManager(apiClient);
        testContext = stateManager.setupTestState();
    }

    @Test
    public void testOrderWorkflow() {
        User user = testContext.getUser();
        Product product = testContext.getProducts().get(0);

        // Login with test user
        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateTo();
        loginPage.login(user.getEmail(), user.getPassword());

        // Navigate to product
        ProductPage productPage = new ProductPage(driver);
        productPage.navigateTo();
        productPage.searchProduct(product.getName());
        productPage.addProductToCart(product.getName());

        // Complete order
        CartPage cartPage = new CartPage(driver);
        cartPage.navigateTo();
        String orderNumber = cartPage.checkout();

        // Verify via API
        Response response = apiClient.get(
            APIEndpoints.ORDER_BY_ID.replace("{orderId}", orderNumber)
        );
        assertEquals(response.getStatusCode(), 200);
        assertEquals(response.jsonPath().getInt("userId"), user.getId());
    }

    @AfterClass
    public void cleanupTestEnvironment() {
        stateManager.cleanupTestState(testContext);
    }
}
```

---

## API Mocking and Stubbing

### When to Use Mocking

- **External dependencies unavailable**: Third-party APIs down or in development
- **Unpredictable responses**: Test edge cases and error scenarios
- **Performance testing**: Remove network latency
- **Cost reduction**: Avoid paid API calls during testing
- **Isolation**: Test without affecting real data

### Using WireMock

#### WireMock Setup

```xml
<dependency>
    <groupId>com.github.tomakehurst</groupId>
    <artifactId>wiremock-jre8</artifactId>
    <version>2.35.0</version>
    <scope>test</scope>
</dependency>
```

#### Basic WireMock Example

```java
import com.github.tomakehurst.wiremock.WireMockServer;
import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.options;

public class WireMockTest {

    private WireMockServer wireMockServer;

    @BeforeClass
    public void setupMockServer() {
        wireMockServer = new WireMockServer(options().port(8089));
        wireMockServer.start();
        configureFor("localhost", 8089);
    }

    @Test
    public void testWithMockedAPI() {
        // Setup stub
        stubFor(get(urlEqualTo("/api/users/123"))
            .willReturn(aResponse()
                .withStatus(200)
                .withHeader("Content-Type", "application/json")
                .withBody("{"
                    + "\"id\": 123,"
                    + "\"name\": \"Mocked User\","
                    + "\"email\": \"mocked@example.com\""
                    + "}")));

        // Make request to mock server
        Response response = given()
            .baseUri("http://localhost:8089")
        .when()
            .get("/api/users/123")
        .then()
            .statusCode(200)
            .extract()
            .response();

        assertEquals(response.jsonPath().getString("name"), "Mocked User");
    }

    @AfterClass
    public void stopMockServer() {
        wireMockServer.stop();
    }
}
```

#### Advanced Mocking Scenarios

```java
@Test
public void testMockWithDynamicResponse() {
    // Mock with request matching
    stubFor(get(urlPathMatching("/api/users/.*"))
        .withQueryParam("role", equalTo("admin"))
        .willReturn(aResponse()
            .withStatus(200)
            .withBodyFile("admin-users.json")));

    // Mock POST request
    stubFor(post(urlEqualTo("/api/users"))
        .withRequestBody(containing("email"))
        .willReturn(aResponse()
            .withStatus(201)
            .withBody("{\"id\": 456, \"message\": \"User created\"}")));

    // Mock with delay
    stubFor(get(urlEqualTo("/api/slow-endpoint"))
        .willReturn(aResponse()
            .withStatus(200)
            .withFixedDelay(3000)
            .withBody("{\"message\": \"Slow response\"}")));

    // Mock with error
    stubFor(get(urlEqualTo("/api/error"))
        .willReturn(aResponse()
            .withStatus(500)
            .withBody("{\"error\": \"Internal server error\"}")));
}

@Test
public void testMockVerification() {
    // Perform request
    given()
        .baseUri("http://localhost:8089")
    .when()
        .get("/api/users/123");

    // Verify request was made
    verify(getRequestedFor(urlEqualTo("/api/users/123")));

    // Verify request count
    verify(exactly(1), getRequestedFor(urlEqualTo("/api/users/123")));

    // Verify with headers
    verify(getRequestedFor(urlEqualTo("/api/users/123"))
        .withHeader("Accept", containing("application/json")));
}
```

#### Mock Response Files

Create `src/test/resources/__files/admin-users.json`:

```json
{
  "users": [
    {
      "id": 1,
      "name": "Admin User 1",
      "email": "admin1@example.com",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Admin User 2",
      "email": "admin2@example.com",
      "role": "admin"
    }
  ]
}
```

---

## Performance Considerations

### Response Time Validation

```java
@Test
public void testResponseTime() {
    given()
        .baseUri("https://api.example.com")
    .when()
        .get("/users")
    .then()
        .statusCode(200)
        .time(lessThan(2000L), TimeUnit.MILLISECONDS);
}

@Test
public void testResponseTimeDetailed() {
    long startTime = System.currentTimeMillis();

    Response response = given()
        .baseUri("https://api.example.com")
    .when()
        .get("/users")
    .then()
        .extract()
        .response();

    long endTime = System.currentTimeMillis();
    long responseTime = endTime - startTime;

    System.out.println("Response Time: " + responseTime + " ms");
    Assert.assertTrue(responseTime < 2000, "Response time exceeded 2 seconds");
}
```

### Load Testing with API

```java
@Test
public void testConcurrentAPIRequests() throws InterruptedException {
    int numberOfThreads = 10;
    int numberOfRequestsPerThread = 5;

    ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);
    List<Future<?>> futures = new ArrayList<>();

    for (int i = 0; i < numberOfThreads; i++) {
        Future<?> future = executor.submit(() -> {
            for (int j = 0; j < numberOfRequestsPerThread; j++) {
                Response response = given()
                    .baseUri("https://api.example.com")
                .when()
                    .get("/users")
                .then()
                    .extract()
                    .response();

                assertEquals(response.getStatusCode(), 200);
            }
        });
        futures.add(future);
    }

    // Wait for all threads to complete
    for (Future<?> future : futures) {
        try {
            future.get();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }

    executor.shutdown();
}
```

### Performance Metrics Collection

```java
public class PerformanceMetrics {

    private List<Long> responseTimes;

    public PerformanceMetrics() {
        this.responseTimes = new ArrayList<>();
    }

    public void recordResponseTime(long responseTime) {
        responseTimes.add(responseTime);
    }

    public double getAverageResponseTime() {
        return responseTimes.stream()
            .mapToLong(Long::longValue)
            .average()
            .orElse(0.0);
    }

    public long getMinResponseTime() {
        return responseTimes.stream()
            .mapToLong(Long::longValue)
            .min()
            .orElse(0L);
    }

    public long getMaxResponseTime() {
        return responseTimes.stream()
            .mapToLong(Long::longValue)
            .max()
            .orElse(0L);
    }

    public double getPercentile(double percentile) {
        List<Long> sorted = new ArrayList<>(responseTimes);
        Collections.sort(sorted);
        int index = (int) Math.ceil(percentile / 100.0 * sorted.size()) - 1;
        return sorted.get(index);
    }

    public void printMetrics() {
        System.out.println("=== Performance Metrics ===");
        System.out.println("Total Requests: " + responseTimes.size());
        System.out.println("Average Response Time: " + getAverageResponseTime() + " ms");
        System.out.println("Min Response Time: " + getMinResponseTime() + " ms");
        System.out.println("Max Response Time: " + getMaxResponseTime() + " ms");
        System.out.println("95th Percentile: " + getPercentile(95) + " ms");
        System.out.println("99th Percentile: " + getPercentile(99) + " ms");
    }
}
```

---

## API Test Reporting

### Extent Reports Integration

```java
public class APITestListener implements ITestListener {

    private static ExtentReports extent;
    private static ExtentTest test;

    @Override
    public void onStart(ITestContext context) {
        extent = ExtentManager.createInstance("api-test-report.html");
    }

    @Override
    public void onTestStart(ITestResult result) {
        test = extent.createTest(result.getMethod().getMethodName());
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        test.log(Status.PASS, "Test passed");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        test.log(Status.FAIL, result.getThrowable());
    }

    @Override
    public void onFinish(ITestContext context) {
        extent.flush();
    }
}
```

### Custom API Logger

```java
public class APILogger {

    private static final Logger logger = LogManager.getLogger(APILogger.class);

    public static void logRequest(String method, String endpoint, Object body) {
        logger.info("=== API Request ===");
        logger.info("Method: " + method);
        logger.info("Endpoint: " + endpoint);
        if (body != null) {
            logger.info("Body: " + new Gson().toJson(body));
        }
    }

    public static void logResponse(Response response) {
        logger.info("=== API Response ===");
        logger.info("Status Code: " + response.getStatusCode());
        logger.info("Response Time: " + response.getTime() + " ms");
        logger.info("Response Body: " + response.getBody().asString());
    }

    public static void logError(String message, Throwable throwable) {
        logger.error("=== API Error ===");
        logger.error("Message: " + message);
        logger.error("Exception: ", throwable);
    }
}
```

### Request/Response Logging with Filters

```java
@Test
public void testWithRequestResponseLogging() {
    given()
        .baseUri("https://api.example.com")
        .filter(new RequestLoggingFilter())
        .filter(new ResponseLoggingFilter())
        .log().all()  // Log everything
    .when()
        .get("/users")
    .then()
        .log().all()  // Log response
        .statusCode(200);
}

@Test
public void testWithConditionalLogging() {
    given()
        .baseUri("https://api.example.com")
        .log().ifValidationFails()  // Log only if test fails
    .when()
        .get("/users")
    .then()
        .log().ifError()  // Log response only if error
        .statusCode(200);
}
```

---

## Best Practices for API Testing

### 1. Test Organization

```java
// Good: Organized by feature
src/test/java/
├── api/
│   ├── users/
│   │   ├── UserCreationTests.java
│   │   ├── UserUpdateTests.java
│   │   └── UserDeletionTests.java
│   ├── products/
│   │   ├── ProductCRUDTests.java
│   │   └── ProductSearchTests.java
│   └── orders/
│       ├── OrderCreationTests.java
│       └── OrderStatusTests.java
```

### 2. Use Constants

```java
// Good: Use constants for repeated values
public class APIConstants {
    public static final String BASE_URI = "https://api.example.com";
    public static final String API_VERSION = "/api/v1";

    public static final int SUCCESS = 200;
    public static final int CREATED = 201;
    public static final int BAD_REQUEST = 400;
    public static final int UNAUTHORIZED = 401;
    public static final int NOT_FOUND = 404;

    public static final String CONTENT_TYPE_JSON = "application/json";
    public static final String CONTENT_TYPE_XML = "application/xml";
}
```

### 3. Implement Retry Logic

```java
public class APIRetryAnalyzer implements IRetryAnalyzer {

    private int retryCount = 0;
    private static final int MAX_RETRY = 3;

    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < MAX_RETRY) {
            retryCount++;
            return true;
        }
        return false;
    }
}

// Use in test
@Test(retryAnalyzer = APIRetryAnalyzer.class)
public void testWithRetry() {
    // Test code
}
```

### 4. Environment-Specific Configuration

```java
public class EnvironmentConfig {

    private static final String ENV = System.getProperty("env", "dev");

    public static String getBaseURI() {
        switch (ENV.toLowerCase()) {
            case "prod":
                return "https://api.production.com";
            case "staging":
                return "https://api.staging.com";
            case "dev":
            default:
                return "https://api.dev.com";
        }
    }
}
```

### 5. Data-Driven API Testing

```java
@DataProvider(name = "userData")
public Object[][] getUserData() {
    return new Object[][] {
        {"user1@test.com", "Password1", 200},
        {"user2@test.com", "Password2", 200},
        {"invalid@test.com", "wrong", 401}
    };
}

@Test(dataProvider = "userData")
public void testLoginWithMultipleUsers(String email, String password, int expectedStatus) {
    Map<String, String> credentials = new HashMap<>();
    credentials.put("email", email);
    credentials.put("password", password);

    given()
        .baseUri("https://api.example.com")
        .body(credentials)
    .when()
        .post("/auth/login")
    .then()
        .statusCode(expectedStatus);
}
```

### 6. Proper Error Handling

```java
@Test
public void testWithProperErrorHandling() {
    try {
        Response response = given()
            .baseUri("https://api.example.com")
        .when()
            .get("/users/999")
        .then()
            .extract()
            .response();

        if (response.getStatusCode() == 404) {
            String errorMessage = response.jsonPath().getString("message");
            Assert.assertEquals(errorMessage, "User not found");
        } else if (response.getStatusCode() >= 500) {
            Assert.fail("Server error occurred: " + response.getStatusCode());
        } else {
            Assert.assertEquals(response.getStatusCode(), 200);
        }
    } catch (Exception e) {
        APILogger.logError("Test failed", e);
        throw e;
    }
}
```

### 7. Use Builder Pattern for Complex Requests

```java
public class UserRequestBuilder {

    private User user;

    public UserRequestBuilder() {
        this.user = new User();
    }

    public UserRequestBuilder withName(String name) {
        user.setName(name);
        return this;
    }

    public UserRequestBuilder withEmail(String email) {
        user.setEmail(email);
        return this;
    }

    public UserRequestBuilder withPassword(String password) {
        user.setPassword(password);
        return this;
    }

    public UserRequestBuilder withRole(String role) {
        user.setRole(role);
        return this;
    }

    public User build() {
        return user;
    }
}

// Usage
@Test
public void testWithBuilder() {
    User user = new UserRequestBuilder()
        .withName("John Doe")
        .withEmail("john@example.com")
        .withPassword("Test@123")
        .withRole("admin")
        .build();

    given()
        .baseUri("https://api.example.com")
        .body(user)
    .when()
        .post("/users")
    .then()
        .statusCode(201);
}
```

### 8. API Contract Testing

```java
@Test
public void testAPIContract() {
    // Ensure API response matches expected contract
    given()
        .baseUri("https://api.example.com")
    .when()
        .get("/users/123")
    .then()
        .statusCode(200)
        .body("$", hasKey("id"))
        .body("$", hasKey("name"))
        .body("$", hasKey("email"))
        .body("id", instanceOf(Integer.class))
        .body("name", instanceOf(String.class))
        .body("email", matchesPattern("^[A-Za-z0-9+_.-]+@(.+)$"));
}
```

---

## Common Patterns and Solutions

### Pattern 1: Authentication Token Management

```java
public class TokenManager {

    private static String token;
    private static long tokenExpiry;

    public static String getToken(APIClient apiClient) {
        // Return cached token if still valid
        if (token != null && System.currentTimeMillis() < tokenExpiry) {
            return token;
        }

        // Get new token
        Map<String, String> credentials = new HashMap<>();
        credentials.put("username", APIConfig.getUsername());
        credentials.put("password", APIConfig.getPassword());

        Response response = apiClient.post(APIEndpoints.USER_LOGIN, credentials);

        token = response.jsonPath().getString("token");
        int expiresIn = response.jsonPath().getInt("expiresIn");
        tokenExpiry = System.currentTimeMillis() + (expiresIn * 1000);

        return token;
    }

    public static void invalidateToken() {
        token = null;
        tokenExpiry = 0;
    }
}
```

### Pattern 2: Pagination Handling

```java
public class PaginationHelper {

    public static List<Map<String, Object>> getAllPages(APIClient apiClient, String endpoint) {
        List<Map<String, Object>> allItems = new ArrayList<>();
        int page = 1;
        boolean hasMore = true;

        while (hasMore) {
            Response response = apiClient.get(endpoint + "?page=" + page + "&size=100");

            List<Map<String, Object>> items = response.jsonPath().getList("items");
            allItems.addAll(items);

            hasMore = response.jsonPath().getBoolean("hasMore");
            page++;
        }

        return allItems;
    }
}
```

### Pattern 3: Dynamic Endpoint Builder

```java
public class EndpointBuilder {

    private StringBuilder endpoint;
    private Map<String, String> queryParams;

    public EndpointBuilder(String baseEndpoint) {
        this.endpoint = new StringBuilder(baseEndpoint);
        this.queryParams = new HashMap<>();
    }

    public EndpointBuilder withPathParam(String key, String value) {
        String placeholder = "{" + key + "}";
        int index = endpoint.indexOf(placeholder);
        if (index != -1) {
            endpoint.replace(index, index + placeholder.length(), value);
        }
        return this;
    }

    public EndpointBuilder withQueryParam(String key, String value) {
        queryParams.put(key, value);
        return this;
    }

    public String build() {
        if (queryParams.isEmpty()) {
            return endpoint.toString();
        }

        endpoint.append("?");
        queryParams.forEach((key, value) ->
            endpoint.append(key).append("=").append(value).append("&")
        );

        // Remove trailing &
        endpoint.deleteCharAt(endpoint.length() - 1);

        return endpoint.toString();
    }
}

// Usage
@Test
public void testWithEndpointBuilder() {
    String endpoint = new EndpointBuilder("/users/{userId}/orders")
        .withPathParam("userId", "123")
        .withQueryParam("status", "active")
        .withQueryParam("sort", "date")
        .build();

    // Results in: /users/123/orders?status=active&sort=date
}
```

### Pattern 4: File Upload

```java
@Test
public void testFileUpload() {
    File file = new File("src/test/resources/test-image.jpg");

    given()
        .baseUri("https://api.example.com")
        .multiPart("file", file)
        .multiPart("description", "Test image upload")
    .when()
        .post("/upload")
    .then()
        .statusCode(201)
        .body("fileId", notNullValue())
        .body("filename", equalTo("test-image.jpg"));
}
```

### Pattern 5: File Download

```java
@Test
public void testFileDownload() {
    byte[] fileBytes = given()
        .baseUri("https://api.example.com")
    .when()
        .get("/files/123/download")
    .then()
        .statusCode(200)
        .extract()
        .asByteArray();

    // Save to file
    try {
        Files.write(Paths.get("downloaded-file.pdf"), fileBytes);
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

---

## Complete Hybrid Framework Example

### Base Test Class

```java
package com.automation.base;

import com.automation.api.client.APIClient;
import com.automation.api.config.APIConfig;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;
import io.github.bonigarcia.wdm.WebDriverManager;

public class BaseTest {

    protected WebDriver driver;
    protected APIClient apiClient;

    @BeforeClass
    public void setup() {
        // Setup API Client
        apiClient = new APIClient(
            APIConfig.getBaseURI(),
            APIConfig.getBasePath()
        );

        // Setup WebDriver
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @AfterClass
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### Complete Hybrid Test

```java
package com.automation.tests;

import com.automation.api.models.*;
import com.automation.ui.pages.*;
import com.automation.base.BaseTest;
import io.restassured.response.Response;
import org.testng.annotations.Test;
import static org.testng.Assert.*;

public class CompleteHybridTest extends BaseTest {

    @Test
    public void testCompleteEcommerceWorkflow() {
        // ========== Step 1: Create test user via API ==========
        User testUser = new User();
        testUser.setName("Test Customer");
        testUser.setEmail("customer" + System.currentTimeMillis() + "@test.com");
        testUser.setPassword("Test@123");

        Response createUserResponse = apiClient.post("/users", testUser);
        assertEquals(createUserResponse.getStatusCode(), 201);

        User createdUser = createUserResponse.as(User.class);
        assertNotNull(createdUser.getId());

        // ========== Step 2: Create test products via API ==========
        Product product1 = new Product("Laptop", 999.99, 10);
        Product product2 = new Product("Mouse", 29.99, 50);

        Response createProduct1Response = apiClient.post("/products", product1);
        Response createProduct2Response = apiClient.post("/products", product2);

        assertEquals(createProduct1Response.getStatusCode(), 201);
        assertEquals(createProduct2Response.getStatusCode(), 201);

        Product createdProduct1 = createProduct1Response.as(Product.class);
        Product createdProduct2 = createProduct2Response.as(Product.class);

        // ========== Step 3: Login via UI ==========
        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateTo();
        loginPage.login(createdUser.getEmail(), createdUser.getPassword());

        DashboardPage dashboard = new DashboardPage(driver);
        assertTrue(dashboard.isDisplayed());
        assertEquals(dashboard.getLoggedInUserName(), createdUser.getName());

        // ========== Step 4: Browse and add products via UI ==========
        ProductPage productPage = new ProductPage(driver);
        productPage.navigateTo();

        productPage.searchProduct(createdProduct1.getName());
        assertTrue(productPage.isProductDisplayed(createdProduct1.getName()));
        productPage.addProductToCart(createdProduct1.getName());

        productPage.searchProduct(createdProduct2.getName());
        assertTrue(productPage.isProductDisplayed(createdProduct2.getName()));
        productPage.addProductToCart(createdProduct2.getName());

        // ========== Step 5: Verify cart via UI ==========
        CartPage cartPage = new CartPage(driver);
        cartPage.navigateTo();

        assertTrue(cartPage.isProductInCart(createdProduct1.getName()));
        assertTrue(cartPage.isProductInCart(createdProduct2.getName()));

        double expectedTotal = createdProduct1.getPrice() + createdProduct2.getPrice();
        assertEquals(cartPage.getTotalAmount(), expectedTotal, 0.01);

        // ========== Step 6: Checkout via UI ==========
        String orderNumber = cartPage.checkout();
        assertNotNull(orderNumber);

        OrderConfirmationPage confirmationPage = new OrderConfirmationPage(driver);
        assertTrue(confirmationPage.isDisplayed());
        assertEquals(confirmationPage.getOrderNumber(), orderNumber);

        // ========== Step 7: Verify order via API ==========
        Response getOrderResponse = apiClient.get("/orders/" + orderNumber);
        assertEquals(getOrderResponse.getStatusCode(), 200);

        assertEquals(getOrderResponse.jsonPath().getInt("userId"), createdUser.getId());
        assertEquals(getOrderResponse.jsonPath().getString("status"), "pending");

        List<Map<String, Object>> orderItems = getOrderResponse.jsonPath().getList("items");
        assertEquals(orderItems.size(), 2);

        // ========== Step 8: Update order status via API ==========
        Map<String, String> statusUpdate = new HashMap<>();
        statusUpdate.put("status", "confirmed");

        Response updateOrderResponse = apiClient.patch("/orders/" + orderNumber, statusUpdate);
        assertEquals(updateOrderResponse.getStatusCode(), 200);

        // ========== Step 9: Verify status update via UI ==========
        OrderHistoryPage orderHistory = new OrderHistoryPage(driver);
        orderHistory.navigateTo();

        assertEquals(orderHistory.getOrderStatus(orderNumber), "Confirmed");

        // ========== Step 10: Verify inventory updated via API ==========
        Response getProduct1Response = apiClient.get("/products/" + createdProduct1.getId());
        int updatedQuantity1 = getProduct1Response.jsonPath().getInt("quantity");
        assertEquals(updatedQuantity1, product1.getQuantity() - 1);

        // ========== Step 11: Cleanup ==========
        apiClient.delete("/orders/" + orderNumber);
        apiClient.delete("/products/" + createdProduct1.getId());
        apiClient.delete("/products/" + createdProduct2.getId());
        apiClient.delete("/users/" + createdUser.getId());
    }
}
```

---

## Practical Exercises

### Exercise 1: Basic API Testing
Create REST Assured tests for a public API (jsonplaceholder.typicode.com):
- Test GET all posts
- Test GET single post
- Test POST create new post
- Test PUT update post
- Test DELETE post
- Validate response schemas

### Exercise 2: Authentication Flow
Implement authentication tests:
- Test successful login with valid credentials
- Test login failure with invalid credentials
- Store and reuse authentication token
- Test token expiration
- Test protected endpoints with and without token

### Exercise 3: API Test Framework
Build a mini API test framework:
- Create APIClient class with reusable methods
- Create POJO models for requests/responses
- Implement request/response logging
- Add configuration management
- Create base test class

### Exercise 4: Hybrid Testing
Create hybrid tests:
- Use API to create test user
- Login via UI with API-created user
- Perform UI actions
- Verify results via API
- Cleanup via API

### Exercise 5: Data-Driven API Testing
Implement data-driven tests:
- Read test data from Excel/CSV
- Create parameterized tests
- Validate multiple scenarios
- Generate test report

### Exercise 6: Schema Validation
Create schema validation tests:
- Define JSON schemas for your APIs
- Implement schema validation tests
- Test both positive and negative scenarios
- Validate different response structures

### Exercise 7: Performance Testing
Implement basic performance tests:
- Measure response times
- Test with concurrent users
- Collect and analyze metrics
- Set performance benchmarks

### Exercise 8: Error Handling
Create comprehensive error handling tests:
- Test various error scenarios (400, 401, 403, 404, 500)
- Validate error messages
- Test edge cases
- Verify error recovery

### Exercise 9: File Operations
Implement file upload/download tests:
- Test file upload with different file types
- Validate uploaded file metadata
- Test file download
- Verify downloaded file integrity

### Exercise 10: Complete E2E Test
Build a complete end-to-end test:
- Setup test data via API
- Perform UI workflow
- Validate via API
- Update data via API
- Verify UI reflects changes
- Cleanup test data

---

## Key Takeaways

1. **API testing is faster and more reliable** than UI testing for validating business logic and backend functionality

2. **REST Assured provides a fluent API** for writing readable and maintainable API tests in Java

3. **Hybrid testing (API + UI) is the optimal approach** for comprehensive test coverage and efficient test execution

4. **Use APIs for test data setup and teardown** to make tests faster, more reliable, and independent

5. **Authentication handling is critical** - implement proper token management and reuse mechanisms

6. **Response validation should be comprehensive** - validate status codes, headers, body content, and schemas

7. **Schema validation ensures API contract compliance** and catches breaking changes early

8. **POJOs (Plain Old Java Objects) make API testing cleaner** by providing type safety and better code organization

9. **Request and response logging is essential** for debugging and maintaining test visibility

10. **Separation of concerns improves maintainability** - keep API client, models, and tests in separate packages

11. **Configuration management is crucial** - use property files for environment-specific settings

12. **Error handling should cover all scenarios** - test both happy paths and error conditions

13. **Performance testing with APIs is straightforward** - measure response times and concurrent user handling

14. **Mocking and stubbing enable isolated testing** - use tools like WireMock for testing without dependencies

15. **Reusable components reduce duplication** - create utility classes for common operations

16. **Data-driven testing increases coverage** - parameterize tests to cover multiple scenarios efficiently

17. **Proper test organization improves scalability** - structure tests by feature/module

18. **API tests integrate seamlessly with CI/CD** pipelines for continuous testing

19. **Response time validation prevents performance regression** - set and monitor performance benchmarks

20. **Documentation through code is valuable** - well-written API tests serve as living documentation

---

## Interview Questions

### Basic Level

**Q1: What is API testing and why is it important?**
**A:** API testing is a type of software testing that validates Application Programming Interfaces directly, without using the user interface. It's important because:
- Tests business logic layer directly
- Faster execution than UI tests
- Can test functionality not accessible through UI
- Easier to automate and maintain
- Provides better error isolation
- Enables early testing in development cycle

**Q2: What is REST Assured and what are its key features?**
**A:** REST Assured is a Java library for testing RESTful APIs. Key features include:
- Fluent API for readable tests
- Support for GET, POST, PUT, DELETE, PATCH methods
- Built-in JSON/XML parsing
- Response validation with Hamcrest matchers
- Authentication support (Basic, OAuth, Bearer)
- Schema validation capabilities
- Request/response logging
- Integration with testing frameworks (TestNG, JUnit)

**Q3: Explain the difference between REST and SOAP.**
**A:**
- **REST**: Architectural style, uses HTTP methods, supports multiple formats (JSON, XML), lightweight, flexible, better performance
- **SOAP**: Protocol with strict standards, uses XML only, more overhead, built-in security features, better for enterprise applications

### Intermediate Level

**Q4: How do you handle authentication in REST Assured tests?**
**A:** Multiple approaches:
```java
// Basic Auth
.auth().basic("username", "password")

// Preemptive Basic Auth
.auth().preemptive().basic("username", "password")

// Bearer Token
.header("Authorization", "Bearer " + token)

// OAuth 2.0
.auth().oauth2(token)
```

**Q5: What is the benefit of using POJOs in API testing?**
**A:** Benefits include:
- Type safety and compile-time checking
- Cleaner, more readable code
- Automatic serialization/deserialization
- Reusability across tests
- Better IDE support with auto-completion
- Easier maintenance and refactoring

**Q6: How would you validate a JSON response schema?**
**A:** Using JSON Schema Validator:
```java
import static io.restassured.module.jsv.JsonSchemaValidator.*;

given()
    .when()
    .get("/users/123")
    .then()
    .body(matchesJsonSchemaInClasspath("schemas/user-schema.json"));
```

**Q7: Explain hybrid testing and its advantages.**
**A:** Hybrid testing combines API and UI testing:
- **Advantages**:
  - Comprehensive coverage (both layers)
  - Faster test execution (API for setup)
  - Better reliability (less flaky)
  - Improved debugging (isolate layer issues)
  - Cost-effective (optimal resource usage)

**Q8: How do you handle dynamic data in API tests?**
**A:** Multiple strategies:
- Use timestamps: `"user" + System.currentTimeMillis()`
- Use UUID: `UUID.randomUUID().toString()`
- Extract from responses: `response.path("id")`
- Store in variables for reuse
- Use test context/data holders

### Advanced Level

**Q9: How would you implement pagination handling for API tests?**
**A:** Create a utility method that loops through pages:
```java
public List<Item> getAllItems(String endpoint) {
    List<Item> allItems = new ArrayList<>();
    int page = 1;
    boolean hasMore = true;

    while (hasMore) {
        Response response = get(endpoint + "?page=" + page);
        allItems.addAll(response.jsonPath().getList("items"));
        hasMore = response.jsonPath().getBoolean("hasMore");
        page++;
    }
    return allItems;
}
```

**Q10: Describe how you would implement API mocking in your tests.**
**A:** Using WireMock:
1. Add WireMock dependency
2. Start mock server
3. Define stubs for endpoints
4. Configure responses (success, errors, delays)
5. Run tests against mock server
6. Verify interactions if needed
7. Stop mock server after tests

**Q11: How do you measure and validate API performance?**
**A:** Multiple approaches:
- Response time validation: `.time(lessThan(2000L))`
- Measure manually: `System.currentTimeMillis()`
- Concurrent requests: ExecutorService
- Collect metrics: average, min, max, percentiles
- Set performance thresholds
- Monitor trends over time

**Q12: Explain the testing pyramid and where API testing fits.**
**A:** Testing pyramid (bottom to top):
1. **Unit Tests** (most) - Fast, cheap, isolated
2. **API Tests** (moderate) - Faster than UI, test business logic
3. **UI Tests** (few) - Slow, expensive, end-to-end

API testing is the middle layer, providing balance between speed and coverage.

**Q13: How would you handle test data cleanup in API tests?**
**A:** Multiple strategies:
- Delete in @AfterMethod/@AfterClass
- Store created resource IDs for cleanup
- Use try-finally blocks
- Implement cleanup utility class
- Use database state manager
- Set up automated cleanup jobs

**Q14: What are the best practices for organizing API test code?**
**A:**
- Separate concerns: client, models, tests, utils
- Use Page Object Model equivalent for APIs
- Create reusable request specifications
- Implement builder patterns for complex requests
- Use constants for endpoints and status codes
- Externalize configuration
- Implement proper logging
- Follow naming conventions

**Q15: How do you integrate API tests with CI/CD pipeline?**
**A:**
- Add Maven/Gradle configuration
- Create separate test suites (smoke, regression)
- Use environment-specific configuration
- Generate test reports (Extent, Allure)
- Fail build on test failures
- Send notifications
- Archive test results
- Monitor test trends

---

## Summary

Day 46 covered API Testing Integration with Selenium Framework, providing comprehensive knowledge of:
- REST API fundamentals and HTTP methods
- REST Assured setup and usage
- Request specifications and response validations
- Authentication mechanisms
- JSON/XML parsing and schema validation
- Integration with Selenium framework
- Hybrid testing scenarios
- Test data management using APIs
- API mocking and stubbing
- Performance considerations
- Best practices and common patterns

The combination of API and UI testing creates a robust, efficient, and maintainable automation framework suitable for modern applications.

---

**Next Steps:**
- Practice REST Assured with public APIs
- Build a complete hybrid framework
- Implement authentication mechanisms
- Create reusable API components
- Integrate with your existing Selenium framework

---

*End of Day 46: API Testing Integration*