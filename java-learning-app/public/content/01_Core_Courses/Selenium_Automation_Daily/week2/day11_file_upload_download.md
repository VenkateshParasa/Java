---
title: "Day 11: File Upload and Download Handling"
subtitle: "Master File Operations in Selenium Automation"
courseId: selenium-automation
week: 2
day: 11
tags: [selenium, file-upload, file-download, robot-class, autoit, browser-preferences, file-operations]
difficulty: intermediate
duration: 90 minutes
objectives:
  - Understand file upload mechanisms in web applications
  - Handle different types of file upload controls
  - Master file download operations across browsers
  - Configure browser preferences for automated downloads
  - Verify downloaded files programmatically
  - Use Robot class and AutoIT for complex scenarios
  - Implement best practices for file handling in tests
---

# Day 11: File Upload and Download Handling

## Table of Contents
1. [Introduction](#introduction)
2. [Learning Objectives](#learning-objectives)
3. [Introduction to File Operations in Selenium](#introduction-to-file-operations)
4. [File Upload Handling](#file-upload-handling)
5. [Different File Upload Scenarios](#different-file-upload-scenarios)
6. [Using Robot Class for File Uploads](#using-robot-class)
7. [File Download Handling](#file-download-handling)
8. [Browser Download Preferences](#browser-download-preferences)
9. [Verifying Downloaded Files](#verifying-downloaded-files)
10. [Download Location Management](#download-location-management)
11. [Handling Download Popups](#handling-download-popups)
12. [Advanced Scenarios](#advanced-scenarios)
13. [Best Practices](#best-practices)
14. [Troubleshooting Common Issues](#troubleshooting-common-issues)
15. [Practice Exercises](#practice-exercises)
16. [Interview Questions](#interview-questions)
17. [Key Takeaways](#key-takeaways)
18. [What's Next](#whats-next)

## Introduction

Welcome to Day 11 of your Selenium automation journey! Today, we'll dive into one of the most challenging aspects of web automation - **File Upload and Download Handling**. These operations are common in modern web applications but can be tricky to automate due to operating system dialogs and browser-specific behaviors.

Real-world applications frequently require:
- Uploading profile pictures and documents
- Importing data files (CSV, Excel, PDF)
- Downloading reports and exports
- Handling multiple file uploads
- Verifying downloaded content

Understanding how to handle these scenarios is crucial for creating comprehensive automation test suites.

## Learning Objectives

By the end of this lesson, you will be able to:

1. Understand different file upload mechanisms in web applications
2. Handle simple file uploads using sendKeys() method
3. Work with hidden and non-standard upload controls
4. Use Robot class for complex upload scenarios
5. Configure browser-specific download preferences
6. Automate file downloads across Chrome, Firefox, and Edge
7. Verify downloaded files exist and contain correct data
8. Manage download locations and cleanup test files
9. Handle download popups and dialogs
10. Implement robust file operation strategies in test automation

## Introduction to File Operations in Selenium

### Understanding File Operations

File operations in web automation fall into two main categories:

**1. File Uploads:**
- User selects files from local system
- Files are sent to the server
- Common in forms, profile pages, document management systems

**2. File Downloads:**
- Server sends files to user
- Browser handles the download
- Common in reports, exports, document retrieval

### Challenges in File Automation

**Upload Challenges:**
- Operating system file selection dialogs
- Hidden or JavaScript-based upload controls
- Multiple file selections
- Drag-and-drop uploads
- Progress bars and async operations

**Download Challenges:**
- Browser-specific download behaviors
- "Save As" dialogs
- Download location configuration
- Verifying download completion
- File content validation
- Handling large files with timeouts

### Selenium's Approach

```
┌─────────────────────────────────────────────────┐
│          File Operation Strategy                │
│                                                 │
│  Upload:                                        │
│  1. Direct sendKeys() (preferred)               │
│  2. Robot class (when necessary)                │
│  3. AutoIT (Windows-specific)                   │
│                                                 │
│  Download:                                      │
│  1. Browser preferences (disable dialogs)       │
│  2. File system verification                    │
│  3. Content validation                          │
└─────────────────────────────────────────────────┘
```

## File Upload Handling

### Simple File Upload with sendKeys()

The most straightforward approach works with `<input type="file">` elements.

**Basic Syntax:**
```java
WebElement uploadElement = driver.findElement(By.id("fileUpload"));
uploadElement.sendKeys("C:\\path\\to\\file.txt");
```

**Complete Example:**

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class SimpleFileUpload {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/upload");

        // Locate the file input element
        WebElement fileInput = driver.findElement(By.id("file-upload"));

        // Provide the absolute path to the file
        String filePath = "C:\\Users\\YourName\\Documents\\testfile.txt";
        fileInput.sendKeys(filePath);

        // Click the upload button
        WebElement uploadButton = driver.findElement(By.id("file-submit"));
        uploadButton.click();

        // Verify upload success
        WebElement uploadedFile = driver.findElement(By.id("uploaded-files"));
        System.out.println("Uploaded file: " + uploadedFile.getText());

        driver.quit();
    }
}
```

### Cross-Platform File Paths

**Problem:** File paths differ across operating systems.

**Solution:** Use platform-independent paths:

```java
import java.io.File;

public class CrossPlatformFileUpload {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/upload");

        // Platform-independent path
        String userDir = System.getProperty("user.dir");
        String filePath = userDir + File.separator + "testfiles" + File.separator + "sample.pdf";

        // Alternative: Using Paths (Java 7+)
        // Path path = Paths.get(userDir, "testfiles", "sample.pdf");
        // String filePath = path.toString();

        WebElement uploadElement = driver.findElement(By.name("file"));
        uploadElement.sendKeys(filePath);

        driver.findElement(By.id("submit")).click();

        driver.quit();
    }
}
```

### Multiple File Upload

Some upload controls accept multiple files at once.

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.File;

public class MultipleFileUpload {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://davidwalsh.name/demo/multiple-file-upload.php");

        // Prepare file paths
        String file1 = System.getProperty("user.dir") + File.separator + "file1.txt";
        String file2 = System.getProperty("user.dir") + File.separator + "file2.pdf";
        String file3 = System.getProperty("user.dir") + File.separator + "file3.jpg";

        // Multiple files separated by newline character
        String allFiles = file1 + "\n" + file2 + "\n" + file3;

        // Locate upload element (must have multiple attribute)
        WebElement uploadElement = driver.findElement(By.name("filesToUpload"));
        uploadElement.sendKeys(allFiles);

        // Verify files selected
        System.out.println("Files selected successfully");

        driver.quit();
    }
}
```

### Upload with Explicit Wait

For dynamic upload forms that load asynchronously:

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.io.File;

public class FileUploadWithWait {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://example.com/upload");

        // Wait for upload element to be present
        WebElement uploadElement = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.id("file-input"))
        );

        String filePath = System.getProperty("user.dir") + File.separator + "upload.pdf";
        uploadElement.sendKeys(filePath);

        // Wait for upload button to be clickable
        WebElement uploadButton = wait.until(
            ExpectedConditions.elementToBeClickable(By.id("upload-btn"))
        );
        uploadButton.click();

        // Wait for success message
        WebElement successMsg = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.className("success-message"))
        );
        System.out.println("Upload status: " + successMsg.getText());

        driver.quit();
    }
}
```

## Different File Upload Scenarios

### Scenario 1: Input type="file" Elements

**Most Common - Direct sendKeys() works:**

```java
public class StandardFileUpload {
    public static void uploadFile(WebDriver driver, By locator, String filePath) {
        WebElement fileInput = driver.findElement(locator);

        // Verify it's a file input
        String inputType = fileInput.getAttribute("type");
        if ("file".equals(inputType)) {
            fileInput.sendKeys(filePath);
            System.out.println("File uploaded successfully");
        } else {
            System.out.println("Not a file input element");
        }
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/upload");

        String filePath = "C:\\Users\\Test\\document.pdf";
        uploadFile(driver, By.id("fileUpload"), filePath);

        driver.quit();
    }
}
```

### Scenario 2: Hidden Upload Buttons

Some applications hide the file input and use custom styled buttons.

**HTML Example:**
```html
<input type="file" id="file-input" style="display:none">
<button onclick="document.getElementById('file-input').click()">Choose File</button>
```

**Selenium Solution:**

```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class HiddenFileUpload {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/upload");

        // Find the hidden file input
        WebElement hiddenFileInput = driver.findElement(By.id("file-input"));

        // Make it visible using JavaScript
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].style.display='block';", hiddenFileInput);

        // Now send keys
        String filePath = "C:\\Users\\Test\\image.jpg";
        hiddenFileInput.sendKeys(filePath);

        // Submit if needed
        driver.findElement(By.id("submit-btn")).click();

        driver.quit();
    }
}
```

**Alternative - Direct sendKeys without unhiding:**

```java
public class DirectHiddenUpload {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/upload");

        // sendKeys() works on hidden elements too
        WebElement hiddenInput = driver.findElement(By.cssSelector("input[type='file']"));
        hiddenInput.sendKeys("C:\\Users\\Test\\document.docx");

        // Click the visible submit button
        driver.findElement(By.id("upload-button")).click();

        driver.quit();
    }
}
```

### Scenario 3: Drag and Drop File Upload

Modern web apps often support drag-and-drop file uploads.

```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.File;

public class DragDropFileUpload {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/upload");

        // For drag-drop zones, look for hidden file input
        WebElement dropZone = driver.findElement(By.id("drag-drop-upload"));
        WebElement fileInput = driver.findElement(By.cssSelector("input[type='file']"));

        String filePath = new File("testfile.txt").getAbsolutePath();

        // Even for drag-drop, sendKeys often works on the underlying input
        fileInput.sendKeys(filePath);

        // Alternatively, trigger file drop event via JavaScript
        JavascriptExecutor js = (JavascriptExecutor) driver;
        String jsDropFile =
            "var target = arguments[0];" +
            "var file = arguments[1];" +
            "var evt = new DragEvent('drop', {dataTransfer: new DataTransfer()});" +
            "evt.dataTransfer.files.add(new File([file], 'test.txt'));" +
            "target.dispatchEvent(evt);";

        js.executeScript(jsDropFile, dropZone, filePath);

        driver.quit();
    }
}
```

### Scenario 4: Upload Button Clicking

When the upload button itself needs to be clicked first:

```java
public class UploadButtonClick {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/profile");

        // Click the "Choose File" or "Upload" button
        WebElement chooseFileButton = driver.findElement(By.id("choose-file-btn"));

        // This won't work - opens OS dialog
        // chooseFileButton.click(); // AVOID

        // Instead, find the actual file input and send keys
        WebElement fileInput = driver.findElement(By.cssSelector("input[type='file']"));
        String filePath = "C:\\Users\\Test\\profile.jpg";
        fileInput.sendKeys(filePath);

        // Now click submit
        driver.findElement(By.id("submit-profile")).click();

        driver.quit();
    }
}
```

## Using Robot Class for File Uploads

### When to Use Robot Class

Use Robot class when:
- Upload button opens OS dialog that sendKeys() can't handle
- Non-standard upload controls
- Third-party upload widgets
- sendKeys() approach fails

**Note:** Robot class is less reliable and platform-dependent.

### Robot Class Implementation

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;

public class RobotClassFileUpload {
    public static void main(String[] args) throws Exception {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/upload");

        // Click button that opens OS dialog
        WebElement uploadButton = driver.findElement(By.id("file-button"));
        uploadButton.click();

        // Wait for dialog to open
        Thread.sleep(2000);

        // File path to upload
        String filePath = "C:\\Users\\Test\\document.pdf";

        // Copy file path to clipboard
        StringSelection stringSelection = new StringSelection(filePath);
        Toolkit.getDefaultToolkit().getSystemClipboard().setContents(stringSelection, null);

        // Create Robot instance
        Robot robot = new Robot();

        // Paste the file path (Ctrl+V)
        robot.keyPress(KeyEvent.VK_CONTROL);
        robot.keyPress(KeyEvent.VK_V);
        robot.keyRelease(KeyEvent.VK_V);
        robot.keyRelease(KeyEvent.VK_CONTROL);

        Thread.sleep(1000);

        // Press Enter to confirm
        robot.keyPress(KeyEvent.VK_ENTER);
        robot.keyRelease(KeyEvent.VK_ENTER);

        System.out.println("File uploaded using Robot class");

        Thread.sleep(2000);
        driver.quit();
    }
}
```

### Reusable Robot Upload Method

```java
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;

public class RobotFileUploadUtil {

    public static void uploadFileUsingRobot(String filePath) {
        try {
            // Set file path to clipboard
            StringSelection selection = new StringSelection(filePath);
            Toolkit.getDefaultToolkit().getSystemClipboard().setContents(selection, null);

            // Wait for clipboard
            Thread.sleep(1000);

            Robot robot = new Robot();

            // Paste file path
            robot.keyPress(KeyEvent.VK_CONTROL);
            robot.keyPress(KeyEvent.VK_V);
            robot.keyRelease(KeyEvent.VK_V);
            robot.keyRelease(KeyEvent.VK_CONTROL);

            robot.delay(1000);

            // Press Enter
            robot.keyPress(KeyEvent.VK_ENTER);
            robot.keyRelease(KeyEvent.VK_ENTER);

            System.out.println("File uploaded: " + filePath);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/upload");

        // Click upload button to open OS dialog
        driver.findElement(By.id("upload-btn")).click();

        Thread.sleep(2000);

        // Upload file using Robot
        uploadFileUsingRobot("C:\\Users\\Test\\report.xlsx");

        Thread.sleep(3000);
        driver.quit();
    }
}
```

### AutoIT Alternative (Windows)

AutoIT is a Windows automation tool that can handle file upload dialogs.

**AutoIT Script (upload.au3):**
```autoit
ControlFocus("Open", "", "Edit1")
ControlSetText("Open", "", "Edit1", $CmdLine[1])
ControlClick("Open", "", "Button1")
```

**Compile to .exe and use from Java:**

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.IOException;

public class AutoITFileUpload {
    public static void main(String[] args) throws Exception {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/upload");

        // Click upload button
        driver.findElement(By.id("upload-button")).click();

        // Wait for dialog
        Thread.sleep(2000);

        // Execute AutoIT script
        String autoitPath = "C:\\AutoIT\\upload.exe";
        String filePath = "C:\\Users\\Test\\file.pdf";

        Runtime.getRuntime().exec(autoitPath + " " + filePath);

        Thread.sleep(3000);

        System.out.println("File uploaded using AutoIT");

        driver.quit();
    }
}
```

## File Download Handling

### Understanding Download Behavior

By default, browsers show dialogs for downloads:
- Save As dialog
- Download location prompt
- Open with application prompt

**Automation Goal:** Configure browser to download automatically without dialogs.

### Basic Download Approach

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.io.File;
import java.util.HashMap;

public class BasicFileDownload {
    public static void main(String[] args) throws InterruptedException {
        // Set download directory
        String downloadPath = System.getProperty("user.dir") + File.separator + "downloads";

        // Create download directory if it doesn't exist
        File downloadDir = new File(downloadPath);
        if (!downloadDir.exists()) {
            downloadDir.mkdir();
        }

        // Configure Chrome options
        ChromeOptions options = new ChromeOptions();
        HashMap<String, Object> prefs = new HashMap<>();
        prefs.put("download.default_directory", downloadPath);
        prefs.put("download.prompt_for_download", false);
        prefs.put("safebrowsing.enabled", true);
        options.setExperimentalOption("prefs", prefs);

        WebDriver driver = new ChromeDriver(options);
        driver.get("https://the-internet.herokuapp.com/download");

        // Click download link
        driver.findElement(By.linkText("sample.txt")).click();

        // Wait for download to complete
        Thread.sleep(5000);

        // Verify file downloaded
        File downloadedFile = new File(downloadPath + File.separator + "sample.txt");
        if (downloadedFile.exists()) {
            System.out.println("File downloaded successfully!");
            System.out.println("File size: " + downloadedFile.length() + " bytes");
        } else {
            System.out.println("File not downloaded");
        }

        driver.quit();
    }
}
```

## Browser Download Preferences

### Chrome Download Configuration

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.io.File;
import java.util.HashMap;

public class ChromeDownloadConfig {
    public static WebDriver configureChromeDownload(String downloadPath) {
        ChromeOptions options = new ChromeOptions();

        HashMap<String, Object> prefs = new HashMap<>();

        // Set download directory
        prefs.put("download.default_directory", downloadPath);

        // Disable download prompt
        prefs.put("download.prompt_for_download", false);

        // Disable "Save As" dialog
        prefs.put("download.directory_upgrade", true);

        // Enable safe browsing
        prefs.put("safebrowsing.enabled", true);

        // Automatically download PDF files instead of opening
        prefs.put("plugins.always_open_pdf_externally", true);

        // Disable Chrome's built-in PDF viewer
        prefs.put("plugins.plugins_disabled", new String[]{"Chrome PDF Viewer"});

        options.setExperimentalOption("prefs", prefs);

        return new ChromeDriver(options);
    }

    public static void main(String[] args) {
        String downloadPath = System.getProperty("user.dir") + File.separator + "downloads";
        WebDriver driver = configureChromeDownload(downloadPath);

        driver.get("https://example.com/downloads");

        // Download operations...

        driver.quit();
    }
}
```

### Firefox Download Configuration

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.FirefoxProfile;
import java.io.File;

public class FirefoxDownloadConfig {
    public static WebDriver configureFirefoxDownload(String downloadPath) {
        FirefoxOptions options = new FirefoxOptions();
        FirefoxProfile profile = new FirefoxProfile();

        // Set download directory
        profile.setPreference("browser.download.dir", downloadPath);
        profile.setPreference("browser.download.folderList", 2);

        // Disable download manager window
        profile.setPreference("browser.download.manager.showWhenStarting", false);

        // Set MIME types to download automatically
        profile.setPreference("browser.helperApps.neverAsk.saveToDisk",
            "text/csv,application/pdf,application/vnd.ms-excel," +
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet," +
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document," +
            "application/zip,application/octet-stream");

        // Disable PDF viewer
        profile.setPreference("pdfjs.disabled", true);

        // Automatically download files
        profile.setPreference("browser.download.useDownloadDir", true);

        options.setProfile(profile);

        return new FirefoxDriver(options);
    }

    public static void main(String[] args) {
        String downloadPath = System.getProperty("user.dir") + File.separator + "downloads";
        WebDriver driver = configureFirefoxDownload(downloadPath);

        driver.get("https://example.com/downloads");

        // Download operations...

        driver.quit();
    }
}
```

### Edge Download Configuration

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import java.io.File;
import java.util.HashMap;

public class EdgeDownloadConfig {
    public static WebDriver configureEdgeDownload(String downloadPath) {
        EdgeOptions options = new EdgeOptions();

        HashMap<String, Object> prefs = new HashMap<>();

        // Set download directory
        prefs.put("download.default_directory", downloadPath);

        // Disable download prompt
        prefs.put("download.prompt_for_download", false);

        // Disable "Save As" dialog
        prefs.put("download.directory_upgrade", true);

        // Enable safe browsing
        prefs.put("safebrowsing.enabled", true);

        // Auto-download PDF files
        prefs.put("plugins.always_open_pdf_externally", true);

        options.setExperimentalOption("prefs", prefs);

        return new EdgeDriver(options);
    }

    public static void main(String[] args) {
        String downloadPath = System.getProperty("user.dir") + File.separator + "downloads";
        WebDriver driver = configureEdgeDownload(downloadPath);

        driver.get("https://example.com/downloads");

        // Download operations...

        driver.quit();
    }
}
```

## Verifying Downloaded Files

### Check if File Exists

```java
import java.io.File;

public class FileExistsCheck {

    public static boolean isFileDownloaded(String downloadPath, String fileName) {
        File file = new File(downloadPath + File.separator + fileName);
        return file.exists();
    }

    public static boolean waitForFileDownload(String downloadPath, String fileName, int timeoutSeconds) {
        File file = new File(downloadPath + File.separator + fileName);
        int waited = 0;

        while (!file.exists() && waited < timeoutSeconds) {
            try {
                Thread.sleep(1000);
                waited++;
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        return file.exists();
    }

    public static void main(String[] args) {
        String downloadPath = "C:\\Downloads";
        String fileName = "report.pdf";

        // Wait up to 30 seconds for download
        boolean downloaded = waitForFileDownload(downloadPath, fileName, 30);

        if (downloaded) {
            System.out.println("File downloaded successfully!");
        } else {
            System.out.println("File download failed or timed out");
        }
    }
}
```

### Verify File Size

```java
import java.io.File;

public class FileSizeVerification {

    public static boolean verifyFileSize(String filePath, long minimumSizeBytes) {
        File file = new File(filePath);

        if (!file.exists()) {
            System.out.println("File does not exist");
            return false;
        }

        long fileSize = file.length();
        System.out.println("File size: " + fileSize + " bytes");

        if (fileSize >= minimumSizeBytes) {
            System.out.println("File size verification passed");
            return true;
        } else {
            System.out.println("File size is less than expected");
            return false;
        }
    }

    public static void main(String[] args) {
        String filePath = "C:\\Downloads\\report.pdf";
        long expectedMinSize = 1024; // 1 KB

        verifyFileSize(filePath, expectedMinSize);
    }
}
```

### Verify File Content

```java
import java.io.*;
import java.nio.file.Files;
import java.util.List;

public class FileContentVerification {

    // Verify text file contains expected content
    public static boolean verifyTextFileContent(String filePath, String expectedContent) {
        try {
            String content = new String(Files.readAllBytes(new File(filePath).toPath()));
            return content.contains(expectedContent);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Verify CSV file structure
    public static boolean verifyCSVFile(String filePath, int expectedColumns) {
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String firstLine = reader.readLine();
            if (firstLine != null) {
                String[] columns = firstLine.split(",");
                System.out.println("CSV has " + columns.length + " columns");
                return columns.length == expectedColumns;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Verify file extension
    public static boolean verifyFileExtension(String filePath, String expectedExtension) {
        return filePath.toLowerCase().endsWith(expectedExtension.toLowerCase());
    }

    public static void main(String[] args) {
        String filePath = "C:\\Downloads\\data.csv";

        // Verify extension
        if (verifyFileExtension(filePath, ".csv")) {
            System.out.println("File extension is correct");
        }

        // Verify CSV structure
        if (verifyCSVFile(filePath, 5)) {
            System.out.println("CSV structure verified");
        }

        // Verify content
        if (verifyTextFileContent(filePath, "Name,Email")) {
            System.out.println("CSV contains expected headers");
        }
    }
}
```

### Wait for Download Completion

```java
import java.io.File;
import java.nio.file.*;

public class DownloadWaitStrategy {

    // Wait by checking file size stabilization
    public static boolean waitForDownloadComplete(String downloadPath, String fileName, int timeoutSeconds) {
        File file = new File(downloadPath + File.separator + fileName);
        int waited = 0;
        long previousSize = -1;
        int stableCount = 0;

        while (waited < timeoutSeconds) {
            if (file.exists()) {
                long currentSize = file.length();

                // Check if file size is stable (same for 2 consecutive checks)
                if (currentSize == previousSize && currentSize > 0) {
                    stableCount++;
                    if (stableCount >= 2) {
                        System.out.println("Download completed. File size: " + currentSize + " bytes");
                        return true;
                    }
                } else {
                    stableCount = 0;
                }

                previousSize = currentSize;
            }

            try {
                Thread.sleep(1000);
                waited++;
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        return false;
    }

    // Wait by checking for .crdownload or .part files (incomplete downloads)
    public static boolean waitForCompleteDownload(String downloadPath, int timeoutSeconds) {
        int waited = 0;
        File dir = new File(downloadPath);

        while (waited < timeoutSeconds) {
            File[] files = dir.listFiles((d, name) ->
                name.endsWith(".crdownload") || name.endsWith(".part") || name.endsWith(".tmp")
            );

            if (files == null || files.length == 0) {
                System.out.println("No incomplete download files found");
                return true;
            }

            try {
                Thread.sleep(1000);
                waited++;
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        System.out.println("Timeout waiting for download completion");
        return false;
    }

    public static void main(String[] args) {
        String downloadPath = "C:\\Downloads";

        // Wait for all downloads to complete
        if (waitForCompleteDownload(downloadPath, 60)) {
            System.out.println("All downloads completed successfully");
        } else {
            System.out.println("Download timeout");
        }
    }
}
```

## Download Location Management

### Setting Custom Download Path

```java
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class DownloadLocationManager {

    public static String createDownloadDirectory(String baseDir, String testName) {
        Path downloadPath = Paths.get(baseDir, "downloads", testName);

        try {
            if (!Files.exists(downloadPath)) {
                Files.createDirectories(downloadPath);
                System.out.println("Created download directory: " + downloadPath);
            }
            return downloadPath.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        String projectDir = System.getProperty("user.dir");
        String testName = "test_file_download_" + System.currentTimeMillis();

        String downloadPath = createDownloadDirectory(projectDir, testName);
        System.out.println("Download path: " + downloadPath);

        // Use this path in browser configuration...
    }
}
```

### Cleaning Up Test Files

```java
import java.io.File;
import java.io.IOException;
import java.nio.file.*;

public class DownloadCleanup {

    // Delete a single file
    public static boolean deleteFile(String filePath) {
        File file = new File(filePath);
        if (file.exists()) {
            return file.delete();
        }
        return false;
    }

    // Delete all files in directory
    public static void cleanupDownloadDirectory(String downloadPath) {
        File directory = new File(downloadPath);

        if (directory.exists() && directory.isDirectory()) {
            File[] files = directory.listFiles();

            if (files != null) {
                for (File file : files) {
                    if (file.isFile()) {
                        boolean deleted = file.delete();
                        System.out.println("Deleted: " + file.getName() + " - " + deleted);
                    }
                }
            }
        }
    }

    // Delete directory and all contents recursively
    public static void deleteDirectoryRecursively(String directoryPath) {
        try {
            Path path = Paths.get(directoryPath);
            if (Files.exists(path)) {
                Files.walk(path)
                    .sorted((a, b) -> -a.compareTo(b)) // Reverse order for deletion
                    .forEach(p -> {
                        try {
                            Files.delete(p);
                            System.out.println("Deleted: " + p);
                        } catch (IOException e) {
                            System.err.println("Failed to delete: " + p);
                        }
                    });
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Delete files older than specified days
    public static void deleteOldFiles(String directoryPath, int daysOld) {
        File directory = new File(directoryPath);
        long currentTime = System.currentTimeMillis();
        long daysInMillis = daysOld * 24L * 60 * 60 * 1000;

        if (directory.exists() && directory.isDirectory()) {
            File[] files = directory.listFiles();

            if (files != null) {
                for (File file : files) {
                    if (file.isFile()) {
                        long fileAge = currentTime - file.lastModified();
                        if (fileAge > daysInMillis) {
                            boolean deleted = file.delete();
                            System.out.println("Deleted old file: " + file.getName() + " - " + deleted);
                        }
                    }
                }
            }
        }
    }

    public static void main(String[] args) {
        String downloadPath = "C:\\Downloads\\TestDownloads";

        // Cleanup all files
        cleanupDownloadDirectory(downloadPath);

        // Or delete old files (older than 7 days)
        // deleteOldFiles(downloadPath, 7);

        // Or delete entire directory
        // deleteDirectoryRecursively(downloadPath);
    }
}
```

### File Organization

```java
import java.io.File;
import java.io.IOException;
import java.nio.file.*;

public class FileOrganizer {

    public static void organizeDownloadsByType(String sourceDir, String targetBaseDir) {
        File source = new File(sourceDir);
        File[] files = source.listFiles();

        if (files != null) {
            for (File file : files) {
                if (file.isFile()) {
                    String extension = getFileExtension(file.getName());
                    String targetDir = targetBaseDir + File.separator + extension;

                    // Create directory for this file type
                    new File(targetDir).mkdirs();

                    // Move file
                    try {
                        Path sourcePath = file.toPath();
                        Path targetPath = Paths.get(targetDir, file.getName());
                        Files.move(sourcePath, targetPath, StandardCopyOption.REPLACE_EXISTING);
                        System.out.println("Moved: " + file.getName() + " to " + targetDir);
                    } catch (IOException e) {
                        System.err.println("Failed to move: " + file.getName());
                    }
                }
            }
        }
    }

    private static String getFileExtension(String fileName) {
        int lastDot = fileName.lastIndexOf('.');
        if (lastDot > 0) {
            return fileName.substring(lastDot + 1).toLowerCase();
        }
        return "other";
    }

    public static void main(String[] args) {
        String downloadDir = "C:\\Downloads";
        String organizedDir = "C:\\Downloads\\Organized";

        organizeDownloadsByType(downloadDir, organizedDir);
    }
}
```

## Handling Download Popups

### Save As Dialog Handling

When browser preferences fail, use Robot class:

```java
import java.awt.Robot;
import java.awt.event.KeyEvent;
import java.awt.Toolkit;
import java.awt.datatransfer.StringSelection;

public class SaveAsDialogHandler {

    public static void handleSaveAsDialog(String savePath) {
        try {
            // Wait for dialog to appear
            Thread.sleep(2000);

            Robot robot = new Robot();

            // Copy file path to clipboard
            StringSelection selection = new StringSelection(savePath);
            Toolkit.getDefaultToolkit().getSystemClipboard().setContents(selection, null);

            // Paste the path (Ctrl+V)
            robot.keyPress(KeyEvent.VK_CONTROL);
            robot.keyPress(KeyEvent.VK_V);
            robot.keyRelease(KeyEvent.VK_V);
            robot.keyRelease(KeyEvent.VK_CONTROL);

            robot.delay(1000);

            // Press Enter to save
            robot.keyPress(KeyEvent.VK_ENTER);
            robot.keyRelease(KeyEvent.VK_ENTER);

            System.out.println("File saved to: " + savePath);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/download");

        // Click download button
        driver.findElement(By.id("download-btn")).click();

        // Handle Save As dialog
        String savePath = "C:\\Downloads\\myfile.pdf";
        handleSaveAsDialog(savePath);

        Thread.sleep(3000);
        driver.quit();
    }
}
```

### Open With Dialog Handling

```java
import java.awt.Robot;
import java.awt.event.KeyEvent;

public class OpenWithDialogHandler {

    public static void dismissOpenWithDialog() {
        try {
            Robot robot = new Robot();

            // Wait for dialog
            Thread.sleep(2000);

            // Press Escape to close
            robot.keyPress(KeyEvent.VK_ESCAPE);
            robot.keyRelease(KeyEvent.VK_ESCAPE);

            System.out.println("Dialog dismissed");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void selectSaveOptionInDialog() {
        try {
            Robot robot = new Robot();

            // Wait for dialog
            Thread.sleep(2000);

            // Tab to "Save" option (adjust based on dialog)
            robot.keyPress(KeyEvent.VK_TAB);
            robot.keyRelease(KeyEvent.VK_TAB);

            robot.delay(500);

            // Press Enter to select Save
            robot.keyPress(KeyEvent.VK_ENTER);
            robot.keyRelease(KeyEvent.VK_ENTER);

            System.out.println("Save option selected");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## Advanced Scenarios

### Large File Downloads

Handle timeout issues with large files:

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.io.File;
import java.time.Duration;
import java.util.HashMap;

public class LargeFileDownload {

    public static void downloadLargeFile(String url, String downloadPath, String fileName) {
        // Configure Chrome with extended timeout
        ChromeOptions options = new ChromeOptions();
        HashMap<String, Object> prefs = new HashMap<>();
        prefs.put("download.default_directory", downloadPath);
        prefs.put("download.prompt_for_download", false);
        options.setExperimentalOption("prefs", prefs);

        // Set page load timeout
        WebDriver driver = new ChromeDriver(options);
        driver.manage().timeouts().pageLoadTimeout(Duration.ofMinutes(5));
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(30));

        driver.get(url);

        // Trigger download
        driver.findElement(By.id("download-button")).click();

        // Wait for large file with custom timeout (10 minutes)
        boolean downloaded = waitForLargeFileDownload(downloadPath, fileName, 600);

        if (downloaded) {
            System.out.println("Large file downloaded successfully");
            verifyFileIntegrity(downloadPath + File.separator + fileName);
        } else {
            System.out.println("Download timeout or failed");
        }

        driver.quit();
    }

    private static boolean waitForLargeFileDownload(String path, String fileName, int timeoutSeconds) {
        File file = new File(path + File.separator + fileName);
        int waited = 0;
        long previousSize = -1;
        int stableCount = 0;

        System.out.println("Waiting for large file download...");

        while (waited < timeoutSeconds) {
            if (file.exists()) {
                long currentSize = file.length();
                System.out.println("Downloaded: " + (currentSize / 1024 / 1024) + " MB");

                if (currentSize == previousSize && currentSize > 0) {
                    stableCount++;
                    if (stableCount >= 3) {
                        return true;
                    }
                } else {
                    stableCount = 0;
                }

                previousSize = currentSize;
            }

            try {
                Thread.sleep(1000);
                waited++;
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        return false;
    }

    private static void verifyFileIntegrity(String filePath) {
        File file = new File(filePath);
        long fileSize = file.length();
        System.out.println("Final file size: " + (fileSize / 1024 / 1024) + " MB");

        // Add checksum verification if needed
        // Compare with expected file size
    }

    public static void main(String[] args) {
        String downloadPath = "C:\\Downloads";
        downloadLargeFile("https://example.com/large-file", downloadPath, "largefile.zip");
    }
}
```

### Password-Protected Files

```java
import net.lingala.zip4j.ZipFile;
import java.io.File;

public class PasswordProtectedFileHandler {

    public static void downloadAndExtractProtectedFile(String downloadPath, String zipFileName, String password) {
        String zipFilePath = downloadPath + File.separator + zipFileName;

        // Wait for download
        File zipFile = new File(zipFilePath);
        int waited = 0;
        while (!zipFile.exists() && waited < 30) {
            try {
                Thread.sleep(1000);
                waited++;
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        if (zipFile.exists()) {
            System.out.println("ZIP file downloaded");
            extractProtectedZip(zipFilePath, downloadPath, password);
        } else {
            System.out.println("ZIP file not found");
        }
    }

    private static void extractProtectedZip(String zipFilePath, String destPath, String password) {
        try {
            ZipFile zipFile = new ZipFile(zipFilePath);

            if (zipFile.isEncrypted()) {
                zipFile.setPassword(password.toCharArray());
            }

            zipFile.extractAll(destPath);
            System.out.println("ZIP file extracted successfully");

        } catch (Exception e) {
            System.err.println("Failed to extract ZIP: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        String downloadPath = "C:\\Downloads";
        String zipFile = "protected.zip";
        String password = "secret123";

        downloadAndExtractProtectedFile(downloadPath, zipFile, password);
    }
}
```

### Download Progress Monitoring

```java
import java.io.File;
import java.text.DecimalFormat;

public class DownloadProgressMonitor {

    public static void monitorDownloadProgress(String downloadPath, String fileName, long expectedSizeBytes) {
        File file = new File(downloadPath + File.separator + fileName);
        DecimalFormat df = new DecimalFormat("#.##");

        System.out.println("Monitoring download progress...");
        System.out.println("Expected size: " + (expectedSizeBytes / 1024 / 1024) + " MB");

        while (true) {
            if (file.exists()) {
                long currentSize = file.length();
                double progress = (double) currentSize / expectedSizeBytes * 100;
                double sizeMB = (double) currentSize / 1024 / 1024;

                System.out.print("\rProgress: " + df.format(progress) + "% (" + df.format(sizeMB) + " MB)");

                if (currentSize >= expectedSizeBytes) {
                    System.out.println("\nDownload completed!");
                    break;
                }
            }

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
                break;
            }
        }
    }

    public static void main(String[] args) {
        String downloadPath = "C:\\Downloads";
        String fileName = "largefile.zip";
        long expectedSize = 100 * 1024 * 1024; // 100 MB

        monitorDownloadProgress(downloadPath, fileName, expectedSize);
    }
}
```

### Handling Multiple Simultaneous Downloads

```java
import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class MultipleDownloadsHandler {

    public static void downloadMultipleFiles(WebDriver driver, List<String> downloadUrls, String downloadPath) {
        for (String url : downloadUrls) {
            driver.get(url);
            // Click download or download starts automatically
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        // Wait for all downloads to complete
        waitForAllDownloads(downloadPath, downloadUrls.size(), 120);
    }

    private static boolean waitForAllDownloads(String downloadPath, int expectedFiles, int timeoutSeconds) {
        File dir = new File(downloadPath);
        int waited = 0;

        System.out.println("Waiting for " + expectedFiles + " files to download...");

        while (waited < timeoutSeconds) {
            File[] files = dir.listFiles((d, name) ->
                !name.endsWith(".crdownload") &&
                !name.endsWith(".part") &&
                !name.endsWith(".tmp")
            );

            if (files != null && files.length >= expectedFiles) {
                System.out.println("All files downloaded successfully");
                return true;
            }

            try {
                Thread.sleep(1000);
                waited++;
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        System.out.println("Timeout waiting for all downloads");
        return false;
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        List<String> urls = new ArrayList<>();
        urls.add("https://example.com/file1.pdf");
        urls.add("https://example.com/file2.pdf");
        urls.add("https://example.com/file3.pdf");

        String downloadPath = "C:\\Downloads";
        downloadMultipleFiles(driver, urls, downloadPath);

        driver.quit();
    }
}
```

## Best Practices

### 1. Prefer sendKeys() for Uploads

```java
// Good: Direct sendKeys approach
WebElement fileInput = driver.findElement(By.id("file-upload"));
fileInput.sendKeys("C:\\path\\to\\file.txt");

// Avoid: Robot class unless necessary
// Robot class is unreliable and platform-dependent
```

### 2. Use Absolute File Paths

```java
// Good: Absolute path
String filePath = "C:\\Users\\Test\\Documents\\file.pdf";

// Better: Platform-independent
String filePath = System.getProperty("user.dir") + File.separator + "testfiles" + File.separator + "file.pdf";

// Bad: Relative path (may fail)
String filePath = "testfiles/file.pdf";
```

### 3. Configure Browser Preferences

```java
// Always configure browser to auto-download without dialogs
ChromeOptions options = new ChromeOptions();
HashMap<String, Object> prefs = new HashMap<>();
prefs.put("download.default_directory", downloadPath);
prefs.put("download.prompt_for_download", false);
options.setExperimentalOption("prefs", prefs);
```

### 4. Implement Proper Wait Strategies

```java
// Good: Wait for file with timeout
public boolean waitForFile(String filePath, int timeoutSeconds) {
    File file = new File(filePath);
    int waited = 0;
    while (!file.exists() && waited < timeoutSeconds) {
        Thread.sleep(1000);
        waited++;
    }
    return file.exists();
}

// Bad: Fixed sleep
Thread.sleep(10000); // May be too long or too short
```

### 5. Verify File Operations

```java
// Always verify upload/download success
File uploadedFile = new File(downloadPath + File.separator + "report.pdf");
if (uploadedFile.exists() && uploadedFile.length() > 0) {
    System.out.println("Download verified");
} else {
    throw new Exception("Download failed or file is empty");
}
```

### 6. Clean Up Test Files

```java
@AfterTest
public void cleanup() {
    // Delete test files after execution
    File downloadDir = new File(downloadPath);
    File[] files = downloadDir.listFiles();
    if (files != null) {
        for (File file : files) {
            file.delete();
        }
    }
}
```

### 7. Handle File Naming Conflicts

```java
// Use timestamps or unique identifiers
String timestamp = String.valueOf(System.currentTimeMillis());
String uniqueFileName = "report_" + timestamp + ".pdf";
```

### 8. Use Try-Catch for File Operations

```java
try {
    fileInput.sendKeys(filePath);
    System.out.println("File uploaded successfully");
} catch (Exception e) {
    System.err.println("File upload failed: " + e.getMessage());
    // Take screenshot for debugging
    takeScreenshot(driver, "upload_failure");
}
```

## Troubleshooting Common Issues

### Issue 1: sendKeys() Not Working on File Input

**Problem:** File path sent but file not uploaded

**Solutions:**
```java
// 1. Ensure element is enabled
WebElement fileInput = driver.findElement(By.id("file-upload"));
if (fileInput.isEnabled()) {
    fileInput.sendKeys(filePath);
}

// 2. Make hidden element visible
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("arguments[0].style.display='block';", fileInput);
fileInput.sendKeys(filePath);

// 3. Use absolute path
String absolutePath = new File("testfile.txt").getAbsolutePath();
fileInput.sendKeys(absolutePath);
```

### Issue 2: File Not Downloading

**Problem:** Download link clicked but file not downloaded

**Solutions:**
```java
// 1. Verify browser preferences configured correctly
ChromeOptions options = new ChromeOptions();
HashMap<String, Object> prefs = new HashMap<>();
prefs.put("download.default_directory", downloadPath);
prefs.put("download.prompt_for_download", false);
prefs.put("safebrowsing.enabled", false); // May block downloads
options.setExperimentalOption("prefs", prefs);

// 2. Check download directory exists
File downloadDir = new File(downloadPath);
if (!downloadDir.exists()) {
    downloadDir.mkdirs();
}

// 3. Add explicit wait before clicking download
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement downloadLink = wait.until(ExpectedConditions.elementToBeClickable(By.id("download")));
downloadLink.click();
```

### Issue 3: Download Timeout

**Problem:** Large files timing out

**Solutions:**
```java
// Increase timeouts
driver.manage().timeouts().pageLoadTimeout(Duration.ofMinutes(5));

// Implement custom wait with progress monitoring
public boolean waitForDownload(String fileName, int timeoutSeconds) {
    File file = new File(downloadPath + File.separator + fileName);
    long previousSize = -1;
    int stableCount = 0;

    for (int i = 0; i < timeoutSeconds; i++) {
        if (file.exists()) {
            long currentSize = file.length();
            if (currentSize == previousSize) {
                stableCount++;
                if (stableCount >= 3) return true;
            } else {
                stableCount = 0;
            }
            previousSize = currentSize;
        }
        Thread.sleep(1000);
    }
    return false;
}
```

### Issue 4: Robot Class Not Working

**Problem:** Robot class actions not executing

**Solutions:**
```java
// 1. Add sufficient delays
robot.delay(2000); // Wait for dialog

// 2. Ensure dialog has focus
// Click on the dialog or use Alt+Tab

// 3. Use platform-specific key codes
if (System.getProperty("os.name").startsWith("Mac")) {
    robot.keyPress(KeyEvent.VK_META); // Command key on Mac
} else {
    robot.keyPress(KeyEvent.VK_CONTROL); // Ctrl key on Windows
}
```

### Issue 5: File Path Issues on Different OS

**Problem:** Hard-coded paths fail on different operating systems

**Solutions:**
```java
// Use File.separator for platform independence
String filePath = "C:" + File.separator + "Users" + File.separator + "Test" + File.separator + "file.pdf";

// Or use Paths API
Path path = Paths.get("C:", "Users", "Test", "file.pdf");
String filePath = path.toString();

// For project-relative paths
String projectPath = System.getProperty("user.dir");
String filePath = projectPath + File.separator + "testfiles" + File.separator + "file.pdf";
```

### Issue 6: Permission Denied Errors

**Problem:** Cannot write to download directory

**Solutions:**
```java
// Check directory permissions
File downloadDir = new File(downloadPath);
if (!downloadDir.canWrite()) {
    System.err.println("No write permission to: " + downloadPath);
    // Use alternative directory
    downloadPath = System.getProperty("user.home") + File.separator + "Downloads";
}

// Create directory with proper permissions
try {
    Files.createDirectories(Paths.get(downloadPath));
} catch (IOException e) {
    e.printStackTrace();
}
```

## Practice Exercises

### Exercise 1: Basic File Upload (Easy)

Upload a text file to a web application and verify success message.

```java
public class Exercise1_FileUpload {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/upload");

        // TODO: Create a test file
        // TODO: Locate file input element
        // TODO: Upload the file
        // TODO: Click submit button
        // TODO: Verify upload success message

        driver.quit();
    }
}
```

**Solution:**
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class Exercise1_Solution {
    public static void main(String[] args) throws IOException, InterruptedException {
        // Create test file
        String fileName = "testfile.txt";
        File testFile = new File(fileName);
        FileWriter writer = new FileWriter(testFile);
        writer.write("This is a test file for Selenium upload");
        writer.close();

        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/upload");

        // Locate file input
        WebElement fileInput = driver.findElement(By.id("file-upload"));

        // Upload file
        fileInput.sendKeys(testFile.getAbsolutePath());

        // Click submit
        WebElement submitButton = driver.findElement(By.id("file-submit"));
        submitButton.click();

        // Verify success
        Thread.sleep(2000);
        WebElement uploadedFileName = driver.findElement(By.id("uploaded-files"));
        System.out.println("Uploaded file: " + uploadedFileName.getText());

        if (uploadedFileName.getText().equals(fileName)) {
            System.out.println("Upload successful!");
        } else {
            System.out.println("Upload failed!");
        }

        // Cleanup
        testFile.delete();
        driver.quit();
    }
}
```

### Exercise 2: File Download with Verification (Medium)

Download a file and verify it exists with correct size.

```java
public class Exercise2_FileDownload {
    public static void main(String[] args) {
        // TODO: Configure Chrome for auto-download
        // TODO: Set custom download directory
        // TODO: Navigate to download page
        // TODO: Click download link
        // TODO: Wait for download completion
        // TODO: Verify file exists
        // TODO: Verify file size > 0
        // TODO: Clean up downloaded file
    }
}
```

**Solution:**
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.io.File;
import java.util.HashMap;

public class Exercise2_Solution {
    public static void main(String[] args) throws InterruptedException {
        // Setup download directory
        String downloadPath = System.getProperty("user.dir") + File.separator + "downloads";
        File downloadDir = new File(downloadPath);
        if (!downloadDir.exists()) {
            downloadDir.mkdir();
        }

        // Configure Chrome
        ChromeOptions options = new ChromeOptions();
        HashMap<String, Object> prefs = new HashMap<>();
        prefs.put("download.default_directory", downloadPath);
        prefs.put("download.prompt_for_download", false);
        options.setExperimentalOption("prefs", prefs);

        WebDriver driver = new ChromeDriver(options);
        driver.get("https://the-internet.herokuapp.com/download");

        // Download file
        String fileName = "some-file.txt";
        driver.findElement(By.linkText(fileName)).click();

        // Wait for download
        File downloadedFile = new File(downloadPath + File.separator + fileName);
        int waited = 0;
        while (!downloadedFile.exists() && waited < 30) {
            Thread.sleep(1000);
            waited++;
        }

        // Verify
        if (downloadedFile.exists()) {
            System.out.println("File downloaded successfully!");
            System.out.println("File size: " + downloadedFile.length() + " bytes");

            if (downloadedFile.length() > 0) {
                System.out.println("File size verification passed");
            }

            // Cleanup
            downloadedFile.delete();
        } else {
            System.out.println("File download failed!");
        }

        driver.quit();
    }
}
```

### Exercise 3: Multiple File Upload (Medium)

Upload multiple files simultaneously.

```java
public class Exercise3_MultipleUpload {
    public static void main(String[] args) {
        // TODO: Create 3 test files
        // TODO: Find upload element that supports multiple files
        // TODO: Upload all files at once
        // TODO: Verify all files uploaded
        // TODO: Clean up test files
    }
}
```

**Solution:**
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Exercise3_Solution {
    public static void main(String[] args) throws IOException, InterruptedException {
        // Create multiple test files
        List<File> testFiles = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            File file = new File("testfile" + i + ".txt");
            FileWriter writer = new FileWriter(file);
            writer.write("Test content for file " + i);
            writer.close();
            testFiles.add(file);
        }

        // Prepare file paths string
        StringBuilder filePathsBuilder = new StringBuilder();
        for (int i = 0; i < testFiles.size(); i++) {
            filePathsBuilder.append(testFiles.get(i).getAbsolutePath());
            if (i < testFiles.size() - 1) {
                filePathsBuilder.append("\n");
            }
        }
        String allFilePaths = filePathsBuilder.toString();

        WebDriver driver = new ChromeDriver();
        driver.get("https://davidwalsh.name/demo/multiple-file-upload.php");

        // Upload multiple files
        WebElement fileInput = driver.findElement(By.name("filesToUpload"));
        fileInput.sendKeys(allFilePaths);

        Thread.sleep(2000);

        System.out.println("Multiple files uploaded successfully");

        // Cleanup
        for (File file : testFiles) {
            file.delete();
        }

        driver.quit();
    }
}
```

### Exercise 4: Download with Content Verification (Hard)

Download a CSV file and verify its content.

```java
public class Exercise4_ContentVerification {
    public static void main(String[] args) {
        // TODO: Configure browser for download
        // TODO: Download CSV file
        // TODO: Wait for download completion
        // TODO: Read CSV file
        // TODO: Verify header row
        // TODO: Verify number of rows
        // TODO: Verify specific data
        // TODO: Clean up
    }
}
```

**Solution:**
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.io.*;
import java.util.HashMap;

public class Exercise4_Solution {
    public static void main(String[] args) throws InterruptedException, IOException {
        // Setup
        String downloadPath = System.getProperty("user.dir") + File.separator + "downloads";
        new File(downloadPath).mkdirs();

        ChromeOptions options = new ChromeOptions();
        HashMap<String, Object> prefs = new HashMap<>();
        prefs.put("download.default_directory", downloadPath);
        prefs.put("download.prompt_for_download", false);
        options.setExperimentalOption("prefs", prefs);

        WebDriver driver = new ChromeDriver(options);
        driver.get("https://example.com/download-csv"); // Replace with actual URL

        // Download CSV
        String fileName = "data.csv";
        driver.findElement(By.id("download-csv")).click();

        // Wait for download
        File csvFile = new File(downloadPath + File.separator + fileName);
        int waited = 0;
        while (!csvFile.exists() && waited < 30) {
            Thread.sleep(1000);
            waited++;
        }

        if (csvFile.exists()) {
            System.out.println("CSV downloaded");

            // Read and verify content
            BufferedReader reader = new BufferedReader(new FileReader(csvFile));
            String headerLine = reader.readLine();

            System.out.println("Header: " + headerLine);

            // Verify header
            if (headerLine != null && headerLine.contains("Name") && headerLine.contains("Email")) {
                System.out.println("Header verification passed");
            }

            // Count rows
            int rowCount = 0;
            while (reader.readLine() != null) {
                rowCount++;
            }
            reader.close();

            System.out.println("Total data rows: " + rowCount);

            // Cleanup
            csvFile.delete();
        } else {
            System.out.println("CSV download failed");
        }

        driver.quit();
    }
}
```

### Exercise 5: Hidden File Upload (Hard)

Handle hidden file input with custom styled button.

```java
public class Exercise5_HiddenUpload {
    public static void main(String[] args) {
        // TODO: Navigate to page with hidden file input
        // TODO: Locate hidden input element
        // TODO: Make element visible using JavaScript OR send keys directly
        // TODO: Upload file
        // TODO: Verify upload success
    }
}
```

**Solution:**
```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class Exercise5_Solution {
    public static void main(String[] args) throws IOException, InterruptedException {
        // Create test file
        File testFile = new File("hidden_upload_test.pdf");
        FileWriter writer = new FileWriter(testFile);
        writer.write("Test content");
        writer.close();

        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/hidden-upload"); // Replace with actual URL

        // Locate hidden file input
        WebElement hiddenInput = driver.findElement(By.cssSelector("input[type='file']"));

        // Check if hidden
        boolean isHidden = !hiddenInput.isDisplayed();
        System.out.println("Input is hidden: " + isHidden);

        // Method 1: Make visible with JavaScript
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].style.display='block';", hiddenInput);
        js.executeScript("arguments[0].style.visibility='visible';", hiddenInput);

        // Upload file
        hiddenInput.sendKeys(testFile.getAbsolutePath());

        // Method 2: Direct sendKeys (works even if hidden)
        // hiddenInput.sendKeys(testFile.getAbsolutePath());

        // Submit
        WebElement submitBtn = driver.findElement(By.id("submit-upload"));
        submitBtn.click();

        Thread.sleep(2000);

        // Verify
        System.out.println("Upload completed");

        // Cleanup
        testFile.delete();
        driver.quit();
    }
}
```

### Exercise 6: Complete Upload-Download Workflow (Advanced)

Upload a file, process it, and download the result.

```java
public class Exercise6_CompleteWorkflow {
    public static void main(String[] args) {
        // TODO: Create test CSV file
        // TODO: Upload CSV file
        // TODO: Wait for processing
        // TODO: Download processed file
        // TODO: Verify processed file content
        // TODO: Clean up all files
    }
}
```

**Solution:**
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.io.*;
import java.time.Duration;
import java.util.HashMap;

public class Exercise6_Solution {
    public static void main(String[] args) throws IOException, InterruptedException {
        String projectDir = System.getProperty("user.dir");
        String downloadPath = projectDir + File.separator + "downloads";
        new File(downloadPath).mkdirs();

        // Create test CSV
        File inputCSV = new File(projectDir + File.separator + "input.csv");
        FileWriter writer = new FileWriter(inputCSV);
        writer.write("Name,Email\n");
        writer.write("John Doe,john@example.com\n");
        writer.write("Jane Smith,jane@example.com\n");
        writer.close();
        System.out.println("Test CSV created");

        // Configure browser
        ChromeOptions options = new ChromeOptions();
        HashMap<String, Object> prefs = new HashMap<>();
        prefs.put("download.default_directory", downloadPath);
        prefs.put("download.prompt_for_download", false);
        options.setExperimentalOption("prefs", prefs);

        WebDriver driver = new ChromeDriver(options);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

        driver.get("https://example.com/csv-processor");

        // Upload CSV
        WebElement fileInput = driver.findElement(By.id("csv-upload"));
        fileInput.sendKeys(inputCSV.getAbsolutePath());

        WebElement uploadBtn = driver.findElement(By.id("upload-btn"));
        uploadBtn.click();
        System.out.println("CSV uploaded");

        // Wait for processing
        WebElement processingMsg = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("processing-status"))
        );
        System.out.println("Status: " + processingMsg.getText());

        // Wait for download link
        WebElement downloadLink = wait.until(
            ExpectedConditions.elementToBeClickable(By.id("download-processed"))
        );
        downloadLink.click();
        System.out.println("Download initiated");

        // Wait for download
        String outputFileName = "processed.csv";
        File processedFile = new File(downloadPath + File.separator + outputFileName);
        int waited = 0;
        while (!processedFile.exists() && waited < 30) {
            Thread.sleep(1000);
            waited++;
        }

        if (processedFile.exists()) {
            System.out.println("Processed file downloaded");

            // Verify content
            BufferedReader reader = new BufferedReader(new FileReader(processedFile));
            String line;
            int lineCount = 0;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
                lineCount++;
            }
            reader.close();

            System.out.println("Total lines in processed file: " + lineCount);

            // Cleanup
            processedFile.delete();
        } else {
            System.out.println("Processed file not downloaded");
        }

        // Cleanup
        inputCSV.delete();
        driver.quit();

        System.out.println("Workflow completed successfully!");
    }
}
```

## Interview Questions

### Q1: What are the different ways to handle file uploads in Selenium?

**Answer:**
There are three main approaches:

1. **sendKeys() method (Preferred):**
   - Works with `<input type="file">` elements
   - Directly sends file path to input element
   - Most reliable and cross-platform
   ```java
   WebElement fileInput = driver.findElement(By.id("upload"));
   fileInput.sendKeys("C:\\path\\to\\file.txt");
   ```

2. **Robot Class:**
   - Used when sendKeys() doesn't work
   - Handles OS-level file dialogs
   - Less reliable, platform-dependent
   ```java
   Robot robot = new Robot();
   // Copy path to clipboard and paste
   robot.keyPress(KeyEvent.VK_CONTROL);
   robot.keyPress(KeyEvent.VK_V);
   ```

3. **AutoIT (Windows only):**
   - External automation tool
   - Handles Windows dialogs
   - Compiled scripts executed from Java
   ```java
   Runtime.getRuntime().exec("upload.exe C:\\file.pdf");
   ```

**Best Practice:** Always prefer sendKeys() method as it's the most reliable and doesn't depend on OS-specific features.

---

### Q2: How do you handle file downloads in different browsers?

**Answer:**
Configure browser preferences to auto-download without dialogs:

**Chrome:**
```java
ChromeOptions options = new ChromeOptions();
HashMap<String, Object> prefs = new HashMap<>();
prefs.put("download.default_directory", downloadPath);
prefs.put("download.prompt_for_download", false);
prefs.put("plugins.always_open_pdf_externally", true);
options.setExperimentalOption("prefs", prefs);
```

**Firefox:**
```java
FirefoxProfile profile = new FirefoxProfile();
profile.setPreference("browser.download.dir", downloadPath);
profile.setPreference("browser.download.folderList", 2);
profile.setPreference("browser.helperApps.neverAsk.saveToDisk", "application/pdf");
```

**Edge:**
```java
EdgeOptions options = new EdgeOptions();
HashMap<String, Object> prefs = new HashMap<>();
prefs.put("download.default_directory", downloadPath);
options.setExperimentalOption("prefs", prefs);
```

---

### Q3: How do you verify if a file has been downloaded successfully?

**Answer:**
Multiple verification approaches:

1. **Check File Existence:**
   ```java
   File file = new File(downloadPath + File.separator + "file.pdf");
   boolean exists = file.exists();
   ```

2. **Wait for File with Timeout:**
   ```java
   public boolean waitForFile(String filePath, int timeout) {
       File file = new File(filePath);
       int waited = 0;
       while (!file.exists() && waited < timeout) {
           Thread.sleep(1000);
           waited++;
       }
       return file.exists();
   }
   ```

3. **Verify File Size:**
   ```java
   if (file.exists() && file.length() > 0) {
       System.out.println("File downloaded: " + file.length() + " bytes");
   }
   ```

4. **Check for Incomplete Downloads:**
   ```java
   // Ensure no .crdownload (Chrome) or .part (Firefox) files exist
   File[] incompleteFiles = dir.listFiles((d, name) ->
       name.endsWith(".crdownload") || name.endsWith(".part")
   );
   boolean complete = (incompleteFiles == null || incompleteFiles.length == 0);
   ```

---

### Q4: What is the difference between sendKeys() and Robot class for file uploads?

**Answer:**

| Aspect | sendKeys() | Robot Class |
|--------|-----------|-------------|
| **Usage** | Works directly with input elements | Simulates keyboard actions |
| **Reliability** | Highly reliable | Less reliable |
| **Speed** | Fast | Slower (requires delays) |
| **Platform** | Cross-platform | Platform-dependent |
| **Visibility** | Works on hidden elements | Requires visible dialog |
| **Preference** | Always preferred | Use only as last resort |

**sendKeys() Example:**
```java
driver.findElement(By.id("upload")).sendKeys("C:\\file.txt");
```

**Robot Class Example:**
```java
driver.findElement(By.id("browse")).click(); // Opens dialog
Thread.sleep(2000);
Robot robot = new Robot();
// Paste file path from clipboard
robot.keyPress(KeyEvent.VK_CONTROL);
robot.keyPress(KeyEvent.VK_V);
robot.keyRelease(KeyEvent.VK_V);
robot.keyRelease(KeyEvent.VK_CONTROL);
```

---

### Q5: How do you handle multiple file uploads?

**Answer:**
For elements with `multiple` attribute, use newline separator:

```java
String file1 = "C:\\files\\document1.pdf";
String file2 = "C:\\files\\document2.pdf";
String file3 = "C:\\files\\document3.pdf";

String allFiles = file1 + "\n" + file2 + "\n" + file3;

WebElement fileInput = driver.findElement(By.name("files"));
fileInput.sendKeys(allFiles);
```

**HTML requirement:**
```html
<input type="file" name="files" multiple>
```

**Verification:**
```java
// Check all files selected
JavascriptExecutor js = (JavascriptExecutor) driver;
Long fileCount = (Long) js.executeScript(
    "return document.getElementById('file-input').files.length;"
);
System.out.println("Files selected: " + fileCount);
```

---

### Q6: How do you handle hidden file upload buttons?

**Answer:**
Two approaches:

**Method 1: Make element visible using JavaScript:**
```java
WebElement hiddenInput = driver.findElement(By.cssSelector("input[type='file']"));
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("arguments[0].style.display='block';", hiddenInput);
js.executeScript("arguments[0].style.visibility='visible';", hiddenInput);
hiddenInput.sendKeys(filePath);
```

**Method 2: Send keys directly (works even if hidden):**
```java
WebElement hiddenInput = driver.findElement(By.cssSelector("input[type='file']"));
hiddenInput.sendKeys(filePath); // Works on hidden elements
```

**Method 2 is preferred** as it's simpler and more reliable.

---

### Q7: What challenges do you face when downloading files and how do you handle them?

**Answer:**

**Challenges:**

1. **Browser Prompts:** Save As dialogs
   - **Solution:** Configure browser preferences to disable prompts

2. **Unknown Download Completion:** When has download finished?
   - **Solution:** Implement wait strategies checking file size stability

3. **Dynamic File Names:** Downloaded file has timestamp
   - **Solution:** List directory files and find by pattern

4. **Large Files:** Timeout issues
   - **Solution:** Increase timeouts and monitor progress

5. **Multiple Downloads:** Race conditions
   - **Solution:** Wait for specific number of files

**Example Implementation:**
```java
public boolean waitForDownloadComplete(String downloadPath, int timeout) {
    File dir = new File(downloadPath);
    int waited = 0;

    while (waited < timeout) {
        File[] files = dir.listFiles((d, name) ->
            !name.endsWith(".crdownload") && !name.endsWith(".part")
        );

        if (files != null && files.length > 0) {
            // Check file size is stable
            long size1 = files[0].length();
            Thread.sleep(1000);
            long size2 = files[0].length();

            if (size1 == size2 && size1 > 0) {
                return true;
            }
        }

        Thread.sleep(1000);
        waited++;
    }
    return false;
}
```

---

### Q8: How do you set a custom download location?

**Answer:**

**For Chrome:**
```java
String downloadPath = "C:\\CustomDownloads";
new File(downloadPath).mkdirs(); // Create if doesn't exist

ChromeOptions options = new ChromeOptions();
HashMap<String, Object> prefs = new HashMap<>();
prefs.put("download.default_directory", downloadPath);
options.setExperimentalOption("prefs", prefs);

WebDriver driver = new ChromeDriver(options);
```

**Platform-Independent Path:**
```java
String downloadPath = System.getProperty("user.dir") +
                      File.separator + "downloads";
```

**Best Practice:**
```java
// Create unique directory per test
String timestamp = String.valueOf(System.currentTimeMillis());
String downloadPath = System.getProperty("user.dir") +
                      File.separator + "downloads" +
                      File.separator + "test_" + timestamp;
new File(downloadPath).mkdirs();
```

---

### Q9: Can Selenium handle PDF file downloads?

**Answer:**
Yes, with proper browser configuration:

```java
ChromeOptions options = new ChromeOptions();
HashMap<String, Object> prefs = new HashMap<>();

// Download directory
prefs.put("download.default_directory", downloadPath);

// Disable PDF viewer (download instead of opening)
prefs.put("plugins.always_open_pdf_externally", true);

// Disable Chrome PDF Viewer
prefs.put("plugins.plugins_disabled", new String[]{"Chrome PDF Viewer"});

options.setExperimentalOption("prefs", prefs);

WebDriver driver = new ChromeDriver(options);
driver.get("https://example.com/document.pdf");
```

**Verification:**
```java
File pdfFile = new File(downloadPath + File.separator + "document.pdf");
if (pdfFile.exists() && pdfFile.getName().endsWith(".pdf")) {
    System.out.println("PDF downloaded successfully");
    System.out.println("File size: " + pdfFile.length() + " bytes");
}
```

---

### Q10: How do you clean up downloaded files after tests?

**Answer:**

**Method 1: Delete individual file:**
```java
File file = new File(downloadPath + File.separator + "report.pdf");
if (file.exists()) {
    boolean deleted = file.delete();
    System.out.println("File deleted: " + deleted);
}
```

**Method 2: Clean entire download directory:**
```java
public void cleanupDownloads(String downloadPath) {
    File dir = new File(downloadPath);
    if (dir.exists() && dir.isDirectory()) {
        File[] files = dir.listFiles();
        if (files != null) {
            for (File file : files) {
                file.delete();
            }
        }
    }
}
```

**Method 3: In TestNG/JUnit:**
```java
@AfterTest
public void tearDown() {
    cleanupDownloads(downloadPath);
    driver.quit();
}
```

**Method 4: Delete directory recursively:**
```java
public void deleteDirectory(String dirPath) {
    try {
        Files.walk(Paths.get(dirPath))
            .sorted(Comparator.reverseOrder())
            .map(Path::toFile)
            .forEach(File::delete);
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

---

### Q11: How do you handle dynamic file names in downloads?

**Answer:**

**Problem:** File downloads with timestamp like `report_20260114.pdf`

**Solution 1: List directory and find by pattern:**
```java
public File findDownloadedFile(String downloadPath, String pattern) {
    File dir = new File(downloadPath);
    File[] files = dir.listFiles((d, name) -> name.contains(pattern));

    if (files != null && files.length > 0) {
        // Return most recent file
        Arrays.sort(files, Comparator.comparingLong(File::lastModified).reversed());
        return files[0];
    }
    return null;
}

// Usage
File report = findDownloadedFile(downloadPath, "report_");
if (report != null) {
    System.out.println("Found: " + report.getName());
}
```

**Solution 2: Get latest file:**
```java
public File getLatestDownloadedFile(String downloadPath) {
    File dir = new File(downloadPath);
    File[] files = dir.listFiles(File::isFile);

    if (files == null || files.length == 0) {
        return null;
    }

    File lastModified = files[0];
    for (File file : files) {
        if (file.lastModified() > lastModified.lastModified()) {
            lastModified = file;
        }
    }
    return lastModified;
}
```

---

### Q12: What is the best practice for file paths in cross-platform automation?

**Answer:**

**Use Platform-Independent Separators:**
```java
// Bad - Windows only
String path = "C:\\Users\\Test\\file.txt";

// Good - Cross-platform
String path = "C:" + File.separator + "Users" + File.separator + "Test" + File.separator + "file.txt";

// Better - Using Paths API
Path path = Paths.get("C:", "Users", "Test", "file.txt");
String fullPath = path.toString();

// Best - Project relative
String projectDir = System.getProperty("user.dir");
String filePath = Paths.get(projectDir, "testfiles", "data.csv").toString();
```

**Detect OS:**
```java
String os = System.getProperty("os.name").toLowerCase();
String filePath;

if (os.contains("win")) {
    filePath = "C:\\Users\\Test\\file.txt";
} else if (os.contains("mac")) {
    filePath = "/Users/Test/file.txt";
} else {
    filePath = "/home/test/file.txt";
}
```

**Best Practice:**
```java
public class FilePathUtil {
    public static String getTestFilePath(String fileName) {
        return Paths.get(
            System.getProperty("user.dir"),
            "src",
            "test",
            "resources",
            "testfiles",
            fileName
        ).toString();
    }
}

// Usage
String filePath = FilePathUtil.getTestFilePath("sample.pdf");
```

---

### Q13: How do you wait for a large file to download completely?

**Answer:**

**Implementation with progress monitoring:**
```java
public boolean waitForLargeFileDownload(String downloadPath, String fileName, int timeoutMinutes) {
    File file = new File(downloadPath + File.separator + fileName);
    int timeoutSeconds = timeoutMinutes * 60;
    int waited = 0;
    long previousSize = -1;
    int stableCount = 0;

    System.out.println("Waiting for large file download...");

    while (waited < timeoutSeconds) {
        if (file.exists()) {
            long currentSize = file.length();
            double sizeMB = (double) currentSize / (1024 * 1024);

            System.out.printf("\rDownloaded: %.2f MB", sizeMB);

            // Check if file size is stable (not changing)
            if (currentSize == previousSize && currentSize > 0) {
                stableCount++;
                // File size stable for 3 consecutive checks = download complete
                if (stableCount >= 3) {
                    System.out.println("\nDownload complete!");
                    return true;
                }
            } else {
                stableCount = 0; // Reset if size changed
            }

            previousSize = currentSize;
        }

        try {
            Thread.sleep(1000);
            waited++;
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    System.out.println("\nDownload timeout");
    return false;
}

// Usage
boolean success = waitForLargeFileDownload(downloadPath, "largefile.zip", 10); // 10 minutes
```

**Alternative - Check for incomplete download indicators:**
```java
public boolean waitForCompleteDownload(String downloadPath, int timeoutSeconds) {
    int waited = 0;
    File dir = new File(downloadPath);

    while (waited < timeoutSeconds) {
        // Check for incomplete download files
        File[] incompleteFiles = dir.listFiles((d, name) ->
            name.endsWith(".crdownload") ||  // Chrome
            name.endsWith(".part") ||        // Firefox
            name.endsWith(".tmp")           // Others
        );

        if (incompleteFiles == null || incompleteFiles.length == 0) {
            System.out.println("Download complete");
            return true;
        }

        Thread.sleep(1000);
        waited++;
    }

    return false;
}
```

---

### Q14: How would you test file upload with validation (file type, size)?

**Answer:**

**Complete test scenario:**
```java
public class FileUploadValidationTest {
    WebDriver driver;
    String uploadPath = System.getProperty("user.dir") + File.separator + "testfiles";

    @Test
    public void testValidFileUpload() {
        driver.get("https://example.com/upload");

        // Create valid PDF file
        File pdfFile = new File(uploadPath + File.separator + "valid.pdf");
        // Assume file exists with proper content

        WebElement fileInput = driver.findElement(By.id("file-upload"));
        fileInput.sendKeys(pdfFile.getAbsolutePath());

        driver.findElement(By.id("upload-btn")).click();

        // Verify success message
        WebElement successMsg = driver.findElement(By.className("success"));
        Assert.assertTrue(successMsg.getText().contains("Upload successful"));
    }

    @Test
    public void testInvalidFileType() {
        driver.get("https://example.com/upload");

        // Try uploading .exe file (not allowed)
        File exeFile = new File(uploadPath + File.separator + "test.exe");

        WebElement fileInput = driver.findElement(By.id("file-upload"));
        fileInput.sendKeys(exeFile.getAbsolutePath());

        driver.findElement(By.id("upload-btn")).click();

        // Verify error message
        WebElement errorMsg = driver.findElement(By.className("error"));
        Assert.assertTrue(errorMsg.getText().contains("Invalid file type"));
    }

    @Test
    public void testFileSizeLimit() {
        driver.get("https://example.com/upload");

        // Create large file exceeding limit
        File largeFile = createLargeFile(11 * 1024 * 1024); // 11MB

        WebElement fileInput = driver.findElement(By.id("file-upload"));
        fileInput.sendKeys(largeFile.getAbsolutePath());

        driver.findElement(By.id("upload-btn")).click();

        // Verify error message
        WebElement errorMsg = driver.findElement(By.className("error"));
        Assert.assertTrue(errorMsg.getText().contains("File too large"));

        // Cleanup
        largeFile.delete();
    }

    private File createLargeFile(int sizeBytes) {
        File file = new File(uploadPath + File.separator + "large.txt");
        try (FileOutputStream fos = new FileOutputStream(file)) {
            byte[] data = new byte[sizeBytes];
            fos.write(data);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return file;
    }
}
```

---

### Q15: Explain how you would create a reusable file operations utility class.

**Answer:**

**Complete utility class:**
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;

public class FileOperationsUtil {

    // Configure Chrome for file downloads
    public static WebDriver configureBrowserForDownload(String downloadPath) {
        ChromeOptions options = new ChromeOptions();
        HashMap<String, Object> prefs = new HashMap<>();
        prefs.put("download.default_directory", downloadPath);
        prefs.put("download.prompt_for_download", false);
        prefs.put("safebrowsing.enabled", true);
        prefs.put("plugins.always_open_pdf_externally", true);
        options.setExperimentalOption("prefs", prefs);
        return new ChromeDriver(options);
    }

    // Upload file
    public static void uploadFile(WebElement fileInput, String filePath) {
        File file = new File(filePath);
        if (!file.exists()) {
            throw new RuntimeException("File not found: " + filePath);
        }
        fileInput.sendKeys(file.getAbsolutePath());
    }

    // Wait for file download
    public static boolean waitForFileDownload(String downloadPath, String fileName, int timeoutSeconds) {
        File file = new File(downloadPath + File.separator + fileName);
        int waited = 0;

        while (!file.exists() && waited < timeoutSeconds) {
            try {
                Thread.sleep(1000);
                waited++;
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        return file.exists() && file.length() > 0;
    }

    // Get latest downloaded file
    public static File getLatestDownloadedFile(String downloadPath) {
        File dir = new File(downloadPath);
        File[] files = dir.listFiles(File::isFile);

        if (files == null || files.length == 0) return null;

        File latest = files[0];
        for (File file : files) {
            if (file.lastModified() > latest.lastModified()) {
                latest = file;
            }
        }
        return latest;
    }

    // Create download directory
    public static String createDownloadDirectory(String basePath, String testName) {
        Path downloadPath = Paths.get(basePath, "downloads", testName);
        try {
            Files.createDirectories(downloadPath);
            return downloadPath.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Clean up downloads
    public static void cleanupDownloads(String downloadPath) {
        File dir = new File(downloadPath);
        if (dir.exists() && dir.isDirectory()) {
            File[] files = dir.listFiles();
            if (files != null) {
                for (File file : files) {
                    file.delete();
                }
            }
        }
    }

    // Verify file exists and has minimum size
    public static boolean verifyDownloadedFile(String filePath, long minSizeBytes) {
        File file = new File(filePath);
        return file.exists() && file.length() >= minSizeBytes;
    }

    // Create test file
    public static File createTestFile(String fileName, String content) {
        File file = new File(fileName);
        try {
            Files.write(file.toPath(), content.getBytes());
            return file;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

// Usage Example
public class FileOperationsTest {
    public static void main(String[] args) {
        // Setup
        String downloadPath = FileOperationsUtil.createDownloadDirectory(
            System.getProperty("user.dir"),
            "test_" + System.currentTimeMillis()
        );

        // Configure browser
        WebDriver driver = FileOperationsUtil.configureBrowserForDownload(downloadPath);

        // Upload file
        driver.get("https://example.com/upload");
        WebElement fileInput = driver.findElement(By.id("upload"));
        FileOperationsUtil.uploadFile(fileInput, "C:\\test.pdf");

        // Download file
        driver.get("https://example.com/download");
        driver.findElement(By.id("download-btn")).click();

        // Wait and verify download
        boolean downloaded = FileOperationsUtil.waitForFileDownload(
            downloadPath, "report.pdf", 30
        );

        if (downloaded) {
            System.out.println("File downloaded successfully");
        }

        // Cleanup
        FileOperationsUtil.cleanupDownloads(downloadPath);
        driver.quit();
    }
}
```

This utility class provides:
- Browser configuration for downloads
- File upload helper
- Download verification
- Directory management
- File cleanup
- Test file creation
- Latest file retrieval

---

## Key Takeaways

1. **File Upload Methods:**
   - Always prefer `sendKeys()` method for file uploads
   - Use Robot class only when sendKeys() fails
   - sendKeys() works on hidden file inputs
   - Multiple files can be uploaded with newline separator

2. **Browser Configuration:**
   - Configure browser preferences to disable download dialogs
   - Set custom download directories
   - Each browser has different preference settings
   - Always create download directory before use

3. **File Download Verification:**
   - Wait for file existence with timeout
   - Check file size is greater than zero
   - Verify no incomplete download files (.crdownload, .part)
   - Implement file size stability checks for large files

4. **Best Practices:**
   - Use absolute file paths
   - Implement platform-independent path handling
   - Clean up test files after execution
   - Add proper wait strategies for downloads
   - Verify file content when necessary
   - Handle exceptions gracefully

5. **Common Challenges:**
   - Hidden file inputs (use JavaScript or direct sendKeys)
   - Dynamic file names (search by pattern or get latest)
   - Large file timeouts (increase timeout and monitor progress)
   - OS dialogs (configure browser to avoid them)
   - Permission issues (use accessible directories)

6. **Testing Strategy:**
   - Create unique download directories per test
   - Verify both upload and download operations
   - Test file validation scenarios
   - Handle edge cases (large files, wrong types)
   - Implement proper cleanup in teardown

7. **Utility Development:**
   - Create reusable file operation methods
   - Centralize browser configuration
   - Implement common wait strategies
   - Build file verification helpers
   - Provide cleanup utilities

## What's Next

Congratulations on completing Day 11! You now have a solid understanding of file upload and download handling in Selenium.

**Tomorrow (Day 12):** We'll explore **Java 8 Features - Lambda Expressions and Streams**, which will help you write more concise and functional automation code.

**Preparation for Next Lesson:**
- Review Java functional interfaces
- Understand the concept of lambda expressions
- Familiarize yourself with Stream API basics

**Additional Practice:**
- Practice file uploads on different websites
- Configure downloads for all major browsers
- Create a comprehensive file operations utility
- Test various file types and sizes
- Implement file content verification

**Resources for Further Learning:**
- Selenium documentation on file handling
- Java NIO File API documentation
- Browser-specific preferences documentation
- Practice sites for file operations

Keep practicing, and see you in the next lesson!

---

**Navigation:**
- [Previous: Day 10 - Web Tables](day10_web_tables.md)
- [Next: Day 12 - Java 8 Lambda and Streams](day12_java8_lambda_streams.md)
- [Week 2 Overview](README.md)
- [Course Home](../README.md)
