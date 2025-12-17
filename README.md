# Type Racer 🏎️

A simple, clean typing speed test app built with vanilla JavaScript. Test your typing speed, track your accuracy, and see how you improve over time!

## What's This?

This is a typing speed test where you race against the clock. You can choose different time durations (10s to 120s), and the app tracks your Words Per Minute (WPM) and accuracy. It even saves your test history in your browser!

## Getting Started

Alright, so here's the deal - this app is dead simple to run. No fancy build tools, no npm install madness (well, there's a package-lock.json but you don't actually need it). Just pure HTML, CSS, and JavaScript.

### Quick Start (Easiest Way)

1. **Clone this repo** (or download it if you're old school)
   ```bash
   git clone https://github.com/Tensored-Flow/TypeRacer.git
   cd TypeRacer
   ```

2. **Serve it up!** 
   
   You need to run this through a local server because of how it loads the wordlist.txt file (browsers don't like loading local files for security reasons).

   **Option A: Python (if you have it)**
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Or Python 2 (if you're still using it for some reason)
   python -m SimpleHTTPServer 8000
   ```
   
   **Option B: Node.js (if you have it)**
   ```bash
   npx http-server -p 8000
   ```
   
   **Option C: VS Code**
   If you're using VS Code, just install the "Live Server" extension and right-click on `index.html` → "Open with Live Server"

3. **Open your browser**
   
   Navigate to `http://localhost:8000` (or whatever port your server is using)

4. **Start typing!**
   
   Click "Start Test", pick your timer duration, and go nuts!

### Deployment Options

Want to put this online? Here are some easy options:

**GitHub Pages** (Free & Easy)
1. Go to your repo settings on GitHub
2. Scroll down to "Pages" 
3. Select your `main` branch and `/ (root)` folder
4. Click save - boom, it's live at `https://yourusername.github.io/TypeRacer`

**Netlify** (Also Free & Super Easy)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder onto their site
3. Done. They give you a URL instantly.

**Vercel** (Another Free Option)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

**Any Static Host**
Since this is just static files, you can basically host it anywhere - AWS S3, Firebase Hosting, your own server, whatever floats your boat.

## How It Works

- Words are loaded from `wordlist.txt` (it's a big file with like 200k+ words, but we filter it to short words)
- The app tracks every character you type and compares it to the target word
- WPM is calculated as: `(correct characters / 5) / (time in minutes)`
- Accuracy is just: `(correct characters / total characters) * 100`
- Your test history is saved in your browser's localStorage (so it's local to you, not shared)

## Files

- `index.html` - The main page structure
- `script.js` - All the JavaScript logic
- `style.css` - The styling (dark theme, because we're cool)
- `wordlist.txt` - The dictionary (huge file, but you don't need to touch it)
- `package-lock.json` - Honestly, not really needed for this project but it's here

## Tips

- Words are filtered to be less than 6 characters long for easier typing
- The app uses 60 random words per test
- Your history persists even if you close the browser
- Accuracy counts spaces between words, so be careful!

## Contributing

Found a bug? Want to add a feature? Go ahead and open an issue or submit a PR. This is a simple project, so keep it simple!

## License

Do whatever you want with it. It's code. Have fun!

