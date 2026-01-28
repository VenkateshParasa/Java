#!/usr/bin/env python3
"""
Add comprehensive "Common Mistakes" sections to Selenium Week 4-5 exercises.

This script adds properly formatted Common Mistakes sections to exercises in:
- docs/exercises/selenium/weekly/week-04-days-22-28.md (Days 22-28)
- docs/exercises/selenium/weekly/week-05-days-29-35.md (Days 29-35)

Usage:
    python3 add_common_mistakes_selenium_weeks_4_5.py
"""

import re
import os
import sys

# ============================================================================
# COMMON MISTAKES TEMPLATES
# ============================================================================

COMMON_MISTAKES = {
    # WEEK 4: Days 24-26 - Dropdowns, Checkboxes, Radio Buttons, Alerts

    "dropdown_single": """
**Common Mistakes:**
1. ❌ **Treating Dropdowns as Regular Elements**: Trying to click options directly without using Select class
   - Why: Dropdown options aren't directly clickable WebElements
   - Fix: Always use `Select select = new Select(element)` for `<select>` tags
   - Example: `new Select(driver.findElement(By.id("dropdown"))).selectByVisibleText("Option 1")`

2. ❌ **Not Waiting for Dropdown to Load**: Attempting to select options before dropdown is fully rendered
   - Why: Dynamic dropdowns may load options asynchronously via JavaScript
   - Fix: Use explicit wait: `wait.until(ExpectedConditions.elementToBeClickable(dropdown))`

3. ❌ **Using Wrong Selection Method**: Using selectByIndex(0) without understanding zero-based indexing
   - Why: Index 0 might be a placeholder option like "Please Select"
   - Fix: Prefer `selectByVisibleText()` or `selectByValue()` for more reliable selection

4. ❌ **Not Verifying Selection**: Selecting an option without confirming it was actually selected
   - Why: Selection might fail silently due to JavaScript interference or page issues
   - Fix: Always verify: `assertEquals(select.getFirstSelectedOption().getText(), "Expected Text")`

5. ❌ **Forgetting to Check if Element is Actually a Dropdown**: Using Select class on non-dropdown elements
   - Why: Select class only works with `<select>` tags, throws exception otherwise
   - Fix: Verify tag before creating Select: `if(element.getTagName().equals("select")) { ... }`
""",

    "dropdown_multi": """
**Common Mistakes:**
1. ❌ **Not Checking if Multiple Selection is Enabled**: Treating multi-select like single-select
   - Why: Not all dropdowns support multiple selections
   - Fix: Check first: `if(select.isMultiple()) { /* handle multi-select */ }`

2. ❌ **Forgetting to Deselect Previous Options**: Selecting new options without clearing old ones first
   - Why: In multi-select, new selections ADD to existing ones, not replace them
   - Fix: Use `select.deselectAll()` before making new selections when needed

3. ❌ **Using Wrong Deselection Method**: Trying to deselect from single-select dropdown
   - Why: `deselectAll()` throws UnsupportedOperationException on single-select dropdowns
   - Fix: Always check `isMultiple()` before attempting deselection

4. ❌ **Not Handling NoSuchElementException**: Selecting non-existent options without error handling
   - Why: Options might not exist or be dynamically loaded
   - Fix: Wrap in try-catch or verify option exists first

5. ❌ **Incorrect Verification of Multiple Selections**: Using `getFirstSelectedOption()` for multi-select
   - Why: This only returns ONE option, not all selected options
   - Fix: Use `getAllSelectedOptions()` and verify size: `assertEquals(select.getAllSelectedOptions().size(), 3)`
""",

    "dropdown_realworld": """
**Common Mistakes:**
1. ❌ **Not Handling Dynamic Dropdowns**: Treating AJAX/dynamic dropdowns like static ones
   - Why: Options load asynchronously, causing NoSuchElementException
   - Fix: Wait for options to load: `wait.until(ExpectedConditions.numberOfElementsToBe(By.tagName("option"), expectedCount))`

2. ❌ **Hardcoding Wait Times**: Using `Thread.sleep()` instead of explicit waits
   - Why: Arbitrary waits are unreliable and slow down tests unnecessarily
   - Fix: Use `WebDriverWait` with appropriate expected conditions

3. ❌ **Not Handling Disabled Options**: Attempting to select disabled options
   - Why: Disabled options throw InvalidElementStateException when selected
   - Fix: Check if enabled: `if(option.isEnabled()) { select.selectByValue(value); }`

4. ❌ **Ignoring Case Sensitivity**: Using exact text that doesn't match due to case differences
   - Why: `selectByVisibleText("option")` won't match "Option" (capital O)
   - Fix: Verify exact text or use flexible matching

5. ❌ **Not Clearing Selections Between Tests**: Tests affecting each other due to retained state
   - Why: Multi-select dropdowns retain selections across actions if not cleared
   - Fix: Add `select.deselectAll()` in tearDown or before each test
""",

    "checkbox_basic": """
**Common Mistakes:**
1. ❌ **Not Checking Current State Before Action**: Clicking checkbox without knowing if it's already checked
   - Why: May toggle it to opposite of desired state
   - Fix: Always check first: `if(!checkbox.isSelected()) { checkbox.click(); }`

2. ❌ **Assuming Click Always Checks the Box**: Blindly clicking without verifying final state
   - Why: Click toggles state; if already checked, it will uncheck
   - Fix: Verify after action: `assertTrue(checkbox.isSelected(), "Checkbox should be checked")`

3. ❌ **Using sendKeys() Instead of click()**: Trying `checkbox.sendKeys(Keys.SPACE)` unnecessarily
   - Why: `click()` is standard method for checkboxes; sendKeys is less reliable
   - Fix: Use `checkbox.click()` for checkbox interactions

4. ❌ **Not Waiting for Checkbox to be Clickable**: Clicking immediately after page load
   - Why: Checkbox might be obscured by loading overlays or animations
   - Fix: Use explicit wait: `wait.until(ExpectedConditions.elementToBeClickable(checkbox))`

5. ❌ **Clicking Disabled Checkboxes**: Not checking if checkbox is enabled before interaction
   - Why: Clicking disabled elements throws InvalidElementStateException
   - Fix: Verify first: `if(checkbox.isEnabled()) { checkbox.click(); }`
""",

    "radio_button": """
**Common Mistakes:**
1. ❌ **Treating Radio Buttons Like Checkboxes**: Trying to uncheck a radio button by clicking it again
   - Why: Radio buttons can only be selected, not deselected (except by selecting another in same group)
   - Fix: Select a different radio button to change selection; you cannot uncheck by clicking same button

2. ❌ **Not Using Same 'name' Attribute to Group**: Selecting radio buttons without understanding grouping
   - Why: Radio buttons with same 'name' attribute form a mutual exclusion group
   - Fix: Always verify the 'name' attribute matches for buttons in same group

3. ❌ **Clicking Already Selected Radio Button**: Inefficient clicking without checking state
   - Why: Unnecessary action that wastes time and may trigger unwanted events
   - Fix: Check first: `if(!radio.isSelected()) { radio.click(); }`

4. ❌ **Not Verifying Mutual Exclusion**: Selecting new button without verifying old one is deselected
   - Why: Core radio button behavior is mutual exclusion; validate it works
   - Fix: After selecting new: `assertFalse(oldRadio.isSelected())` and `assertTrue(newRadio.isSelected())`

5. ❌ **Using Wrong Locator Strategy**: Locating by text instead of value attribute
   - Why: Visible text may change; value attribute is more stable
   - Fix: Use `driver.findElement(By.cssSelector("input[value='optionValue']"))` for better stability
""",

    "alert_basic": """
**Common Mistakes:**
1. ❌ **Not Switching to Alert Before Interaction**: Trying to interact with alert without `switchTo()`
   - Why: Alerts are separate from main page context; must explicitly switch
   - Fix: Always use `Alert alert = driver.switchTo().alert()` first

2. ❌ **Handling Alerts Too Quickly**: Switching to alert before it appears
   - Why: Alert may not appear immediately; causes NoAlertPresentException
   - Fix: Use explicit wait: `wait.until(ExpectedConditions.alertIsPresent())`

3. ❌ **Forgetting to Accept/Dismiss Alert**: Switching to alert but not handling it
   - Why: Alert blocks all page interactions until dismissed
   - Fix: Always call `alert.accept()` or `alert.dismiss()` after handling

4. ❌ **Not Handling NoAlertPresentException**: Assuming alert always appears
   - Why: Conditional alerts may not appear; code will fail
   - Fix: Wrap in try-catch: `try { alert.accept(); } catch(NoAlertPresentException e) { /* handle */ }`

5. ❌ **Confusing alert.accept() vs alert.dismiss()**: Using wrong method for dialogs
   - Why: accept() clicks "OK", dismiss() clicks "Cancel" - they have different effects
   - Fix: Use accept() for confirmation, dismiss() for cancellation based on test scenario
""",

    "alert_confirmation": """
**Common Mistakes:**
1. ❌ **Not Testing Both Accept and Dismiss**: Only testing one path in confirmation dialogs
   - Why: Both "OK" and "Cancel" paths need validation
   - Fix: Create separate test cases for `alert.accept()` and `alert.dismiss()` scenarios

2. ❌ **Forgetting to Verify Alert Text**: Accepting alert without reading message
   - Why: Alert text confirms correct dialog appeared; critical for validation
   - Fix: Always verify: `assertEquals(alert.getText(), "Expected message")`

3. ❌ **Not Switching Back to Main Window**: Staying in alert context after dismissal
   - Why: After handling alert, explicitly return to main content if needed
   - Fix: Use `driver.switchTo().defaultContent()` if required

4. ❌ **Ignoring Alert Timing Issues**: Not waiting long enough for alert to appear
   - Why: JavaScript alerts may have delay; NoAlertPresentException occurs
   - Fix: Increase wait time: `wait.until(ExpectedConditions.alertIsPresent())`

5. ❌ **Testing with Wrong Alert Type**: Confusing confirm() with alert() dialogs
   - Why: alert() only has OK button, confirm() has OK and Cancel
   - Fix: Understand which JavaScript method creates which dialog type
""",

    "alert_prompt": """
**Common Mistakes:**
1. ❌ **Not Sending Text to Prompt**: Calling accept() on prompt without entering text first
   - Why: Prompt expects user input; skipping it may cause unexpected behavior
   - Fix: Always use `alert.sendKeys("your text")` before `alert.accept()`

2. ❌ **Sending Keys After Accept/Dismiss**: Wrong order of operations
   - Why: Once accepted/dismissed, alert is gone; cannot send keys
   - Fix: Correct order: `alert.sendKeys(text)` → THEN → `alert.accept()`

3. ❌ **Not Verifying Entered Text**: Not confirming text was properly entered
   - Why: Text might not be accepted due to validation or technical issues
   - Fix: After submission, verify the text appears in page as expected

4. ❌ **Not Testing Cancel Scenario**: Only testing text entry + OK, ignoring Cancel button
   - Why: Users can cancel prompts; this path needs testing too
   - Fix: Test both: enter text + accept, AND just dismiss without text

5. ❌ **Assuming Default Text Handling**: Not considering prompts with default values
   - Why: Some prompts have pre-filled text that needs clearing
   - Fix: Understand how sendKeys() behaves with default text (usually replaces)
""",

    "alert_modal": """
**Common Mistakes:**
1. ❌ **Confusing Bootstrap Modals with JavaScript Alerts**: Using Alert interface for modals
   - Why: Bootstrap modals are HTML elements, not browser alerts
   - Fix: Use regular WebElement methods: `driver.findElement(By.cssSelector(".modal"))` instead of `switchTo().alert()`

2. ❌ **Not Waiting for Modal to Fully Display**: Interacting before modal animation completes
   - Why: Modals often have fade-in animations; elements not clickable immediately
   - Fix: Wait for visibility: `wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("modal")))`

3. ❌ **Clicking Outside Modal Without Handling**: Assuming modal will stay open
   - Why: Many modals close when clicking backdrop; test may fail unexpectedly
   - Fix: Ensure clicks are precisely on modal elements, not backdrop

4. ❌ **Not Handling Modal Backdrop**: Trying to interact with page elements behind modal
   - Why: Modal backdrop blocks interactions with main page
   - Fix: Close modal first, or ensure you're interacting with modal content only

5. ❌ **Using Wrong Wait Condition**: Waiting for alert instead of element visibility
   - Why: Modals are regular DOM elements, not alerts
   - Fix: Use `ExpectedConditions.visibilityOfElementLocated()`, not `alertIsPresent()`
""",

    "alert_timeout": """
**Common Mistakes:**
1. ❌ **Using Fixed Thread.sleep()**: Hardcoding wait times with Thread.sleep()
   - Why: Brittle and slow; waits full time even if alert appears sooner
   - Fix: Use `WebDriverWait` with `ExpectedConditions.alertIsPresent()`

2. ❌ **Setting Wait Too Short**: Using insufficient timeout for alert appearance
   - Why: Alerts may take longer to appear depending on network/system load
   - Fix: Set reasonable timeout: `new WebDriverWait(driver, Duration.ofSeconds(10))`

3. ❌ **Not Handling TimeoutException**: Assuming alert will always appear within timeout
   - Why: Alert might not appear due to bugs or conditions not met
   - Fix: Wrap in try-catch: `try { wait.until(...) } catch(TimeoutException e) { /* handle */ }`

4. ❌ **Waiting for Wrong Condition**: Using incorrect ExpectedCondition
   - Why: Using elementToBeClickable() instead of alertIsPresent() won't work
   - Fix: Use correct condition: `ExpectedConditions.alertIsPresent()`

5. ❌ **Not Customizing Polling Interval**: Using default polling which may be too infrequent
   - Why: Default 500ms polling might miss rapid state changes
   - Fix: Use FluentWait with custom polling if needed
""",

    "alert_realworld": """
**Common Mistakes:**
1. ❌ **Not Handling Alert Absence**: Code fails when optional alerts don't appear
   - Why: Some alerts are conditional based on user actions or system state
   - Fix: Use try-catch or check for alert existence first

2. ❌ **Mixing Alert Types in Same Test**: Testing JavaScript alerts and Bootstrap modals together
   - Why: Requires different handling strategies; increases complexity and failure points
   - Fix: Separate tests for browser alerts vs HTML modals

3. ❌ **Not Considering Browser Differences**: Assuming alert behavior is identical across browsers
   - Why: Different browsers may handle alerts with slight timing variations
   - Fix: Increase wait times and add browser-specific handling if needed

4. ❌ **Forgetting Authentication Alerts**: Not handling basic auth dialogs
   - Why: Authentication alerts use different mechanism (not switchTo().alert())
   - Fix: Pass credentials in URL: `http://username:password@example.com`

5. ❌ **Not Validating Alert Impact**: Accepting alert without verifying its effect on page
   - Why: Alert action should change page state; must validate the change occurred
   - Fix: After handling alert, verify expected page changes: status messages, redirects, etc.
""",

    # Days 27-28: Frames & Windows

    "frame_basics": """
**Common Mistakes:**
1. ❌ **Forgetting to Switch to Frame**: Trying to interact with frame elements without switching context
   - Why: Frame elements are in separate DOM context; must switch explicitly
   - Fix: Always switch first: `driver.switchTo().frame(frameElement)` or `driver.switchTo().frame("frameName")`

2. ❌ **Not Switching Back to Main Content**: Staying in frame context after interaction complete
   - Why: Subsequent element searches will only look within current frame
   - Fix: Switch back: `driver.switchTo().defaultContent()` to return to main page

3. ❌ **Confusing Frames with Windows**: Using frame switching methods for new windows
   - Why: Frames are nested documents; windows are separate browser tabs/windows
   - Fix: Use `switchTo().frame()` for frames, `switchTo().window()` for windows

4. ❌ **Using Wrong Frame Identifier**: Switching by name when should use index or element
   - Why: Frame may not have name/id attribute; wrong identifier causes NoSuchFrameException
   - Fix: Prefer WebElement: `driver.switchTo().frame(driver.findElement(By.id("frameId")))`

5. ❌ **Not Waiting for Frame to Load**: Switching to frame before it's fully loaded
   - Why: Frame content may load asynchronously; causes stale element issues
   - Fix: Wait for frame: `wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameLocator))`
""",

    "frame_multiple": """
**Common Mistakes:**
1. ❌ **Using Wrong Switching Method**: Switching by index without understanding context
   - Why: Index 0 might not be the frame you expect; brittle approach
   - Fix: Prefer switching by WebElement or name/id for stability

2. ❌ **Forgetting Current Context**: Not tracking which frame you're currently in
   - Why: Leads to confusion and errors when trying to switch between frames
   - Fix: Always switch to defaultContent() first, then navigate to target frame

3. ❌ **Not Handling Frame Not Found**: Assuming frame always exists
   - Why: Frames might load conditionally or be removed dynamically
   - Fix: Wrap in try-catch: `try { driver.switchTo().frame(...) } catch(NoSuchFrameException e) { ... }`

4. ❌ **Switching Too Quickly**: Moving between frames without waiting for load
   - Why: Frame content may not be ready; causes NoSuchElementException
   - Fix: Wait after switching: `wait.until(ExpectedConditions.presenceOfElementLocated(...))`

5. ❌ **Hardcoding Frame Indices**: Using numeric indices that may change
   - Why: If page structure changes, frame indices change too
   - Fix: Use name, id, or WebElement for more stable frame identification
""",

    "frame_nested": """
**Common Mistakes:**
1. ❌ **Not Following Correct Path**: Trying to jump directly to nested frame
   - Why: Must switch through parent frames hierarchically; cannot skip levels
   - Fix: Switch step-by-step: `defaultContent() → parentFrame → childFrame`

2. ❌ **Losing Track of Nesting Level**: Not remembering how deep into frames you are
   - Why: Leads to errors when trying to switch back or to siblings
   - Fix: Track frame path or always return to defaultContent() before new navigation

3. ❌ **Using Wrong Parent Reference**: Calling `driver.switchTo().parentFrame()` incorrectly
   - Why: `parentFrame()` goes up one level; multiple nested frames need multiple calls
   - Fix: For multiple levels up, call `parentFrame()` multiple times or use `defaultContent()`

4. ❌ **Not Validating Frame Switch Success**: Assuming switch succeeded without verification
   - Why: Switch might fail silently; code continues with wrong context
   - Fix: Verify by checking for expected element after switch

5. ❌ **Inefficient Navigation**: Switching to defaultContent() repeatedly unnecessarily
   - Why: Performance overhead; better to navigate directly when possible
   - Fix: If moving between sibling frames, switch to parent then to sibling
""",

    "frame_realworld": """
**Common Mistakes:**
1. ❌ **Not Handling Dynamic Frames**: Treating dynamically loaded frames like static ones
   - Why: Frames may load via AJAX; immediate switch fails
   - Fix: Use `wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(locator))`

2. ❌ **Ignoring Frame Load Time**: Not accounting for frame content load delay
   - Why: Frame element may exist but content not yet loaded
   - Fix: After switching, wait for expected content

3. ❌ **Not Cleaning Up Frame Context**: Leaving tests in frame context affecting subsequent tests
   - Why: Test isolation breaks; next test starts in wrong context
   - Fix: Add `driver.switchTo().defaultContent()` in @AfterMethod or finally block

4. ❌ **Handling Nested Frames Inefficiently**: Repeatedly switching from defaultContent for each action
   - Why: Excessive context switching slows down tests
   - Fix: Stay in target frame for multiple operations, switch out once when done

5. ❌ **Not Considering Cross-Origin Frames**: Attempting to interact with frames from different domains
   - Why: Security restrictions prevent access to cross-origin frame content
   - Fix: Understand browser security policies; some frame interactions may not be possible
""",

    "frame_wait": """
**Common Mistakes:**
1. ❌ **Not Waiting for Frame Availability**: Switching to frame without checking if it exists
   - Why: Frame may not be loaded yet; causes NoSuchFrameException
   - Fix: Use `wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(locator))`

2. ❌ **Using Wrong Wait Condition**: Waiting for frame element visibility instead of availability
   - Why: Frame element and frame content readiness are different things
   - Fix: Use correct condition: `frameToBeAvailableAndSwitchToIt()` combines both checks

3. ❌ **Setting Insufficient Timeout**: Using too short timeout for frame load
   - Why: Frames with heavy content may take longer to load
   - Fix: Set appropriate timeout: `new WebDriverWait(driver, Duration.ofSeconds(15))`

4. ❌ **Not Waiting After Switching**: Immediately interacting with frame content after switch
   - Why: Frame content may still be loading even after frame is available
   - Fix: Add explicit wait for specific element after switching

5. ❌ **Ignoring Stale Element Issues**: Not handling stale elements after frame refreshes
   - Why: Frame content may dynamically reload, making cached elements stale
   - Fix: Re-locate elements after waiting; don't store element references for too long
""",

    "window_basics": """
**Common Mistakes:**
1. ❌ **Confusing Windows with Tabs**: Treating tabs and windows as different in Selenium
   - Why: In Selenium, both tabs and windows are handled identically as "window handles"
   - Fix: Use same methods (`getWindowHandle()`, `getWindowHandles()`) for both

2. ❌ **Not Storing Original Window Handle**: Losing reference to parent window
   - Why: Cannot switch back to original window without its handle
   - Fix: Always store before opening new window: `String parentWindow = driver.getWindowHandle()`

3. ❌ **Forgetting to Switch to New Window**: Assuming driver automatically focuses new window
   - Why: Driver stays in original window context after new window opens
   - Fix: Explicitly switch: `driver.switchTo().window(newWindowHandle)`

4. ❌ **Using Wrong Window Handle**: Switching to incorrect window handle
   - Why: Window handles are unique strings; using wrong one causes NoSuchWindowException
   - Fix: Verify handle exists before switching

5. ❌ **Not Closing Windows**: Opening windows without closing them in tests
   - Why: Accumulates browser windows; memory leak and affects subsequent tests
   - Fix: Always close: `driver.close()` for current window, or `driver.quit()` for all
""",

    "window_multiple": """
**Common Mistakes:**
1. ❌ **Not Handling Window Handle Set Properly**: Treating Set<String> as ordered list
   - Why: Set is unordered; cannot reliably access "second" window by iteration order
   - Fix: Compare current handle with getWindowHandles() to find new windows

2. ❌ **Assuming Only One New Window**: Not handling cases where multiple windows open
   - Why: Some actions might open multiple windows/tabs
   - Fix: Check `getWindowHandles().size()` and handle all windows appropriately

3. ❌ **Using Close() Instead of Quit()**: Closing current window but not cleaning up
   - Why: `close()` only closes current window; other windows remain open
   - Fix: Use `quit()` at end of test to close all windows

4. ❌ **Not Verifying Window Switch**: Switching without confirming correct window active
   - Why: Switch might fail; subsequent actions happen in wrong window
   - Fix: Verify by checking page title or URL after switch

5. ❌ **Poor Window Handle Management**: Not tracking which handle corresponds to which window
   - Why: Gets confusing with multiple windows; hard to debug
   - Fix: Store handles with descriptive names
""",

    "window_getwindowhandles": """
**Common Mistakes:**
1. ❌ **Not Understanding Set Data Structure**: Expecting ordered window handles
   - Why: `getWindowHandles()` returns Set<String>, which has no guaranteed order
   - Fix: Don't rely on order; identify windows by title, URL, or by process of elimination

2. ❌ **Calling getWindowHandles() Only Once**: Storing window handles and reusing
   - Why: Window handles are valid but new windows won't be in stored Set
   - Fix: Call `getWindowHandles()` each time you need current window list

3. ❌ **Not Filtering Old vs New Handles**: Cannot distinguish between original and new windows
   - Why: All handles are just strings; no built-in way to know which is which
   - Fix: Store original handles before action, then compare

4. ❌ **Iterating Inefficiently**: Complex loops to find target window
   - Why: Verbose code that's hard to maintain
   - Fix: Use helper methods to find window by title/URL

5. ❌ **Forgetting to Switch After Finding Handle**: Getting handle but not using it
   - Why: Found the right handle but driver still in wrong window context
   - Fix: Always follow with `driver.switchTo().window(targetHandle)`
""",

    "window_parent_child": """
**Common Mistakes:**
1. ❌ **Not Preserving Parent Handle**: Opening child window but losing parent reference
   - Why: Cannot switch back to parent without its handle
   - Fix: Store parent handle BEFORE opening child: `String parent = driver.getWindowHandle()`

2. ❌ **Assuming Child Window Opens Immediately**: Switching to child before it exists
   - Why: Window opening may have delay; causes NoSuchWindowException
   - Fix: Wait for window: `wait.until(ExpectedConditions.numberOfWindowsToBe(2))`

3. ❌ **Closing Wrong Window**: Accidentally closing parent when intending to close child
   - Why: `driver.close()` closes currently focused window; easy to be in wrong context
   - Fix: Verify current window before closing

4. ❌ **Not Handling Window Close Impact**: Closing window without realizing driver state
   - Why: After closing current window, driver needs new focus; operations will fail
   - Fix: After `driver.close()`, immediately switch to valid window

5. ❌ **Testing Only One Direction**: Switching parent→child but not testing child→parent
   - Why: Users navigate both ways; both paths need validation
   - Fix: Test bidirectional switching
""",

    "window_realworld": """
**Common Mistakes:**
1. ❌ **Not Handling Popup Blockers**: Assuming new windows always open
   - Why: Browser popup blockers may prevent new windows
   - Fix: Verify window opened: `assertEquals(driver.getWindowHandles().size(), expectedCount)`

2. ❌ **Not Waiting for Window Content Load**: Switching to window but content not ready
   - Why: Window opens but page may still be loading
   - Fix: After switching, wait for content

3. ❌ **Poor Cleanup Strategy**: Not closing all windows at test end
   - Why: Windows accumulate across tests; affects performance and subsequent tests
   - Fix: In @AfterMethod, ensure all windows closed

4. ❌ **Not Handling Dynamic Window Names**: Expecting consistent window titles/names
   - Why: Window titles may be dynamic or load asynchronously
   - Fix: Use flexible matching

5. ❌ **Ignoring Window Size/Position**: Not considering window dimensions affect element visibility
   - Why: Elements might be outside viewport in small windows
   - Fix: Maximize windows: `driver.manage().window().maximize()`
""",

    # WEEK 5: Days 29-35 - TestNG, JavaScript Executor, Waits, Screenshots

    "testng_xml": """
**Common Mistakes:**
1. ❌ **Wrong XML Structure**: Incorrect nesting of suite, test, and classes tags
   - Why: TestNG requires specific XML schema; wrong structure causes parsing errors
   - Fix: Follow correct order: `<suite>` → `<test>` → `<classes>` → `<class>`

2. ❌ **Not Including DTD Declaration**: Missing `<!DOCTYPE>` declaration at top of XML
   - Why: TestNG requires DTD to validate XML structure
   - Fix: Always include: `<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">`

3. ❌ **Incorrect Class Names**: Using simple class names instead of fully qualified names
   - Why: TestNG needs complete package path to locate classes
   - Fix: Use full path: `<class name="com.automation.tests.LoginTest"/>`

4. ❌ **Not Configuring Test Dependencies**: Running tests without proper order/grouping
   - Why: Some tests may depend on others completing first
   - Fix: Use `preserve-order="true"` or configure dependencies properly

5. ❌ **Hardcoding Values Instead of Parameters**: Not leveraging TestNG parameters feature
   - Why: Reduces reusability; same suite can't run with different data
   - Fix: Use `<parameter>` tags: `<parameter name="browser" value="chrome"/>`
""",

    "testng_groups": """
**Common Mistakes:**
1. ❌ **Not Defining Groups**: Forgetting to add `groups` attribute to test methods
   - Why: Tests won't be included in group execution
   - Fix: Add annotation: `@Test(groups = {"smoke", "regression"})`

2. ❌ **Circular Dependencies**: Creating dependency loops between groups
   - Why: TestNG cannot resolve execution order; tests won't run
   - Fix: Ensure dependencies are linear: A→B→C, not A→B→A

3. ❌ **Wrong dependsOnGroups Syntax**: Using incorrect attribute name
   - Why: TestNG won't recognize the dependency
   - Fix: Use exact syntax: `@Test(dependsOnGroups = {"groupName"})`

4. ❌ **Not Including Groups in XML**: Defining groups in code but not configuring in XML
   - Why: Groups won't execute when running via XML
   - Fix: Add `<groups><run><include>` in testng.xml

5. ❌ **Mixing Methods and Groups Dependencies**: Using both dependsOnMethods and dependsOnGroups
   - Why: Can create complex dependency chains that are hard to debug
   - Fix: Prefer one approach for cleaner test organization
""",

    "page_factory": """
**Common Mistakes:**
1. ❌ **Forgetting @FindBy Annotation**: Declaring WebElements without @FindBy
   - Why: Page Factory won't initialize elements; NullPointerException occurs
   - Fix: Always annotate: `@FindBy(id="username") private WebElement usernameField;`

2. ❌ **Not Calling initElements()**: Creating page object without initialization
   - Why: Elements remain null; first interaction throws NullPointerException
   - Fix: Always call: `PageFactory.initElements(driver, this);` in constructor

3. ❌ **Using Public Element Fields**: Declaring WebElements as public
   - Why: Breaks encapsulation; violates Page Object Model principles
   - Fix: Make elements private, expose through methods

4. ❌ **Storing Stale Element References**: Caching elements that may become stale
   - Why: Page Factory handles staleness automatically only on re-access
   - Fix: Let Page Factory re-initialize elements by always accessing through @FindBy

5. ❌ **Complex Locators in @FindBy**: Using complicated expressions that are hard to maintain
   - Why: Reduces readability and maintainability
   - Fix: Keep locators simple; extract complex logic to methods
""",

    "javascript_executor_basic": """
**Common Mistakes:**
1. ❌ **Not Casting Driver to JavascriptExecutor**: Directly using driver reference
   - Why: WebDriver interface doesn't have executeScript() method
   - Fix: Cast first: `JavascriptExecutor js = (JavascriptExecutor) driver;`

2. ❌ **Wrong JavaScript Syntax**: Using Java syntax in JavaScript code
   - Why: JavaScript runs in browser; must use JavaScript syntax
   - Fix: Example: Use `arguments[0]` not Java variable names

3. ❌ **Forgetting Return Statement**: Not returning value from JavaScript
   - Why: executeScript() returns null if JavaScript doesn't return anything
   - Fix: Add `return` in JavaScript: `js.executeScript("return document.title")`

4. ❌ **Not Handling Null Returns**: Assuming executeScript() always returns value
   - Why: Some JavaScript operations don't return values
   - Fix: Check for null: `Object result = js.executeScript(...); if(result != null) {...}`

5. ❌ **Using executeScript() for Everything**: Overusing JavaScript instead of native Selenium methods
   - Why: Native methods are more stable and readable
   - Fix: Use JavaScript only when native methods fail or for specific scenarios
""",

    "javascript_executor_scroll": """
**Common Mistakes:**
1. ❌ **Not Scrolling Element Into View**: Clicking element that's outside viewport
   - Why: Elements must be visible in viewport to interact with them
   - Fix: Scroll first: `js.executeScript("arguments[0].scrollIntoView(true);", element)`

2. ❌ **Wrong scrollIntoView() Parameter**: Using incorrect boolean value
   - Why: `true` aligns to top, `false` to bottom; wrong choice may leave element obscured
   - Fix: Use `true` for top alignment: `scrollIntoView(true)`

3. ❌ **Scrolling Too Fast**: Not waiting after scroll for page to stabilize
   - Why: Page may have scroll animations or lazy loading
   - Fix: Add small wait after scroll: `Thread.sleep(500)` or explicit wait

4. ❌ **Using window.scrollTo() with Wrong Coordinates**: Hardcoding pixel values
   - Why: Page dimensions vary; hardcoded values may not work on all screens
   - Fix: Scroll relative to element position or use `scrollIntoView()`

5. ❌ **Not Checking if Scroll Was Necessary**: Scrolling even when element is visible
   - Why: Unnecessary actions slow down tests
   - Fix: Check visibility first, scroll only if needed
""",

    "javascript_executor_hidden": """
**Common Mistakes:**
1. ❌ **Using JavaScript for All Hidden Elements**: Not checking if element is just overlayed
   - Why: Some elements are not truly hidden, just obscured; native click might work after scroll
   - Fix: Try native Selenium methods first, use JavaScript as fallback

2. ❌ **Not Verifying Element After JavaScript Click**: Assuming JavaScript click always succeeds
   - Why: JavaScript click may not trigger all event handlers
   - Fix: Verify action's effect: check if modal opened, form submitted, etc.

3. ❌ **Wrong JavaScript Click Syntax**: Using incorrect method name
   - Why: Must use exact JavaScript DOM API methods
   - Fix: Correct syntax: `arguments[0].click()` not `click(arguments[0])`

4. ❌ **Forgetting to Pass Element as Argument**: Not providing element to JavaScript
   - Why: JavaScript can't access the element without it being passed
   - Fix: Always pass element: `js.executeScript("arguments[0].click()", element)`

5. ❌ **Using JavaScript Click by Default**: Making it the primary click method
   - Why: Bypasses Selenium's built-in checks and waits
   - Fix: Use JavaScript click only when native click fails
""",

    "javascript_executor_modify": """
**Common Mistakes:**
1. ❌ **Directly Manipulating DOM Without Verification**: Changing attributes without checking success
   - Why: Changes may not persist or may be overwritten by page JavaScript
   - Fix: Verify change: re-read attribute value after setting it

2. ❌ **Modifying Wrong Attributes**: Changing attributes that don't affect test scenario
   - Why: Wastes time and may cause unexpected side effects
   - Fix: Understand which attributes control the behavior you're testing

3. ❌ **Not Considering JavaScript Frameworks**: Modifying elements in frameworks like React/Angular
   - Why: Frameworks may detect and revert manual DOM changes
   - Fix: Be cautious with framework-managed DOMs; prefer framework-friendly interactions

4. ❌ **Using setAttribute() Without Error Handling**: Assuming setAttribute() always works
   - Why: Some attributes are read-only or protected
   - Fix: Wrap in try-catch and verify the change took effect

5. ❌ **Forgetting to Restore Original State**: Changing element properties permanently
   - Why: Affects subsequent tests if not cleaned up
   - Fix: Store original value, restore it after test or in tearDown
""",

    "javascript_executor_utility": """
**Common Mistakes:**
1. ❌ **Not Making Utility Methods Reusable**: Creating methods that only work for specific scenarios
   - Why: Defeats purpose of utility class; requires duplication
   - Fix: Design generic methods that accept element/value parameters

2. ❌ **Missing Error Handling in Utilities**: Not catching JavaScript execution errors
   - Why: One failing JavaScript call breaks entire test
   - Fix: Add try-catch blocks with meaningful error messages

3. ❌ **Not Documenting JavaScript Utility Methods**: Unclear purpose and usage of methods
   - Why: Other team members won't know when/how to use them
   - Fix: Add JavaDoc comments explaining purpose, parameters, and return values

4. ❌ **Mixing Concerns in Utility Class**: Adding non-JavaScript-related methods to JS utility
   - Why: Violates single responsibility principle; reduces maintainability
   - Fix: Keep utility focused on JavaScript execution only

5. ❌ **Not Testing Utility Methods**: Assuming utility methods always work
   - Why: Utilities may have bugs that affect multiple tests
   - Fix: Create unit tests for utility methods
""",

    "implicit_wait_sync": """
**Common Mistakes:**
1. ❌ **Confusing Implicit Wait with Explicit Wait**: Using both types together
   - Why: Can cause unexpected behavior and longer wait times (they add up)
   - Fix: Choose one strategy: prefer explicit waits for better control

2. ❌ **Not Understanding Scope**: Thinking implicit wait applies to specific elements
   - Why: Implicit wait is global for entire driver session
   - Fix: Set once after driver initialization, affects all findElement() calls

3. ❌ **Setting Implicit Wait Multiple Times**: Changing implicit wait value throughout test
   - Why: Creates confusion about actual wait time; unpredictable behavior
   - Fix: Set once at driver creation, keep consistent throughout session

4. ❌ **Using Zero Timeout**: Setting implicit wait to 0 without understanding effect
   - Why: Makes tests fail immediately if element not present
   - Fix: Use reasonable timeout (10-15 seconds) or remove implicit wait entirely

5. ❌ **Expecting Implicit Wait to Solve All Timing Issues**: Relying solely on implicit wait
   - Why: Implicit wait only helps with findElement(), not other conditions
   - Fix: Use explicit waits for complex conditions (visibility, clickability, etc.)
""",

    "implicit_wait_implement": """
**Common Mistakes:**
1. ❌ **Setting Implicit Wait After Finding Elements**: Setting wait midway through test
   - Why: Already-found elements won't benefit from wait
   - Fix: Set immediately after creating WebDriver instance

2. ❌ **Using Different Time Units Inconsistently**: Mixing seconds and milliseconds
   - Why: In newer Selenium versions, use Duration; confusion between old/new syntax
   - Fix: Use consistent syntax: `driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10))`

3. ❌ **Not Documenting Implicit Wait Setting**: No comment explaining wait time choice
   - Why: Future developers won't know why specific timeout was chosen
   - Fix: Add comment explaining rationale for timeout duration

4. ❌ **Setting Unreasonably Long Waits**: Using 60+ second timeouts
   - Why: Slows down failure feedback; tests take too long
   - Fix: Use 10-15 seconds typically; adjust based on application response time

5. ❌ **Forgetting Implicit Wait Affects All Elements**: Thinking it's element-specific
   - Why: Every findElement() call will wait up to implicit wait timeout
   - Fix: Understand global impact; consider explicit waits for fine-grained control
""",

    "implicit_wait_behavior": """
**Common Mistakes:**
1. ❌ **Expecting Implicit Wait to Wait for Visibility**: Thinking it waits for element to be visible
   - Why: Implicit wait only waits for element to be present in DOM, not visible/clickable
   - Fix: Use explicit wait with visibility condition if needed

2. ❌ **Not Understanding findElements() Behavior**: Expecting wait for list of elements
   - Why: findElements() returns immediately with empty list if no elements found
   - Fix: Implicit wait doesn't help with findElements(); use explicit wait instead

3. ❌ **Assuming Immediate Failure Means No Wait**: Thinking test should fail faster
   - Why: Element might actually be present immediately, wait isn't always used
   - Fix: Understand implicit wait is maximum time, not fixed wait

4. ❌ **Mixing Implicit and Thread.sleep()**: Using both strategies simultaneously
   - Why: Thread.sleep() is fixed wait; adds to implicit wait; very inefficient
   - Fix: Remove Thread.sleep() when using implicit/explicit waits

5. ❌ **Not Testing Without Implicit Wait**: Always running tests with implicit wait enabled
   - Why: May hide issues with slow page loads or element locators
   - Fix: Occasionally test without waits to identify actual timing issues
""",

    "implicit_wait_scenarios": """
**Common Mistakes:**
1. ❌ **Using Implicit Wait for AJAX Elements**: Expecting it to wait for asynchronous loads
   - Why: Implicit wait doesn't know about AJAX; element might be in DOM but not loaded
   - Fix: Use explicit wait with custom conditions for AJAX elements

2. ❌ **Not Handling Dynamic Element IDs**: Using implicit wait with changing locators
   - Why: Implicit wait can't help if locator itself is wrong
   - Fix: Fix locators first, then apply appropriate waits

3. ❌ **Ignoring StaleElementReferenceException**: Thinking implicit wait prevents staleness
   - Why: Implicit wait doesn't re-locate elements that become stale
   - Fix: Catch and handle StaleElementReferenceException, re-locate element

4. ❌ **Using Implicit Wait with Negative Tests**: Testing for element absence
   - Why: Will always wait full timeout duration when element doesn't exist
   - Fix: For negative tests, use explicit wait with shorter timeout or different strategy

5. ❌ **Not Adjusting Wait for Different Environments**: Same timeout for local and CI
   - Why: CI environments may be slower; local tests may be faster
   - Fix: Consider environment-specific timeouts through configuration
""",

    "implicit_wait_best_practices": """
**Common Mistakes:**
1. ❌ **Not Choosing Between Implicit and Explicit**: Using both inconsistently
   - Why: Leads to unpredictable behavior and debugging difficulties
   - Fix: Standardize on explicit waits for better control and clarity

2. ❌ **No Team Agreement on Wait Strategy**: Each developer using different approaches
   - Why: Inconsistent test behavior; hard to maintain
   - Fix: Document and enforce team-wide wait strategy

3. ❌ **Not Logging Wait-Related Failures**: No information about why element wasn't found
   - Why: Hard to debug timeout issues without context
   - Fix: Add logging before findElement() calls to capture timing issues

4. ❌ **Ignoring Wait Impact on Test Execution Time**: Not measuring test duration
   - Why: Long waits significantly slow down test suites
   - Fix: Monitor test execution times; optimize waits

5. ❌ **Not Having Fallback Strategy**: Only using one wait mechanism
   - Why: Some scenarios might need different wait approaches
   - Fix: Have both implicit and explicit wait strategies available, use appropriately
""",

    "explicit_wait_basics": """
**Common Mistakes:**
1. ❌ **Not Creating WebDriverWait Instance**: Trying to use ExpectedConditions directly
   - Why: ExpectedConditions need a WebDriverWait instance to function
   - Fix: Create wait first: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10))`

2. ❌ **Using Old Timeout Syntax**: Using deprecated integer seconds parameter
   - Why: Older Selenium versions used different syntax; causes compilation errors
   - Fix: Use Duration: `new WebDriverWait(driver, Duration.ofSeconds(10))`

3. ❌ **Not Importing ExpectedConditions**: Forgetting to import the class
   - Why: ExpectedConditions methods won't be recognized
   - Fix: Add import: `import org.openqa.selenium.support.ui.ExpectedConditions;`

4. ❌ **Setting Timeout Too Short**: Using very short timeouts like 1-2 seconds
   - Why: May not give enough time for elements to appear, especially in slow networks
   - Fix: Use reasonable timeout: 10-15 seconds typically

5. ❌ **Not Handling TimeoutException**: Assuming wait will always succeed
   - Why: If condition not met within timeout, TimeoutException is thrown
   - Fix: Wrap in try-catch: `try { wait.until(...) } catch(TimeoutException e) { ... }`
""",

    "explicit_wait_visibility": """
**Common Mistakes:**
1. ❌ **Confusing presenceOfElementLocated with visibilityOfElementLocated**: Using wrong condition
   - Why: Presence checks if element exists in DOM; visibility checks if it's displayed
   - Fix: For interactions, use visibilityOfElementLocated; for DOM checks, use presenceOfElementLocated

2. ❌ **Not Understanding Visibility Definition**: Thinking hidden elements are "not visible"
   - Why: Selenium visibility means element has height and width > 0, not about CSS visibility
   - Fix: Understand that display:none and visibility:hidden both make element "not visible"

3. ❌ **Waiting for Invisible Elements**: Expecting visibilityOfElementLocated to find hidden elements
   - Why: This condition specifically waits for visible elements
   - Fix: Use presenceOfElementLocated for elements that might be hidden

4. ❌ **Not Re-Using Wait Instance**: Creating new WebDriverWait for each condition
   - Why: Inefficient; can reuse same wait instance
   - Fix: Create once: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10))`, use multiple times

5. ❌ **Chaining Actions Without Waiting**: Clicking immediately after visibility check
   - Why: Element might be visible but not yet clickable (overlays, animations)
   - Fix: Wait for elementToBeClickable instead of just visibilityOfElementLocated
""",

    "explicit_wait_clickability": """
**Common Mistakes:**
1. ❌ **Using visibilityOfElementLocated Instead of elementToBeClickable**: Wrong condition for clicks
   - Why: Visible doesn't mean clickable; element might be obscured or disabled
   - Fix: Always use elementToBeClickable before clicking: `wait.until(ExpectedConditions.elementToBeClickable(element))`

2. ❌ **Not Waiting for Overlays to Disappear**: Clicking while loading overlay is present
   - Why: Overlay intercepts click; element click fails
   - Fix: Wait for overlay to be invisible first: `wait.until(ExpectedConditions.invisibilityOfElementLocated(overlayLocator))`

3. ❌ **Waiting for Disabled Elements**: Expecting disabled elements to become clickable
   - Why: elementToBeClickable checks if element is enabled; disabled elements will timeout
   - Fix: Check element state or wait for it to be enabled first

4. ❌ **Not Understanding elementToBeClickable Requirements**: Thinking it's just about visibility
   - Why: Element must be visible, enabled, and not obscured
   - Fix: Understand this is the most comprehensive pre-click check

5. ❌ **Ignoring ElementClickInterceptedException**: Not handling modern click interception errors
   - Why: Even after waiting, overlays or animations might still intercept click
   - Fix: Add retry logic or use JavaScript click as fallback
""",

    "explicit_wait_custom": """
**Common Mistakes:**
1. ❌ **Not Understanding ExpectedCondition Interface**: Creating custom conditions incorrectly
   - Why: Must implement apply() method with correct signature
   - Fix: Use correct lambda or method reference syntax: `(WebDriver d) -> { return condition; }`

2. ❌ **Returning Null Instead of False**: Custom condition returns null when not met
   - Why: ExpectedConditions treat null as "condition not met" but should return boolean
   - Fix: Return explicit boolean: `return element.isDisplayed()` not just `element.isDisplayed()`

3. ❌ **Creating Overly Complex Custom Conditions**: Mixing multiple unrelated checks
   - Why: Hard to debug and understand; defeats purpose of clear conditions
   - Fix: Keep custom conditions focused on single logical check

4. ❌ **Not Handling Exceptions in Custom Conditions**: Letting exceptions propagate
   - Why: Exception in condition causes wait to fail; should be handled gracefully
   - Fix: Catch exceptions and return false: `try { ... } catch(Exception e) { return false; }`

5. ❌ **Forgetting to Import Function Interface**: For Selenium 4+ custom conditions
   - Why: Lambda expressions need proper functional interface
   - Fix: Understand ExpectedCondition<T> is a functional interface
""",

    "explicit_wait_framework": """
**Common Mistakes:**
1. ❌ **Not Centralizing Wait Logic**: Duplicating wait code across test classes
   - Why: Maintenance nightmare; changes need to be made in multiple places
   - Fix: Create reusable wait utility class with common wait methods

2. ❌ **Hardcoding Timeouts**: Using magic numbers for wait durations
   - Why: Inconsistent timeouts; hard to change globally
   - Fix: Define timeout constants: `private static final int DEFAULT_TIMEOUT = 10;`

3. ❌ **Not Providing Meaningful Wait Names**: Generic method names like waitForElement()
   - Why: Unclear what condition is being waited for
   - Fix: Use descriptive names: waitForElementToBeVisible(), waitForElementToBeClickable()

4. ❌ **Missing Error Messages**: Default TimeoutException messages not helpful
   - Why: Hard to debug which wait failed and why
   - Fix: Add custom messages: `wait.withMessage("Failed to find login button")`

5. ❌ **Not Making Framework Configurable**: Fixed timeouts that can't be changed easily
   - Why: Different environments may need different timeouts
   - Fix: Read timeouts from configuration file or environment variables
""",

    "fluent_wait_config": """
**Common Mistakes:**
1. ❌ **Not Understanding Fluent vs WebDriverWait**: Treating them as the same
   - Why: FluentWait offers more granular control (polling, ignored exceptions)
   - Fix: Use FluentWait when you need custom polling or exception handling

2. ❌ **Using Default Polling Interval**: Not customizing pollingEvery()
   - Why: Default 500ms might be too slow or too fast for your scenario
   - Fix: Set appropriate polling: `wait.pollingEvery(Duration.ofMillis(100))`

3. ❌ **Not Setting Timeout**: Using FluentWait without timeout
   - Why: Wait might continue indefinitely
   - Fix: Always set timeout: `new FluentWait<>(driver).withTimeout(Duration.ofSeconds(30))`

4. ❌ **Forgetting withMessage()**: Not providing custom error messages
   - Why: Default timeout message doesn't help identify the issue
   - Fix: Add message: `.withMessage("Element not found after waiting")`

5. ❌ **Not Chaining Methods Properly**: Breaking FluentWait builder pattern
   - Why: Incorrect syntax prevents proper configuration
   - Fix: Chain methods: `new FluentWait<>(driver).withTimeout(...).pollingEvery(...).until(...)`
""",

    "fluent_wait_polling": """
**Common Mistakes:**
1. ❌ **Setting Polling Too High**: Using very long polling intervals like 5 seconds
   - Why: Misses quick state changes; waits unnecessarily long
   - Fix: Use short polling: 100-500ms typically

2. ❌ **Setting Polling Too Low**: Using polling like 10ms
   - Why: Excessive checking puts load on system; no real benefit
   - Fix: Balance between responsiveness and efficiency; 100-500ms is good range

3. ❌ **Not Understanding Polling vs Timeout**: Confusing these two concepts
   - Why: Timeout is maximum wait time; polling is check interval
   - Fix: Timeout should be much larger than polling interval

4. ❌ **Using Same Polling for All Scenarios**: Not adjusting based on expected behavior
   - Why: Fast-changing elements need faster polling; slow loads need less frequent checks
   - Fix: Adjust polling based on scenario: animations (100ms), page loads (500ms)

5. ❌ **Not Monitoring Polling Impact**: Not checking how many times condition is checked
   - Why: Excessive polling can slow down tests or cause issues
   - Fix: Add logging to count polling iterations, optimize if needed
""",

    "fluent_wait_exceptions": """
**Common Mistakes:**
1. ❌ **Not Ignoring Common Exceptions**: Every exception breaks the wait
   - Why: Transient exceptions like StaleElementReferenceException should be ignored
   - Fix: Ignore exceptions: `.ignoring(NoSuchElementException.class, StaleElementReferenceException.class)`

2. ❌ **Ignoring Too Many Exceptions**: Masking real problems
   - Why: Important exceptions get swallowed; failures go unnoticed
   - Fix: Only ignore exceptions that are expected during wait period

3. ❌ **Not Understanding Exception Behavior**: Thinking ignored exceptions stop the wait
   - Why: Ignored exceptions are caught and wait continues; only timeout stops wait
   - Fix: Understand ignored exceptions allow wait to keep trying

4. ❌ **Forgetting to Import Exception Classes**: Using class names without imports
   - Why: Compilation error if exception classes not imported
   - Fix: Import needed exceptions: `import org.openqa.selenium.NoSuchElementException;`

5. ❌ **Not Logging Ignored Exceptions**: No visibility into what's being caught
   - Why: Hard to debug if too many exceptions are occurring
   - Fix: Consider logging ignored exceptions in custom until() condition
""",

    "fluent_wait_custom": """
**Common Mistakes:**
1. ❌ **Complex Until Conditions Without Error Handling**: Custom conditions throw unhandled exceptions
   - Why: Exceptions in until() condition break the wait
   - Fix: Wrap condition logic in try-catch, return false on exception

2. ❌ **Not Returning Proper Types**: Until condition returns wrong type
   - Why: FluentWait.until() expects Function<WebDriver, T> where T is return type
   - Fix: Ensure condition returns appropriate type (Boolean, WebElement, etc.)

3. ❌ **Creating Non-Reusable Conditions**: One-off conditions for each test
   - Why: Defeats purpose of custom conditions; code duplication
   - Fix: Create reusable condition methods that accept parameters

4. ❌ **Not Testing Custom Conditions**: Assuming custom logic always works
   - Why: Bugs in custom conditions affect multiple tests
   - Fix: Unit test custom wait conditions separately

5. ❌ **Overly Complex Condition Logic**: Too many checks in single until() condition
   - Why: Hard to debug which part of condition is failing
   - Fix: Break into smaller, testable conditions; chain them if needed
""",

    "fluent_wait_comparison": """
**Common Mistakes:**
1. ❌ **Always Using FluentWait**: Using FluentWait even when WebDriverWait is sufficient
   - Why: Adds unnecessary complexity; WebDriverWait is simpler for most cases
   - Fix: Use FluentWait only when you need custom polling or exception handling

2. ❌ **Mixing Wait Types Inconsistently**: Different waits in same test without reason
   - Why: Inconsistent code style; harder to maintain
   - Fix: Standardize on one approach unless specific need for different wait type

3. ❌ **Not Understanding Implicit Wait Conflicts**: Using implicit wait with Fluent/Explicit waits
   - Why: They can interfere with each other; total wait time is sum of both
   - Fix: Choose one strategy; prefer explicit/fluent waits over implicit

4. ❌ **Not Documenting Wait Choice**: No comment explaining why specific wait type was chosen
   - Why: Future developers won't understand the reasoning
   - Fix: Add comments explaining wait type selection rationale

5. ❌ **Performance Ignorance**: Not considering wait impact on test execution time
   - Why: Multiple long waits significantly slow down test suite
   - Fix: Monitor and optimize wait times; use shortest effective timeout
""",

    "screenshot_basics": """
**Common Mistakes:**
1. ❌ **Not Casting Driver to TakesScreenshot**: Using driver reference directly
   - Why: WebDriver interface doesn't have getScreenshotAs() method
   - Fix: Cast first: `TakesScreenshot ts = (TakesScreenshot) driver;`

2. ❌ **Wrong Import for OutputType**: Importing wrong OutputType class
   - Why: Multiple classes named OutputType exist in different packages
   - Fix: Use correct import: `import org.openqa.selenium.OutputType;`

3. ❌ **Not Creating Target Directory**: Saving screenshot to non-existent folder
   - Why: FileNotFoundException when directory doesn't exist
   - Fix: Create directory first: `new File("screenshots").mkdirs();`

4. ❌ **Hardcoding File Paths**: Using absolute paths in code
   - Why: Paths won't work on different machines/OS
   - Fix: Use relative paths or get path from configuration

5. ❌ **Not Handling Screenshot Failures**: Assuming screenshot capture always succeeds
   - Why: Can fail due to browser state, permissions, or disk issues
   - Fix: Wrap in try-catch to prevent test failure if screenshot fails
""",

    "screenshot_element": """
**Common Mistakes:**
1. ❌ **Not Checking Selenium Version**: Using element screenshot with old Selenium versions
   - Why: Element screenshots require Selenium 4+; will fail in older versions
   - Fix: Verify Selenium version or use full page screenshot + crop as fallback

2. ❌ **Element Not in Viewport**: Taking screenshot of element outside visible area
   - Why: May capture empty or partial screenshot
   - Fix: Scroll element into view before screenshot: `((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);`

3. ❌ **Not Waiting for Element**: Taking screenshot before element fully renders
   - Why: Captures incomplete or loading element
   - Fix: Wait for element to be visible before screenshot

4. ❌ **Using Element Screenshot for Entire Page**: Wrong method for use case
   - Why: Element screenshot only captures the specific element, not whole page
   - Fix: Use `TakesScreenshot` from driver for full page screenshots

5. ❌ **Not Handling WebDriverException**: Element screenshot may not be supported by all drivers
   - Why: Some WebDriver implementations don't support element screenshots
   - Fix: Catch WebDriverException and fallback to full page screenshot
""",

    "screenshot_on_failure": """
**Common Mistakes:**
1. ❌ **Not Using TestNG Listeners**: Manually calling screenshot method in each test
   - Why: Code duplication; easy to forget
   - Fix: Implement ITestListener and use @Listeners annotation

2. ❌ **Wrong Listener Method**: Using @AfterMethod instead of onTestFailure()
   - Why: @AfterMethod runs for all tests; onTestFailure() only runs for failures
   - Fix: Use correct listener: `public void onTestFailure(ITestResult result) { ... }`

3. ❌ **Not Adding Listener to testng.xml**: Listener not registered properly
   - Why: TestNG won't invoke listener if not configured
   - Fix: Add to XML: `<listeners><listener class-name="com.automation.utils.TestListener"/></listeners>`

4. ❌ **Screenshot Name Not Unique**: Using same filename for all failure screenshots
   - Why: Screenshots overwrite each other; only last one is saved
   - Fix: Include timestamp and test name: `String fileName = testName + "_" + timestamp + ".png";`

5. ❌ **Not Passing Driver to Listener**: Listener can't access WebDriver instance
   - Why: Listener is separate class; needs driver reference
   - Fix: Store driver in ThreadLocal or base test class accessible to listener
""",

    "screenshot_management": """
**Common Mistakes:**
1. ❌ **Not Organizing Screenshots by Test Run**: All screenshots in one folder
   - Why: Hard to find specific test run's screenshots; gets cluttered
   - Fix: Create subfolder per run: `screenshots/run_2024-01-15_10-30/`

2. ❌ **Not Cleaning Old Screenshots**: Screenshots accumulate indefinitely
   - Why: Consumes disk space; old screenshots no longer useful
   - Fix: Implement cleanup: delete screenshots older than N days

3. ❌ **Not Including Metadata**: Screenshot filenames don't convey context
   - Why: Hard to identify which test/step the screenshot is from
   - Fix: Include test name, timestamp, browser: `LoginTest_failure_2024-01-15_Chrome.png`

4. ❌ **Hardcoding Screenshot Format**: Always using PNG regardless of need
   - Why: PNG is larger; JPEG might be sufficient and faster
   - Fix: Make format configurable based on use case

5. ❌ **Not Providing Screenshot Path in Reports**: Reports don't link to screenshots
   - Why: Have to manually find and match screenshots to failed tests
   - Fix: Include screenshot path in test reports or Extent Reports
""",

    "screenshot_best_practices": """
**Common Mistakes:**
1. ❌ **Taking Screenshots Too Frequently**: Screenshot after every action
   - Why: Slows down tests significantly; fills up disk space
   - Fix: Take screenshots only on failures or at key checkpoints

2. ❌ **Not Compressing Screenshots**: Storing full-size PNG files
   - Why: Large files consume excessive storage
   - Fix: Compress images or use JPEG for non-critical screenshots

3. ❌ **No Screenshot Retention Policy**: Keeping all screenshots forever
   - Why: Storage costs and clutter increase over time
   - Fix: Define retention policy: keep failures for 30 days, successes for 7 days

4. ❌ **Not Embedding Screenshots in Reports**: Screenshots separate from test reports
   - Why: Have to cross-reference; not convenient for analysis
   - Fix: Use reporting tools that embed screenshots (Extent Reports, Allure)

5. ❌ **Capturing Screenshots Too Late**: Taking screenshot after driver.quit()
   - Why: Browser is closed; can't capture screenshot
   - Fix: Ensure screenshot capture happens before quitting driver, in test listener or finally block
""",
}

# Exercise mappings for each week
WEEK4_EXERCISES = [
    ("Exercise 1: Understanding Dropdown Basics - Single Select (20 minutes)", "dropdown_single"),
    ("Exercise 2: Multi-Select Dropdown (25 minutes)", "dropdown_multi"),
    ("Exercise 3: Real-World Dropdown Scenarios (30 minutes)", "dropdown_realworld"),
    ("Exercise 1: Understanding Checkboxes - Basic Operations (20 minutes)", "checkbox_basic"),
    ("Exercise 2: Radio Buttons - Single Selection (25 minutes)", "radio_button"),
    ("Exercise 1: Understanding JavaScript Alerts (20 minutes)", "alert_basic"),
    ("Exercise 2: Handling Confirmation Dialogs (25 minutes)", "alert_confirmation"),
    ("Exercise 3: Working with Prompt Dialogs (30 minutes)", "alert_prompt"),
    ("Exercise 4: Bootstrap Modals vs JavaScript Alerts (25 minutes)", "alert_modal"),
    ("Exercise 5: Alert Timeout and Wait Strategies (25 minutes)", "alert_timeout"),
    ("Exercise 6: Real-World Alert Scenarios (30 minutes)", "alert_realworld"),
    ("Exercise 1: Understanding Frames vs iFrames (20 minutes)", "frame_basics"),
    ("Exercise 2: Multiple Ways to Switch Frames (25 minutes)", "frame_multiple"),
    ("Exercise 3: Nested Frames (30 minutes)", "frame_nested"),
    ("Exercise 4: Real-World Scenario - Switching Between Multiple Frames (25 minutes)", "frame_realworld"),
    ("Exercise 5: Frame Handling with Wait Conditions (30 minutes)", "frame_wait"),
    ("Exercise 1: Understanding Windows vs Tabs (20 minutes)", "window_basics"),
    ("Exercise 2: Handling Multiple Windows (25 minutes)", "window_multiple"),
    ("Exercise 3: Window Switching with getWindowHandles() (25 minutes)", "window_getwindowhandles"),
    ("Exercise 4: Handling Parent and Child Windows (30 minutes)", "window_parent_child"),
    ("Exercise 5: Real-World Window Handling Scenarios (30 minutes)", "window_realworld"),
]

WEEK5_EXERCISES = [
    ("Exercise 1: Create TestNG XML Suite", "testng_xml"),
    ("Exercise 2: TestNG Groups and Dependencies", "testng_groups"),
    ("Exercise 3: Page Factory with Lazy Initialization", "page_factory"),
    ("Exercise 1: Understanding Synchronization Issues (15 minutes)", "implicit_wait_sync"),
    ("Exercise 4: Common Implicit Wait Scenarios (25 minutes)", "implicit_wait_scenarios"),
    ("Exercise 5: Best Practices and Troubleshooting (20 minutes)", "implicit_wait_best_practices"),
    ("Exercise 4: Custom Wait Conditions (30 minutes)", "explicit_wait_custom"),
    ("Exercise 5: Explicit Wait Framework (30 minutes)", "explicit_wait_framework"),
    ("Exercise 2: Polling Frequency and Timeout (25 minutes)", "fluent_wait_polling"),
    ("Exercise 3: Ignoring Exceptions (25 minutes)", "fluent_wait_exceptions"),
    ("Exercise 4: Custom Fluent Conditions (30 minutes)", "fluent_wait_custom"),
    ("Exercise 5: Comparing All Wait Types (30 minutes)", "fluent_wait_comparison"),
    ("Exercise 1: TakesScreenshot Basics (20 minutes)", "screenshot_basics"),
    ("Exercise 5: Screenshot Best Practices & Complete Framework (30 minutes)", "screenshot_best_practices"),
]

def find_insertion_point(exercise_content):
    """Find the best insertion point for Common Mistakes section."""
    markers = [
        (r'\n\*\*💡 Key Concepts:\*\*', "before_key_concepts"),
        (r'\n\*\*🎯 Practice Challenge:\*\*', "before_practice"),
        (r'\n\*\*Bonus Challenge:\*\*', "before_bonus"),
        (r'\n---\n', "before_separator")
    ]

    for pattern, marker_type in markers:
        match = re.search(pattern, exercise_content)
        if match:
            return match.start(), marker_type

    return len(exercise_content) - 1, "at_end"

def add_mistakes_to_exercise(content, exercise_title, mistakes_template):
    """Add Common Mistakes section to a specific exercise."""
    # Escape special regex characters in title, but handle parentheses properly
    exercise_pattern = re.escape(exercise_title)
    # Try all heading levels from ## to ####
    match = re.search(f'^##{{1,3}} {exercise_pattern}', content, re.MULTILINE)

    if not match:
        print(f"❌ Could not find exercise: {exercise_title}")
        return content

    ex_start = match.start()

    # Find next exercise or section boundary
    next_exercise = re.search(r'\n###{0,2} Exercise \d+:', content[ex_start + len(exercise_title):])
    next_day = re.search(r'\n#{1,2} Day \d+:', content[ex_start + len(exercise_title):])

    if next_exercise:
        ex_end = ex_start + len(exercise_title) + next_exercise.start()
    elif next_day:
        ex_end = ex_start + len(exercise_title) + next_day.start()
    else:
        ex_end = len(content)

    exercise_content = content[ex_start:ex_end]

    # Check if already has Common Mistakes
    if 'Common Mistakes:' in exercise_content:
        print(f"✅ Already has Common Mistakes: {exercise_title[:70]}")
        return content

    # Find insertion point
    relative_pos, marker_type = find_insertion_point(exercise_content)
    insertion_pos = ex_start + relative_pos

    # Format the mistakes section
    mistakes_section = f"\n{mistakes_template}\n"

    # Insert the section
    new_content = content[:insertion_pos] + mistakes_section + content[insertion_pos:]

    print(f"✅ Added Common Mistakes to: {exercise_title[:70]}")
    return new_content

def process_file(filepath, exercises_to_add):
    """Process a file and add Common Mistakes to specified exercises."""
    print(f"\n{'='*80}")
    print(f"Processing: {filepath}")
    print(f"{'='*80}\n")

    if not os.path.exists(filepath):
        print(f"❌ Error: File not found: {filepath}")
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    added_count = 0

    for exercise_title, template_key in exercises_to_add:
        if template_key in COMMON_MISTAKES:
            new_content = add_mistakes_to_exercise(content, exercise_title, COMMON_MISTAKES[template_key])
            if new_content != content:
                added_count += 1
            content = new_content
        else:
            print(f"⚠️  No template found for: {template_key}")

    if content != original_content:
        # Backup original file
        backup_path = filepath + '.backup'
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(original_content)
        print(f"\n📁 Backup created: {backup_path}")

        # Write updated content
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ File updated successfully: {added_count} Common Mistakes sections added\n")
        return True
    else:
        print(f"\n⚠️  No changes made\n")
        return False

def main():
    """Main execution function."""
    print("\n" + "="*80)
    print("SELENIUM COMMON MISTAKES ADDITION SCRIPT")
    print("="*80)
    print("\nThis script will add comprehensive Common Mistakes sections to:")
    print("  - Week 4 (Days 22-28): 21 exercises")
    print("  - Week 5 (Days 29-35): 14 exercises")
    print(f"\nTotal: 35 Common Mistakes sections to be added\n")
    print("="*80 + "\n")

    base_path = '/Users/venkateshparasa/Documents/Java/docs/exercises/selenium/weekly'

    # Process Week 4
    week4_path = os.path.join(base_path, 'week-04-days-22-28.md')
    week4_success = process_file(week4_path, WEEK4_EXERCISES)

    # Process Week 5
    week5_path = os.path.join(base_path, 'week-05-days-29-35.md')
    week5_success = process_file(week5_path, WEEK5_EXERCISES)

    # Summary
    print("\n" + "="*80)
    print("SUMMARY")
    print("="*80)
    print(f"Week 4 (Days 22-28): {'✅ Updated' if week4_success else '⚠️  No changes'}")
    print(f"Week 5 (Days 29-35): {'✅ Updated' if week5_success else '⚠️  No changes'}")
    print("="*80 + "\n")

    if week4_success or week5_success:
        print("✅ Common Mistakes sections have been successfully added!")
        print("\n📝 Note: Backup files (.backup) have been created for safety.")
        print("   You can delete them after verifying the changes.\n")
    else:
        print("⚠️  No files were modified. All exercises may already have Common Mistakes sections.\n")

if __name__ == "__main__":
    main()
