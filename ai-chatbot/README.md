# DecodeBot – Rule-Based AI Chatbot

A premium, responsive, and completely client-side Rule-Based AI Chatbot Web Application designed for the **DecodeLabs AI Internship**. DecodeBot mimics the visual aesthetics of state-of-the-art AI assistants like ChatGPT and Gemini with futuristic styling, glassmorphism layouts, fluid micro-interactions, dark/light theme switching, and local storage state persistence.

This project is completely self-contained and operates entirely offline using pure HTML, CSS, and vanilla JavaScript without any frameworks, databases, or API integrations.

---

## 🚀 Key Features

* **Futuristic Glassmorphism UI:** Translucent layout containers, subtle border glows, and moving backdrop particles.
* **Responsive Layout:** Optimized structure designed with CSS flexboxes, grids, and media queries supporting seamless navigation across mobile phones, tablets, laptops, and large desktop screens.
* **Rule-Based JS Engine:** Case-insensitive string normalization to process user questions, match keywords/intents using clean conditional workflows, and output appropriate context-aware responses.
* **Simulated Thinking/Typing State:** Artificial delayed responsiveness with animated bouncing dots to resemble modern LLM chat completion behaviors.
* **Session Persistence:** Remembers chat history and theme preferences across page reloads using `localStorage`.
* **Sidebar Controls:** Easy features to start a "New Chat" session, clear the saved cache, and view internship milestones.
* **Interactive Suggestions:** Interactive prompt cards on the greeting panel that users can click to execute immediate sample queries.
* **Zero External Dependencies:** Built with native web APIs and inline SVGs to support 100% offline usage.

---

## 📁 Project Structure

```text
decode-bot/
│
├── index.html     # Page structure, sidebar metadata, chat layout & inline SVGs
├── style.css      # Core theme colors, responsive media rules, animations & layouts
├── script.js      # Main input handlers, response logic, localStorage states & themes
└── README.md      # Comprehensive project documentation
```

---

## ⚙️ How It Works (Rule Engine)

DecodeBot evaluates and answers statements using a clean if-else decision system in JavaScript:

1. **Input Normalization:** When a user submits a prompt, the system strips trailing question marks (`?`) or exclamation points (`!`), converts letters to lowercase, and trims trailing white spaces.
2. **Intent Matching:** The software tests the normalized input against multiple logic rules:
   * **Greetings (`hi`, `hello`, `hey`):** Randomly returns one of: *"Hello 👋 How are you?"*, *"Hi there 😊"*, or *"Hey! How can I help you today?"*
   * **State (`how are you`):** Returns *"I'm doing great 😊"*
   * **Identity (`your name` / `who are you`):** Returns *"I am DecodeBot 🤖"*
   * **Help (`help`):** Returns *"I can answer simple questions."*
   * **Internship (`internship`):** Returns *"This chatbot project is part of your AI internship."*
   * **Gratitude (`thank you` / `thanks`):** Randomly returns *"You're welcome 😊"* or *"Happy to help 🚀"*
   * **Farewell (`bye` / `goodbye`):** Returns *"Goodbye 👋 Have a great day!"*
3. **Fallback Route:** If the statement matches no rules, the chatbot randomly replies with fallback strings such as *"Sorry 😅 I don't understand that yet."* or *"I am still learning 🤖"*.
4. **Typing Simulation:** Triggering the reply schedules a random timeout between 800ms and 1500ms, displaying the typing indicator while loading.

---

## 🛠️ Local Setup Instructions

No complex build setups, compilers, or server installations are necessary. 

### Step 1: Clone/Copy the Code
Ensure the directory contains the project files:
* `index.html`
* `style.css`
* `script.js`

### Step 2: Open in Browser
Double-click `index.html` to run the chatbot in your preferred browser, or run a simple HTTP server locally:

**Using Python:**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

**Using Node.js (via Live Server/Serve):**
```bash
npx serve .
```

---

## 🚀 Deployment Instructions

DecodeBot is static and deployment-ready for any free hosting solution:

### 1. GitHub Pages (Recommended)
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of DecodeBot Chatbot"
   ```
2. Create a new repository on GitHub (e.g., `decodebot-ai-chatbot`).
3. Link and push to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/decodebot-ai-chatbot.git
   git branch -M main
   git push -u origin main
   ```
4. Navigate to your repository page on GitHub: **Settings > Pages**.
5. Set the Source to **Deploy from a branch**, choose **main** (or root), and click **Save**.
6. Your live link will generate in a few minutes! (e.g., `https://your-username.github.io/decodebot-ai-chatbot/`).

### 2. Netlify
1. Log into [Netlify](https://www.netlify.com/).
2. Drag and drop the `decode-bot` folder containing your files directly into the Netlify dashboard upload block.
3. Your web app will deploy instantly.

### 3. Vercel
1. Install Vercel CLI or log into their web platform.
2. Run the deployment command inside your project folder:
   ```bash
   npx vercel
   ```
3. Follow the CLI configuration steps to deploy.

---

## 🎓 Internship Project Information

* **Institution:** DecodeLabs AI Internship Program
* **Phase:** Task 1 Milestone
* **Subject:** Rule-Based AI Chatbot Interface and Client-Side Logic
* **Objective:** Demonstration of semantic HTML, advanced CSS animations, grid layouts, responsive adjustments, state maintenance using Storage APIs, and DOM manipulation.

---

## 🌟 Future Improvements
* **Fuzzy Intent Matching:** Integrate Levenshtein distance calculations or simple Regex mappings to parse typos (e.g. "hlo" matching "hello").
* **Extended Dialog States:** Maintain multi-turn memory flags (e.g. asking the bot a follow-up question that builds on the prior prompt).
* **Rich Markdown Formatting:** Render bot responses as HTML-compliant grids or lists.
* **Export Dialogs:** Add an export utility to save chat session text logs to a `.txt` or `.json` file.
