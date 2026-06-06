require('dotenv').config();
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const OpenAI = require('openai');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

// Keep-alive: ping every 30s, terminate if no pong
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);
server.on('close', () => clearInterval(interval));

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com'
});

app.use(express.static('public', {
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.set('Pragma', 'no-cache');
  }
}));
app.use(express.json());

// ============ Scenarios ============
const SCENARIOS = [
  {
    id: 'restaurant',
    name: '餐厅点餐',
    nameEn: 'Ordering at a Restaurant',
    icon: '🍽️',
    description: '在餐厅用英语点餐、询问菜品、结账',
    role: 'restaurant server',
    context: 'You are a friendly restaurant server at an American diner. The customer wants to order food. Help them with the menu, take their order, answer questions about dishes, handle payment. Keep responses natural, short (1-3 sentences), and conversational.',
    opening: "Hi there! Welcome to our diner. Here's your menu. What can I get for you today?"
  },
  {
    id: 'interview',
    name: '求职面试',
    nameEn: 'Job Interview',
    icon: '💼',
    description: '模拟英语求职面试，回答面试官问题',
    role: 'job interviewer',
    context: 'You are a professional HR interviewer at a tech company conducting a job interview in English. Ask common interview questions about experience, skills, strengths/weaknesses, career goals. Be professional but encouraging. Keep each response to 1-3 sentences. After the candidate answers, naturally transition to the next question.',
    opening: "Welcome! Thank you for coming in today. Let's start with a simple one — could you tell me a bit about yourself?"
  },
  {
    id: 'meeting',
    name: '商务会议',
    nameEn: 'Business Meeting',
    icon: '📊',
    description: '参与英语商务会议，讨论项目进展和方案',
    role: 'meeting colleague',
    context: 'You are a colleague in a business meeting at an international company. Discuss project updates, brainstorm ideas, and make decisions. Use natural business English with some professional vocabulary. Keep responses 1-3 sentences. Encourage the other person to share their opinions.',
    opening: "Thanks for joining the meeting. As you know, we're here to discuss the Q3 project timeline. What's your take on the current progress?"
  },
  {
    id: 'hotel',
    name: '酒店入住',
    nameEn: 'Checking into a Hotel',
    icon: '🏨',
    description: '在酒店办理入住、询问设施、解决问题',
    role: 'hotel front desk staff',
    context: 'You work at the front desk of an international hotel. Help the guest check in, answer questions about facilities (pool, gym, breakfast), handle room requests, and solve any issues. Be polite and professional. Keep responses 1-3 sentences.',
    opening: "Good afternoon! Welcome to Grand International Hotel. Do you have a reservation with us today?"
  },
  {
    id: 'airport',
    name: '机场出行',
    nameEn: 'At the Airport',
    icon: '✈️',
    description: '机场值机、安检、登机、问路等场景',
    role: 'airport staff',
    context: 'You work at an international airport. Help the traveler with check-in, baggage, security procedures, finding gates, flight information. Be helpful and clear. Keep responses 1-3 sentences.',
    opening: "Next in line, please! Where are you flying to today?"
  },
  {
    id: 'doctor',
    name: '看病就医',
    nameEn: 'Seeing a Doctor',
    icon: '🏥',
    description: '在医院描述症状、理解医嘱、拿药',
    role: 'doctor',
    context: 'You are a doctor at a clinic in an English-speaking country. Ask about symptoms, give diagnoses, and provide medical advice. Use clear, simple medical English. Be professional and caring. Keep responses 1-3 sentences.',
    opening: "Hello, I'm Dr. Smith. What seems to be the problem today?"
  },
  {
    id: 'shopping',
    name: '购物逛街',
    nameEn: 'Shopping',
    icon: '🛍️',
    description: '在商场购物、试衣、讲价、退货',
    role: 'store assistant',
    context: 'You are a helpful sales assistant at a department store. Help the customer find items, suggest sizes/colors, handle price inquiries, and process returns. Be friendly and customer-service oriented. Keep responses 1-3 sentences.',
    opening: "Hi there! Welcome to our store. Is there anything specific you're looking for today?"
  },
  {
    id: 'smalltalk',
    name: '日常闲聊',
    nameEn: 'Small Talk & Socializing',
    icon: '💬',
    description: '与外国人进行日常英语寒暄和交流',
    role: 'friendly acquaintance',
    context: 'You are a friendly English-speaking acquaintance at a social event. Make casual small talk about hobbies, travel, food, movies, weather. Be warm and engaging. Keep responses 1-3 sentences. Ask follow-up questions to keep the conversation going.',
    opening: "Hey! Great to see you here. How have you been lately? Do anything fun this weekend?"
  },
  {
    id: 'roast',
    name: '日常怼怼',
    nameEn: 'Roast & Banter',
    icon: '🔥',
    description: '朋友间互相调侃斗嘴，练习地道俚语',
    role: 'close friend who loves roasting',
    context: 'You are a witty, sarcastic close friend who loves playful banter and roasting. Use casual slang, teasing humor, and friendly jabs — but always warm underneath. Keep it funny, never mean. Use expressions like "no way!", "you\'re kidding", "bro/sis", "that\'s cap". Keep responses 1-3 sentences.',
    opening: "Oh look who finally decided to show up! What's up, you been ghosting me or what? 😏"
  }
];

// ============ API Routes ============
app.get('/api/scenarios', (req, res) => {
  res.json(SCENARIOS.map(s => ({
    id: s.id, name: s.name, nameEn: s.nameEn, icon: s.icon, description: s.description
  })));
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasApiKey: !!process.env.DEEPSEEK_API_KEY });
});

app.post('/api/translate', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text' });
  try {
    const resp = await openai.chat.completions.create({
      model: 'deepseek-chat',
      max_tokens: 300,
      temperature: 0,
      messages: [
        { role: 'system', content: 'Translate the following English text to natural, colloquial Chinese. Only return the translation, no extra text.' },
        { role: 'user', content: text }
      ]
    });
    res.json({ translation: resp.choices[0].message.content.trim() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// File-based persistence
const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, 'data.json');

function readData() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch(e) { return { sessions: [], checkins: {}, favorites: [] }; }
}
function writeData(d) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2), 'utf8');
}

app.post('/api/checkin', (req, res) => {
  const data = readData();
  const today = new Date().toISOString().slice(0, 10);
  if (!data.checkins[today]) {
    data.checkins[today] = true;
    writeData(data);
  }
  const dates = Object.keys(data.checkins).sort();
  let streak = 0;
  for (let i = dates.length - 1; i >= 0; i--) {
    const expected = new Date(Date.now() - (dates.length - 1 - i) * 86400000).toISOString().slice(0, 10);
    if (dates[i] === expected || i === dates.length - 1) streak++;
    else break;
  }
  // Recalculate streak properly
  streak = 1;
  for (let i = dates.length - 2; i >= 0; i--) {
    const d1 = new Date(dates[i+1]);
    const d0 = new Date(dates[i]);
    if ((d1 - d0) / 86400000 <= 1) streak++;
    else break;
  }
  res.json({ streak, total: dates.length, today: true });
});

app.get('/api/checkin', (req, res) => {
  const data = readData();
  const dates = Object.keys(data.checkins).sort();
  const today = new Date().toISOString().slice(0, 10);
  let streak = 0;
  for (let i = dates.length - 1; i >= 0; i--) {
    if (i === dates.length - 1) { streak = 1; continue; }
    const d1 = new Date(dates[i+1]);
    const d0 = new Date(dates[i]);
    if ((d1 - d0) / 86400000 <= 1) streak++;
    else break;
  }
  if (dates.length === 0) streak = 0;
  res.json({ streak, total: dates.length, today: !!data.checkins[today] });
});

app.get('/api/stats', (req, res) => {
  const data = readData();
  const sessions = data.sessions.slice(-50);
  res.json({
    totalSessions: sessions.length,
    averageScore: sessions.length ? (sessions.reduce((a,b) => a + b.score, 0) / sessions.length).toFixed(1) : 0,
    sessions: sessions.map(s => ({ date: s.date, score: s.score, scenario: s.scenario })),
    totalFavorites: data.favorites.length,
    checkinTotal: Object.keys(data.checkins).length
  });
});

app.post('/api/session', (req, res) => {
  const data = readData();
  data.sessions.push({
    date: new Date().toISOString().slice(0, 10),
    score: req.body.score,
    scenario: req.body.scenario,
    turns: req.body.turns
  });
  if (data.sessions.length > 200) data.sessions = data.sessions.slice(-200);
  writeData(data);
  res.json({ ok: true });
});

app.get('/api/favorites', (req, res) => {
  res.json(readData().favorites || []);
});

app.post('/api/favorites', (req, res) => {
  const data = readData();
  const item = { id: Date.now(), text: req.body.text, scenario: req.body.scenario, date: new Date().toISOString().slice(0, 10) };
  data.favorites.push(item);
  writeData(data);
  res.json(item);
});

app.delete('/api/favorites/:id', (req, res) => {
  const data = readData();
  data.favorites = data.favorites.filter(f => f.id !== +req.params.id);
  writeData(data);
  res.json({ ok: true });
});

// ============ WebSocket ============
function safeSend(ws, data) {
  if (ws.readyState === 1) {
    ws.send(JSON.stringify(data));
    return true;
  }
  return false;
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  let conversationHistory = [];
  let currentScenario = null;
  let currentAccent = 'American English';
  let messageCount = 0;

  ws.on('message', async (data) => {
    try {
      const msg = JSON.parse(data.toString());

      switch (msg.type) {

        case 'start_scenario': {
          currentScenario = SCENARIOS.find(s => s.id === msg.scenarioId);
          if (!currentScenario) {
            safeSend(ws, { type: 'error', message: 'Scenario not found' });
            return;
          }
          conversationHistory = [];
          messageCount = 0;
          safeSend(ws, {
            type: 'scenario_started',
            scenario: { id: currentScenario.id, name: currentScenario.name, nameEn: currentScenario.nameEn, icon: currentScenario.icon },
            opening: currentScenario.opening
          });
          break;
        }

        case 'user_message': {
          if (!currentScenario) {
            safeSend(ws, { type: 'error', message: 'Please select a scenario first' });
            return;
          }
          messageCount++;
          if (msg.accent) currentAccent = msg.accent;
          const ipaMode = !!msg.ipa;

          const userMsg = { role: 'user', content: msg.text };
          conversationHistory.push(userMsg);
          const recentHistory = conversationHistory.slice(-8);
          const apiMessages = recentHistory.map(m => ({ role: m.role, content: m.content }));

          // Stream conversational reply
          try {
            const stream = await openai.chat.completions.create({
              model: 'deepseek-chat',
              max_tokens: 120,
              temperature: 0,
              stream: true,
              messages: [
                { role: 'system', content: `${currentScenario.context}\nYou are a ${currentScenario.role}. Speak ${currentAccent}. Reply 1-2 short sentences. Be warm. If user's English has an error, subtly use the correct form in your reply.${ipaMode ? '\n\nCRITICAL: End every reply with exactly one line formatted as [IPA: /.../] containing the IPA phonetic transcription of your entire reply. Example: [IPA: /aɪd ˈlaɪk ə ˈkɑfi ˈpliːz/]' : ''}` },
                ...apiMessages
              ]
            });

            let fullReply = '';
            for await (const chunk of stream) {
              const content = chunk.choices[0]?.delta?.content;
              if (content) {
                fullReply += content;
                safeSend(ws, { type: 'reply_chunk', text: content });
              }
            }
            // Extract IPA if present
            let ipa = null;
            const cleanedReply = fullReply.replace(/\[IPA:.*?\]\s*/gi, '').trim();
            if (ipaMode || cleanedReply !== fullReply) {
              const ipaMatch = fullReply.match(/\[IPA:\s*\/?(.+?)\/?\s*\]/i);
              if (ipaMatch) { ipa = ipaMatch[1].trim(); }
            }
            fullReply = cleanedReply;
            conversationHistory.push({ role: 'assistant', content: fullReply });
            safeSend(ws, { type: 'reply_done', turn: messageCount, ipa: ipa || undefined });
          } catch (apiErr) {
            const errMsg = apiErr.message || String(apiErr);
            console.error('DeepSeek API error:', errMsg);
            safeSend(ws, { type: 'error', message: 'API调用失败: ' + errMsg });
          }
          break;
        }

        case 'ping':
          break;

        case 'request_summary': {
          if (!currentScenario || messageCount === 0) {
            safeSend(ws, { type: 'error', message: 'No conversation to summarize' });
            return;
          }

          const convText = conversationHistory.map(m => m.role + ': ' + m.content).join('\n');
          const summaryPrompt = `Review this English speaking practice session and provide feedback.
Scenario: ${currentScenario.nameEn}
Turns: ${messageCount}

Conversation:
${convText}

Return a JSON object:
{
  "overallScore": number 1-10,
  "scores": { "fluency": number 1-10, "grammar": number 1-10, "vocabulary": number 1-10, "pronunciation": number 1-10, "communication": number 1-10 },
  "strengths": ["strength1", "strength2", "strength3"],
  "areasToImprove": ["area1", "area2", "area3"],
  "keyCorrections": [{"error": "what user said", "fix": "better way", "tip": "Chinese tip"}],
  "summaryText": "3-4 sentence Chinese summary of the session performance",
  "practiceTips": ["tip1", "tip2"],
  "vocabularySuggestions": [{"word": "useful word/phrase", "meaning": "Chinese meaning", "example": "example sentence"}]
}

Be encouraging and constructive. Focus on actionable feedback.`;

          try {
            const summaryResp = await openai.chat.completions.create({
              model: 'deepseek-chat',
              max_tokens: 1500,
              temperature: 0,
              messages: [
                { role: 'system', content: 'You are an expert English teacher providing detailed, encouraging feedback to Chinese learners. Always respond with valid JSON.' },
                { role: 'user', content: summaryPrompt }
              ]
            });
            const raw = summaryResp.choices[0].message.content;
            const jsonMatch = raw.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const summary = JSON.parse(jsonMatch[0]);
              safeSend(ws, { type: 'session_summary', summary });
            }
          } catch (e) {
            console.error('Summary generation failed:', e.message);
            safeSend(ws, { type: 'error', message: 'Failed to generate summary' });
          }
          break;
        }
      }
    } catch (e) {
      console.error('WebSocket message error:', e.message);
      safeSend(ws, { type: 'error', message: e.message });
    }
  });

  ws.on('close', (code, reason) => console.log('Client disconnected: code=' + code + ' reason=' + (reason ? reason.toString() : '(none)')));
  ws.on('error', (err) => console.error('WebSocket error:', err.message));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log('English Speaking Practice server running at http://localhost:' + PORT);
  if (!process.env.DEEPSEEK_API_KEY) {
    console.log('WARNING: DEEPSEEK_API_KEY not set. Edit .env file to add your API key.');
  } else {
    try {
      await openai.chat.completions.create({
        model: 'deepseek-chat',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'OK' }]
      });
      console.log('DeepSeek API key verified successfully.');
    } catch (e) {
      console.error('API KEY INVALID or network error:', e.message);
      console.error('Please check your DEEPSEEK_API_KEY in .env and network connectivity.');
    }
  }
});
