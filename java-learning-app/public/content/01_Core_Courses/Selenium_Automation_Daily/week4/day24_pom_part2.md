# Day 36: Page Object Model (POM) Part 2 - Advanced Patterns & Best Practices

## Learning Objectives

By the end of this lesson, you will be able to:
- Implement advanced Page Object patterns
- Master Page Factory advanced features
- Create and use Base Page patterns with inheritance
- Build Fluent Page Objects with method chaining
- Design Page Component Objects for reusable widgets
- Handle dynamic elements and implement wait strategies in POM
- Manage multiple windows, tabs, frames, and iframes
- Use JavaScript Executor within Page Objects
- Implement advanced verification methods
- Separate test data effectively
- Refactor existing tests to use POM
- Build a complete framework example
- Apply best practices and avoid anti-patterns

---

## 1. Advanced Page Object Patterns

### 1.1 Fluent Page Objects (Method Chaining)

Fluent Page Objects allow method chaining for more readable and concise test code.

**Traditional Approach:**
```java
loginPage.enterUsername("testuser");
loginPage.enterPassword("password123");
loginPage.clickRememberMe();
HomePage homePage = loginPage.clickLoginButton();
```

**Fluent Approach:**
```java
HomePage homePage = loginPage
    .enterUsername("testuser")
    .enterPassword("password123")
    .clickRememberMe()
    .clickLoginButton();
```

**Implementation:**

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage extends BasePage {

    @FindBy(id = "username")
    private WebElement usernameField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(id = "rememberMe")
    private WebElement rememberMeCheckbox;

    @FindBy(id = "loginBtn")
    private WebElement loginButton;

    @FindBy(className = "error-message")
    private WebElement errorMessage;

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    // Fluent methods return 'this' for chaining
    public LoginPage enterUsername(String username) {
        type(usernameField, username);
        return this;  // Return this for chaining
    }

    public LoginPage enterPassword(String password) {
        type(passwordField, password);
        return this;  // Return this for chaining
    }

    public LoginPage clickRememberMe() {
        click(rememberMeCheckbox);
        return this;  // Return this for chaining
    }

    // Final action returns next page
    public HomePage clickLoginButton() {
        click(loginButton);
        return new HomePage(driver);  // Return next page
    }

    // Combined fluent method
    public HomePage loginAs(String username, String password) {
        return enterUsername(username)
                .enterPassword(password)
                .clickLoginButton();
    }

    // Verification method
    public LoginPage verifyErrorDisplayed() {
        waitForElementToBeVisible(errorMessage);
        return this;
    }

    public String getErrorMessage() {
        return getText(errorMessage);
    }
}
```

**Usage in Tests:**

```java
@Test
public void testValidLogin() {
    HomePage homePage = loginPage
        .enterUsername("testuser")
        .enterPassword("password123")
        .clickRememberMe()
        .clickLoginButton();

    Assert.assertTrue(homePage.isDashboardDisplayed());
}

@Test
public void testInvalidLogin() {
    String errorMsg = loginPage
        .enterUsername("invalid")
        .enterPassword("wrong")
        .clickLoginButton()
        .verifyErrorDisplayed()
        .getErrorMessage();

    Assert.assertTrue(errorMsg.contains("Invalid credentials"));
}
```

**Benefits:**
- More readable test code
- Natural language-like syntax
- Reduced line count
- Better code flow

### 1.2 Advanced Page Factory Features

#### Using @CacheLookup

`@CacheLookup` caches the WebElement after first lookup, improving performance for static elements.

```java
public class HomePage extends BasePage {

    // Cached - element won't change
    @FindBy(id = "logo")
    @CacheLookup
    private WebElement logo;

    // Not cached - dynamic element
    @FindBy(id = "notification-count")
    private WebElement notificationCount;

    // Cached - static navigation
    @FindBy(linkText = "About Us")
    @CacheLookup
    private WebElement aboutUsLink;

    public HomePage(WebDriver driver) {
        super(driver);
    }

    // Methods using cached elements
    public boolean isLogoDisplayed() {
        return isElementDisplayed(logo);
    }

    public int getNotificationCount() {
        return Integer.parseInt(getText(notificationCount));
    }
}
```

**When to Use @CacheLookup:**
- ✅ Static elements (logo, header, footer)
- ✅ Navigation menus
- ✅ Page headings
- ❌ Dynamic content (notifications, cart count)
- ❌ Elements that may reload
- ❌ AJAX-loaded content

#### Custom Field Decorator

Create custom field decorators for special element handling:

```java
package utils;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.pagefactory.ElementLocator;
import org.openqa.selenium.support.pagefactory.ElementLocatorFactory;
import org.openqa.selenium.support.pagefactory.FieldDecorator;
import org.openqa.selenium.support.pagefactory.internal.LocatingElementHandler;
import java.lang.reflect.Field;
import java.lang.reflect.Proxy;

public class CustomFieldDecorator implements FieldDecorator {

    private ElementLocatorFactory factory;

    public CustomFieldDecorator(ElementLocatorFactory factory) {
        this.factory = factory;
    }

    @Override
    public Object decorate(ClassLoader loader, Field field) {
        if (!(WebElement.class.isAssignableFrom(field.getType()))) {
            return null;
        }

        ElementLocator locator = factory.createLocator(field);
        if (locator == null) {
            return null;
        }

        return Proxy.newProxyInstance(
            loader,
            new Class[]{WebElement.class},
            new CustomElementHandler(locator)
        );
    }
}

class CustomElementHandler extends LocatingElementHandler {

    public CustomElementHandler(ElementLocator locator) {
        super(locator);
    }

    // Add custom behavior here
}
```

#### Using AjaxElementLocatorFactory

For better handling of AJAX elements:

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

public class DynamicPage {

    private WebDriver driver;

    @FindBy(id = "ajax-content")
    private WebElement ajaxContent;

    @FindBy(className = "loading-spinner")
    private WebElement loadingSpinner;

    public DynamicPage(WebDriver driver) {
        this.driver = driver;
        // Use AjaxElementLocatorFactory with 15 second timeout
        AjaxElementLocatorFactory factory = new AjaxElementLocatorFactory(driver, 15);
        PageFactory.initElements(factory, this);
    }

    public String getAjaxContent() {
        return ajaxContent.getText();
    }

    public boolean isContentLoaded() {
        try {
            return !loadingSpinner.isDisplayed();
        } catch (Exception e) {
            return true;  // Spinner not found, content is loaded
        }
    }
}
```

---

## 2. Base Page Patterns and Inheritance

### 2.1 Comprehensive BasePage Implementation

```java
package pages;

import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

public abstract class BasePage {

    protected WebDriver driver;
    protected WebDriverWait wait;
    protected Actions actions;
    protected JavascriptExecutor jsExecutor;

    // Constructor
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        this.actions = new Actions(driver);
        this.jsExecutor = (JavascriptExecutor) driver;
        PageFactory.initElements(driver, this);
    }

    // ============ Wait Methods ============

    protected void waitForElementToBeClickable(WebElement element) {
        wait.until(ExpectedConditions.elementToBeClickable(element));
    }

    protected void waitForElementToBeVisible(WebElement element) {
        wait.until(ExpectedConditions.visibilityOf(element));
    }

    protected void waitForElementToBeInvisible(WebElement element) {
        wait.until(ExpectedConditions.invisibilityOf(element));
    }

    protected void waitForTextToBePresentInElement(WebElement element, String text) {
        wait.until(ExpectedConditions.textToBePresentInElement(element, text));
    }

    protected void waitForUrlToContain(String urlFragment) {
        wait.until(ExpectedConditions.urlContains(urlFragment));
    }

    protected void waitForTitleToContain(String title) {
        wait.until(ExpectedConditions.titleContains(title));
    }

    protected void waitForElementToBeSelected(WebElement element) {
        wait.until(ExpectedConditions.elementToBeSelected(element));
    }

    protected void waitForAlertToBePresent() {
        wait.until(ExpectedConditions.alertIsPresent());
    }

    protected void waitForFrameToBeAvailableAndSwitchToIt(WebElement frameElement) {
        wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameElement));
    }

    protected WebElement waitForPresenceOfElement(By locator) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }

    protected List<WebElement> waitForPresenceOfAllElements(By locator) {
        return wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator));
    }

    // Custom wait with custom timeout
    protected void waitForElement(WebElement element, int timeoutInSeconds) {
        WebDriverWait customWait = new WebDriverWait(driver, Duration.ofSeconds(timeoutInSeconds));
        customWait.until(ExpectedConditions.visibilityOf(element));
    }

    // ============ Action Methods ============

    protected void click(WebElement element) {
        waitForElementToBeClickable(element);
        element.click();
    }

    protected void clickUsingJS(WebElement element) {
        waitForElementToBeVisible(element);
        jsExecutor.executeScript("arguments[0].click();", element);
    }

    protected void type(WebElement element, String text) {
        waitForElementToBeVisible(element);
        element.clear();
        element.sendKeys(text);
    }

    protected void typeWithoutClear(WebElement element, String text) {
        waitForElementToBeVisible(element);
        element.sendKeys(text);
    }

    protected String getText(WebElement element) {
        waitForElementToBeVisible(element);
        return element.getText();
    }

    protected String getAttribute(WebElement element, String attribute) {
        waitForElementToBeVisible(element);
        return element.getAttribute(attribute);
    }

    protected void selectByVisibleText(WebElement element, String text) {
        waitForElementToBeVisible(element);
        Select select = new Select(element);
        select.selectByVisibleText(text);
    }

    protected void selectByValue(WebElement element, String value) {
        waitForElementToBeVisible(element);
        Select select = new Select(element);
        select.selectByValue(value);
    }

    protected void selectByIndex(WebElement element, int index) {
        waitForElementToBeVisible(element);
        Select select = new Select(element);
        select.selectByIndex(index);
    }

    protected String getSelectedOptionText(WebElement element) {
        Select select = new Select(element);
        return select.getFirstSelectedOption().getText();
    }

    protected List<String> getAllDropdownOptions(WebElement element) {
        Select select = new Select(element);
        return select.getOptions().stream()
                .map(WebElement::getText)
                .collect(Collectors.toList());
    }

    // ============ Element State Methods ============

    protected boolean isElementDisplayed(WebElement element) {
        try {
            return element.isDisplayed();
        } catch (NoSuchElementException | StaleElementReferenceException e) {
            return false;
        }
    }

    protected boolean isElementEnabled(WebElement element) {
        try {
            return element.isEnabled();
        } catch (Exception e) {
            return false;
        }
    }

    protected boolean isElementSelected(WebElement element) {
        try {
            return element.isSelected();
        } catch (Exception e) {
            return false;
        }
    }

    protected boolean isElementPresent(By locator) {
        try {
            driver.findElement(locator);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    // ============ JavaScript Executor Methods ============

    protected void scrollToElement(WebElement element) {
        jsExecutor.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    protected void scrollToBottom() {
        jsExecutor.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    }

    protected void scrollToTop() {
        jsExecutor.executeScript("window.scrollTo(0, 0)");
    }

    protected void highlightElement(WebElement element) {
        String originalStyle = element.getAttribute("style");
        jsExecutor.executeScript(
            "arguments[0].setAttribute('style', 'border: 2px solid red; background: yellow;');",
            element
        );
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        jsExecutor.executeScript("arguments[0].setAttribute('style', '" + originalStyle + "');", element);
    }

    protected void setElementValue(WebElement element, String value) {
        jsExecutor.executeScript("arguments[0].value='" + value + "';", element);
    }

    protected Object executeJS(String script, Object... args) {
        return jsExecutor.executeScript(script, args);
    }

    // ============ Mouse Actions Methods ============

    protected void mouseHover(WebElement element) {
        waitForElementToBeVisible(element);
        actions.moveToElement(element).perform();
    }

    protected void doubleClick(WebElement element) {
        waitForElementToBeClickable(element);
        actions.doubleClick(element).perform();
    }

    protected void rightClick(WebElement element) {
        waitForElementToBeClickable(element);
        actions.contextClick(element).perform();
    }

    protected void dragAndDrop(WebElement source, WebElement target) {
        waitForElementToBeVisible(source);
        waitForElementToBeVisible(target);
        actions.dragAndDrop(source, target).perform();
    }

    protected void clickAndHold(WebElement element) {
        waitForElementToBeClickable(element);
        actions.clickAndHold(element).perform();
    }

    protected void releaseElement(WebElement element) {
        actions.release(element).perform();
    }

    // ============ Alert Handling Methods ============

    protected void acceptAlert() {
        waitForAlertToBePresent();
        driver.switchTo().alert().accept();
    }

    protected void dismissAlert() {
        waitForAlertToBePresent();
        driver.switchTo().alert().dismiss();
    }

    protected String getAlertText() {
        waitForAlertToBePresent();
        return driver.switchTo().alert().getText();
    }

    protected void typeInAlert(String text) {
        waitForAlertToBePresent();
        driver.switchTo().alert().sendKeys(text);
    }

    // ============ Frame Handling Methods ============

    protected void switchToFrame(WebElement frameElement) {
        waitForFrameToBeAvailableAndSwitchToIt(frameElement);
    }

    protected void switchToFrameByIndex(int index) {
        driver.switchTo().frame(index);
    }

    protected void switchToFrameByNameOrId(String nameOrId) {
        driver.switchTo().frame(nameOrId);
    }

    protected void switchToParentFrame() {
        driver.switchTo().parentFrame();
    }

    protected void switchToDefaultContent() {
        driver.switchTo().defaultContent();
    }

    // ============ Window Handling Methods ============

    protected void switchToWindow(String windowHandle) {
        driver.switchTo().window(windowHandle);
    }

    protected String getCurrentWindowHandle() {
        return driver.getWindowHandle();
    }

    protected void switchToNewWindow() {
        String currentWindow = getCurrentWindowHandle();
        for (String windowHandle : driver.getWindowHandles()) {
            if (!windowHandle.equals(currentWindow)) {
                driver.switchTo().window(windowHandle);
                break;
            }
        }
    }

    protected void closeCurrentWindowAndSwitchTo(String windowHandle) {
        driver.close();
        driver.switchTo().window(windowHandle);
    }

    protected int getNumberOfOpenWindows() {
        return driver.getWindowHandles().size();
    }

    // ============ Navigation Methods ============

    public void navigateBack() {
        driver.navigate().back();
    }

    public void navigateForward() {
        driver.navigate().forward();
    }

    public void refreshPage() {
        driver.navigate().refresh();
    }

    public void navigateTo(String url) {
        driver.navigate().to(url);
    }

    // ============ Page Information Methods ============

    public String getPageTitle() {
        return driver.getTitle();
    }

    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }

    public String getPageSource() {
        return driver.getPageSource();
    }

    // ============ Screenshot Methods ============

    protected byte[] takeScreenshot() {
        return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
    }

    // ============ Utility Methods ============

    protected void sleep(int milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            e.printStackTrace();
        }
    }

    protected List<String> getTextFromElements(List<WebElement> elements) {
        return elements.stream()
                .map(WebElement::getText)
                .collect(Collectors.toList());
    }

    protected void clearAndType(WebElement element, String text) {
        element.clear();
        element.sendKeys(text);
    }

    // Abstract method for page validation
    public abstract boolean isPageLoaded();
}
```

### 2.2 Using BasePage in Page Objects

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class ProductPage extends BasePage {

    @FindBy(id = "product-title")
    private WebElement productTitle;

    @FindBy(id = "add-to-cart")
    private WebElement addToCartButton;

    @FindBy(css = ".price")
    private WebElement price;

    @FindBy(id = "quantity")
    private WebElement quantityDropdown;

    @FindBy(css = ".product-image")
    private WebElement productImage;

    @FindBy(linkText = "Reviews")
    private WebElement reviewsTab;

    public ProductPage(WebDriver driver) {
        super(driver);
    }

    // Using BasePage methods
    public String getProductTitle() {
        return getText(productTitle);  // Using BasePage method
    }

    public ProductPage selectQuantity(String quantity) {
        selectByVisibleText(quantityDropdown, quantity);  // Using BasePage method
        return this;
    }

    public CartPage addToCart() {
        scrollToElement(addToCartButton);  // Using BasePage method
        click(addToCartButton);  // Using BasePage method
        return new CartPage(driver);
    }

    public ProductPage viewProductImage() {
        mouseHover(productImage);  // Using BasePage method
        return this;
    }

    public ProductPage clickReviewsTab() {
        click(reviewsTab);  // Using BasePage method
        return this;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(productTitle) &&
               isElementDisplayed(addToCartButton);
    }
}
```

---

## 3. Page Component Objects (Widgets/Reusable Components)

Page Component Objects represent reusable UI components that appear across multiple pages.

### 3.1 Navigation Header Component

```java
package components;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.BasePage;
import pages.CartPage;
import pages.LoginPage;
import pages.SearchResultsPage;

public class NavigationHeader extends BasePage {

    @FindBy(id = "logo")
    private WebElement logo;

    @FindBy(id = "search-box")
    private WebElement searchBox;

    @FindBy(id = "search-button")
    private WebElement searchButton;

    @FindBy(id = "cart-icon")
    private WebElement cartIcon;

    @FindBy(id = "cart-count")
    private WebElement cartCount;

    @FindBy(id = "login-link")
    private WebElement loginLink;

    @FindBy(id = "user-menu")
    private WebElement userMenu;

    @FindBy(linkText = "My Account")
    private WebElement myAccountLink;

    @FindBy(linkText = "Logout")
    private WebElement logoutLink;

    public NavigationHeader(WebDriver driver) {
        super(driver);
    }

    // Navigation methods
    public void clickLogo() {
        click(logo);
    }

    public SearchResultsPage search(String query) {
        type(searchBox, query);
        click(searchButton);
        return new SearchResultsPage(driver);
    }

    public CartPage openCart() {
        click(cartIcon);
        return new CartPage(driver);
    }

    public int getCartItemCount() {
        String countText = getText(cartCount);
        return Integer.parseInt(countText);
    }

    public LoginPage clickLogin() {
        click(loginLink);
        return new LoginPage(driver);
    }

    public void openUserMenu() {
        click(userMenu);
    }

    public void clickMyAccount() {
        openUserMenu();
        click(myAccountLink);
    }

    public LoginPage logout() {
        openUserMenu();
        click(logoutLink);
        return new LoginPage(driver);
    }

    public boolean isUserLoggedIn() {
        return isElementDisplayed(userMenu);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(logo) && isElementDisplayed(searchBox);
    }
}
```

### 3.2 Footer Component

```java
package components;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.BasePage;
import java.util.List;

public class Footer extends BasePage {

    @FindBy(css = ".footer-links a")
    private List<WebElement> footerLinks;

    @FindBy(id = "newsletter-email")
    private WebElement newsletterEmailField;

    @FindBy(id = "subscribe-button")
    private WebElement subscribeButton;

    @FindBy(css = ".social-media-links a")
    private List<WebElement> socialMediaLinks;

    @FindBy(className = "copyright")
    private WebElement copyrightText;

    @FindBy(linkText = "Privacy Policy")
    private WebElement privacyPolicyLink;

    @FindBy(linkText = "Terms of Service")
    private WebElement termsOfServiceLink;

    @FindBy(linkText = "Contact Us")
    private WebElement contactUsLink;

    public Footer(WebDriver driver) {
        super(driver);
    }

    public List<String> getAllFooterLinks() {
        return getTextFromElements(footerLinks);
    }

    public void subscribeToNewsletter(String email) {
        scrollToElement(newsletterEmailField);
        type(newsletterEmailField, email);
        click(subscribeButton);
    }

    public void clickSocialMediaLink(String platform) {
        socialMediaLinks.stream()
            .filter(link -> link.getAttribute("title").equalsIgnoreCase(platform))
            .findFirst()
            .ifPresent(this::click);
    }

    public String getCopyrightText() {
        return getText(copyrightText);
    }

    public void clickPrivacyPolicy() {
        scrollToElement(privacyPolicyLink);
        click(privacyPolicyLink);
    }

    public void clickTermsOfService() {
        scrollToElement(termsOfServiceLink);
        click(termsOfServiceLink);
    }

    public void clickContactUs() {
        scrollToElement(contactUsLink);
        click(contactUsLink);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(copyrightText);
    }
}
```

### 3.3 Product Card Component

```java
package components;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.BasePage;
import pages.ProductPage;

public class ProductCard extends BasePage {

    private WebElement productContainer;

    @FindBy(css = ".product-title")
    private WebElement productTitle;

    @FindBy(css = ".product-price")
    private WebElement productPrice;

    @FindBy(css = ".product-image")
    private WebElement productImage;

    @FindBy(css = ".add-to-cart-btn")
    private WebElement addToCartButton;

    @FindBy(css = ".quick-view-btn")
    private WebElement quickViewButton;

    @FindBy(css = ".wishlist-btn")
    private WebElement wishlistButton;

    @FindBy(css = ".rating")
    private WebElement rating;

    public ProductCard(WebDriver driver, WebElement productContainer) {
        super(driver);
        this.productContainer = productContainer;
    }

    public String getProductTitle() {
        return getText(productTitle);
    }

    public double getProductPrice() {
        String priceText = getText(productPrice).replace("$", "").trim();
        return Double.parseDouble(priceText);
    }

    public ProductPage clickProduct() {
        click(productTitle);
        return new ProductPage(driver);
    }

    public void addToCart() {
        mouseHover(productContainer);
        click(addToCartButton);
    }

    public void quickView() {
        mouseHover(productContainer);
        click(quickViewButton);
    }

    public void addToWishlist() {
        mouseHover(productContainer);
        click(wishlistButton);
    }

    public String getRating() {
        return getText(rating);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(productTitle);
    }
}
```

### 3.4 Using Components in Page Objects

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import components.NavigationHeader;
import components.Footer;

public class HomePage extends BasePage {

    private NavigationHeader navigationHeader;
    private Footer footer;

    @FindBy(id = "hero-banner")
    private WebElement heroBanner;

    @FindBy(css = ".featured-products")
    private WebElement featuredProducts;

    @FindBy(id = "newsletter-section")
    private WebElement newsletterSection;

    public HomePage(WebDriver driver) {
        super(driver);
        this.navigationHeader = new NavigationHeader(driver);
        this.footer = new Footer(driver);
    }

    // Access navigation header
    public NavigationHeader getNavigationHeader() {
        return navigationHeader;
    }

    // Access footer
    public Footer getFooter() {
        return footer;
    }

    // Page-specific methods
    public boolean isHeroBannerDisplayed() {
        return isElementDisplayed(heroBanner);
    }

    public void scrollToFeaturedProducts() {
        scrollToElement(featuredProducts);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(heroBanner) &&
               navigationHeader.isPageLoaded() &&
               footer.isPageLoaded();
    }
}
```

**Usage in Tests:**

```java
@Test
public void testSearchFromHomePage() {
    HomePage homePage = new HomePage(driver);

    // Use navigation header component
    SearchResultsPage searchResults = homePage
        .getNavigationHeader()
        .search("laptop");

    Assert.assertTrue(searchResults.hasResults());
}

@Test
public void testNewsletterSubscription() {
    HomePage homePage = new HomePage(driver);

    // Use footer component
    homePage.getFooter()
        .subscribeToNewsletter("test@example.com");

    Assert.assertTrue(homePage.getFooter().isPageLoaded());
}
```

---

## 4. Handling Dynamic Elements and Waits in POM

### 4.1 Custom Wait Strategies

```java
package utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class CustomWaits {

    private WebDriver driver;
    private WebDriverWait wait;

    public CustomWaits(WebDriver driver, int timeoutInSeconds) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutInSeconds));
    }

    // Wait for element count to be greater than expected
    public boolean waitForElementCountGreaterThan(List<WebElement> elements, int expectedCount) {
        ExpectedCondition<Boolean> condition = d -> elements.size() > expectedCount;
        return wait.until(condition);
    }

    // Wait for element count to be equal to expected
    public boolean waitForElementCountToBe(List<WebElement> elements, int expectedCount) {
        ExpectedCondition<Boolean> condition = d -> elements.size() == expectedCount;
        return wait.until(condition);
    }

    // Wait for element to have specific attribute value
    public boolean waitForAttributeToBe(WebElement element, String attribute, String expectedValue) {
        return wait.until(ExpectedConditions.attributeToBe(element, attribute, expectedValue));
    }

    // Wait for element text to change
    public boolean waitForTextToChange(WebElement element, String initialText) {
        ExpectedCondition<Boolean> condition = d -> !element.getText().equals(initialText);
        return wait.until(condition);
    }

    // Wait for element to be stale (useful after page refresh)
    public boolean waitForStaleness(WebElement element) {
        return wait.until(ExpectedConditions.stalenessOf(element));
    }

    // Wait for element to have specific class
    public boolean waitForElementToHaveClass(WebElement element, String className) {
        ExpectedCondition<Boolean> condition = d -> {
            String classAttribute = element.getAttribute("class");
            return classAttribute != null && classAttribute.contains(className);
        };
        return wait.until(condition);
    }

    // Wait for element to not have specific class
    public boolean waitForElementToNotHaveClass(WebElement element, String className) {
        ExpectedCondition<Boolean> condition = d -> {
            String classAttribute = element.getAttribute("class");
            return classAttribute == null || !classAttribute.contains(className);
        };
        return wait.until(condition);
    }

    // Wait for AJAX to complete (jQuery)
    public boolean waitForJQueryToLoad() {
        ExpectedCondition<Boolean> jQueryLoad = d -> {
            Object result = ((org.openqa.selenium.JavascriptExecutor) d)
                .executeScript("return jQuery.active == 0");
            return result != null && result.equals(true);
        };
        return wait.until(jQueryLoad);
    }

    // Wait for Angular to load
    public boolean waitForAngularToLoad() {
        ExpectedCondition<Boolean> angularLoad = d -> {
            Object result = ((org.openqa.selenium.JavascriptExecutor) d)
                .executeScript("return window.getAllAngularTestabilities().findIndex(x=>!x.isStable()) === -1");
            return result != null && result.equals(true);
        };
        return wait.until(angularLoad);
    }

    // Wait for page to be fully loaded
    public boolean waitForPageToLoad() {
        ExpectedCondition<Boolean> pageLoad = d -> {
            Object result = ((org.openqa.selenium.JavascriptExecutor) d)
                .executeScript("return document.readyState").equals("complete");
            return result != null && result.equals(true);
        };
        return wait.until(pageLoad);
    }
}
```

### 4.2 Enhanced BasePage with Custom Waits

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import utils.CustomWaits;
import java.util.List;

public abstract class EnhancedBasePage extends BasePage {

    protected CustomWaits customWaits;

    public EnhancedBasePage(WebDriver driver) {
        super(driver);
        this.customWaits = new CustomWaits(driver, 15);
    }

    // Wait for loading spinner to disappear
    protected void waitForLoadingToComplete(WebElement loadingSpinner) {
        try {
            waitForElementToBeInvisible(loadingSpinner);
        } catch (Exception e) {
            // Loading spinner might not appear, continue
        }
    }

    // Wait for dynamic content to load
    protected void waitForDynamicContent(List<WebElement> elements, int minimumCount) {
        customWaits.waitForElementCountGreaterThan(elements, minimumCount);
    }

    // Wait for element to be clickable and click
    protected void safeClick(WebElement element) {
        waitForElementToBeClickable(element);
        try {
            element.click();
        } catch (Exception e) {
            // Try JavaScript click as fallback
            clickUsingJS(element);
        }
    }

    // Safe type with retry
    protected void safeType(WebElement element, String text) {
        int attempts = 0;
        while (attempts < 3) {
            try {
                waitForElementToBeVisible(element);
                element.clear();
                element.sendKeys(text);
                break;
            } catch (Exception e) {
                attempts++;
                sleep(500);
            }
        }
    }
}
```

### 4.3 Page with Dynamic Elements

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import java.util.List;

public class SearchResultsPage extends EnhancedBasePage {

    @FindBy(className = "loading-spinner")
    private WebElement loadingSpinner;

    @FindBy(css = ".search-result-item")
    private List<WebElement> searchResults;

    @FindBy(id = "results-count")
    private WebElement resultsCount;

    @FindBy(css = ".filter-option")
    private List<WebElement> filterOptions;

    @FindBy(id = "sort-dropdown")
    private WebElement sortDropdown;

    @FindBy(className = "load-more-btn")
    private WebElement loadMoreButton;

    public SearchResultsPage(WebDriver driver) {
        super(driver);
    }

    // Wait for results to load
    public SearchResultsPage waitForResultsToLoad() {
        waitForLoadingToComplete(loadingSpinner);
        waitForDynamicContent(searchResults, 0);
        return this;
    }

    public int getResultsCount() {
        waitForResultsToLoad();
        return searchResults.size();
    }

    public String getResultsCountText() {
        return getText(resultsCount);
    }

    public SearchResultsPage applyFilter(String filterName) {
        WebElement filter = filterOptions.stream()
            .filter(f -> getText(f).equals(filterName))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Filter not found: " + filterName));

        safeClick(filter);
        waitForResultsToLoad();
        return this;
    }

    public SearchResultsPage sortBy(String sortOption) {
        selectByVisibleText(sortDropdown, sortOption);
        waitForResultsToLoad();
        return this;
    }

    public SearchResultsPage loadMoreResults() {
        int currentCount = searchResults.size();
        scrollToElement(loadMoreButton);
        safeClick(loadMoreButton);
        customWaits.waitForElementCountGreaterThan(searchResults, currentCount);
        return this;
    }

    public boolean hasResults() {
        waitForResultsToLoad();
        return !searchResults.isEmpty();
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(resultsCount);
    }
}
```

---

## 5. Handling Multiple Windows and Tabs in POM

### 5.1 Window Handler Utility

```java
package utils;

import org.openqa.selenium.WebDriver;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class WindowHandler {

    private WebDriver driver;
    private String parentWindowHandle;

    public WindowHandler(WebDriver driver) {
        this.driver = driver;
        this.parentWindowHandle = driver.getWindowHandle();
    }

    // Switch to newly opened window
    public void switchToNewWindow() {
        Set<String> handles = driver.getWindowHandles();
        for (String handle : handles) {
            if (!handle.equals(parentWindowHandle)) {
                driver.switchTo().window(handle);
                break;
            }
        }
    }

    // Switch to window by title
    public boolean switchToWindowByTitle(String title) {
        Set<String> handles = driver.getWindowHandles();
        for (String handle : handles) {
            driver.switchTo().window(handle);
            if (driver.getTitle().contains(title)) {
                return true;
            }
        }
        return false;
    }

    // Switch to window by URL
    public boolean switchToWindowByUrl(String urlFragment) {
        Set<String> handles = driver.getWindowHandles();
        for (String handle : handles) {
            driver.switchTo().window(handle);
            if (driver.getCurrentUrl().contains(urlFragment)) {
                return true;
            }
        }
        return false;
    }

    // Switch to window by index
    public void switchToWindowByIndex(int index) {
        List<String> handles = new ArrayList<>(driver.getWindowHandles());
        if (index < handles.size()) {
            driver.switchTo().window(handles.get(index));
        }
    }

    // Switch back to parent window
    public void switchToParentWindow() {
        driver.switchTo().window(parentWindowHandle);
    }

    // Close current window and switch to parent
    public void closeCurrentAndSwitchToParent() {
        driver.close();
        switchToParentWindow();
    }

    // Close all windows except parent
    public void closeAllExceptParent() {
        Set<String> handles = driver.getWindowHandles();
        for (String handle : handles) {
            if (!handle.equals(parentWindowHandle)) {
                driver.switchTo().window(handle);
                driver.close();
            }
        }
        switchToParentWindow();
    }

    // Get count of open windows
    public int getWindowCount() {
        return driver.getWindowHandles().size();
    }

    // Get all window titles
    public List<String> getAllWindowTitles() {
        List<String> titles = new ArrayList<>();
        String currentHandle = driver.getWindowHandle();

        for (String handle : driver.getWindowHandles()) {
            driver.switchTo().window(handle);
            titles.add(driver.getTitle());
        }

        driver.switchTo().window(currentHandle);
        return titles;
    }
}
```

### 5.2 Page Object with Window Handling

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import utils.WindowHandler;

public class ProductDetailsPage extends BasePage {

    private WindowHandler windowHandler;

    @FindBy(id = "product-title")
    private WebElement productTitle;

    @FindBy(linkText = "Share on Facebook")
    private WebElement shareFacebookLink;

    @FindBy(linkText = "Share on Twitter")
    private WebElement shareTwitterLink;

    @FindBy(linkText = "Size Guide")
    private WebElement sizeGuideLink;

    @FindBy(id = "add-to-cart")
    private WebElement addToCartButton;

    public ProductDetailsPage(WebDriver driver) {
        super(driver);
        this.windowHandler = new WindowHandler(driver);
    }

    public String getProductTitle() {
        return getText(productTitle);
    }

    // Opens Facebook in new window, performs action, and returns
    public ProductDetailsPage shareOnFacebook() {
        click(shareFacebookLink);
        windowHandler.switchToNewWindow();

        // Perform actions in Facebook window
        // ...

        windowHandler.closeCurrentAndSwitchToParent();
        return this;
    }

    // Opens Twitter in new tab
    public TwitterPage shareOnTwitter() {
        click(shareTwitterLink);
        windowHandler.switchToNewWindow();
        return new TwitterPage(driver);
    }

    // Opens size guide in new window
    public SizeGuidePage openSizeGuide() {
        click(sizeGuideLink);
        windowHandler.switchToNewWindow();
        return new SizeGuidePage(driver);
    }

    // Returns window handler for custom operations
    public WindowHandler getWindowHandler() {
        return windowHandler;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(productTitle);
    }
}
```

**Usage in Tests:**

```java
@Test
public void testMultipleWindowHandling() {
    ProductDetailsPage productPage = new ProductDetailsPage(driver);

    // Open size guide in new window
    SizeGuidePage sizeGuide = productPage.openSizeGuide();
    Assert.assertTrue(sizeGuide.isPageLoaded());

    // Close size guide and return to product page
    sizeGuide.closeWindow();
    productPage.getWindowHandler().switchToParentWindow();

    Assert.assertTrue(productPage.isPageLoaded());
}

@Test
public void testSocialMediaShare() {
    ProductDetailsPage productPage = new ProductDetailsPage(driver);

    // Share on Twitter (opens new tab)
    TwitterPage twitterPage = productPage.shareOnTwitter();
    Assert.assertTrue(twitterPage.getCurrentUrl().contains("twitter.com"));

    // Return to product page
    productPage.getWindowHandler().switchToParentWindow();
    Assert.assertTrue(productPage.isPageLoaded());
}
```

---

## 6. Handling Frames and iFrames in POM

### 6.1 Frame Handler Utility

```java
package utils;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class FrameHandler {

    private WebDriver driver;
    private WebDriverWait wait;

    public FrameHandler(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Switch to frame by WebElement
    public void switchToFrame(WebElement frameElement) {
        wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameElement));
    }

    // Switch to frame by index
    public void switchToFrame(int frameIndex) {
        wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameIndex));
    }

    // Switch to frame by name or ID
    public void switchToFrame(String nameOrId) {
        wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(nameOrId));
    }

    // Switch to frame by locator
    public void switchToFrame(By locator) {
        wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(locator));
    }

    // Switch to parent frame
    public void switchToParentFrame() {
        driver.switchTo().parentFrame();
    }

    // Switch to default content (main page)
    public void switchToDefaultContent() {
        driver.switchTo().defaultContent();
    }

    // Get count of frames on page
    public int getFrameCount() {
        return driver.findElements(By.tagName("iframe")).size();
    }

    // Check if frame exists
    public boolean isFramePresent(By locator) {
        try {
            return driver.findElements(locator).size() > 0;
        } catch (Exception e) {
            return false;
        }
    }

    // Switch to frame and execute action
    public void executeInFrame(WebElement frameElement, Runnable action) {
        switchToFrame(frameElement);
        action.run();
        switchToDefaultContent();
    }

    // Switch to nested frame (frame inside frame)
    public void switchToNestedFrame(WebElement... frames) {
        for (WebElement frame : frames) {
            switchToFrame(frame);
        }
    }
}
```

### 6.2 Page Object with iFrame

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import utils.FrameHandler;

public class EditorPage extends BasePage {

    private FrameHandler frameHandler;

    @FindBy(id = "editor-frame")
    private WebElement editorFrame;

    @FindBy(id = "save-button")
    private WebElement saveButton;

    // Elements inside iframe
    @FindBy(css = ".editor-content")
    private WebElement editorContent;

    @FindBy(css = ".toolbar-bold")
    private WebElement boldButton;

    @FindBy(css = ".toolbar-italic")
    private WebElement italicButton;

    public EditorPage(WebDriver driver) {
        super(driver);
        this.frameHandler = new FrameHandler(driver);
    }

    // Type in editor (inside iframe)
    public EditorPage typeInEditor(String text) {
        frameHandler.switchToFrame(editorFrame);
        type(editorContent, text);
        frameHandler.switchToDefaultContent();
        return this;
    }

    // Make text bold (inside iframe)
    public EditorPage makeBold() {
        frameHandler.switchToFrame(editorFrame);
        click(boldButton);
        frameHandler.switchToDefaultContent();
        return this;
    }

    // Make text italic (inside iframe)
    public EditorPage makeItalic() {
        frameHandler.switchToFrame(editorFrame);
        click(italicButton);
        frameHandler.switchToDefaultContent();
        return this;
    }

    // Get editor content (inside iframe)
    public String getEditorContent() {
        frameHandler.switchToFrame(editorFrame);
        String content = getText(editorContent);
        frameHandler.switchToDefaultContent();
        return content;
    }

    // Save (outside iframe)
    public EditorPage clickSave() {
        click(saveButton);
        return this;
    }

    // Execute multiple actions in frame
    public EditorPage formatText(String text) {
        frameHandler.executeInFrame(editorFrame, () -> {
            type(editorContent, text);
            click(boldButton);
            click(italicButton);
        });
        return this;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(editorFrame);
    }
}
```

### 6.3 Nested iFrame Handling

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import utils.FrameHandler;

public class NestedFramePage extends BasePage {

    private FrameHandler frameHandler;

    @FindBy(id = "outer-frame")
    private WebElement outerFrame;

    @FindBy(id = "middle-frame")
    private WebElement middleFrame;

    @FindBy(id = "inner-frame")
    private WebElement innerFrame;

    @FindBy(id = "target-element")
    private WebElement targetElement;

    public NestedFramePage(WebDriver driver) {
        super(driver);
        this.frameHandler = new FrameHandler(driver);
    }

    // Access element in nested frame
    public String getTextFromNestedFrame() {
        // Switch to outer frame
        frameHandler.switchToFrame(outerFrame);

        // Switch to middle frame
        frameHandler.switchToFrame(middleFrame);

        // Switch to inner frame
        frameHandler.switchToFrame(innerFrame);

        // Get text from element
        String text = getText(targetElement);

        // Return to main content
        frameHandler.switchToDefaultContent();

        return text;
    }

    // Using nested frame method
    public String getTextUsingNestedFrames() {
        frameHandler.switchToNestedFrame(outerFrame, middleFrame, innerFrame);
        String text = getText(targetElement);
        frameHandler.switchToDefaultContent();
        return text;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(outerFrame);
    }
}
```

**Usage in Tests:**

```java
@Test
public void testIFrameHandling() {
    EditorPage editorPage = new EditorPage(driver);

    editorPage.typeInEditor("Hello World")
              .makeBold()
              .makeItalic()
              .clickSave();

    String content = editorPage.getEditorContent();
    Assert.assertEquals(content, "Hello World");
}

@Test
public void testNestedFrames() {
    NestedFramePage nestedPage = new NestedFramePage(driver);

    String text = nestedPage.getTextFromNestedFrame();
    Assert.assertNotNull(text);
}
```

---

## 7. POM with JavaScript Executor

### 7.1 Enhanced BasePage with JavaScript Methods

```java
// JavaScript methods in BasePage (already shown in section 2.1)
// Here are additional advanced JS methods

public abstract class JSEnhancedBasePage extends BasePage {

    public JSEnhancedBasePage(WebDriver driver) {
        super(driver);
    }

    // Scroll element into center of view
    protected void scrollToCenter(WebElement element) {
        jsExecutor.executeScript(
            "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
            element
        );
    }

    // Get element position
    protected int getElementYPosition(WebElement element) {
        return ((Long) jsExecutor.executeScript(
            "return arguments[0].getBoundingClientRect().top;",
            element
        )).intValue();
    }

    // Check if element is in viewport
    protected boolean isElementInViewport(WebElement element) {
        return (Boolean) jsExecutor.executeScript(
            "var rect = arguments[0].getBoundingClientRect();" +
            "return (rect.top >= 0 && rect.left >= 0 && " +
            "rect.bottom <= window.innerHeight && " +
            "rect.right <= window.innerWidth);",
            element
        );
    }

    // Change element style
    protected void changeElementStyle(WebElement element, String property, String value) {
        jsExecutor.executeScript(
            "arguments[0].style." + property + " = '" + value + "';",
            element
        );
    }

    // Remove element attribute
    protected void removeAttribute(WebElement element, String attribute) {
        jsExecutor.executeScript(
            "arguments[0].removeAttribute('" + attribute + "');",
            element
        );
    }

    // Trigger events
    protected void triggerEvent(WebElement element, String event) {
        jsExecutor.executeScript(
            "arguments[0].dispatchEvent(new Event('" + event + "'));",
            element
        );
    }

    // Upload file (bypassing file dialog)
    protected void uploadFile(WebElement fileInput, String filePath) {
        jsExecutor.executeScript(
            "arguments[0].style.display = 'block';",
            fileInput
        );
        fileInput.sendKeys(filePath);
    }

    // Get all browser console logs
    protected List<String> getConsoleLogs() {
        return (List<String>) jsExecutor.executeScript(
            "return window.console.logs || [];"
        );
    }

    // Execute async JavaScript
    protected Object executeAsyncJS(String script, Object... args) {
        return jsExecutor.executeAsyncScript(script, args);
    }

    // Zoom in/out page
    protected void zoomPage(int percentage) {
        jsExecutor.executeScript(
            "document.body.style.zoom='" + percentage + "%';"
        );
    }

    // Get computed CSS property
    protected String getComputedStyle(WebElement element, String property) {
        return (String) jsExecutor.executeScript(
            "return window.getComputedStyle(arguments[0]).getPropertyValue('" + property + "');",
            element
        );
    }

    // Click all matching elements
    protected void clickAllElements(String cssSelector) {
        jsExecutor.executeScript(
            "document.querySelectorAll('" + cssSelector + "')" +
            ".forEach(el => el.click());"
        );
    }

    // Get page load time
    protected long getPageLoadTime() {
        return (Long) jsExecutor.executeScript(
            "return performance.timing.loadEventEnd - performance.timing.navigationStart;"
        );
    }
}
```

### 7.2 Page Object Using JavaScript Executor

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class AdvancedProductPage extends JSEnhancedBasePage {

    @FindBy(id = "product-image")
    private WebElement productImage;

    @FindBy(id = "add-to-cart")
    private WebElement addToCartButton;

    @FindBy(id = "quantity")
    private WebElement quantityField;

    @FindBy(css = ".color-option")
    private WebElement colorOption;

    @FindBy(id = "file-upload")
    private WebElement fileUploadInput;

    @FindBy(className = "price")
    private WebElement price;

    public AdvancedProductPage(WebDriver driver) {
        super(driver);
    }

    // Scroll product image to center
    public AdvancedProductPage scrollToProductImage() {
        scrollToCenter(productImage);
        return this;
    }

    // Click using JavaScript (handles hidden elements)
    public AdvancedProductPage addToCartUsingJS() {
        clickUsingJS(addToCartButton);
        return this;
    }

    // Set quantity using JavaScript
    public AdvancedProductPage setQuantityJS(int quantity) {
        setElementValue(quantityField, String.valueOf(quantity));
        return this;
    }

    // Change color dynamically
    public AdvancedProductPage changeColorHighlight(String color) {
        changeElementStyle(colorOption, "backgroundColor", color);
        return this;
    }

    // Upload custom image
    public AdvancedProductPage uploadCustomImage(String filePath) {
        uploadFile(fileUploadInput, filePath);
        return this;
    }

    // Check if price is visible in viewport
    public boolean isPriceInViewport() {
        return isElementInViewport(price);
    }

    // Get price color
    public String getPriceColor() {
        return getComputedStyle(price, "color");
    }

    // Highlight product for demo
    public AdvancedProductPage highlightProduct() {
        highlightElement(productImage);
        return this;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(productImage);
    }
}
```

---

## 8. Advanced Verification Methods

### 8.1 Assertion Helper Class

```java
package utils;

import org.testng.Assert;
import org.testng.asserts.SoftAssert;
import java.util.List;

public class AssertionHelper {

    private SoftAssert softAssert;

    public AssertionHelper() {
        this.softAssert = new SoftAssert();
    }

    // Hard assertions
    public void assertEquals(Object actual, Object expected, String message) {
        Assert.assertEquals(actual, expected, message);
    }

    public void assertTrue(boolean condition, String message) {
        Assert.assertTrue(condition, message);
    }

    public void assertFalse(boolean condition, String message) {
        Assert.assertFalse(condition, message);
    }

    public void assertNotNull(Object object, String message) {
        Assert.assertNotNull(object, message);
    }

    public void assertNull(Object object, String message) {
        Assert.assertNull(object, message);
    }

    // Soft assertions
    public void softAssertEquals(Object actual, Object expected, String message) {
        softAssert.assertEquals(actual, expected, message);
    }

    public void softAssertTrue(boolean condition, String message) {
        softAssert.assertTrue(condition, message);
    }

    public void softAssertFalse(boolean condition, String message) {
        softAssert.assertFalse(condition, message);
    }

    public void assertAll() {
        softAssert.assertAll();
    }

    // Custom assertions
    public void assertContains(String actual, String expected, String message) {
        Assert.assertTrue(actual.contains(expected),
            message + " - Expected: " + expected + ", Actual: " + actual);
    }

    public void assertListContains(List<String> list, String item, String message) {
        Assert.assertTrue(list.contains(item),
            message + " - List does not contain: " + item);
    }

    public void assertListSize(List<?> list, int expectedSize, String message) {
        Assert.assertEquals(list.size(), expectedSize, message);
    }

    public void assertUrl(String actualUrl, String expectedUrlFragment, String message) {
        Assert.assertTrue(actualUrl.contains(expectedUrlFragment),
            message + " - Expected URL to contain: " + expectedUrlFragment);
    }

    public void assertTitle(String actualTitle, String expectedTitle, String message) {
        Assert.assertEquals(actualTitle, expectedTitle, message);
    }

    public void assertElementDisplayed(boolean isDisplayed, String elementName) {
        Assert.assertTrue(isDisplayed, elementName + " should be displayed");
    }

    public void assertElementEnabled(boolean isEnabled, String elementName) {
        Assert.assertTrue(isEnabled, elementName + " should be enabled");
    }

    public void assertElementSelected(boolean isSelected, String elementName) {
        Assert.assertTrue(isSelected, elementName + " should be selected");
    }

    // Wait and assert
    public void assertEventually(BooleanSupplier condition, String message, int maxWaitSeconds) {
        int elapsed = 0;
        while (elapsed < maxWaitSeconds * 1000) {
            if (condition.getAsBoolean()) {
                return;
            }
            try {
                Thread.sleep(500);
                elapsed += 500;
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        Assert.fail(message + " (waited " + maxWaitSeconds + " seconds)");
    }

    @FunctionalInterface
    public interface BooleanSupplier {
        boolean getAsBoolean();
    }
}
```

### 8.2 Page Object with Advanced Verifications

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import utils.AssertionHelper;
import java.util.List;

public class CheckoutPage extends BasePage {

    private AssertionHelper assertHelper;

    @FindBy(className = "cart-item")
    private List<WebElement> cartItems;

    @FindBy(id = "total-price")
    private WebElement totalPrice;

    @FindBy(id = "checkout-button")
    private WebElement checkoutButton;

    @FindBy(className = "promo-code-input")
    private WebElement promoCodeInput;

    @FindBy(className = "apply-promo")
    private WebElement applyPromoButton;

    @FindBy(className = "discount-amount")
    private WebElement discountAmount;

    @FindBy(className = "success-message")
    private WebElement successMessage;

    public CheckoutPage(WebDriver driver) {
        super(driver);
        this.assertHelper = new AssertionHelper();
    }

    // Verification methods
    public CheckoutPage verifyCartItemCount(int expectedCount) {
        assertHelper.assertListSize(cartItems, expectedCount,
            "Cart should have " + expectedCount + " items");
        return this;
    }

    public CheckoutPage verifyTotalPrice(String expectedPrice) {
        String actualPrice = getText(totalPrice);
        assertHelper.assertEquals(actualPrice, expectedPrice,
            "Total price mismatch");
        return this;
    }

    public CheckoutPage verifyCheckoutButtonEnabled() {
        assertHelper.assertElementEnabled(isElementEnabled(checkoutButton),
            "Checkout button");
        return this;
    }

    public CheckoutPage verifyDiscountApplied() {
        assertHelper.assertElementDisplayed(isElementDisplayed(discountAmount),
            "Discount amount");
        return this;
    }

    public CheckoutPage verifySuccessMessage(String expectedMessage) {
        assertHelper.assertContains(getText(successMessage), expectedMessage,
            "Success message mismatch");
        return this;
    }

    // Soft assertions for multiple verifications
    public CheckoutPage softVerifyCheckoutPage() {
        assertHelper.softAssertTrue(isElementDisplayed(totalPrice),
            "Total price should be displayed");
        assertHelper.softAssertTrue(isElementEnabled(checkoutButton),
            "Checkout button should be enabled");
        assertHelper.softAssertTrue(cartItems.size() > 0,
            "Cart should have items");
        assertHelper.assertAll();
        return this;
    }

    // Action methods
    public CheckoutPage applyPromoCode(String code) {
        type(promoCodeInput, code);
        click(applyPromoButton);
        return this;
    }

    public PaymentPage proceedToCheckout() {
        click(checkoutButton);
        return new PaymentPage(driver);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(checkoutButton);
    }
}
```

---

## 9. Test Data Separation

### 9.1 Test Data Class

```java
package testdata;

public class TestData {

    // User credentials
    public static class Users {
        public static final String VALID_USERNAME = "testuser@example.com";
        public static final String VALID_PASSWORD = "Test@123";
        public static final String INVALID_USERNAME = "invalid@example.com";
        public static final String INVALID_PASSWORD = "wrong";
        public static final String ADMIN_USERNAME = "admin@example.com";
        public static final String ADMIN_PASSWORD = "Admin@123";
    }

    // Product data
    public static class Products {
        public static final String PRODUCT_1 = "Laptop";
        public static final String PRODUCT_2 = "Mouse";
        public static final String PRODUCT_3 = "Keyboard";
    }

    // URLs
    public static class URLs {
        public static final String BASE_URL = "https://example.com";
        public static final String LOGIN_URL = BASE_URL + "/login";
        public static final String HOME_URL = BASE_URL + "/home";
        public static final String CHECKOUT_URL = BASE_URL + "/checkout";
    }

    // Error messages
    public static class ErrorMessages {
        public static final String INVALID_CREDENTIALS = "Invalid username or password";
        public static final String REQUIRED_FIELD = "This field is required";
        public static final String INVALID_EMAIL = "Please enter a valid email";
    }

    // Test data methods
    public static String generateRandomEmail() {
        return "user" + System.currentTimeMillis() + "@example.com";
    }

    public static String generateRandomPhone() {
        return "555" + (int)(Math.random() * 10000000);
    }
}
```

### 9.2 Properties File Approach

**testdata.properties:**
```properties
# User Credentials
valid.username=testuser@example.com
valid.password=Test@123
admin.username=admin@example.com
admin.password=Admin@123

# URLs
base.url=https://example.com
login.url=${base.url}/login
home.url=${base.url}/home

# Browser Config
browser=chrome
implicit.wait=10
explicit.wait=15

# Test Data
product.name=Laptop
promo.code=SAVE20
```

**Config Reader:**
```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {

    private static Properties properties;
    private static final String CONFIG_FILE = "src/test/resources/testdata.properties";

    static {
        try {
            FileInputStream fis = new FileInputStream(CONFIG_FILE);
            properties = new Properties();
            properties.load(fis);
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load config file: " + CONFIG_FILE);
        }
    }

    public static String getProperty(String key) {
        return properties.getProperty(key);
    }

    public static String getValidUsername() {
        return getProperty("valid.username");
    }

    public static String getValidPassword() {
        return getProperty("valid.password");
    }

    public static String getBaseUrl() {
        return getProperty("base.url");
    }

    public static String getBrowser() {
        return getProperty("browser");
    }

    public static int getImplicitWait() {
        return Integer.parseInt(getProperty("implicit.wait"));
    }
}
```

### 9.3 JSON Test Data

**testdata.json:**
```json
{
  "users": [
    {
      "username": "testuser@example.com",
      "password": "Test@123",
      "role": "user"
    },
    {
      "username": "admin@example.com",
      "password": "Admin@123",
      "role": "admin"
    }
  ],
  "products": [
    {
      "name": "Laptop",
      "price": 999.99,
      "category": "Electronics"
    },
    {
      "name": "Mouse",
      "price": 29.99,
      "category": "Accessories"
    }
  ]
}
```

**JSON Reader:**
```java
package utils;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.FileReader;
import java.io.IOException;

public class JsonDataReader {

    private static JsonObject jsonObject;
    private static final String JSON_FILE = "src/test/resources/testdata.json";

    static {
        try {
            Gson gson = new Gson();
            FileReader reader = new FileReader(JSON_FILE);
            jsonObject = gson.fromJson(reader, JsonObject.class);
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String getUserEmail(int index) {
        return jsonObject.getAsJsonArray("users")
            .get(index).getAsJsonObject()
            .get("username").getAsString();
    }

    public static String getUserPassword(int index) {
        return jsonObject.getAsJsonArray("users")
            .get(index).getAsJsonObject()
            .get("password").getAsString();
    }

    public static String getProductName(int index) {
        return jsonObject.getAsJsonArray("products")
            .get(index).getAsJsonObject()
            .get("name").getAsString();
    }
}
```

**Usage in Tests:**
```java
@Test
public void testLoginWithPropertiesData() {
    String username = ConfigReader.getValidUsername();
    String password = ConfigReader.getValidPassword();

    HomePage homePage = loginPage.loginAs(username, password);
    Assert.assertTrue(homePage.isPageLoaded());
}

@Test
public void testLoginWithJsonData() {
    String username = JsonDataReader.getUserEmail(0);
    String password = JsonDataReader.getUserPassword(0);

    HomePage homePage = loginPage.loginAs(username, password);
    Assert.assertTrue(homePage.isPageLoaded());
}
```

---

## 10. Refactoring Tests to POM

### 10.1 Before Refactoring (Non-POM Test)

```java
public class OldLoginTest {

    WebDriver driver;

    @Test
    public void testLogin() {
        driver = new ChromeDriver();
        driver.get("https://example.com/login");

        // Direct element interactions
        driver.findElement(By.id("username")).sendKeys("testuser");
        driver.findElement(By.id("password")).sendKeys("password123");
        driver.findElement(By.id("loginBtn")).click();

        // Verification
        WebElement dashboard = driver.findElement(By.id("dashboard"));
        Assert.assertTrue(dashboard.isDisplayed());

        // Logout
        driver.findElement(By.id("logoutBtn")).click();

        driver.quit();
    }
}
```

### 10.2 After Refactoring (POM Test)

**Step 1: Create Page Objects**

```java
// LoginPage.java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LoginPage extends BasePage {

    @FindBy(id = "username")
    private WebElement usernameField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(id = "loginBtn")
    private WebElement loginButton;

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public HomePage login(String username, String password) {
        type(usernameField, username);
        type(passwordField, password);
        click(loginButton);
        return new HomePage(driver);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(usernameField);
    }
}

// HomePage.java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class HomePage extends BasePage {

    @FindBy(id = "dashboard")
    private WebElement dashboard;

    @FindBy(id = "logoutBtn")
    private WebElement logoutButton;

    public HomePage(WebDriver driver) {
        super(driver);
    }

    public boolean isDashboardDisplayed() {
        return isElementDisplayed(dashboard);
    }

    public LoginPage logout() {
        click(logoutButton);
        return new LoginPage(driver);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(dashboard);
    }
}
```

**Step 2: Create Base Test Class**

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import pages.LoginPage;
import utils.ConfigReader;

public class BaseTest {

    protected WebDriver driver;
    protected LoginPage loginPage;
    protected String baseUrl;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        baseUrl = ConfigReader.getBaseUrl();
        driver.get(baseUrl + "/login");
        loginPage = new LoginPage(driver);
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Step 3: Refactored Test**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.HomePage;
import utils.ConfigReader;

public class RefactoredLoginTest extends BaseTest {

    @Test
    public void testLogin() {
        // Login using page object
        HomePage homePage = loginPage.login(
            ConfigReader.getValidUsername(),
            ConfigReader.getValidPassword()
        );

        // Verification
        Assert.assertTrue(homePage.isDashboardDisplayed());

        // Logout
        loginPage = homePage.logout();
        Assert.assertTrue(loginPage.isPageLoaded());
    }
}
```

### 10.3 Refactoring Benefits

**Before:**
- 30+ lines of test code
- Locators in test
- Hard to maintain
- Not reusable

**After:**
- 10 lines of test code
- Clean and readable
- Locators centralized
- Highly maintainable
- Reusable page methods

---

## 11. Complete Framework Example

### 11.1 Project Structure

```
selenium-pom-framework/
├── src/
│   ├── main/
│   │   └── java/
│   │       ├── pages/
│   │       │   ├── BasePage.java
│   │       │   ├── LoginPage.java
│   │       │   ├── HomePage.java
│   │       │   └── CheckoutPage.java
│   │       ├── components/
│   │       │   ├── NavigationHeader.java
│   │       │   └── Footer.java
│   │       └── utils/
│   │           ├── ConfigReader.java
│   │           ├── WindowHandler.java
│   │           ├── FrameHandler.java
│   │           └── AssertionHelper.java
│   └── test/
│       ├── java/
│       │   ├── tests/
│       │   │   ├── BaseTest.java
│       │   │   ├── LoginTest.java
│       │   │   └── CheckoutTest.java
│       │   └── testdata/
│       │       └── TestData.java
│       └── resources/
│           ├── testdata.properties
│           ├── testdata.json
│           └── testng.xml
├── pom.xml
└── README.md
```

### 11.2 Complete Test Suite

**testng.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="E-Commerce Test Suite">

    <test name="Login Tests">
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>

    <test name="Checkout Tests">
        <classes>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>

</suite>
```

**Complete Test Example:**
```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.HomePage;
import pages.ProductPage;
import pages.CartPage;
import pages.CheckoutPage;
import testdata.TestData;

public class E2ECheckoutTest extends BaseTest {

    @Test(description = "End to end checkout flow")
    public void testCompleteCheckoutFlow() {
        // Login
        HomePage homePage = loginPage.login(
            TestData.Users.VALID_USERNAME,
            TestData.Users.VALID_PASSWORD
        );
        Assert.assertTrue(homePage.isPageLoaded());

        // Search for product
        String productName = TestData.Products.PRODUCT_1;
        SearchResultsPage searchResults = homePage
            .getNavigationHeader()
            .search(productName);
        Assert.assertTrue(searchResults.hasResults());

        // Select product
        ProductPage productPage = searchResults.selectFirstProduct();
        Assert.assertTrue(productPage.isPageLoaded());
        Assert.assertEquals(productPage.getProductTitle(), productName);

        // Add to cart
        CartPage cartPage = productPage
            .selectQuantity("2")
            .addToCart();
        Assert.assertTrue(cartPage.isPageLoaded());
        Assert.assertEquals(cartPage.getItemCount(), 2);

        // Proceed to checkout
        CheckoutPage checkoutPage = cartPage.proceedToCheckout();
        Assert.assertTrue(checkoutPage.isPageLoaded());

        // Verify cart items
        checkoutPage.verifyCartItemCount(1);

        // Apply promo code
        checkoutPage.applyPromoCode("SAVE20");
        checkoutPage.verifyDiscountApplied();

        // Complete checkout
        PaymentPage paymentPage = checkoutPage.proceedToCheckout();
        Assert.assertTrue(paymentPage.isPageLoaded());

        // Verify order
        OrderConfirmationPage confirmationPage = paymentPage
            .enterCardDetails("4111111111111111", "12/25", "123")
            .submitPayment();

        Assert.assertTrue(confirmationPage.isPageLoaded());
        Assert.assertTrue(confirmationPage.getConfirmationMessage()
            .contains("Order placed successfully"));
    }
}
```

---

## 12. Best Practices and Anti-Patterns

### 12.1 Best Practices

#### ✅ DO: Use Page Factory

```java
public class LoginPage {
    @FindBy(id = "username")
    private WebElement usernameField;

    public LoginPage(WebDriver driver) {
        PageFactory.initElements(driver, this);
    }
}
```

#### ✅ DO: Keep Locators Private

```java
@FindBy(id = "username")
private WebElement usernameField;  // Private

public void enterUsername(String username) {
    usernameField.sendKeys(username);  // Public method
}
```

#### ✅ DO: Return Page Objects

```java
public HomePage login(String user, String pass) {
    // Login logic
    return new HomePage(driver);  // Return next page
}
```

#### ✅ DO: Use Meaningful Names

```java
public void enterUsername(String username)  // Clear
public void clickLoginButton()              // Clear
public boolean isErrorDisplayed()          // Clear
```

#### ✅ DO: Implement Wait Strategies

```java
protected void click(WebElement element) {
    wait.until(ExpectedConditions.elementToBeClickable(element));
    element.click();
}
```

#### ✅ DO: Separate Test Data

```java
// Use separate test data class/file
String username = TestData.Users.VALID_USERNAME;
String password = TestData.Users.VALID_PASSWORD;
```

#### ✅ DO: Use BasePage for Common Methods

```java
public class LoginPage extends BasePage {
    // Inherits all common methods
}
```

#### ✅ DO: Implement isPageLoaded()

```java
@Override
public boolean isPageLoaded() {
    return isElementDisplayed(pageTitle) &&
           isElementDisplayed(mainContent);
}
```

### 12.2 Anti-Patterns (What NOT to Do)

#### ❌ DON'T: Put Assertions in Page Classes

```java
// WRONG
public void login(String user, String pass) {
    // login logic
    Assert.assertTrue(dashboard.isDisplayed());  // ❌ No assertions in page class
}

// CORRECT
public HomePage login(String user, String pass) {
    // login logic
    return new HomePage(driver);  // ✓ Let test class handle assertions
}
```

#### ❌ DON'T: Expose WebElements

```java
// WRONG
@FindBy(id = "username")
public WebElement usernameField;  // ❌ Public WebElement

// CORRECT
@FindBy(id = "username")
private WebElement usernameField;  // ✓ Private WebElement

public void enterUsername(String username) {  // ✓ Public method
    usernameField.sendKeys(username);
}
```

#### ❌ DON'T: Hardcode Test Data in Page Classes

```java
// WRONG
public void login() {
    usernameField.sendKeys("hardcoded@example.com");  // ❌ Hardcoded
    passwordField.sendKeys("hardcoded123");           // ❌ Hardcoded
}

// CORRECT
public void login(String username, String password) {
    usernameField.sendKeys(username);  // ✓ Parameterized
    passwordField.sendKeys(password);  // ✓ Parameterized
}
```

#### ❌ DON'T: Mix Page Logic in Test Classes

```java
// WRONG - Test class
@Test
public void testLogin() {
    driver.findElement(By.id("username")).sendKeys("user");  // ❌ Direct driver usage
    driver.findElement(By.id("password")).sendKeys("pass");  // ❌ Direct driver usage
}

// CORRECT
@Test
public void testLogin() {
    loginPage.login("user", "pass");  // ✓ Use page object
}
```

#### ❌ DON'T: Forget to Initialize Elements

```java
// WRONG
public LoginPage(WebDriver driver) {
    this.driver = driver;
    // Missing PageFactory.initElements  ❌
}

// CORRECT
public LoginPage(WebDriver driver) {
    this.driver = driver;
    PageFactory.initElements(driver, this);  // ✓
}
```

#### ❌ DON'T: Create Giant Page Classes

```java
// WRONG - One page class with 100+ methods  ❌
public class HomePage {
    // Navigation methods
    // Search methods
    // Cart methods
    // Profile methods
    // Settings methods
    // ... 100+ methods
}

// CORRECT - Split into components  ✓
public class HomePage {
    private NavigationHeader header;
    private Footer footer;
    // Only page-specific methods
}
```

#### ❌ DON'T: Use Thread.sleep()

```java
// WRONG
public void clickButton() {
    Thread.sleep(5000);  // ❌ Fixed wait
    button.click();
}

// CORRECT
public void clickButton() {
    wait.until(ExpectedConditions.elementToBeClickable(button));  // ✓ Explicit wait
    button.click();
}
```

---

## 13. Key Takeaways

### Core Concepts
1. **Fluent Page Objects** enable method chaining for cleaner test code
2. **Page Components** allow reusability of common UI elements across pages
3. **BasePage pattern** centralizes common functionality and reduces code duplication
4. **Wait strategies** are essential for handling dynamic elements reliably
5. **Window and frame handling** require dedicated utility classes for maintainability

### Advanced Techniques
6. **JavaScript Executor** integration provides solutions for complex interactions
7. **Custom wait conditions** handle specific application behaviors
8. **Test data separation** improves maintainability and reusability
9. **Advanced verification methods** support both hard and soft assertions
10. **Proper refactoring** transforms brittle tests into maintainable page objects

### Best Practices
11. **Always use Page Factory** with @FindBy annotations
12. **Keep locators private** and expose through public methods
13. **Return page objects** from methods for fluent interface
14. **Implement isPageLoaded()** for reliable page state verification
15. **Never put assertions** in page classes - keep them in tests

### Framework Design
16. **Component-based design** improves reusability across pages
17. **Inheritance hierarchies** (BasePage → Page Objects) reduce duplication
18. **Utility classes** (WindowHandler, FrameHandler) abstract complex operations
19. **Configuration management** externalizes test data and settings
20. **Complete separation** of page logic, test logic, and test data

---

## 14. Common Interview Questions

### Conceptual Questions
1. **What are Fluent Page Objects and why use them?**
   - Page objects that return `this` for method chaining, enabling more readable test code

2. **Explain the BasePage pattern and its benefits?**
   - Central parent class containing common WebDriver operations, waits, and utilities shared across all page objects

3. **What are Page Component Objects?**
   - Reusable UI components (header, footer, widgets) that appear across multiple pages, represented as separate classes

4. **How do you handle dynamic elements in POM?**
   - Use explicit waits, custom wait conditions, AjaxElementLocatorFactory, and retry mechanisms

5. **What is @CacheLookup and when should you use it?**
   - Annotation that caches WebElement lookup; use only for static elements that don't change

### Implementation Questions
6. **How do you handle multiple windows in POM?**
   - Create WindowHandler utility class with methods to switch, close, and manage multiple windows

7. **How do you handle iFrames in page objects?**
   - Create FrameHandler utility, switch to frame before interacting, then switch back to default content

8. **How do you use JavaScript Executor in POM?**
   - Integrate JS methods in BasePage for scrolling, clicking hidden elements, and custom operations

9. **How do you separate test data from page objects?**
   - Use properties files, JSON files, TestData classes, or data providers

10. **How do you implement custom wait conditions?**
    - Create CustomWaits class extending WebDriverWait with application-specific wait methods

### Design Questions
11. **How do you refactor non-POM tests to POM?**
    - Create page classes with @FindBy, extract actions into methods, move locators from tests to page objects

12. **How do you organize a complete POM framework?**
    - Separate packages for pages, components, utils, tests, and testdata; use inheritance and composition

13. **What's the difference between hard and soft assertions in POM?**
    - Hard assertions stop test immediately on failure; soft assertions collect all failures and report at end

14. **How do you handle navigation between pages in POM?**
    - Methods that perform navigation return the target page object (e.g., `return new HomePage(driver)`)

15. **How do you make page objects more maintainable?**
    - Use BasePage, component objects, meaningful names, waits, and keep page classes focused and small

---

## 15. Practical Exercises

---

### Exercise 1: Build Fluent Registration Page (30 min)

**Objective:** Create a registration page object using fluent interface pattern for method chaining.

**Scenario:** You're testing a user registration form that has multiple fields. You need to create a page object that allows elegant method chaining for a smooth test writing experience.

**Requirements:**
1. Create `RegistrationPage` extending `BasePage`
2. Include fields: firstName, lastName, email, password, confirmPassword, terms checkbox
3. Implement fluent methods that return `this` for chaining
4. Add `register()` method that submits and returns `HomePage`
5. Include verification methods that also return `this`
6. Write a test that demonstrates the fluent interface

**Code Template:**

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class RegistrationPage extends BasePage {

    @FindBy(id = "firstName")
    private WebElement firstNameField;

    @FindBy(id = "lastName")
    private WebElement lastNameField;

    @FindBy(id = "email")
    private WebElement emailField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(id = "confirmPassword")
    private WebElement confirmPasswordField;

    @FindBy(id = "terms")
    private WebElement termsCheckbox;

    @FindBy(id = "registerButton")
    private WebElement registerButton;

    @FindBy(className = "error-message")
    private WebElement errorMessage;

    public RegistrationPage(WebDriver driver) {
        super(driver);
    }

    // TODO 1: Implement enterFirstName() that returns this
    public RegistrationPage enterFirstName(String firstName) {
        // Your code here
        return this;
    }

    // TODO 2: Implement enterLastName() that returns this

    // TODO 3: Implement enterEmail() that returns this

    // TODO 4: Implement enterPassword() that returns this

    // TODO 5: Implement confirmPassword() that returns this

    // TODO 6: Implement acceptTerms() that returns this

    // TODO 7: Implement register() that clicks button and returns HomePage
    public HomePage register() {
        // Your code here
        return new HomePage(driver);
    }

    // TODO 8: Implement combined method registerUser() with all params
    public HomePage registerUser(String firstName, String lastName,
                                 String email, String password) {
        // Use method chaining here
        return this;
    }

    // TODO 9: Implement verifyErrorDisplayed() that returns this

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(registerButton);
    }
}
```

**Test Class:**

```java
@Test
public void testFluentRegistration() {
    // TODO: Use fluent interface to complete registration
    HomePage homePage = registrationPage
        .enterFirstName("John")
        // Add more chained methods
        .register();

    Assert.assertTrue(homePage.isPageLoaded());
}
```

**Expected Outcome:**
- Clean, readable test code using method chaining
- All input methods return `RegistrationPage` for chaining
- Final action method returns next page (`HomePage`)
- Test demonstrates fluent interface benefits

**Common Mistakes to Avoid:**
- Forgetting to return `this` in fluent methods
- Breaking the chain by returning void
- Not handling the final page transition correctly
- Missing null checks before operations

---

### Exercise 2: Create Reusable Navigation Component (35 min)

**Objective:** Build a navigation header component that can be reused across multiple page objects.

**Scenario:** Your application has a consistent navigation header across all pages with search, cart, user menu, and category dropdowns. Create a component that all pages can use.

**Requirements:**
1. Create `NavigationComponent` extending `BasePage`
2. Include: logo, search box, cart icon, user dropdown, category menu
3. Implement methods: search(), viewCart(), openUserMenu(), selectCategory()
4. Add getters: getCartCount(), getUsername(), isLoggedIn()
5. Create `HomePage` and `ProductListingPage` that use this component
6. Write tests demonstrating component reusability

**Code Template:**

```java
package components;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.BasePage;

public class NavigationComponent extends BasePage {

    @FindBy(id = "logo")
    private WebElement logo;

    @FindBy(id = "search-input")
    private WebElement searchInput;

    @FindBy(id = "search-button")
    private WebElement searchButton;

    @FindBy(id = "cart-icon")
    private WebElement cartIcon;

    @FindBy(id = "cart-count")
    private WebElement cartCount;

    @FindBy(id = "user-dropdown")
    private WebElement userDropdown;

    @FindBy(id = "logout-link")
    private WebElement logoutLink;

    @FindBy(css = ".category-menu")
    private WebElement categoryMenu;

    public NavigationComponent(WebDriver driver) {
        super(driver);
    }

    // TODO 1: Implement search() method
    public SearchResultsPage search(String query) {
        // Your code here
        return new SearchResultsPage(driver);
    }

    // TODO 2: Implement viewCart() method
    public CartPage viewCart() {
        // Your code here
        return new CartPage(driver);
    }

    // TODO 3: Implement getCartCount() method
    public int getCartCount() {
        // Your code here
        return 0;
    }

    // TODO 4: Implement openUserMenu() method

    // TODO 5: Implement logout() method
    public LoginPage logout() {
        // Your code here
        return new LoginPage(driver);
    }

    // TODO 6: Implement isLoggedIn() method
    public boolean isLoggedIn() {
        // Your code here
        return false;
    }

    // TODO 7: Implement selectCategory() method
    public ProductListingPage selectCategory(String categoryName) {
        // Your code here
        return new ProductListingPage(driver);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(logo);
    }
}
```

**Page Using Component:**

```java
package pages;

import components.NavigationComponent;

public class HomePage extends BasePage {

    private NavigationComponent navigation;

    @FindBy(id = "hero-banner")
    private WebElement heroBanner;

    public HomePage(WebDriver driver) {
        super(driver);
        this.navigation = new NavigationComponent(driver);
    }

    // TODO: Provide access to navigation component
    public NavigationComponent getNavigation() {
        return navigation;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(heroBanner) && navigation.isPageLoaded();
    }
}
```

**Expected Outcome:**
- Reusable navigation component working across pages
- Clean separation of component logic
- Multiple pages successfully using the same component
- Tests demonstrate component functionality

**Common Mistakes to Avoid:**
- Creating separate component instances instead of sharing
- Not initializing component in page constructor
- Forgetting to check component loading state
- Duplicating navigation code across pages

---

### Exercise 3: Implement Custom Wait Strategy for AJAX (40 min)

**Objective:** Create custom wait conditions to handle dynamic AJAX content loading.

**Scenario:** Your application uses AJAX to load content dynamically. You need custom wait strategies to handle loading spinners, content updates, and element attribute changes.

**Requirements:**
1. Create `CustomWaits` utility class
2. Implement waitForLoadingSpinner(), waitForElementCountToChange()
3. Implement waitForAttributeValue(), waitForTextToNotBe()
4. Create `DynamicContentPage` using these waits
5. Test AJAX-heavy page interactions
6. Handle timeouts gracefully

**Code Template:**

```java
package utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class CustomWaits {

    private WebDriver driver;
    private WebDriverWait wait;

    public CustomWaits(WebDriver driver, int timeoutInSeconds) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutInSeconds));
    }

    // TODO 1: Implement waitForLoadingSpinnerToDisappear()
    public void waitForLoadingSpinnerToDisappear(WebElement spinner) {
        try {
            // Wait for spinner to disappear
            // Your code here
        } catch (Exception e) {
            // Spinner might not appear at all
        }
    }

    // TODO 2: Implement waitForElementCountGreaterThan()
    public boolean waitForElementCountGreaterThan(List<WebElement> elements,
                                                  int expectedCount) {
        ExpectedCondition<Boolean> condition = d -> {
            // Your code here
            return false;
        };
        return wait.until(condition);
    }

    // TODO 3: Implement waitForAttributeToBe()
    public boolean waitForAttributeToBe(WebElement element, String attribute,
                                       String expectedValue) {
        // Your code here
        return false;
    }

    // TODO 4: Implement waitForTextToNotBe()
    public boolean waitForTextToNotBe(WebElement element, String textToAvoid) {
        ExpectedCondition<Boolean> condition = d -> {
            // Your code here
            return false;
        };
        return wait.until(condition);
    }

    // TODO 5: Implement waitForJQueryToComplete()
    public boolean waitForJQueryToComplete() {
        ExpectedCondition<Boolean> jQueryLoad = d -> {
            // Check if jQuery.active == 0
            // Your code here
            return false;
        };
        return wait.until(jQueryLoad);
    }

    // TODO 6: Implement waitForElementToBeStale()
    public boolean waitForElementToBeStale(WebElement element) {
        // Your code here
        return false;
    }
}
```

**Page Using Custom Waits:**

```java
package pages;

import utils.CustomWaits;

public class DynamicContentPage extends BasePage {

    private CustomWaits customWaits;

    @FindBy(className = "loading-spinner")
    private WebElement loadingSpinner;

    @FindBy(css = ".product-item")
    private List<WebElement> products;

    @FindBy(id = "load-more")
    private WebElement loadMoreButton;

    public DynamicContentPage(WebDriver driver) {
        super(driver);
        this.customWaits = new CustomWaits(driver, 15);
    }

    // TODO: Implement waitForContentToLoad()
    public DynamicContentPage waitForContentToLoad() {
        // Use custom waits
        return this;
    }

    // TODO: Implement loadMoreProducts()
    public DynamicContentPage loadMoreProducts() {
        // Wait for products to load
        return this;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(loadMoreButton);
    }
}
```

**Expected Outcome:**
- Custom wait conditions handling AJAX scenarios
- No StaleElementReferenceException or timeouts
- Clean wait logic encapsulated in utility
- Tests passing reliably with dynamic content

**Common Mistakes to Avoid:**
- Not catching TimeoutException properly
- Using Thread.sleep() instead of proper waits
- Not handling cases where wait conditions never meet
- Forgetting to reinitialize stale elements

---

### Exercise 4: Handle Multiple Windows and Tabs (35 min)

**Objective:** Create a page object that manages multiple browser windows and tabs efficiently.

**Scenario:** Your application opens product details in new tabs, social sharing in popups, and help documentation in new windows. You need clean window management.

**Requirements:**
1. Create `WindowManager` utility class
2. Implement switchToNewWindow(), switchByTitle(), closeAndReturn()
3. Create `ProductPage` with shareOnSocial() that handles popup
4. Handle parent and child window switching
5. Write tests for multi-window scenarios
6. Ensure proper cleanup of windows

**Code Template:**

```java
package utils;

import org.openqa.selenium.WebDriver;
import java.util.Set;

public class WindowManager {

    private WebDriver driver;
    private String parentWindowHandle;

    public WindowManager(WebDriver driver) {
        this.driver = driver;
        this.parentWindowHandle = driver.getWindowHandle();
    }

    // TODO 1: Implement switchToNewWindow()
    public void switchToNewWindow() {
        Set<String> handles = driver.getWindowHandles();
        // Your code here
    }

    // TODO 2: Implement switchToWindowByTitle()
    public boolean switchToWindowByTitle(String title) {
        // Your code here
        return false;
    }

    // TODO 3: Implement switchToWindowByURL()
    public boolean switchToWindowByURL(String urlFragment) {
        // Your code here
        return false;
    }

    // TODO 4: Implement switchToParentWindow()
    public void switchToParentWindow() {
        // Your code here
    }

    // TODO 5: Implement closeCurrentAndSwitchToParent()
    public void closeCurrentAndSwitchToParent() {
        // Your code here
    }

    // TODO 6: Implement closeAllExceptParent()
    public void closeAllExceptParent() {
        // Your code here
    }

    // TODO 7: Implement getWindowCount()
    public int getWindowCount() {
        return driver.getWindowHandles().size();
    }
}
```

**Page Using Window Manager:**

```java
package pages;

import utils.WindowManager;

public class ProductDetailsPage extends BasePage {

    private WindowManager windowManager;

    @FindBy(id = "share-facebook")
    private WebElement shareFacebookLink;

    @FindBy(id = "share-twitter")
    private WebElement shareTwitterLink;

    @FindBy(id = "help-link")
    private WebElement helpLink;

    public ProductDetailsPage(WebDriver driver) {
        super(driver);
        this.windowManager = new WindowManager(driver);
    }

    // TODO: Implement shareOnFacebook() that handles popup
    public ProductDetailsPage shareOnFacebook() {
        // Open popup, perform action, close and return
        return this;
    }

    // TODO: Implement openHelpInNewTab()
    public HelpPage openHelpInNewTab() {
        // Your code here
        return new HelpPage(driver);
    }

    public WindowManager getWindowManager() {
        return windowManager;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(shareFacebookLink);
    }
}
```

**Expected Outcome:**
- Clean window management without handle tracking in tests
- Successful navigation between windows
- Proper cleanup preventing window leaks
- Tests working with multiple windows reliably

**Common Mistakes to Avoid:**
- Losing reference to parent window
- Not closing windows properly
- Assuming window order
- Not waiting for new window to open

---

### Exercise 5: Master iFrame Interactions (40 min)

**Objective:** Create page objects that handle nested iFrames and complex iframe interactions.

**Scenario:** Your application has a WYSIWYG editor in an iframe, with nested frames for media gallery and formatting tools.

**Requirements:**
1. Create `FrameManager` utility class
2. Implement switchToFrame(), switchToNestedFrames(), switchBack()
3. Create `EditorPage` with iframe-based editor
4. Handle nested frames (frame within frame)
5. Test complex iframe interactions
6. Ensure proper frame context switching

**Code Template:**

```java
package utils;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class FrameManager {

    private WebDriver driver;

    public FrameManager(WebDriver driver) {
        this.driver = driver;
    }

    // TODO 1: Implement switchToFrame(WebElement)
    public void switchToFrame(WebElement frameElement) {
        // Your code here
    }

    // TODO 2: Implement switchToFrame(String nameOrId)
    public void switchToFrame(String nameOrId) {
        // Your code here
    }

    // TODO 3: Implement switchToFrame(int index)
    public void switchToFrame(int index) {
        // Your code here
    }

    // TODO 4: Implement switchToNestedFrames()
    public void switchToNestedFrames(WebElement... frames) {
        // Switch through multiple frames in sequence
        // Your code here
    }

    // TODO 5: Implement switchToDefaultContent()
    public void switchToDefaultContent() {
        // Your code here
    }

    // TODO 6: Implement switchToParentFrame()
    public void switchToParentFrame() {
        // Your code here
    }

    // TODO 7: Implement executeInFrame()
    public void executeInFrame(WebElement frameElement, Runnable action) {
        // Switch to frame, execute action, switch back
        // Your code here
    }
}
```

**Page Using Frame Manager:**

```java
package pages;

import utils.FrameManager;

public class ArticleEditorPage extends BasePage {

    private FrameManager frameManager;

    @FindBy(id = "editor-frame")
    private WebElement editorFrame;

    @FindBy(id = "media-frame")
    private WebElement mediaFrame;

    // Elements inside editor frame
    @FindBy(css = ".editor-content")
    private WebElement editorContent;

    @FindBy(id = "bold-button")
    private WebElement boldButton;

    @FindBy(id = "save-button")
    private WebElement saveButton;

    public ArticleEditorPage(WebDriver driver) {
        super(driver);
        this.frameManager = new FrameManager(driver);
    }

    // TODO: Implement typeInEditor()
    public ArticleEditorPage typeInEditor(String text) {
        // Switch to editor frame, type, switch back
        return this;
    }

    // TODO: Implement makeBold()
    public ArticleEditorPage makeBold() {
        // Switch to frame, click bold, switch back
        return this;
    }

    // TODO: Implement insertMediaFromGallery()
    public ArticleEditorPage insertMediaFromGallery(String mediaName) {
        // Handle nested frames
        return this;
    }

    // TODO: Implement getEditorContent()
    public String getEditorContent() {
        // Your code here
        return "";
    }

    // TODO: Implement saveArticle()
    public ArticleEditorPage saveArticle() {
        // Save button is outside frame
        return this;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(editorFrame);
    }
}
```

**Expected Outcome:**
- Successful iframe switching and interaction
- Nested frames handled correctly
- No NoSuchElementException from wrong context
- Clean abstraction of frame complexity

**Common Mistakes to Avoid:**
- Forgetting to switch back to default content
- Not waiting for frame to be available
- Mixing up frame switching order
- Losing context after page refresh

---

### Exercise 6: Refactor Legacy Test to POM (45 min)

**Objective:** Transform a messy non-POM test into clean, maintainable page object structure.

**Scenario:** You inherited a legacy test with hardcoded locators, no page objects, and mixed concerns. Refactor it to follow POM best practices.

**Legacy Test (What NOT to do):**

```java
public class LegacyCheckoutTest {

    @Test
    public void testCheckout() {
        driver.get("https://example.com/products");

        // Direct driver usage - BAD
        driver.findElement(By.id("search-box")).sendKeys("laptop");
        driver.findElement(By.id("search-btn")).click();

        Thread.sleep(2000); // BAD

        driver.findElement(By.cssSelector(".product-item:first-child")).click();
        driver.findElement(By.id("add-to-cart")).click();
        driver.findElement(By.id("cart-icon")).click();

        WebElement checkoutBtn = driver.findElement(By.id("checkout"));
        checkoutBtn.click();

        // Hardcoded test data - BAD
        driver.findElement(By.id("firstName")).sendKeys("John");
        driver.findElement(By.id("lastName")).sendKeys("Doe");
        driver.findElement(By.id("email")).sendKeys("john@test.com");

        driver.findElement(By.id("submit-order")).click();

        // Assertion in wrong place - BAD
        String confirmation = driver.findElement(By.className("confirmation")).getText();
        Assert.assertTrue(confirmation.contains("success"));
    }
}
```

**Requirements:**
1. Create separate page objects: SearchPage, ProductPage, CartPage, CheckoutPage, ConfirmationPage
2. Extract locators from test to page objects
3. Use PageFactory and @FindBy annotations
4. Implement BasePage with common methods
5. Externalize test data
6. Add proper waits instead of Thread.sleep
7. Write clean, readable refactored test

**Code Template:**

```java
// TODO 1: Create SearchPage
package pages;

public class SearchPage extends BasePage {

    @FindBy(id = "search-box")
    private WebElement searchBox;

    @FindBy(id = "search-btn")
    private WebElement searchButton;

    // TODO: Implement search() method
    public ProductListingPage search(String query) {
        // Your code here
        return new ProductListingPage(driver);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(searchBox);
    }
}

// TODO 2: Create ProductListingPage
// TODO 3: Create ProductPage
// TODO 4: Create CartPage
// TODO 5: Create CheckoutPage
// TODO 6: Create ConfirmationPage

// TODO 7: Create refactored test
package tests;

public class RefactoredCheckoutTest extends BaseTest {

    @Test
    public void testCheckout() {
        // TODO: Rewrite using page objects
        // Should be clean and readable
    }
}
```

**Expected Outcome:**
- Clean test with page object usage
- No direct driver usage in test
- Locators encapsulated in page classes
- Proper waits instead of Thread.sleep
- Test data externalized
- Assertions only in test class

**Common Mistakes to Avoid:**
- Leaving some driver calls in test
- Forgetting to initialize page objects
- Not using proper waits
- Keeping test data in page objects

---

## Solution Approach for Exercises

### Exercise 1 Solution Hints:
- Each fluent method should call BasePage methods (type, click)
- Return `this` after each action except final submission
- registerUser() should chain all individual methods
- Use descriptive method names for readability

### Exercise 2 Solution Hints:
- NavigationComponent should be initialized in every page's constructor
- Provide getNavigation() method in each page
- Component methods should handle their own waits
- Consider making component methods fluent too

### Exercise 3 Solution Hints:
- Use ExpectedCondition<Boolean> for custom waits
- Handle TimeoutException gracefully
- JavaScript Executor needed for jQuery wait
- Test both success and timeout scenarios

### Exercise 4 Solution Hints:
- Store parent handle in constructor
- Use Set<String> to iterate window handles
- Always close windows you open
- Switch back to parent after operations

### Exercise 5 Solution Hints:
- Wait for frame availability before switching
- Always switch back to default content when done
- Use try-finally to ensure switching back
- Test frame switching order carefully

### Exercise 6 Solution Hints:
- Start by identifying page transitions
- Create one page object per screen
- Extract all findElement() calls to @FindBy
- Move all actions to page objects
- Keep only assertions in test

---

## Navigation

- **Previous:** [Day 35: POM Part 1](../week5/day35_pom_part1.md)
- **Next:** [Day 37: External Data Sources](./day37_external_data.md)
- **Week 6 Home:** [Week 6 Overview](./README.md)

---

**Congratulations!** You have mastered advanced Page Object Model patterns. These techniques will help you build robust, maintainable, and scalable test automation frameworks that can handle complex real-world applications.

**Next:** In Day 37, we'll explore working with external data sources like Excel, CSV, and databases to drive data-driven testing in your framework.
