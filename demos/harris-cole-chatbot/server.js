/**
 * Lightweight proxy server for the Harris & Cole Law chatbot demo.
 *
 * Why a proxy?
 *   The Anthropic API doesn't allow direct browser calls (no CORS headers).
 *   This tiny Node.js server relays requests so the HTML file can talk to Claude.
 *
 * Usage:
 *   node server.js
 *
 * The server runs on http://localhost:3001
 * No dependencies required — uses only Node.js built-in modules.
 */

const http = require('http');
const https = require('https');

const PORT = 3001;
const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const { apiKey, system, messages } = JSON.parse(body);

        if (!apiKey) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'API key is required' }));
        }

        const payload = JSON.stringify({
          model: MODEL,
          max_tokens: 1024,
          system,
          messages,
        });

        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
        };

        const apiReq = https.request(ANTHROPIC_API, options, (apiRes) => {
          let data = '';
          apiRes.on('data', (chunk) => (data += chunk));
          apiRes.on('end', () => {
            res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
            res.end(data);
          });
        });

        apiReq.on('error', (err) => {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        });

        apiReq.write(payload);
        apiReq.end();
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request body' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`\n  Harris & Cole Law — Chatbot Proxy Server`);
  console.log(`  ─────────────────────────────────────────`);
  console.log(`  Running on http://localhost:${PORT}`);
  console.log(`  Model: ${MODEL}`);
  console.log(`\n  Open index.html in your browser to start.\n`);
});
