# Interactive Code Playground - Setup Guide

The Java Learning Platform now includes an interactive code playground that allows students to write, run, and test Java code directly in the browser!

## Features

- **Real-time Code Execution**: Write and run Java code instantly
- **Monaco Editor**: VS Code-like editing experience with syntax highlighting
- **Multiple Examples**: Pre-loaded examples including Hello World, Fibonacci, Array Sorting, and OOP
- **Error Handling**: Detailed compilation and runtime error messages
- **Copy & Reset**: Easy code management with copy and reset buttons
- **Responsive Design**: Works on all devices

## Setup Instructions

### Option 1: Using JDoodle API (Recommended - No Credit Card!)

The playground uses JDoodle API for code execution. To enable full functionality:

1. **Get a Free API Key:**
   - Visit [JDoodle Compiler API](https://www.jdoodle.com/compiler-api)
   - Click **"Subscribe"** or **"Get API"**
   - Sign up with your name and email (no credit card required!)
   - Check your email for your credentials
   - You'll receive:
     - **Client ID**
     - **Client Secret**

2. **Configure the API Credentials:**

   **Method A: Direct Configuration (Quick)**
   - Open `src/components/CodePlayground.jsx`
   - Find lines 17-18:
     ```javascript
     const CLIENT_ID = 'YOUR_CLIENT_ID';
     const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
     ```
   - Replace with your actual credentials:
     ```javascript
     const CLIENT_ID = 'your-client-id-here';
     const CLIENT_SECRET = 'your-client-secret-here';
     ```

   **Method B: Environment Variable (Recommended for Production)**
   - Create a `.env` file in the project root:
     ```
     VITE_JDOODLE_CLIENT_ID=your_actual_client_id
     VITE_JDOODLE_CLIENT_SECRET=your_actual_client_secret
     ```
   - Update `CodePlayground.jsx` lines 17-18:
     ```javascript
     const CLIENT_ID = import.meta.env.VITE_JDOODLE_CLIENT_ID || 'YOUR_CLIENT_ID';
     const CLIENT_SECRET = import.meta.env.VITE_JDOODLE_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';
     ```
   - Restart the dev server: `npm run dev`

3. **Verify Setup:**
   - Navigate to `/playground` in your app
   - Click "Run" on the Hello World example
   - You should see "Hello, World!" in the output panel

### Option 2: Local Mode (Limited Features)

If you don't configure API credentials, the playground runs in "local mode":

- ✅ JavaScript code execution works (runs in browser)
- ❌ Java code execution not available (requires JDoodle API)
- Users will see a helpful message explaining how to set up the API credentials

## Usage

1. **Navigate to Playground:**
   - Click "Playground" in the top navigation
   - Or visit `/playground` directly

2. **Choose an Example:**
   - Select from Hello World, Fibonacci, Array Sorting, or OOP examples
   - Each example demonstrates different Java concepts

3. **Write Code:**
   - Use the Monaco editor on the left
   - Full syntax highlighting and code completion
   - All Java code must be in a class with a `main` method

4. **Run Code:**
   - Click the "Run" button or press Ctrl/Cmd + Enter
   - View output or errors on the right panel
   - Green = Success, Red = Error

5. **Manage Code:**
   - **Copy**: Copy current code to clipboard
   - **Reset**: Restore the original example code

## Supported Languages

Currently configured for:
- Java (JDK 17) - Primary language
- Python 3
- JavaScript (Node.js) - Works in local mode
- C++ 17
- C

To enable additional languages, update the `languageConfig` object in `CodePlayground.jsx`.

## Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Run code
- **Ctrl/Cmd + S**: Monaco editor save (no action by default)
- **Ctrl + Space**: Show autocomplete suggestions
- **F1**: Show all commands

## Troubleshooting

### "JDoodle API not configured" error
**Cause**: API credentials not configured

**Solution**:
- Visit https://www.jdoodle.com/compiler-api
- Sign up (no credit card required!)
- Get your Client ID and Client Secret
- Add them to `CodePlayground.jsx` lines 17-18

### "Authentication failed" error
**Cause**: Invalid credentials

**Solution**:
- Verify your CLIENT_ID and CLIENT_SECRET are correct
- Check for typos or extra spaces
- Ensure you copied the complete credential strings
- Check your JDoodle account is active

### "Rate limit exceeded"
**Cause**: Exceeded free tier limit (200 requests/day)

**Solution**:
- Wait 24 hours for limit reset
- Upgrade to a paid plan on JDoodle
- Use local mode for JavaScript testing

### Code runs but no output
**Cause**: Your code might not be printing anything

**Solution**:
- Add `System.out.println()` statements
- Check for logical errors in your code
- Verify the code compiles without errors

### Editor not loading
**Cause**: Monaco editor failed to initialize

**Solution**:
- Clear browser cache
- Check browser console for errors
- Ensure internet connection (Monaco CDN)
- Try a different browser

## API Costs

JDoodle Pricing:
- **Free Tier**: 200 requests/day (no credit card required!)
- **Basic**: $7/month for 2,000 requests/day
- **Pro**: $15/month for 10,000 requests/day
- **Enterprise**: Custom pricing for unlimited

**Most users find the free tier sufficient for learning and practice.**

## Security Notes

1. **Never commit API credentials** to version control
2. Use environment variables for production
3. Rotate credentials periodically
4. Monitor usage on JDoodle dashboard
5. Set up rate limiting if needed

## Technical Details

- **Editor**: Monaco Editor (powers VS Code)
- **Execution**: JDoodle Code Execution API
- **Language**: Java (JDK 17)
- **Timeout**: API default timeout
- **Free Tier**: 200 requests/day (no credit card required)

## Benefits of JDoodle

✅ **No Credit Card Required** - Sign up with just email
✅ **Generous Free Tier** - 200 requests/day vs 100 with alternatives
✅ **Fast Setup** - Get credentials in 1 minute
✅ **Reliable** - Used by thousands of developers worldwide
✅ **Multiple Languages** - Java, Python, C++, JavaScript, and more
✅ **Active Support** - Responsive team and community

## Future Enhancements

Potential additions for the playground:
- [ ] Save code to local storage
- [ ] Share code with shareable links
- [ ] Support for multiple files
- [ ] Input/stdin support
- [ ] Code templates library
- [ ] Embedded playground in lessons
- [ ] Collaborative coding features

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your API credentials setup
3. Check the browser console for errors
4. Review JDoodle usage dashboard
5. Check QUICKSTART_PLAYGROUND.md for quick fixes

## License

This playground component is part of the Java Learning Platform.

---

**Happy Coding! 🚀**
