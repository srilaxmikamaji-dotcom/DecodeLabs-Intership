/* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ DECODEBOT INTERACTION LOGIC (RULE-BASED ENGINE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project: DecodeBot - Rule-Based AI Chatbot
Author: DecodeLabs AI Intern
Features: If-Else Logic, LocalStorage Sync, Theme Toggle, Typing Sim
*/

document.addEventListener("DOMContentLoaded", () => {
    // 1. DOM ELEMENTS SELECTION
    const messagesLog = document.getElementById("messagesLog");
    const chatInput = document.getElementById("chatInput");
    const chatForm = document.getElementById("chatForm");
    const welcomeContainer = document.getElementById("welcomeContainer");
    const typingIndicator = document.getElementById("typingIndicator");
    
    // Sidebar & Control Buttons
    const sidebar = document.getElementById("sidebar");
    const mobileToggleBtn = document.getElementById("mobileToggleBtn");
    const mobileCloseBtn = document.getElementById("mobileCloseBtn");
    const newChatBtn = document.getElementById("newChatBtn");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    
    // Theme Switcher Elements
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const themeToggleText = document.getElementById("themeToggleText");
    const sunIcon = themeToggleBtn.querySelector(".sun-icon");
    const moonIcon = themeToggleBtn.querySelector(".moon-icon");

    // 2. STATE CONFIGURATION
    let chatHistory = [];
    const STORAGE_KEY = "decodebot_chat_history";
    const THEME_KEY = "decodebot_theme";

    // 3. SYSTEM INITIALIZATION
    initApp();

    function initApp() {
        // Load saved theme
        const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
        setTheme(savedTheme);

        // Load saved chat history
        loadChatHistory();

        // Focus chat input on launch
        focusInput();

        // Attach Event Listeners
        chatForm.addEventListener("submit", handleFormSubmit);
        themeToggleBtn.addEventListener("click", toggleTheme);
        clearHistoryBtn.addEventListener("click", handleClearChat);
        newChatBtn.addEventListener("click", handleNewChat);
        
        // Mobile Sidebar Controls
        mobileToggleBtn.addEventListener("click", () => sidebar.classList.add("open"));
        mobileCloseBtn.addEventListener("click", () => sidebar.classList.remove("open"));

        // Setup Suggestion Cards Click Trigger
        setupSuggestions();
    }

    // 4. THEME CONTROLLER
    function setTheme(theme) {
        if (theme === "light") {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
            themeToggleText.textContent = "Dark Mode";
            sunIcon.style.display = "none";
            moonIcon.style.display = "block";
            localStorage.setItem(THEME_KEY, "light");
        } else {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
            themeToggleText.textContent = "Light Mode";
            sunIcon.style.display = "block";
            moonIcon.style.display = "none";
            localStorage.setItem(THEME_KEY, "dark");
        }
    }

    function toggleTheme() {
        const isCurrentLight = document.body.classList.contains("light-theme");
        setTheme(isCurrentLight ? "dark" : "light");
    }

    // 5. LOCAL STORAGE & HISTORY SYNC
    function loadChatHistory() {
        const rawHistory = localStorage.getItem(STORAGE_KEY);
        if (rawHistory) {
            chatHistory = JSON.parse(rawHistory);
            
            if (chatHistory.length > 0) {
                // Hide landing cards if there is existing history
                welcomeContainer.style.display = "none";
                
                // Render every loaded message bubble
                chatHistory.forEach(msg => {
                    renderMessageBubble(msg.role, msg.text, msg.timestamp);
                });
                
                scrollToBottom();
            }
        }
    }

    function saveChatHistory() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
    }

    // 6. RENDER MESSAGE BUBBLES
    function renderMessageBubble(role, text, timestamp) {
        const row = document.createElement("div");
        row.classList.add("message-row", role === "user" ? "user-row" : "bot-row");

        const bubble = document.createElement("div");
        bubble.classList.add("message-bubble");

        if (role === "bot") {
            const avatar = document.createElement("div");
            avatar.classList.add("message-avatar");
            avatar.textContent = "🤖";
            bubble.appendChild(avatar);
        }

        const content = document.createElement("div");
        content.classList.add("message-text");
        content.textContent = text;
        bubble.appendChild(content);

        const timeSpan = document.createElement("span");
        timeSpan.classList.add("message-timestamp");
        timeSpan.textContent = timestamp;
        bubble.appendChild(timeSpan);

        row.appendChild(bubble);
        messagesLog.appendChild(row);
    }

    // 7. HANDLE SUBMISSION FLOW
    function handleFormSubmit(e) {
        e.preventDefault();
        const rawText = chatInput.value;
        if (!rawText || rawText.trim() === "") return;

        // Hide welcome grid if visible
        if (welcomeContainer.style.display !== "none") {
            welcomeContainer.style.display = "none";
        }

        const userText = rawText.trim();
        const timestamp = getFormattedTime();

        // 1. Render user message
        renderMessageBubble("user", userText, timestamp);
        
        // 2. Save user message to state & storage
        chatHistory.push({ role: "user", text: userText, timestamp: timestamp });
        saveChatHistory();

        // 3. Clear and focus input
        chatInput.value = "";
        focusInput();
        scrollToBottom();

        // 4. Simulate bot reply with typing indicator
        triggerBotResponse(userText);
    }

    // 8. TYPING ANIMATION & BOT SCHEDULER
    function triggerBotResponse(userText) {
        // Show typing indicator
        typingIndicator.classList.add("visible");
        scrollToBottom();

        // Randomize delay to look like thinking (800ms - 1500ms)
        const delay = Math.floor(Math.random() * 700) + 800;

        setTimeout(() => {
            // Hide typing indicator
            typingIndicator.classList.remove("visible");

            // Compute reply using rule-based algorithm
            const botReplyText = computeRuleResponse(userText);
            const timestamp = getFormattedTime();

            // Render and save bot message
            renderMessageBubble("bot", botReplyText, timestamp);
            chatHistory.push({ role: "bot", text: botReplyText, timestamp: timestamp });
            saveChatHistory();
            
            scrollToBottom();
            focusInput();
        }, delay);
    }

    // 9. RULE-BASED MATCHING ENGINE
    function computeRuleResponse(userInput) {
        // Normalize input string: lowercased, trimmed, removing common punctuation marks (?, !)
        const cleanInput = userInput
            .toLowerCase()
            .trim()
            .replace(/[?!.]/g, "");

        // ─── RULE 1: GREETINGS ───
        if (cleanInput === "hi" || cleanInput === "hello" || cleanInput === "hey" || cleanInput === "hola") {
            const greetings = [
                "Hello 👋 How are you?",
                "Hi there 😊",
                "Hey! How can I help you today?"
            ];
            return getRandomItem(greetings);
        }

        // ─── RULE 2: STATE OF BEING ───
        if (cleanInput === "how are you" || cleanInput.includes("how are you doing")) {
            return "I'm doing great 😊";
        }

        // ─── RULE 3: IDENTITY / BOT NAME ───
        if (cleanInput.includes("your name") || cleanInput === "who are you" || cleanInput === "what is your name") {
            return "I am DecodeBot 🤖";
        }

        // ─── RULE 4: GENERAL HELP ───
        if (cleanInput === "help" || cleanInput.includes("what can you do") || cleanInput.includes("commands")) {
            return "I can answer simple questions.";
        }

        // ─── RULE 5: INTERNSHIP PROJECTS ───
        if (cleanInput === "internship" || cleanInput.includes("decodelabs") || cleanInput.includes("intern")) {
            return "This chatbot project is part of your AI internship.";
        }

        // ─── RULE 6: GRATITUDE ───
        if (cleanInput === "thank you" || cleanInput === "thanks" || cleanInput === "ty") {
            const thanksReplies = [
                "You're welcome 😊",
                "Happy to help 🚀"
            ];
            return getRandomItem(thanksReplies);
        }

        // ─── RULE 7: FAREWELL ───
        if (cleanInput === "bye" || cleanInput === "goodbye" || cleanInput === "see you") {
            return "Goodbye 👋 Have a great day!";
        }

        // ─── RULE 8: FALLBACK (UNKNOWN INPUT) ───
        const fallbacks = [
            "Sorry 😅 I don't understand that yet.",
            "I am still learning 🤖",
            "Please ask something else 😊"
        ];
        return getRandomItem(fallbacks);
    }

    // 10. SYSTEM UTILITIES
    function getFormattedTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // Hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${minutes} ${ampm}`;
    }

    function getRandomItem(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    function scrollToBottom() {
        messagesLog.scrollTop = messagesLog.scrollHeight;
    }

    function focusInput() {
        chatInput.focus();
    }

    // Suggestion chip clicking utility
    function setupSuggestions() {
        const cards = document.querySelectorAll(".suggestion-card");
        cards.forEach(card => {
            card.addEventListener("click", () => {
                const query = card.getAttribute("data-query");
                chatInput.value = query;
                // Programmatically trigger submission
                chatForm.dispatchEvent(new Event("submit"));
            });
        });
    }

    // 11. SIDEBAR ACTIONS implementation
    function handleNewChat() {
        // Reset current views
        messagesLog.innerHTML = "";
        
        // Restore Welcome Landing UI
        messagesLog.appendChild(welcomeContainer);
        welcomeContainer.style.display = "block";
        
        // Empty state & Save
        chatHistory = [];
        saveChatHistory();
        
        // Re-align click triggers
        setupSuggestions();
        
        // Reset sidebar on mobile
        sidebar.classList.remove("open");
        
        focusInput();
    }

    function handleClearChat() {
        if (confirm("Are you sure you want to clear this entire session and history?")) {
            handleNewChat();
        }
    }
});
