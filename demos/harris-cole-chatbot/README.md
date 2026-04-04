# Harris & Cole Law — AI Chatbot Demo

A professional AI-powered receptionist chatbot for a fictional law firm, powered by Claude.

## Quick Start

1. **Start the proxy server** (required — Claude API doesn't support direct browser calls):

```bash
node server.js
```

2. **Open `index.html`** in your browser (just double-click it or use a local server).

3. **Enter your Anthropic API key** when prompted. The key is stored in `sessionStorage` only — it's cleared when you close the tab.

4. **Start chatting!** Try the quick-reply buttons or type your own questions.

## What It Does

- Greets visitors professionally as a law firm receptionist
- Answers questions about practice areas, fees, scheduling, location, and hours
- Refuses to give legal advice — always adds a disclaimer for legal questions
- Encourages booking a free consultation

## Files

| File | Purpose |
|------|---------|
| `index.html` | Complete chatbot UI — single file, no build step |
| `server.js` | Tiny Node.js proxy that relays requests to the Claude API |
| `README.md` | This file |

## System Prompt

Click **"View System Prompt"** in the chat UI to see the full prompt that configures Claude's behavior. This is useful for demonstrating to clients how AI chatbots are configured and controlled.

## Customization

To adapt this for a different firm:

1. Update the firm details in the `SYSTEM_PROMPT` constant in `index.html`
2. Change the color scheme in the `:root` CSS variables
3. Update the logo initials in the header HTML
4. Modify the quick-reply buttons

## Requirements

- Node.js (any recent version) for the proxy server
- An [Anthropic API key](https://console.anthropic.com/)
- A modern browser
