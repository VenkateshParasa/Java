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

## 15. Hands-On Exercises

These progressive exercises will help you master advanced Page Object Model patterns. Start with Exercise 1 and work your way through each one.

---

### Exercise 1: Build a Fluent Registration Page (30 minutes)

**Objective:** Create a complete fluent page object for a registration form that supports method chaining.

**Scenario:** Create a RegistrationPage that allows users to:
- Enter first name, last name, email, password
- Select country from dropdown
- Accept terms and conditions
- Submit the form
- All methods should support chaining

**Instructions:**

1. Create `RegistrationPage.java` extending BasePage
2. Add @FindBy annotations for all form fields
3. Implement fluent methods that return `this`
4. Add final submit method that returns next page
5. Create test class to use the fluent interface

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

    @FindBy(id = "country")
    private WebElement countryDropdown;

    @FindBy(id = "termsCheckbox")
    private WebElement termsCheckbox;

    @FindBy(id = "registerButton")
    private WebElement registerButton;

    @FindBy(className = "success-message")
    private WebElement successMessage;

    public RegistrationPage(WebDriver driver) {
        super(driver);
    }

    // TODO: Implement fluent method to enter first name
    public RegistrationPage enterFirstName(String firstName) {
        // Your code here
        return this;
    }

    // TODO: Implement fluent method to enter last name
    public RegistrationPage enterLastName(String lastName) {
        // Your code here
        return this;
    }

    // TODO: Implement fluent method to enter email
    public RegistrationPage enterEmail(String email) {
        // Your code here
        return this;
    }

    // TODO: Implement fluent method to enter password
    public RegistrationPage enterPassword(String password) {
        // Your code here
        return this;
    }

    // TODO: Implement fluent method to confirm password
    public RegistrationPage confirmPassword(String password) {
        // Your code here
        return this;
    }

    // TODO: Implement fluent method to select country
    public RegistrationPage selectCountry(String country) {
        // Your code here
        return this;
    }

    // TODO: Implement fluent method to accept terms
    public RegistrationPage acceptTerms() {
        // Your code here
        return this;
    }

    // TODO: Implement submit method returning next page
    public WelcomePage submitRegistration() {
        // Your code here
        return new WelcomePage(driver);
    }

    // TODO: Implement combined fluent method for complete registration
    public WelcomePage registerUser(String firstName, String lastName,
                                    String email, String password,
                                    String country) {
        // Your code here - chain all methods
        return submitRegistration();
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(firstNameField);
    }
}
```

**Test Class Template:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.RegistrationPage;
import pages.WelcomePage;

public class RegistrationTest extends BaseTest {

    @Test
    public void testFluentRegistration() {
        RegistrationPage registrationPage = new RegistrationPage(driver);
        driver.get("https://example.com/register");

        // TODO: Use fluent interface to complete registration
        WelcomePage welcomePage = registrationPage
                // Chain methods here
                ;

        // TODO: Verify welcome page is displayed
        Assert.assertTrue(welcomePage.isPageLoaded());
    }

    @Test
    public void testCombinedRegistration() {
        RegistrationPage registrationPage = new RegistrationPage(driver);
        driver.get("https://example.com/register");

        // TODO: Use combined method for registration
        WelcomePage welcomePage = registrationPage.registerUser(
                // Add parameters
        );

        Assert.assertTrue(welcomePage.isPageLoaded());
    }
}
```

**Expected Output:**
- All fields should be filled correctly
- Form should submit successfully
- Welcome page should load
- Test should pass with proper fluent chaining

**Common Mistakes to Avoid:**
1. ❌ Forgetting to return `this` in fluent methods
2. ❌ Not using BasePage methods (type, click, selectByVisibleText)
3. ❌ Missing PageFactory.initElements in constructor
4. ❌ Not waiting for elements before interaction
5. ❌ Returning wrong page object type from submit method

**Solution Hints:**
- Each fluent method should call BasePage methods and return `this`
- Use `type()` from BasePage for text fields
- Use `selectByVisibleText()` for dropdown
- Use `click()` for checkbox and button
- Chain all methods in the test using dot notation

---

### Exercise 2: Create Reusable Search Component (35 minutes)

**Objective:** Build a SearchBox component that can be reused across multiple pages.

**Scenario:** Your e-commerce site has a search box in the header on every page. Create a reusable SearchBox component that:
- Accepts search query
- Shows suggestions dropdown
- Can be used from any page
- Returns search results page

**Instructions:**

1. Create `SearchBox.java` as a component extending BasePage
2. Add search field, search button, and suggestions dropdown
3. Implement methods to search and select from suggestions
4. Use this component in HomePage, ProductPage, and CartPage
5. Write tests demonstrating reusability

**Code Template:**

```java
package components;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.BasePage;
import pages.SearchResultsPage;
import java.util.List;

public class SearchBox extends BasePage {

    @FindBy(id = "search-input")
    private WebElement searchInput;

    @FindBy(id = "search-button")
    private WebElement searchButton;

    @FindBy(css = ".search-suggestions")
    private WebElement suggestionsDropdown;

    @FindBy(css = ".suggestion-item")
    private List<WebElement> suggestionItems;

    @FindBy(className = "clear-search")
    private WebElement clearSearchButton;

    public SearchBox(WebDriver driver) {
        super(driver);
    }

    // TODO: Implement method to type search query
    public SearchBox typeSearchQuery(String query) {
        // Your code here
        return this;
    }

    // TODO: Implement method to check if suggestions are displayed
    public boolean areSuggestionsDisplayed() {
        // Your code here
        return false;
    }

    // TODO: Implement method to get all suggestion texts
    public List<String> getSuggestions() {
        // Your code here
        return null;
    }

    // TODO: Implement method to select suggestion by text
    public SearchResultsPage selectSuggestion(String suggestionText) {
        // Your code here
        return new SearchResultsPage(driver);
    }

    // TODO: Implement method to search (click search button)
    public SearchResultsPage performSearch() {
        // Your code here
        return new SearchResultsPage(driver);
    }

    // TODO: Implement combined search method
    public SearchResultsPage search(String query) {
        // Your code here - type and click search
        return new SearchResultsPage(driver);
    }

    // TODO: Implement method to clear search
    public SearchBox clearSearch() {
        // Your code here
        return this;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(searchInput);
    }
}
```

**Page Integration Template:**

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import components.SearchBox;

public class HomePage extends BasePage {

    // TODO: Add SearchBox component
    private SearchBox searchBox;

    @FindBy(id = "hero-banner")
    private WebElement heroBanner;

    public HomePage(WebDriver driver) {
        super(driver);
        // TODO: Initialize SearchBox component
        this.searchBox = new SearchBox(driver);
    }

    // TODO: Provide getter for SearchBox
    public SearchBox getSearchBox() {
        return searchBox;
    }

    public boolean isHeroBannerDisplayed() {
        return isElementDisplayed(heroBanner);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(heroBanner);
    }
}
```

**Test Template:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.HomePage;
import pages.ProductPage;
import pages.CartPage;
import pages.SearchResultsPage;

public class SearchBoxTest extends BaseTest {

    @Test
    public void testSearchFromHomePage() {
        HomePage homePage = new HomePage(driver);
        driver.get("https://example.com");

        // TODO: Use search box component from home page
        SearchResultsPage results = homePage.getSearchBox()
                // Add search functionality
                ;

        Assert.assertTrue(results.isPageLoaded());
    }

    @Test
    public void testSearchFromProductPage() {
        ProductPage productPage = new ProductPage(driver);
        driver.get("https://example.com/product/123");

        // TODO: Use same search box component from product page
        SearchResultsPage results = productPage.getSearchBox()
                // Add search functionality
                ;

        Assert.assertTrue(results.isPageLoaded());
    }

    @Test
    public void testSearchWithSuggestions() {
        HomePage homePage = new HomePage(driver);
        driver.get("https://example.com");

        // TODO: Type query, wait for suggestions, select one
        SearchResultsPage results = homePage.getSearchBox()
                // Add suggestion selection logic
                ;

        Assert.assertTrue(results.isPageLoaded());
    }
}
```

**Expected Output:**
- SearchBox component works on all pages
- Suggestions appear when typing
- Search returns correct results page
- Component is truly reusable

**Common Mistakes to Avoid:**
1. ❌ Making SearchBox page-specific instead of generic
2. ❌ Not initializing component in each page's constructor
3. ❌ Exposing WebElements instead of methods
4. ❌ Forgetting to wait for suggestions dropdown
5. ❌ Not using BasePage methods for interactions

**Solution Hints:**
- SearchBox should extend BasePage
- Initialize new SearchBox(driver) in each page's constructor
- Use getTextFromElements() for getting all suggestions
- Wait for suggestionsDropdown to be visible
- Stream API helps find suggestion by text

---

### Exercise 3: Implement Custom Wait Conditions (40 minutes)

**Objective:** Create custom wait conditions for application-specific scenarios.

**Scenario:** Your application has:
- Loading spinner that appears during AJAX calls
- Dynamic product count that updates
- Progress bar that shows completion
- Notification messages that auto-dismiss

Create custom waits to handle these scenarios.

**Instructions:**

1. Create `CustomWaitConditions.java` utility class
2. Implement custom ExpectedCondition for each scenario
3. Create a page object that uses these custom waits
4. Write tests to verify the custom waits work correctly

**Code Template:**

```java
package utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import java.util.List;

public class CustomWaitConditions {

    // TODO: Custom wait for loading spinner to disappear
    public static ExpectedCondition<Boolean> loadingSpinnerDisappears(
            WebElement loadingSpinner) {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                // Your code here
                // Return true when spinner is not displayed
                return false;
            }
        };
    }

    // TODO: Custom wait for element count to be greater than expected
    public static ExpectedCondition<Boolean> elementCountGreaterThan(
            List<WebElement> elements, int expectedCount) {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                // Your code here
                // Return true when elements.size() > expectedCount
                return false;
            }
        };
    }

    // TODO: Custom wait for progress bar to reach percentage
    public static ExpectedCondition<Boolean> progressBarReaches(
            WebElement progressBar, int percentage) {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                // Your code here
                // Get aria-valuenow or style width, compare to percentage
                return false;
            }
        };
    }

    // TODO: Custom wait for text to change from initial value
    public static ExpectedCondition<Boolean> textChangesFrom(
            WebElement element, String initialText) {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                // Your code here
                // Return true when element text differs from initialText
                return false;
            }
        };
    }

    // TODO: Custom wait for notification to disappear
    public static ExpectedCondition<Boolean> notificationDisappears(
            WebElement notification) {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                // Your code here
                // Return true when notification is not displayed or stale
                return false;
            }
        };
    }

    // TODO: Custom wait for AJAX calls to complete (jQuery)
    public static ExpectedCondition<Boolean> jQueryAjaxComplete() {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                // Your code here
                // Execute JS: return jQuery.active == 0
                return false;
            }
        };
    }
}
```

**Page Object Template:**

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.WebDriverWait;
import utils.CustomWaitConditions;
import java.time.Duration;
import java.util.List;

public class DynamicContentPage extends BasePage {

    private WebDriverWait wait;

    @FindBy(className = "loading-spinner")
    private WebElement loadingSpinner;

    @FindBy(css = ".product-item")
    private List<WebElement> productItems;

    @FindBy(id = "progress-bar")
    private WebElement progressBar;

    @FindBy(id = "item-count")
    private WebElement itemCount;

    @FindBy(className = "notification")
    private WebElement notification;

    @FindBy(id = "load-more")
    private WebElement loadMoreButton;

    public DynamicContentPage(WebDriver driver) {
        super(driver);
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    // TODO: Load products and wait for spinner to disappear
    public DynamicContentPage loadProducts() {
        click(loadMoreButton);
        // Use CustomWaitConditions.loadingSpinnerDisappears
        return this;
    }

    // TODO: Wait for minimum product count
    public DynamicContentPage waitForProductCount(int minimumCount) {
        // Use CustomWaitConditions.elementCountGreaterThan
        return this;
    }

    // TODO: Wait for progress bar to complete
    public DynamicContentPage waitForProgressCompletion() {
        // Use CustomWaitConditions.progressBarReaches(100)
        return this;
    }

    // TODO: Get product count after text changes
    public int getUpdatedProductCount() {
        String initialCount = getText(itemCount);
        // Use CustomWaitConditions.textChangesFrom
        return Integer.parseInt(getText(itemCount));
    }

    // TODO: Dismiss notification and wait for it to disappear
    public DynamicContentPage dismissNotification() {
        if (isElementDisplayed(notification)) {
            click(notification);
            // Use CustomWaitConditions.notificationDisappears
        }
        return this;
    }

    public int getCurrentProductCount() {
        return productItems.size();
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(loadMoreButton);
    }
}
```

**Test Template:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.DynamicContentPage;

public class CustomWaitTest extends BaseTest {

    @Test
    public void testLoadingSpinnerWait() {
        DynamicContentPage page = new DynamicContentPage(driver);
        driver.get("https://example.com/products");

        // TODO: Click load more and verify spinner disappears
        page.loadProducts();
        Assert.assertTrue(page.getCurrentProductCount() > 0);
    }

    @Test
    public void testWaitForProductCount() {
        DynamicContentPage page = new DynamicContentPage(driver);
        driver.get("https://example.com/products");

        // TODO: Wait for at least 10 products to load
        page.waitForProductCount(10);
        Assert.assertTrue(page.getCurrentProductCount() >= 10);
    }

    @Test
    public void testProgressBarWait() {
        DynamicContentPage page = new DynamicContentPage(driver);
        driver.get("https://example.com/upload");

        // TODO: Upload file and wait for progress bar to complete
        page.waitForProgressCompletion();
        // Add verification
    }

    @Test
    public void testTextChangeWait() {
        DynamicContentPage page = new DynamicContentPage(driver);
        driver.get("https://example.com/products");

        // TODO: Load products and verify count updates
        int initialCount = page.getCurrentProductCount();
        page.loadProducts();
        int updatedCount = page.getUpdatedProductCount();

        Assert.assertTrue(updatedCount > initialCount);
    }
}
```

**Expected Output:**
- Custom waits handle all dynamic scenarios
- No fixed Thread.sleep() used
- Tests are stable and don't flake
- Wait conditions provide clear failure messages

**Common Mistakes to Avoid:**
1. ❌ Using Thread.sleep() instead of custom waits
2. ❌ Not handling StaleElementReferenceException in wait conditions
3. ❌ Forgetting to return Boolean from apply() method
4. ❌ Not using JavascriptExecutor when needed for AJAX wait
5. ❌ Setting wait timeout too short for slow operations

**Solution Hints:**
- ExpectedCondition<Boolean> requires apply(WebDriver) returning Boolean
- Wrap element checks in try-catch for stale elements
- Use JavascriptExecutor for jQuery.active check
- getAttribute("aria-valuenow") for progress bars
- isDisplayed() returns false for hidden elements

---

### Exercise 4: Multiple Window Handling (35 minutes)

**Objective:** Create a page object that properly handles multiple windows and tabs.

**Scenario:** Your application has links that open in new windows:
- Terms and Conditions link opens in new window
- Social media share opens in new tab
- Help documentation opens in new window

Handle these windows properly and return to the original window.

**Instructions:**

1. Enhance WindowHandler utility with missing methods
2. Create ProductPage that opens terms in new window
3. Create methods to handle social media windows
4. Write tests that verify window switching works correctly

**Code Template:**

```java
package utils;

import org.openqa.selenium.WebDriver;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class WindowHandler {

    private WebDriver driver;
    private String mainWindowHandle;

    public WindowHandler(WebDriver driver) {
        this.driver = driver;
        this.mainWindowHandle = driver.getWindowHandle();
    }

    // TODO: Switch to newly opened window
    public void switchToNewWindow() {
        // Your code here
        // Get all windows, find one that's not mainWindowHandle, switch to it
    }

    // TODO: Switch to window by title
    public boolean switchToWindowByTitle(String title) {
        // Your code here
        // Loop through windows, check title, switch if matches
        return false;
    }

    // TODO: Switch to window by URL fragment
    public boolean switchToWindowByUrl(String urlFragment) {
        // Your code here
        // Loop through windows, check URL contains fragment, switch
        return false;
    }

    // TODO: Close current window and switch back to main
    public void closeCurrentAndSwitchToMain() {
        // Your code here
        // Close current, switch to mainWindowHandle
    }

    // TODO: Close all windows except main
    public void closeAllExceptMain() {
        // Your code here
        // Loop through windows, close all except mainWindowHandle
    }

    // TODO: Get count of open windows
    public int getWindowCount() {
        // Your code here
        return 0;
    }

    // TODO: Wait for new window to open
    public void waitForWindowCount(int expectedCount, int timeoutSeconds) {
        // Your code here
        // Poll getWindowHandles().size() until equals expectedCount
    }

    public String getMainWindowHandle() {
        return mainWindowHandle;
    }

    public void switchToMainWindow() {
        driver.switchTo().window(mainWindowHandle);
    }
}
```

**Page Object Template:**

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

    @FindBy(linkText = "Terms and Conditions")
    private WebElement termsLink;

    @FindBy(id = "share-facebook")
    private WebElement shareFacebookButton;

    @FindBy(id = "share-twitter")
    private WebElement shareTwitterButton;

    @FindBy(linkText = "Help")
    private WebElement helpLink;

    @FindBy(id = "add-to-cart")
    private WebElement addToCartButton;

    public ProductDetailsPage(WebDriver driver) {
        super(driver);
        this.windowHandler = new WindowHandler(driver);
    }

    // TODO: Open terms in new window, verify, and close
    public ProductDetailsPage readTermsAndConditions() {
        // Your code here
        // 1. Click terms link
        // 2. Wait for new window
        // 3. Switch to new window
        // 4. Verify terms page loaded
        // 5. Close and switch back
        return this;
    }

    // TODO: Share on Facebook (opens new window)
    public ProductDetailsPage shareOnFacebook() {
        // Your code here
        // Similar to terms but for Facebook
        return this;
    }

    // TODO: Share on Twitter (opens new tab)
    public ProductDetailsPage shareOnTwitter() {
        // Your code here
        return this;
    }

    // TODO: Open help in new window and verify content
    public ProductDetailsPage openHelp(String expectedHelpTopic) {
        // Your code here
        // Open help, switch, verify topic, close
        return this;
    }

    // TODO: Verify we're on correct window
    public boolean isOnProductPage() {
        return driver.getWindowHandles().size() == 1 &&
               isElementDisplayed(productTitle);
    }

    public String getProductTitle() {
        return getText(productTitle);
    }

    public WindowHandler getWindowHandler() {
        return windowHandler;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(productTitle);
    }
}
```

**Test Template:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.ProductDetailsPage;

public class MultipleWindowTest extends BaseTest {

    @Test
    public void testTermsAndConditions() {
        ProductDetailsPage productPage = new ProductDetailsPage(driver);
        driver.get("https://example.com/product/123");

        // TODO: Read terms and return to product page
        productPage.readTermsAndConditions();

        // Verify we're back on product page
        Assert.assertTrue(productPage.isOnProductPage());
        Assert.assertEquals(productPage.getWindowHandler().getWindowCount(), 1);
    }

    @Test
    public void testSocialMediaSharing() {
        ProductDetailsPage productPage = new ProductDetailsPage(driver);
        driver.get("https://example.com/product/123");

        // TODO: Share on Facebook and Twitter
        productPage.shareOnFacebook()
                   .shareOnTwitter();

        // Verify we're still on product page
        Assert.assertTrue(productPage.isOnProductPage());
    }

    @Test
    public void testMultipleWindows() {
        ProductDetailsPage productPage = new ProductDetailsPage(driver);
        driver.get("https://example.com/product/123");

        // TODO: Open terms and help simultaneously
        // Verify window count increases
        int initialWindows = productPage.getWindowHandler().getWindowCount();

        // Open multiple windows

        // Close all except main
        productPage.getWindowHandler().closeAllExceptMain();

        Assert.assertEquals(
            productPage.getWindowHandler().getWindowCount(),
            initialWindows
        );
    }
}
```

**Expected Output:**
- New windows open and close properly
- Always returns to main window
- Window count is correctly managed
- No windows left open after test

**Common Mistakes to Avoid:**
1. ❌ Not storing main window handle at start
2. ❌ Forgetting to close child windows
3. ❌ Not waiting for new window to open
4. ❌ Using wrong window handle after switch
5. ❌ Not verifying window count after operations

**Solution Hints:**
- Store mainWindowHandle in constructor
- Use Set<String> handles = driver.getWindowHandles()
- Loop with for-each to find non-main windows
- driver.close() closes current window
- driver.switchTo().window(handle) switches to window

---

### Exercise 5: iFrame Editor Page Object (40 minutes)

**Objective:** Create a page object that handles a complex WYSIWYG editor inside an iframe.

**Scenario:** Build a blog post editor page where:
- Editor content is inside an iframe
- Toolbar (bold, italic, lists) is outside iframe
- Need to switch context frequently
- Preview is also in a separate iframe

**Instructions:**

1. Create FrameHandler utility (if not exists)
2. Create BlogEditorPage that handles iframe switches
3. Implement methods for formatting text
4. Create methods to preview content
5. Write tests that verify editor functionality

**Code Template:**

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

    // TODO: Switch to frame by WebElement
    public void switchToFrame(WebElement frameElement) {
        // Your code here
        // Use wait.until for frame availability
    }

    // TODO: Switch to frame by index
    public void switchToFrame(int index) {
        // Your code here
    }

    // TODO: Switch to frame by name or ID
    public void switchToFrame(String nameOrId) {
        // Your code here
    }

    // TODO: Switch to default content (main page)
    public void switchToDefaultContent() {
        // Your code here
    }

    // TODO: Execute action in frame and return to main
    public void executeInFrame(WebElement frameElement, Runnable action) {
        // Your code here
        // Switch to frame, run action, switch back
    }

    // TODO: Switch to nested frames
    public void switchToNestedFrames(WebElement... frames) {
        // Your code here
        // Loop through frames, switching to each
    }
}
```

**Page Object Template:**

```java
package pages;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import utils.FrameHandler;

public class BlogEditorPage extends BasePage {

    private FrameHandler frameHandler;

    // Main page elements (outside iframe)
    @FindBy(id = "editor-frame")
    private WebElement editorFrame;

    @FindBy(id = "preview-frame")
    private WebElement previewFrame;

    @FindBy(id = "bold-button")
    private WebElement boldButton;

    @FindBy(id = "italic-button")
    private WebElement italicButton;

    @FindBy(id = "bullet-list-button")
    private WebElement bulletListButton;

    @FindBy(id = "save-button")
    private WebElement saveButton;

    // Editor frame elements (inside iframe)
    @FindBy(css = "body[contenteditable='true']")
    private WebElement editorBody;

    // Preview frame elements
    @FindBy(css = ".preview-content")
    private WebElement previewContent;

    public BlogEditorPage(WebDriver driver) {
        super(driver);
        this.frameHandler = new FrameHandler(driver);
    }

    // TODO: Type text in editor (inside iframe)
    public BlogEditorPage typeInEditor(String text) {
        // Your code here
        // 1. Switch to editor frame
        // 2. Type in editorBody
        // 3. Switch back to default content
        return this;
    }

    // TODO: Get text from editor
    public String getEditorText() {
        // Your code here
        // Switch to frame, get text, switch back
        return null;
    }

    // TODO: Make text bold (toolbar outside, content inside)
    public BlogEditorPage makeBold() {
        // Your code here
        // 1. Select text in editor frame
        // 2. Switch to default
        // 3. Click bold button
        return this;
    }

    // TODO: Make text italic
    public BlogEditorPage makeItalic() {
        // Your code here
        return this;
    }

    // TODO: Create bullet list
    public BlogEditorPage createBulletList(String... items) {
        // Your code here
        // 1. Click bullet list button (outside frame)
        // 2. Switch to frame
        // 3. Type items separated by Enter
        // 4. Switch back
        return this;
    }

    // TODO: Format text with bold and italic
    public BlogEditorPage formatText(String text, boolean bold, boolean italic) {
        // Your code here
        // Type text, apply formatting if flags are true
        return this;
    }

    // TODO: Get preview text (from preview iframe)
    public String getPreviewText() {
        // Your code here
        // Switch to preview frame, get text, switch back
        return null;
    }

    // TODO: Clear editor content
    public BlogEditorPage clearEditor() {
        // Your code here
        // Switch to frame, select all, delete, switch back
        return this;
    }

    // TODO: Save content (outside iframe)
    public BlogEditorPage save() {
        // Your code here
        // Make sure we're in default content, then click save
        return this;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(editorFrame);
    }
}
```

**Test Template:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.BlogEditorPage;

public class IFrameEditorTest extends BaseTest {

    @Test
    public void testBasicEditing() {
        BlogEditorPage editor = new BlogEditorPage(driver);
        driver.get("https://example.com/blog/editor");

        // TODO: Type text in editor
        editor.typeInEditor("Hello World");

        // Verify text appears in editor
        Assert.assertEquals(editor.getEditorText(), "Hello World");
    }

    @Test
    public void testTextFormatting() {
        BlogEditorPage editor = new BlogEditorPage(driver);
        driver.get("https://example.com/blog/editor");

        // TODO: Type and apply formatting
        editor.typeInEditor("Bold Text")
              .makeBold()
              .typeInEditor(" and ")
              .typeInEditor("Italic Text")
              .makeItalic();

        // Verify formatted text
        String editorText = editor.getEditorText();
        Assert.assertTrue(editorText.contains("Bold Text"));
        Assert.assertTrue(editorText.contains("Italic Text"));
    }

    @Test
    public void testBulletList() {
        BlogEditorPage editor = new BlogEditorPage(driver);
        driver.get("https://example.com/blog/editor");

        // TODO: Create bullet list
        editor.createBulletList("Item 1", "Item 2", "Item 3");

        // Verify list created
        String editorText = editor.getEditorText();
        Assert.assertTrue(editorText.contains("Item 1"));
        Assert.assertTrue(editorText.contains("Item 2"));
        Assert.assertTrue(editorText.contains("Item 3"));
    }

    @Test
    public void testPreview() {
        BlogEditorPage editor = new BlogEditorPage(driver);
        driver.get("https://example.com/blog/editor");

        // TODO: Type content and check preview
        String content = "Preview this content";
        editor.typeInEditor(content);

        // Get preview text (different iframe)
        String previewText = editor.getPreviewText();
        Assert.assertEquals(previewText, content);
    }

    @Test
    public void testSaveContent() {
        BlogEditorPage editor = new BlogEditorPage(driver);
        driver.get("https://example.com/blog/editor");

        // TODO: Create formatted content and save
        editor.formatText("Important Message", true, true)
              .save();

        // Verify save succeeded
        // Add appropriate verification
    }
}
```

**Expected Output:**
- Text typed in editor iframe correctly
- Formatting applied properly
- Preview shows current content
- No frame-related exceptions
- Always returns to default content

**Common Mistakes to Avoid:**
1. ❌ Forgetting to switch back to default content
2. ❌ Not waiting for frame to be available
3. ❌ Trying to interact with frame element before switching
4. ❌ Mixing up editor frame and preview frame
5. ❌ Not using WebDriverWait for frame switching

**Solution Hints:**
- Always use wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt())
- Switch to default content after every frame operation
- Use executeInFrame() for one-off frame operations
- Keys.chord(Keys.CONTROL, "a") selects all text
- driver.switchTo().defaultContent() returns to main page

---

### Exercise 6: Complete Mini E2E Framework (45 minutes)

**Objective:** Build a complete mini-framework demonstrating all advanced POM patterns.

**Scenario:** Create an end-to-end shopping flow framework with:
- BasePage with all common methods
- Multiple interconnected pages
- Reusable components (header, footer)
- Custom waits and utilities
- Complete test demonstrating the flow

**Instructions:**

1. Create project structure with proper packages
2. Implement BasePage with common methods
3. Create at least 4 interconnected pages
4. Add 2 reusable components
5. Write complete E2E test using all patterns
6. Demonstrate fluent interface throughout

**Project Structure:**

```
mini-framework/
├── src/main/java/
│   ├── pages/
│   │   ├── BasePage.java
│   │   ├── HomePage.java
│   │   ├── ProductPage.java
│   │   ├── CartPage.java
│   │   └── CheckoutPage.java
│   ├── components/
│   │   ├── NavigationHeader.java
│   │   └── ProductCard.java
│   └── utils/
│       ├── WindowHandler.java
│       ├── FrameHandler.java
│       └── CustomWaits.java
└── src/test/java/
    ├── tests/
    │   ├── BaseTest.java
    │   └── E2EShoppingTest.java
    └── testdata/
        └── TestData.java
```

**BasePage Template (Simplified):**

```java
package pages;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public abstract class BasePage {

    protected WebDriver driver;
    protected WebDriverWait wait;
    protected JavascriptExecutor js;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        this.js = (JavascriptExecutor) driver;
        PageFactory.initElements(driver, this);
    }

    // TODO: Add protected methods for common actions
    // - click(WebElement)
    // - type(WebElement, String)
    // - getText(WebElement)
    // - selectByVisibleText(WebElement, String)
    // - isElementDisplayed(WebElement)
    // - scrollToElement(WebElement)
    // - waitForElementToBeClickable(WebElement)

    // TODO: Add abstract method for page validation
    public abstract boolean isPageLoaded();
}
```

**Component Template:**

```java
package components;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import pages.BasePage;
import pages.SearchResultsPage;
import pages.CartPage;

public class NavigationHeader extends BasePage {

    @FindBy(id = "search-box")
    private WebElement searchBox;

    @FindBy(id = "search-button")
    private WebElement searchButton;

    @FindBy(id = "cart-icon")
    private WebElement cartIcon;

    @FindBy(id = "cart-count")
    private WebElement cartCount;

    public NavigationHeader(WebDriver driver) {
        super(driver);
    }

    // TODO: Implement search method returning SearchResultsPage
    public SearchResultsPage search(String query) {
        // Your code here
        return new SearchResultsPage(driver);
    }

    // TODO: Implement openCart returning CartPage
    public CartPage openCart() {
        // Your code here
        return new CartPage(driver);
    }

    // TODO: Implement getCartCount
    public int getCartCount() {
        // Your code here
        return 0;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(searchBox);
    }
}
```

**Page Template:**

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import components.NavigationHeader;

public class HomePage extends BasePage {

    private NavigationHeader header;

    @FindBy(id = "featured-products")
    private WebElement featuredProducts;

    @FindBy(css = ".product-card")
    private List<WebElement> productCards;

    public HomePage(WebDriver driver) {
        super(driver);
        this.header = new NavigationHeader(driver);
    }

    // TODO: Provide header access
    public NavigationHeader getHeader() {
        return header;
    }

    // TODO: Select product by index
    public ProductPage selectProduct(int index) {
        // Your code here
        return new ProductPage(driver);
    }

    // TODO: Get featured product count
    public int getFeaturedProductCount() {
        // Your code here
        return 0;
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(featuredProducts);
    }
}
```

**Complete E2E Test Template:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.*;

public class E2EShoppingTest extends BaseTest {

    @Test(description = "Complete shopping flow from search to checkout")
    public void testCompleteShoppingFlow() {
        // TODO: Implement complete E2E flow

        // 1. Start on home page
        HomePage homePage = new HomePage(driver);
        driver.get("https://example.com");
        Assert.assertTrue(homePage.isPageLoaded());

        // 2. Search for product using header component
        SearchResultsPage searchResults = homePage.getHeader()
                .search("laptop");
        Assert.assertTrue(searchResults.hasResults());

        // 3. Select first product
        ProductPage productPage = searchResults.selectFirstProduct();
        Assert.assertTrue(productPage.isPageLoaded());

        // 4. Add to cart with fluent interface
        CartPage cartPage = productPage
                .selectQuantity(2)
                .selectColor("Black")
                .addToCart();
        Assert.assertTrue(cartPage.isPageLoaded());

        // 5. Verify cart using header component
        int cartCount = homePage.getHeader().getCartCount();
        Assert.assertEquals(cartCount, 2);

        // 6. Proceed to checkout
        CheckoutPage checkoutPage = cartPage
                .applyCoupon("SAVE20")
                .proceedToCheckout();
        Assert.assertTrue(checkoutPage.isPageLoaded());

        // 7. Verify final total
        String total = checkoutPage.getTotalAmount();
        Assert.assertTrue(total.contains("$"));
    }
}
```

**Tasks to Complete:**

1. Fill in all TODO sections in BasePage
2. Complete NavigationHeader component methods
3. Implement all page object methods
4. Create ProductPage, CartPage, CheckoutPage
5. Write BaseTest with setup/teardown
6. Complete E2E test with all interactions
7. Add assertions at each step

**Expected Output:**
- Complete working E2E test flow
- All pages interconnected properly
- Components reused across pages
- Fluent interface throughout
- Clean, maintainable code structure

**Common Mistakes to Avoid:**
1. ❌ Not initializing components in page constructors
2. ❌ Forgetting to call super(driver) in page constructors
3. ❌ Missing PageFactory.initElements
4. ❌ Not implementing isPageLoaded() in all pages
5. ❌ Creating separate driver instances instead of sharing

**Solution Hints:**
- Each page should extend BasePage
- Components are initialized in page constructor with new Component(driver)
- Return page objects from navigation methods
- Use fluent interface (return this) for actions on same page
- BaseTest should initialize driver once and pass to pages

---

## Navigation

## Navigation

- **Previous:** [Day 35: POM Part 1](../week5/day35_pom_part1.md)
- **Next:** [Day 37: External Data Sources](./day37_external_data.md)
- **Week 6 Home:** [Week 6 Overview](./README.md)

---

**Congratulations!** You have mastered advanced Page Object Model patterns. These techniques will help you build robust, maintainable, and scalable test automation frameworks that can handle complex real-world applications.

**Next:** In Day 37, we'll explore working with external data sources like Excel, CSV, and databases to drive data-driven testing in your framework.
