// ============ DOM Elements ============
const $ = (id) => document.getElementById(id);
const scenarioSection = $('scenario-section');
const scenarioGrid = $('scenario-grid');
const chatSection = $('chat-section');
const chatMessages = $('chat-messages');
const activeScenarioInfo = $('active-scenario-info');
const recordBtn = $('record-btn');
const recordLabel = recordBtn.querySelector('.record-label');
const recordingStatus = $('recording-status');
const textInput = $('text-input');
const sendBtn = $('send-btn');
const backBtn = $('back-btn');
const endSessionBtn = $('end-session-btn');
const summarySection = $('summary-section');
const summaryContent = $('summary-content');
const newSessionBtn = $('new-session-btn');
const customModal = $('custom-modal');
const customForm = $('custom-form');
const modalCloseBtn = $('modal-close-btn');
const modalCancelBtn = $('modal-cancel-btn');

// ============ 8 SVG Characters ============
const charBox = $('char-box');

const CHARS = {
  restaurant: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
  <!-- white chef hat --><ellipse cx="60" cy="22" rx="28" ry="8" fill="#F5F0E8" stroke="#E0D8C8" stroke-width="1.5"/><rect x="40" y="12" width="40" height="14" rx="6" fill="#F5F0E8" stroke="#E0D8C8" stroke-width="1.5"/>
  <!-- head --><circle cx="60" cy="42" r="22" fill="#F5E1D3" stroke="#E0C8B0" stroke-width="2"/>
  <!-- hair --><path d="M38 42 Q38 20 60 18 Q82 20 82 42" fill="#E8DFD0" stroke="none"/>
  <!-- eyes --><circle cx="52" cy="40" r="2.5" fill="#5C4438"/><circle cx="68" cy="40" r="2.5" fill="#5C4438"/>
  <!-- smile --><path d="M53 48 Q60 54 67 48" fill="none" stroke="#D4888A" stroke-width="2" stroke-linecap="round"/>
  <!-- blush --><circle cx="44" cy="46" r="4" fill="rgba(232,180,168,.4)"/><circle cx="76" cy="46" r="4" fill="rgba(232,180,168,.4)"/>
  <!-- body apron --><path d="M36 64 L36 100 Q36 110 60 112 Q84 110 84 100 L84 64 Z" fill="#F5F0E8" stroke="#E0D8C8" stroke-width="1.5"/>
  <!-- red kerchief --><path d="M44 64 L60 74 L76 64" fill="#D44A3B" stroke="none"/>
  <!-- arm left --><path d="M36 68 Q22 72 20 88" fill="none" stroke="#F5E1D3" stroke-width="10" stroke-linecap="round"/><circle cx="20" cy="90" r="6" fill="#F5E1D3"/>
  <!-- arm right holding menu --><path d="M84 68 Q98 72 96 84" fill="none" stroke="#F5E1D3" stroke-width="10" stroke-linecap="round"/><rect x="88" y="76" width="24" height="30" rx="2" fill="#FBF7F2" stroke="#E0D8C8" stroke-width="1"/><line x1="94" y1="82" x2="106" y2="82" stroke="#CCC" stroke-width="1"/><line x1="94" y1="88" x2="104" y2="88" stroke="#CCC" stroke-width="1"/><line x1="94" y1="94" x2="108" y2="94" stroke="#CCC" stroke-width="1"/>
  <!-- feet --><ellipse cx="46" cy="130" rx="14" ry="5" fill="#5C4438"/><ellipse cx="74" cy="130" rx="14" ry="5" fill="#5C4438"/>
</svg>`,

  interview: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
  <!-- hair back --><path d="M35 42 Q35 16 60 16 Q85 16 85 42" fill="#5C4A42"/>
  <!-- head --><circle cx="60" cy="42" r="22" fill="#F5E1D3" stroke="#E0C8B0" stroke-width="2"/>
  <!-- bangs --><path d="M40 38 Q60 20 80 38" fill="#5C4A42"/>
  <!-- eyes --><circle cx="52" cy="40" r="3" fill="#5C4438"/><circle cx="68" cy="40" r="3" fill="#5C4438"/><circle cx="53" cy="39" r="1" fill="#fff"/><circle cx="69" cy="39" r="1" fill="#fff"/>
  <!-- eyebrows --><path d="M47 35 L54 34" stroke="#7A5C4F" stroke-width="1.5" stroke-linecap="round"/><path d="M66 34 L73 35" stroke="#7A5C4F" stroke-width="1.5" stroke-linecap="round"/>
  <!-- smile professional --><path d="M54 50 Q60 55 66 50" fill="none" stroke="#D4888A" stroke-width="1.8" stroke-linecap="round"/>
  <!-- body suit --><path d="M36 64 L36 102 Q36 112 60 114 Q84 112 84 102 L84 64 Z" fill="#3D5066"/>
  <!-- collar --><path d="M48 64 L60 76 L72 64" fill="none" stroke="#4A6180" stroke-width="3"/>
  <!-- clipboard --><rect x="80" y="72" width="22" height="30" rx="2" fill="#FBF7F2" stroke="#C0B8A8" stroke-width="1"/><rect x="86" y="76" width="10" height="2" rx="1" fill="#CCC"/><rect x="86" y="82" width="10" height="2" rx="1" fill="#CCC"/><rect x="86" y="88" width="8" height="2" rx="1" fill="#CCC"/><rect x="86" y="94" width="10" height="2" rx="1" fill="#CCC"/>
  <!-- arm left --><path d="M36 68 Q22 72 18 88" fill="none" stroke="#3D5066" stroke-width="10" stroke-linecap="round"/><circle cx="18" cy="90" r="6" fill="#F5E1D3"/>
  <!-- arm right holding clipboard --><path d="M84 68 Q92 70 90 82" fill="none" stroke="#3D5066" stroke-width="10" stroke-linecap="round"/>
  <!-- feet --><ellipse cx="46" cy="130" rx="14" ry="5" fill="#3B3B3B"/><ellipse cx="74" cy="130" rx="14" ry="5" fill="#3B3B3B"/>
</svg>`,

  meeting: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
  <!-- hair --><path d="M37 42 Q37 22 60 20 Q83 22 83 42" fill="#6B6058"/><path d="M40 36 Q60 28 80 36" fill="#6B6058"/>
  <!-- head --><circle cx="60" cy="42" r="21" fill="#F5E1D3" stroke="#E0C8B0" stroke-width="2"/>
  <!-- eyes --><circle cx="53" cy="40" r="2.5" fill="#5C4438"/><circle cx="67" cy="40" r="2.5" fill="#5C4438"/>
  <!-- smile --><path d="M54 48 Q60 53 66 48" fill="none" stroke="#D4888A" stroke-width="1.8" stroke-linecap="round"/>
  <!-- body shirt --><path d="M38 63 L38 100 Q38 110 60 112 Q82 110 82 100 L82 63 Z" fill="#5A6B7C"/>
  <!-- tie --><path d="M58 64 L62 64 L66 88 L60 92 L54 88 Z" fill="#6B7D90"/>
  <!-- arm left gesturing --><path d="M38 68 Q24 60 20 76" fill="none" stroke="#5A6B7C" stroke-width="9" stroke-linecap="round"/><circle cx="20" cy="78" r="5" fill="#F5E1D3"/>
  <!-- arm right pointing at chart --><path d="M82 68 Q90 54 100 56" fill="none" stroke="#5A6B7C" stroke-width="9" stroke-linecap="round"/><circle cx="100" cy="56" r="5" fill="#F5E1D3"/>
  <!-- chart prop --><rect x="94" y="50" width="28" height="24" rx="2" fill="#FBF7F2" stroke="#C0B8A8" stroke-width="1"/><rect x="100" y="60" width="6" height="10" rx="1" fill="#5A6B7C"/><rect x="108" y="56" width="6" height="14" rx="1" fill="#5A6B7C"/><rect x="100" y="66" width="6" height="4" rx="1" fill="#2D5A4E"/><rect x="108" y="62" width="6" height="8" rx="1" fill="#3D5066"/>
  <!-- feet --><ellipse cx="46" cy="130" rx="13" ry="5" fill="#3B3B3B"/><ellipse cx="74" cy="130" rx="13" ry="5" fill="#3B3B3B"/>
</svg>`,

  hotel: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
  <!-- hair --><path d="M34 42 Q34 18 60 16 Q86 18 86 42" fill="#5C4033"/><path d="M38 36 Q60 24 82 36" fill="#5C4033"/>
  <!-- head --><circle cx="60" cy="42" r="21" fill="#F5E1D3" stroke="#E0C8B0" stroke-width="2"/>
  <!-- eyes --><circle cx="53" cy="40" r="2.5" fill="#5C4438"/><circle cx="67" cy="40" r="2.5" fill="#5C4438"/>
  <!-- smile bright --><path d="M52 48 Q60 56 68 48" fill="none" stroke="#D4888A" stroke-width="2" stroke-linecap="round"/>
  <!-- body uniform --><path d="M38 63 L38 100 Q38 110 60 112 Q82 110 82 100 L82 63 Z" fill="#7A3E3E"/>
  <!-- gold badge --><rect x="54" y="70" width="12" height="6" rx="2" fill="#D4AF37"/>
  <!-- arm left --><path d="M38 68 Q24 76 22 92" fill="none" stroke="#7A3E3E" stroke-width="9" stroke-linecap="round"/><circle cx="22" cy="94" r="5" fill="#F5E1D3"/>
  <!-- arm right offering key --><path d="M82 68 Q96 72 98 78" fill="none" stroke="#7A3E3E" stroke-width="9" stroke-linecap="round"/><circle cx="90" cy="62" r="5" fill="none" stroke="#D4AF37" stroke-width="2"/><circle cx="90" cy="62" r="1.5" fill="#D4AF37"/><rect x="88" y="64" width="4" height="10" rx="1" fill="#D4AF37"/>
  <!-- feet --><ellipse cx="46" cy="130" rx="13" ry="5" fill="#3B3B3B"/><ellipse cx="74" cy="130" rx="13" ry="5" fill="#3B3B3B"/>
</svg>`,

  airport: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
  <!-- hair --><path d="M36 42 Q36 20 60 18 Q84 20 84 42" fill="#3A3A52"/><path d="M42 36 Q60 28 78 36" fill="#3A3A52"/>
  <!-- head --><circle cx="60" cy="42" r="21" fill="#F5E1D3" stroke="#E0C8B0" stroke-width="2"/>
  <!-- eyes --><circle cx="53" cy="41" r="2.5" fill="#5C4438"/><circle cx="67" cy="41" r="2.5" fill="#5C4438"/>
  <!-- smile --><path d="M54 49 Q60 54 66 49" fill="none" stroke="#D4888A" stroke-width="1.8" stroke-linecap="round"/>
  <!-- body uniform --><path d="M38 63 L38 100 Q38 110 60 112 Q82 110 82 100 L82 63 Z" fill="#2C4C6A"/>
  <!-- gold epaulettes --><rect x="36" y="64" width="8" height="3" rx="1" fill="#D4AF37"/><rect x="76" y="64" width="8" height="3" rx="1" fill="#D4AF37"/>
  <!-- wing badge on chest --><path d="M54 74 L60 70 L66 74" fill="none" stroke="#D4AF37" stroke-width="2"/><circle cx="60" cy="72" r="1.5" fill="#D4AF37"/>
  <!-- arm left pointing --><path d="M38 68 Q20 60 18 50" fill="none" stroke="#2C4C6A" stroke-width="9" stroke-linecap="round"/><circle cx="18" cy="48" r="5" fill="#F5E1D3"/>
  <!-- arm right --><path d="M82 68 Q98 72 100 86" fill="none" stroke="#2C4C6A" stroke-width="9" stroke-linecap="round"/><circle cx="100" cy="88" r="5" fill="#F5E1D3"/>
  <!-- airplane prop --><path d="M12 44 L28 44 L24 36 L20 36 Z" fill="#F5F0E8" stroke="#C0B8A8" stroke-width="1"/><polygon points="12,44 20,44 26,52 32,52" fill="#2C4C6A"/>
  <!-- feet --><ellipse cx="46" cy="130" rx="13" ry="5" fill="#3B3B3B"/><ellipse cx="74" cy="130" rx="13" ry="5" fill="#3B3B3B"/>
</svg>`,

  doctor: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
  <!-- hair short --><path d="M39 42 Q39 24 60 22 Q81 24 81 42" fill="#5A5A5A"/>
  <!-- head --><circle cx="60" cy="42" r="21" fill="#F5E1D3" stroke="#E0C8B0" stroke-width="2"/>
  <!-- eyes warm --><circle cx="53" cy="40" r="2.8" fill="#4A6B5E"/><circle cx="67" cy="40" r="2.8" fill="#4A6B5E"/><circle cx="54" cy="39" r="1" fill="#fff"/><circle cx="68" cy="39" r="1" fill="#fff"/>
  <!-- smile gentle --><path d="M55 50 Q60 53 65 50" fill="none" stroke="#D4888A" stroke-width="1.5" stroke-linecap="round"/>
  <!-- body white coat --><path d="M36 63 L36 102 Q36 112 60 114 Q84 112 84 102 L84 63 Z" fill="#E8F4F8" stroke="#C0D8E0" stroke-width="1.5"/>
  <!-- coat V-neck --><path d="M46 64 L60 78 L74 64" fill="none" stroke="#C0D8E0" stroke-width="2"/>
  <!-- stethoscope --><circle cx="64" cy="94" r="5" fill="none" stroke="#777" stroke-width="1.5"/><path d="M64 94 Q64 86 60 82 L56 78" fill="none" stroke="#777" stroke-width="1.5"/><circle cx="56" cy="78" r="3" fill="none" stroke="#777" stroke-width="1.5"/>
  <!-- arm left --><path d="M36 68 Q22 76 20 94" fill="none" stroke="#E8F4F8" stroke-width="10" stroke-linecap="round"/><circle cx="20" cy="96" r="6" fill="#F5E1D3"/>
  <!-- arm right checking pulse --><path d="M84 68 Q96 72 102 80" fill="none" stroke="#E8F4F8" stroke-width="10" stroke-linecap="round"/><circle cx="102" cy="82" r="5.5" fill="#F5E1D3"/>
  <!-- feet --><ellipse cx="46" cy="130" rx="13" ry="5" fill="#5A5A5A"/><ellipse cx="74" cy="130" rx="13" ry="5" fill="#5A5A5A"/>
</svg>`,

  shopping: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
  <!-- hair long red --><path d="M34 42 Q34 18 60 16 Q86 18 86 42" fill="#8B5050"/><path d="M36 46 Q30 70 28 78" fill="#8B5050"/><path d="M84 46 Q90 70 92 78" fill="#8B5050"/>
  <!-- head --><circle cx="60" cy="42" r="21" fill="#F5E1D3" stroke="#E0C8B0" stroke-width="2"/>
  <!-- bangs --><path d="M40 38 Q60 26 80 38" fill="#8B5050"/>
  <!-- eyes bright --><circle cx="53" cy="40" r="3" fill="#4A6B5E"/><circle cx="67" cy="40" r="3" fill="#4A6B5E"/><circle cx="54" cy="38" r="1.2" fill="#fff"/><circle cx="68" cy="38" r="1.2" fill="#fff"/>
  <!-- smile big --><path d="M52 48 Q60 56 68 48" fill="#FF817E" stroke="#D4888A" stroke-width="1.5" stroke-linecap="round"/>
  <!-- body apron green --><path d="M38 63 L38 100 Q38 110 60 112 Q82 110 82 100 L82 63 Z" fill="#6B9B7A"/>
  <!-- name badge --><rect x="52" y="72" width="16" height="7" rx="2" fill="#F5F0E8"/>
  <!-- arm left --><path d="M38 68 Q22 70 18 88" fill="none" stroke="#6B9B7A" stroke-width="9" stroke-linecap="round"/><circle cx="18" cy="90" r="5" fill="#F5E1D3"/>
  <!-- arm right holding bag --><path d="M82 68 Q98 74 96 82" fill="none" stroke="#6B9B7A" stroke-width="9" stroke-linecap="round"/>
  <!-- shopping bag --><path d="M100 76 L114 76 L114 102 Q114 106 107 106 L107 106 Q100 106 100 102 Z" fill="#FBF7F2" stroke="#C0B8A8" stroke-width="1"/><path d="M103 76 Q105 68 107 74 Q109 68 111 76" fill="none" stroke="#C0B8A8" stroke-width="1"/>
  <!-- feet --><ellipse cx="46" cy="130" rx="13" ry="5" fill="#5C4033"/><ellipse cx="74" cy="130" rx="13" ry="5" fill="#5C4033"/>
</svg>`,

  smalltalk: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
  <!-- hair fluffy --><path d="M33 42 Q33 14 60 12 Q87 14 87 42" fill="#6B4E3D"/><path d="M36 48 Q30 72 28 80" fill="#6B4E3D"/><path d="M84 48 Q90 72 92 80" fill="#6B4E3D"/>
  <!-- head --><circle cx="60" cy="42" r="22" fill="#F5E1D3" stroke="#E0C8B0" stroke-width="2"/>
  <!-- bangs --><path d="M38 38 Q60 20 82 38" fill="#7A5C4D"/>
  <!-- eyes big --><circle cx="51" cy="40" r="3.5" fill="#fff" stroke="#5C4438" stroke-width="2"/><circle cx="69" cy="40" r="3.5" fill="#fff" stroke="#5C4438" stroke-width="2"/><circle cx="52" cy="39" r="2" fill="#4A6B5E"/><circle cx="70" cy="39" r="2" fill="#4A6B5E"/><circle cx="53" cy="37.5" r="1" fill="#fff"/><circle cx="71" cy="37.5" r="1" fill="#fff"/>
  <!-- smile warm --><path d="M51 50 Q60 58 69 50" fill="#FF817E" stroke="#D4888A" stroke-width="1.5" stroke-linecap="round"/>
  <!-- blush --><circle cx="42" cy="46" r="4" fill="rgba(232,180,168,.5)"/><circle cx="78" cy="46" r="4" fill="rgba(232,180,168,.5)"/>
  <!-- body hoodie --><path d="M36 64 L36 102 Q36 112 60 114 Q84 112 84 102 L84 64 Z" fill="#D4956B"/>
  <!-- hood --><path d="M36 64 Q60 52 84 64" fill="#C68058"/>
  <!-- drawstring --><circle cx="56" cy="66" r="1.5" fill="#F5F0E8"/><circle cx="64" cy="66" r="1.5" fill="#F5F0E8"/><path d="M56 66 Q58 72 60 74" fill="none" stroke="#F5F0E8" stroke-width="1"/><path d="M64 66 Q62 72 60 74" fill="none" stroke="#F5F0E8" stroke-width="1"/>
  <!-- arm left holding coffee --><path d="M36 70 Q24 78 18 86" fill="none" stroke="#D4956B" stroke-width="9" stroke-linecap="round"/><circle cx="16" cy="90" r="6" fill="#F5E1D3"/>
  <!-- coffee cup --><rect x="10" y="76" width="16" height="12" rx="3" fill="#FFF" stroke="#C0B8A8" stroke-width="1"/><path d="M26 80 Q30 80 30 84 Q30 88 26 88" fill="none" stroke="#C0B8A8" stroke-width="1"/><path d="M14 72 Q10 66 8 70" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
  <!-- arm right waving --><path d="M84 68 Q98 58 102 48" fill="none" stroke="#D4956B" stroke-width="9" stroke-linecap="round"/><circle cx="102" cy="46" r="5.5" fill="#F5E1D3"/>
  <!-- feet --><ellipse cx="46" cy="130" rx="13" ry="5" fill="#6B4E3D"/><ellipse cx="74" cy="130" rx="13" ry="5" fill="#6B4E3D"/>
</svg>`,

  roast: `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
  <!-- hair messy --><path d="M34 42 Q34 16 60 14 Q86 16 86 42" fill="#4A3728"/><path d="M38 46 Q28 60 26 70" fill="#4A3728"/><path d="M82 46 Q92 60 94 70" fill="#4A3728"/>
  <!-- head --><circle cx="60" cy="42" r="21" fill="#F5E1D3" stroke="#E0C8B0" stroke-width="2"/>
  <!-- bangs --><path d="M38 38 Q50 24 60 26 Q70 24 82 38" fill="#4A3728"/>
  <!-- cap backward --><path d="M38 28 Q60 20 82 28 L82 22 Q60 14 38 22 Z" fill="#E85D3A"/><rect x="78" y="20" width="10" height="8" rx="2" fill="#E85D3A"/>
  <!-- eyes --><circle cx="52" cy="40" r="3" fill="#5C4438"/><circle cx="68" cy="40" r="3" fill="#5C4438"/>
  <!-- raised eyebrow left --><path d="M46 34 L54 33" stroke="#7A5C4F" stroke-width="2" stroke-linecap="round"/>
  <!-- normal eyebrow right --><path d="M66 35 L74 36" stroke="#7A5C4F" stroke-width="2" stroke-linecap="round"/>
  <!-- smirk --><path d="M52 50 Q56 44 60 46 Q64 48 68 50" fill="none" stroke="#D4888A" stroke-width="2" stroke-linecap="round"/>
  <!-- body hoodie black --><path d="M36 63 L36 102 Q36 112 60 114 Q84 112 84 102 L84 63 Z" fill="#3B3B3B"/>
  <!-- lightning bolt on chest --><path d="M58 72 L54 80 L60 80 L56 88 L64 78 L58 78 Z" fill="#FFD700"/>
  <!-- arm left holding phone --><path d="M36 68 Q22 74 18 86" fill="none" stroke="#3B3B3B" stroke-width="9" stroke-linecap="round"/><circle cx="18" cy="88" r="5" fill="#F5E1D3"/>
  <!-- phone --><rect x="6" y="76" width="14" height="22" rx="2" fill="#F5F0E8" stroke="#C0B8A8" stroke-width="1"/><rect x="12" y="80" width="3" height="14" rx="1" fill="#2D5A4E"/>
  <!-- arm right peace sign --><path d="M84 68 Q98 62 100 50" fill="none" stroke="#3B3B3B" stroke-width="9" stroke-linecap="round"/><circle cx="100" cy="48" r="5.5" fill="#F5E1D3"/>
  <!-- feet --><ellipse cx="46" cy="130" rx="13" ry="5" fill="#4A3728"/><ellipse cx="74" cy="130" rx="13" ry="5" fill="#4A3728"/>
</svg>`
};

function setCharState(state) {
  if (!charBox) return;
  charBox.className = 'char-box ' + state;
  if (state === 'waving') {
    setTimeout(() => { if (charBox && charBox.className.includes('waving')) setCharState('idle'); }, 1600);
  }
  if (state === 'cheer') {
    setTimeout(() => { if (charBox && charBox.className.includes('cheer')) setCharState('idle'); }, 2000);
  }
}

// ============ State ============
let ws = null;
let wsGeneration = 0; // increment on reconnect to invalidate stale callbacks
let currentScenario = null;
let isRecording = false;
let recognition = null;
let streamingMsgEl = null;
let streamingText = '';
let replyTimer = null;
let scenarioInitialized = false;
let pingInterval = null;
let pendingSend = null; // queued message, sent after reconnect + scenario_started
let reconnectTimer = null;
let reconnectBackoff = 1000; // starts at 1s, exponential backoff
let reconnectActive = false; // true when auto-reconnect loop is running
let wasEverConnected = false; // true after first successful connection

// ============ Logging (visible in-page) ============
function log(area, msg) {
  console.log('[' + area + '] ' + msg);
}

// ============ Voice Data ============
const VOICE_PRESETS = {
  'en-US-female': { lang: 'en-US', gender: 'female', label: '美音·女声', accent: 'American English' },
  'en-US-male':   { lang: 'en-US', gender: 'male',   label: '美音·男声', accent: 'American English' },
  'en-GB-female': { lang: 'en-GB', gender: 'female', label: '英音·女声', accent: 'British English' },
  'en-GB-male':   { lang: 'en-GB', gender: 'male',   label: '英音·男声', accent: 'British English' }
};
let currentVoiceKey = 'en-US-female';
let speechRate = 1.0;
const RATES = [0.6, 0.75, 0.85, 1.0, 1.15, 1.3, 1.5];

const voiceSelect = $('voice-select');
if (voiceSelect) {
  voiceSelect.addEventListener('change', () => { currentVoiceKey = voiceSelect.value; });
}

const rateSlow = $('rate-slow');
const rateFast = $('rate-fast');
const rateLabel = $('rate-label');
if (rateSlow) rateSlow.addEventListener('click', () => changeRate(-1));
if (rateFast) rateFast.addEventListener('click', () => changeRate(1));

function changeRate(dir) {
  let idx = RATES.indexOf(speechRate);
  if (idx < 0) idx = RATES.findIndex(r => r > speechRate) - 1;
  if (idx < 0) idx = 3;
  idx = Math.max(0, Math.min(RATES.length - 1, idx + dir));
  speechRate = RATES[idx];
  if (rateLabel) rateLabel.textContent = speechRate.toFixed(2) + '×';
}

// IPA toggle
let ipaEnabled = false;
const ipaToggle = $('ipa-toggle');
if (ipaToggle) {
  ipaToggle.addEventListener('click', () => {
    ipaEnabled = !ipaEnabled;
    ipaToggle.classList.toggle('on', ipaEnabled);
  });
}

// ============ Web Speech API ============
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function findVoice(lang, gender) {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  // Score each voice: exact lang match + gender keyword
  const langBase = lang.slice(0, 2);
  let best = null; let bestScore = -1;
  voices.forEach(v => {
    let s = 0;
    if (v.lang === lang) s += 10;
    else if (v.lang.startsWith(langBase)) s += 5;
    const nameLower = v.name.toLowerCase();
    if (gender === 'female' && /female|woman|samantha|zira|susan|karen|moira|fiona/i.test(nameLower)) s += 8;
    if (gender === 'male' && /male|man|david|mark|tom|james|daniel|oliver|arthur/i.test(nameLower)) s += 8;
    if (nameLower.includes('google')) s += 3;
    if (nameLower.includes('natural') || nameLower.includes('premium')) s += 2;
    if (s > bestScore) { bestScore = s; best = v; }
  });
  return best || voices.find(v => v.lang.startsWith(langBase)) || null;
}

// ============ Speech Queue (server-side Edge TTS + browser fallback) ============
let currentAudio = null;
let speakResolve = null;

function fetchTTSBlob(text) {
  var ratePercent = Math.round((speechRate - 1) * 100);
  return fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text, voice: currentVoiceKey, rate: ratePercent })
  }).then(function(r) {
    if (!r.ok) throw new Error('TTS ' + r.status);
    return r.blob();
  });
}

function cacheTTS(el, text) {
  if (el._ttsUrl) return Promise.resolve(el._ttsUrl);
  if (el._ttsP) return el._ttsP;
  el._ttsP = fetchTTSBlob(text).then(function(blob) {
    el._ttsUrl = URL.createObjectURL(blob);
    delete el._ttsP;
    return el._ttsUrl;
  }).catch(function(e) {
    delete el._ttsP;
    throw e;
  });
  return el._ttsP;
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.onended = null;
    currentAudio.onerror = null;
    currentAudio.pause();
    currentAudio = null;
  }
  if (speakResolve) { var r = speakResolve; speakResolve = null; r(); }
  if (window.speechSynthesis) { window.speechSynthesis.cancel(); }
}

function speak(text, force, msgEl) {
  return new Promise(function(resolve) {
    stopAudio();
    speakResolve = resolve;

    var play = function(url) {
      var a = new Audio(url);
      currentAudio = a;
      var done = function() {
        if (currentAudio !== a) return; // stale — already replaced
        currentAudio = null;
        if (speakResolve === resolve) speakResolve = null;
        resolve();
      };
      a.onended = done;
      a.onerror = done;
      a.play().catch(done);
    };

    // Instant replay: cached on element
    if (msgEl && msgEl._ttsUrl) {
      play(msgEl._ttsUrl);
      return;
    }

    var p = msgEl
      ? cacheTTS(msgEl, text)
      : fetchTTSBlob(text).then(function(b) { return URL.createObjectURL(b); });
    p.then(play).catch(function() { fallbackSpeak(text, resolve); });
  });
}

function fallbackSpeak(text, resolve) {
  if (!window.speechSynthesis) { resolve(); return; }
  var u = new SpeechSynthesisUtterance(text);
  var preset = VOICE_PRESETS[currentVoiceKey] || VOICE_PRESETS['en-US-female'];
  var v = findVoice(preset.lang, preset.gender);
  if (v) u.voice = v;
  u.lang = preset.lang;
  u.rate = preset.lang === 'en-GB' ? 0.92 * speechRate : 0.95 * speechRate;
  var done = function() { resolve(); };
  u.onend = done;
  u.onerror = done;
  window.speechSynthesis.speak(u);
}
if (window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
}

// ============ WebSocket (with proper reconnection) ============
function wsOpen() {
  // Detach old socket handlers so stale events don't interfere
  if (ws) {
    ws.onopen = null;
    ws.onclose = null;
    ws.onmessage = null;
    ws.onerror = null;
    try { ws.close(); } catch(e) { /* ignore */ }
    ws = null;
  }
  clearInterval(pingInterval);
  clearTimeout(reconnectTimer);
  reconnectTimer = null;
  reconnectActive = false;

  wsGeneration++;
  const gen = wsGeneration;

  const url = (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + '/ws';
  log('WS', '[' + gen + '] Connecting to ' + url);
  updateConnStatus('connecting');
  ws = new WebSocket(url);

  ws.onopen = () => {
    // Stale generation — ignore
    if (gen !== wsGeneration) { log('WS', '[' + gen + '] onopen ignored (stale)'); return; }
    log('WS', '[' + gen + '] Connected (readyState=' + ws.readyState + ')');
    wasEverConnected = true;
    reconnectBackoff = 1000;
    reconnectActive = false;
    updateConnStatus('connected');

    // Send start_scenario to initialize/restore server state
    if (currentScenario) {
      log('WS', '[' + gen + '] Sending start_scenario: ' + currentScenario.id);
      ws.send(JSON.stringify({ type: 'start_scenario', scenarioId: currentScenario.id }));
    }
    // Heartbeat every 25s
    pingInterval = setInterval(() => {
      if (ws && ws.readyState === WebSocket.OPEN && wsGeneration === gen) {
        ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 25000);
  };

  ws.onmessage = (event) => {
    if (gen !== wsGeneration) return;
    try {
      const msg = JSON.parse(event.data);
      // If we have a pending message and scenario_started just arrived, send it now
      if (msg.type === 'scenario_started' && pendingSend) {
        const pending = pendingSend;
        pendingSend = null;
        onMessage(msg);
        // Short delay to ensure server processed start_scenario
        setTimeout(() => {
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(pending));
          }
        }, 100);
        return;
      }
      onMessage(msg);
    } catch (e) {
      log('WS', '[' + gen + '] Parse error: ' + e.message);
    }
  };

  ws.onclose = (event) => {
    if (gen !== wsGeneration) return;
    log('WS', '[' + gen + '] CLOSED code=' + event.code + ' reason=' + event.reason + ' wasClean=' + event.wasClean);
    updateConnStatus('disconnected');
    clearInterval(pingInterval);
    if (ws && wsGeneration === gen) ws = null;
    // Auto-reconnect if user is in a conversation
    if (currentScenario && wasEverConnected) {
      scheduleReconnect();
    }
  };

  ws.onerror = () => {
    if (gen !== wsGeneration) return;
    log('WS', '[' + gen + '] ERROR fired');
    updateConnStatus('disconnected');
  };
}

function scheduleReconnect() {
  clearTimeout(reconnectTimer);
  const delay = reconnectBackoff;
  log('WS', 'Reconnecting in ' + delay + 'ms (backoff=' + reconnectBackoff + 'ms)');
  updateConnStatus('reconnecting');
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    log('WS', 'Attempting reconnect...');
    wsOpen();
    reconnectBackoff = Math.min(reconnectBackoff * 2, 30000);
  }, delay);
}

function updateConnStatus(state) {
  const el = document.getElementById('conn-status');
  if (!el) return;
  el.className = 'conn-status ' + state;
  el.style.display = ''; // clear any previous inline style
  const labels = {
    connecting: '连接中…',
    connected: '已连接',
    disconnected: '连接断开 — 点击重连',
    reconnecting: '重连中…'
  };
  el.textContent = labels[state] || state;
  if (state === 'disconnected' || state === 'reconnecting') {
    el.style.display = 'inline-block';
  } else if (state === 'connected') {
    el.style.display = 'inline-block';
    setTimeout(() => { if (el.className.includes('connected') && el.style.display === 'inline-block') el.style.display = ''; }, 2000);
  } else if (state === 'connecting') {
    el.style.display = 'inline-block';
  }
  // For empty state: let CSS default (display:none) take effect
}

function sendWS(data) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
    return true;
  }
  // If already connecting, just queue — don't create a second socket
  if (ws && ws.readyState === WebSocket.CONNECTING) {
    log('WS', 'sendWS: socket is CONNECTING, queuing message');
    pendingSend = data;
    return false;
  }
  log('WS', 'sendWS FAILED: readyState=' + (ws ? ws.readyState : 'null') + ', reconnecting');
  pendingSend = data;
  updateConnStatus('reconnecting');
  wsOpen();
  return false;
}

// ============ Message Router ============
function onMessage(msg) {
  switch (msg.type) {
    case 'scenario_started': onScenarioStarted(msg); break;
    case 'reply_chunk': onReplyChunk(msg.text); break;
    case 'reply_done': onReplyDone(msg); break;

    case 'session_summary': showSummary(msg.summary); setCharState('cheer'); onSummaryReceived(msg.summary, currentScenario && currentScenario.id); break;
    case 'error': showSystemMessage('⚠️ ' + msg.message); break;
    case 'ping': break; // ignore heartbeat response
  }
}

function onScenarioStarted(msg) {
  removeTyping();
  if (!scenarioInitialized) {
    scenarioInitialized = true;
    showSystemMessage('对话开始 — ' + msg.scenario.nameEn);
    var openingEl = addBubble('assistant', msg.opening);
    speak(msg.opening, false, openingEl);
  } else {
    // Reconnect — conversation context reset on server, notify user
    showSystemMessage('已重新连接，继续对话');
  }
}

function onReplyChunk(text) {
  clearTimeout(replyTimer);
  setCharState('typing');
  if (!streamingMsgEl) {
    removeTyping();
    streamingMsgEl = document.createElement('div');
    streamingMsgEl.className = 'message assistant streaming';
    streamingText = '';
    chatMessages.appendChild(streamingMsgEl);
  }
  streamingText += text;
  // Hide IPA tag during streaming display
  var display = streamingText.replace(/\[IPA:.*$/m, '');
  streamingMsgEl.textContent = display;
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function onReplyDone(msg) {
  setCharState('idle');
  var el = streamingMsgEl;
  var final = streamingText;
  streamingMsgEl = null;
  streamingText = '';
  if (el) {
    el.classList.remove('streaming');
    // Strip IPA tag from bubble display
    var clean = final.replace(/\[IPA:.*?\]\s*/gi, '').trim();
    if (clean !== final) el.textContent = clean;
    var replyText = clean || final;
    el.title = '点击重读';
    // Pre-cache TTS for instant replay
    cacheTTS(el, replyText);
    el.addEventListener('click', function() { speak(replyText, true, el); });
    var act = document.createElement('div');
    act.className = 'msg-actions';
    el.appendChild(act);
    addStarButton(act, replyText);
    addTranslateButton(act, replyText);
    if (msg && msg.ipa) showIPA(msg.ipa, el);
    speak(replyText, false, el);
  }
}

function showIPA(ipaText, afterEl) {
  if (!ipaText || !ipaEnabled) return;
  var el = document.createElement('div');
  el.className = 'ipa-line';
  el.textContent = ipaText;
  if (afterEl) { afterEl.after(el); }
  else { chatMessages.appendChild(el); }
  chatMessages.scrollTop = chatMessages.scrollHeight;
}


// ============ UI Helpers ============
function addBubble(role, text) {
  var div = document.createElement('div');
  div.className = 'message ' + role;
  div.textContent = text;
  var actions = document.createElement('div');
  actions.className = 'msg-actions';
  div.appendChild(actions);
  if (role === 'assistant') {
    div.title = '点击重读';
    // Pre-cache TTS for instant replay
    cacheTTS(div, text);
    div.addEventListener('click', function() { speak(text, true, div); });
    addStarButton(actions, text);
  }
  addTranslateButton(actions, text);
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

function showSystemMessage(text) {
  const div = document.createElement('div');
  div.className = 'message system';
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const d = document.createElement('div');
  d.className = 'typing-indicator';
  d.id = 'typing-indicator';
  d.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(d);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const e = document.getElementById('typing-indicator');
  if (e) e.remove();
}

// ============ Scenarios ============
const FALLBACK_SCENARIOS = [
  { id: 'restaurant', name: '餐厅点餐', nameEn: 'Restaurant', icon: '🍽️', description: '在餐厅用英语点餐' },
  { id: 'interview', name: '求职面试', nameEn: 'Job Interview', icon: '💼', description: '模拟英语求职面试' },
  { id: 'meeting', name: '商务会议', nameEn: 'Meeting', icon: '📊', description: '参与英语商务会议' },
  { id: 'hotel', name: '酒店入住', nameEn: 'Hotel', icon: '🏨', description: '酒店办理入住' },
  { id: 'airport', name: '机场出行', nameEn: 'Airport', icon: '✈️', description: '机场值机登机' },
  { id: 'doctor', name: '看病就医', nameEn: 'Doctor', icon: '🏥', description: '医院描述症状' },
  { id: 'shopping', name: '购物逛街', nameEn: 'Shopping', icon: '🛍️', description: '商场购物对话' },
  { id: 'smalltalk', name: '日常闲聊', nameEn: 'Small Talk', icon: '💬', description: '日常英语寒暄' },
  { id: 'roast', name: '日常怼怼', nameEn: 'Roast & Banter', icon: '🔥', description: '朋友间互相调侃斗嘴' }
];

async function loadScenarios() {
  try {
    const r = await fetch('/api/scenarios');
    renderScenarios(await r.json());
  } catch (e) {
    renderScenarios(FALLBACK_SCENARIOS);
  }
}

function renderScenarios(list) {
  scenarioGrid.innerHTML = list.map(s => {
    var isCustom = s.id && s.id.startsWith('custom_');
    var iconHtml = isCustom
      ? '<div class="card-icon card-emoji">' + esc(s.icon || '✨') + '</div>'
      : '<div class="card-icon icon-' + s.id + '"></div>';
    return '<div class="scenario-card" data-id="' + s.id + '"' + (isCustom ? ' data-custom="1"' : '') + '>' +
      iconHtml +
      '<div class="name">' + esc(s.name) + '</div>' +
      '<div class="name-en">' + esc(s.nameEn) + '</div>' +
      '<div class="desc">' + esc(s.description) + '</div>' +
      (isCustom ? '<button class="card-delete-btn" title="删除场景">&times;</button>' : '') +
    '</div>';
  }).join('') +
  '<div class="scenario-card create-card" id="create-scenario-card">' +
    '<div class="card-icon card-emoji">✨</div>' +
    '<div class="name">自定义场景</div>' +
    '<div class="name-en">Create Your Own</div>' +
    '<div class="desc">设计你自己的英语练习场景</div>' +
  '</div>';

  // Click handlers for regular + custom cards
  scenarioGrid.querySelectorAll('.scenario-card[data-id]').forEach(c => {
    c.addEventListener('click', function(e) {
      if (e.target.classList.contains('card-delete-btn')) return;
      startScenario(c.dataset.id);
    });
  });

  // Delete button handlers
  scenarioGrid.querySelectorAll('.card-delete-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var card = btn.closest('.scenario-card');
      deleteCustomScenario(card.dataset.id, card);
    });
  });

  // Create card handler
  var createCard = document.getElementById('create-scenario-card');
  if (createCard) createCard.addEventListener('click', showCreateModal);
}

// ============ Custom Scenario Modal ============
function showCreateModal() {
  customModal.classList.remove('hidden');
  customForm.reset();
  customForm.querySelector('[name="name"]').focus();
}

function hideCreateModal() {
  customModal.classList.add('hidden');
}

modalCloseBtn.addEventListener('click', hideCreateModal);
modalCancelBtn.addEventListener('click', hideCreateModal);
customModal.addEventListener('click', function(e) {
  if (e.target === customModal) hideCreateModal();
});

customForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  var formData = new FormData(customForm);
  var body = {};
  formData.forEach(function(v, k) { body[k] = v; });
  try {
    var r = await fetch('/api/custom-scenarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!r.ok) {
      var err = await r.json();
      alert(err.error || '创建失败');
      return;
    }
    hideCreateModal();
    loadScenarios();
  } catch(ex) {
    alert('网络错误，请重试');
  }
});

async function deleteCustomScenario(id, el) {
  if (!confirm('确定要删除这个自定义场景吗？')) return;
  try {
    var r = await fetch('/api/custom-scenarios/' + id, { method: 'DELETE' });
    if (!r.ok) {
      var err = await r.json();
      alert(err.error || '删除失败');
      return;
    }
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'scale(0.95)';
      el.style.transition = 'all 0.2s ease';
    }
    setTimeout(function() { loadScenarios(); }, 250);
  } catch(ex) {
    alert('网络错误，请重试');
  }
}

// ============ Flow ============
function startScenario(id) {
  currentScenario = { id: id };
  scenarioInitialized = false;

  // Switch to chat view
  scenarioSection.classList.add('hidden');
  chatSection.classList.remove('hidden');
  summarySection.classList.add('hidden');
  chatMessages.innerHTML = '';

  var card = document.querySelector('.scenario-card[data-id="' + id + '"]');
  activeScenarioInfo.innerHTML = '<span>' + (card ? esc(card.querySelector('.name') ? card.querySelector('.name').textContent : id) : id) + '</span>';

  stopAudio();

  // Show character SVG for this scenario
  charBox.innerHTML = CHARS[id] || CHARS.smalltalk;
  charBox.classList.remove('hidden');
  setCharState('waving');

  wsOpen();
  showTyping();
  textInput.focus();
}

function endSession() {
  stopAudio();
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    showSystemMessage('连接已断开，无法生成总结。请刷新页面后重试。');
    return;
  }
  showTyping();
  sendWS({ type: 'request_summary' });
  recordBtn.disabled = true;
  sendBtn.disabled = true;
  textInput.disabled = true;
  if (isRecording) stopRecording();
}

function resetToScenarios() {
  stopAudio();
  currentScenario = null;
  scenarioInitialized = false;
  pendingSend = null;
  reconnectActive = false;
  wasEverConnected = false;
  reconnectBackoff = 1000;
  clearInterval(pingInterval);
  clearTimeout(reconnectTimer);
  pingInterval = null;
  reconnectTimer = null;
  if (ws) { ws.onopen = null; ws.onclose = null; ws.onmessage = null; ws.onerror = null; try { ws.close(); } catch(e) {} ws = null; }
  wsGeneration++;
  streamingMsgEl = null;
  streamingText = '';
  charBox.classList.add('hidden');
  setCharState('');
  scenarioSection.classList.remove('hidden');
  chatSection.classList.add('hidden');
  summarySection.classList.add('hidden');
  chatMessages.innerHTML = '';
  recordBtn.disabled = false;
  sendBtn.disabled = false;
  textInput.disabled = false;
  textInput.value = '';
  updateConnStatus('');
}

// ============ Send ============
function sendText(text) {
  if (!currentScenario) return;
  if (isRecording) stopRecording();

  // Finalize any streaming bubble
  if (streamingMsgEl) {
    streamingMsgEl.classList.remove('streaming');
    streamingMsgEl = null;
    streamingText = '';
  }

  addBubble('user', text);
  textInput.value = '';
  showTyping();

  setCharState('typing');

  // Timeout — 15s without a reply chunk means trouble
  clearTimeout(replyTimer);
  replyTimer = setTimeout(() => {
    if (streamingMsgEl || document.getElementById('typing-indicator')) {
      removeTyping();
      if (streamingMsgEl) { streamingMsgEl.remove(); streamingMsgEl = null; streamingText = ''; }
      showSystemMessage('⚠️ 未收到回复（超时），请检查网络后刷新重试');
      setCharState('');
    }
  }, 15000);

  const preset = VOICE_PRESETS[currentVoiceKey] || VOICE_PRESETS['en-US-female'];
  sendWS({ type: 'user_message', text: text, accent: preset.accent, ipa: ipaEnabled });
}

sendBtn.addEventListener('click', () => {
  const t = textInput.value.trim();
  if (t) sendText(t);
});
textInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const t = textInput.value.trim();
    if (t) sendText(t);
  }
});

// ============ Voice ============
recordBtn.addEventListener('click', () => {
  if (!SpeechRecognition) {
    showSystemMessage('⚠️ 浏览器不支持语音识别，请使用 Chrome');
    return;
  }
  isRecording ? stopRecording() : startRecording();
});

function startRecording() {
  setCharState('listening');
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.onresult = (e) => {
    const t = e.results[0][0].transcript.trim();
    if (t) { textInput.value = t; sendText(t); }
  };
  recognition.onerror = (e) => {
    if (e.error === 'not-allowed') showSystemMessage('⚠️ 请允许麦克风权限');
    stopRecUI();
  };
  recognition.onend = stopRecUI;
  try {
    recognition.start();
    isRecording = true;
    recordBtn.classList.add('recording');
    recordLabel.textContent = '点击停止';
    recordingStatus.classList.remove('hidden');
  } catch(e) { stopRecUI(); }
}

function stopRecording() {
  if (recognition) { try { recognition.stop(); } catch(e) {} recognition = null; }
  stopRecUI();
}

function stopRecUI() {
  isRecording = false;
  recordBtn.classList.remove('recording');
  recordLabel.textContent = '点击录音';
  recordingStatus.classList.add('hidden');
  setCharState('idle');
}

// ============ Summary ============
function showSummary(s) {
  removeTyping();
  chatSection.classList.add('hidden');
  summarySection.classList.remove('hidden');
  var scores = s.scores || {};
  var radar = buildRadarChart(scores);
  summaryContent.innerHTML =
    '<div class="summary-top-row">' +
      '<div class="overall-score">' +
        '<div class="score-number">' + s.overallScore + '<span style="font-size:22px;color:var(--soft)">/10</span></div>' +
        '<div class="score-label">综合评分 Overall Score</div>' +
      '</div>' +
      '<div class="radar-chart">' +
        '<div class="radar-title">能力雷达</div>' +
        radar +
      '</div>' +
    '</div>' +
    '<div class="summary-text-block">' + esc(s.summaryText) + '</div>' +
    '<div class="summary-grid-2">' +
      '<div class="summary-list"><h4>✅ 优势</h4><ul>' + (s.strengths||[]).map(x=>'<li>'+esc(x)+'</li>').join('') + '</ul></div>' +
      '<div class="summary-list improve"><h4>🎯 待提升</h4><ul>' + (s.areasToImprove||[]).map(x=>'<li>'+esc(x)+'</li>').join('') + '</ul></div>' +
    '</div>' +
    ((s.keyCorrections||[]).length ?
      '<h4 style="margin-bottom:10px">📝 关键纠错</h4><table class="corrections-table"><tr><th>原句</th><th>改进</th><th>提示</th></tr>' +
      s.keyCorrections.map(c=>'<tr><td class="err">'+esc(c.error)+'</td><td class="fix">'+esc(c.fix)+'</td><td>'+esc(c.tip||'')+'</td></tr>').join('') +
      '</table>' : '') +
    ((s.vocabularySuggestions||[]).length ?
      '<h4 style="margin-bottom:10px">📚 推荐词汇</h4><div class="vocab-chips">' +
      s.vocabularySuggestions.map(v=>'<div class="vocab-chip"><div class="word">'+esc(v.word)+'</div><div class="meaning">'+esc(v.meaning)+'</div><div class="example">"'+esc(v.example)+'"</div></div>').join('') +
      '</div>' : '') +
    ((s.practiceTips||[]).length ?
      '<div class="tips-list"><h4>💡 练习建议</h4><ul>' + s.practiceTips.map(t=>'<li>'+esc(t)+'</li>').join('') + '</ul></div>' : '');
}

function buildRadarChart(scores) {
  var labels = [
    { key: 'fluency',       cn: '流利度', en: 'Fluency' },
    { key: 'grammar',       cn: '语法',   en: 'Grammar' },
    { key: 'vocabulary',    cn: '词汇量', en: 'Vocab' },
    { key: 'pronunciation', cn: '发音',   en: 'Pronun' },
    { key: 'communication', cn: '沟通力', en: 'Comm' }
  ];
  var cx = 150, cy = 150, r = 100, n = labels.length;
  var points = labels.map(function(_, i) {
    var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  // Grid rings (2/4/6/8/10)
  var rings = '';
  for (var level = 2; level <= 10; level += 2) {
    var scale = level / 10;
    var pts = points.map(function(p) {
      return (cx + (p.x - cx) * scale).toFixed(1) + ',' + (cy + (p.y - cy) * scale).toFixed(1);
    }).join(' ');
    rings += '<polygon points="' + pts + '" fill="none" stroke="#E0D8CC" stroke-width="0.6"/>';
  }
  // Axis lines
  var axes = points.map(function(p) {
    return '<line x1="' + cx + '" y1="' + cy + '" x2="' + p.x + '" y2="' + p.y + '" stroke="#E0D8CC" stroke-width="0.6"/>';
  }).join('');

  // Data polygon + dots + score labels
  var dataPts = '', dots = '', scoreTexts = '';
  labels.forEach(function(l, i) {
    var val = scores[l.key] || 0;
    var scale = val / 10;
    var dx = (cx + (points[i].x - cx) * scale).toFixed(1);
    var dy = (cy + (points[i].y - cy) * scale).toFixed(1);
    dataPts += (dataPts ? ' ' : '') + dx + ',' + dy;
    dots += '<circle cx="' + dx + '" cy="' + dy + '" r="4.5" fill="#2D5A4E" stroke="#fff" stroke-width="1.5"/>';
    // Score label offset radially outward
    var offX = scale > 0.01 ? (points[i].x - cx) / r : 0;
    var offY = scale > 0.01 ? (points[i].y - cy) / r : -1;
    var sx = (parseFloat(dx) + offX * 12).toFixed(1);
    var sy = (parseFloat(dy) + offY * 12).toFixed(1);
    scoreTexts += '<text x="' + sx + '" y="' + sy + '" text-anchor="middle" dominant-baseline="central" class="radar-score">' + val + '</text>';
  });

  // Label anchors: top=start, bottom=start, left=end, right=start
  var labelSvg = labels.map(function(l, i) {
    var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    var lr = r + 34;
    var lx = (cx + lr * Math.cos(angle)).toFixed(1);
    var ly = (cy + lr * Math.sin(angle)).toFixed(1);
    var anchor = 'middle';
    if (Math.abs(lx - cx) < 5) anchor = 'middle';
    else if (lx < cx - 5) anchor = 'end';
    else anchor = 'start';
    return '<text x="' + lx + '" y="' + ly + '" text-anchor="' + anchor + '" class="radar-label">' + l.cn + '</text>';
  }).join('');

  return '<svg viewBox="0 0 300 300" class="radar-svg" preserveAspectRatio="xMidYMid meet">' +
    rings + axes +
    '<polygon points="' + dataPts + '" fill="rgba(45,90,78,.12)" stroke="#2D5A4E" stroke-width="2.2" stroke-linejoin="round"/>' +
    dots + scoreTexts + labelSvg +
    '</svg>';
}

// ============ Utility ============
function esc(s) {
  if (!s) return '';
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

// ============ Navigation ============
backBtn.addEventListener('click', resetToScenarios);
endSessionBtn.addEventListener('click', endSession);
newSessionBtn.addEventListener('click', resetToScenarios);

// ============ Tab Navigation ============
const navTabs = document.querySelectorAll('.nav-tab');
const viewPractice = document.getElementById('view-practice');
const viewBookmarks = document.getElementById('view-bookmarks');
const viewDashboard = document.getElementById('view-dashboard');

navTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    navTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const v = tab.dataset.tab;
    viewPractice.classList.toggle('hidden', v !== 'practice');
    viewBookmarks.classList.toggle('hidden', v !== 'bookmarks');
    viewDashboard.classList.toggle('hidden', v !== 'dashboard');
    if (v === 'bookmarks') loadBookmarks();
    if (v === 'dashboard') loadDashboard();
  });
});

// ============ Check-in ============
const checkinBtn = $('checkin-btn');
const streakBadge = $('streak-badge');

async function loadCheckinState() {
  try {
    const r = await fetch('/api/checkin');
    const d = await r.json();
    if (streakBadge) streakBadge.textContent = d.streak + '天';
    if (checkinBtn) {
      if (d.today) {
        checkinBtn.textContent = '✅ 已打卡';
        checkinBtn.classList.add('done');
      } else {
        checkinBtn.textContent = '🔥 打卡';
        checkinBtn.classList.remove('done');
      }
    }
  } catch(e) { /* ignore */ }
}
if (checkinBtn) {
  checkinBtn.addEventListener('click', async () => {
    try {
      const r = await fetch('/api/checkin', { method: 'POST' });
      const d = await r.json();
      streakBadge.textContent = d.streak + '天';
      checkinBtn.textContent = '✅ 已打卡';
      checkinBtn.classList.add('done');
    } catch(e) { /* ignore */ }
  });
}

// ============ Favorites ============
function addStarButton(msgEl, text) {
  var star = document.createElement('button');
  star.className = 'msg-star';
  star.textContent = '☆';
  star.title = '收藏到错句本';
  star.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (star.classList.contains('saved')) {
      // Remove — find by text
      try {
        const r = await fetch('/api/favorites');
        const favs = await r.json();
        const found = favs.find(f => f.text === text);
        if (found) await fetch('/api/favorites/' + found.id, { method: 'DELETE' });
      } catch(ex) {}
      star.classList.remove('saved');
      star.textContent = '☆';
    } else {
      try {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: text, scenario: currentScenario ? currentScenario.id : '' })
        });
      } catch(ex) {}
      star.classList.add('saved');
      star.textContent = '★';
    }
  });
  // Check if already saved
  fetch('/api/favorites').then(r => r.json()).then(favs => {
    if (favs.some(f => f.text === text)) {
      star.classList.add('saved');
      star.textContent = '★';
    }
  }).catch(() => {});
  msgEl.appendChild(star);
}

function addTranslateButton(msgEl, text) {
  var btn = document.createElement('button');
  btn.className = 'msg-translate';
  btn.textContent = '译';
  btn.title = '翻译成中文';
  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    var existing = msgEl.nextElementSibling;
    if (existing && existing.classList.contains('trans-line')) {
      existing.remove();
      return;
    }
    var tl = document.createElement('div');
    tl.className = 'trans-line';
    tl.textContent = '翻译中…';
    msgEl.after(tl);
    try {
      var r = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text })
      });
      var d = await r.json();
      tl.textContent = d.translation || d.error || '翻译失败';
    } catch(ex) {
      tl.textContent = '翻译失败';
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
  msgEl.appendChild(btn);
}

async function loadBookmarks() {
  const list = $('bookmarks-list');
  const empty = $('bookmarks-empty');
  const count = $('bookmark-count');
  try {
    const r = await fetch('/api/favorites');
    const favs = await r.json();
    if (count) count.textContent = favs.length + '条';
    if (!favs.length) {
      list.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
      return;
    }
    if (empty) empty.classList.add('hidden');
    list.innerHTML = favs.reverse().map(f => {
      var sc = f.scenario || '';
      return '<div class="bookmark-item">' +
        (sc ? '<div class="bm-scenario">' + esc(sc) + '</div>' : '') +
        '<div class="bm-text">' + esc(f.text) + '</div>' +
        '<button class="bm-delete" data-id="' + f.id + '" title="删除">✕</button>' +
      '</div>';
    }).join('');
    list.querySelectorAll('.bm-delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        await fetch('/api/favorites/' + btn.dataset.id, { method: 'DELETE' });
        loadBookmarks();
      });
    });
    // Add speak on click
    list.querySelectorAll('.bookmark-item').forEach(el => {
      el.addEventListener('click', () => {
        var txt = el.querySelector('.bm-text').textContent;
        speak(txt, true);
      });
      el.style.cursor = 'pointer';
    });
  } catch(e) { /* ignore */ }
}

// ============ Dashboard ============
async function loadDashboard() {
  try {
    const r = await fetch('/api/stats');
    const d = await r.json();
    $('dash-total').textContent = d.totalSessions;
    $('dash-avg').textContent = d.averageScore;
    $('dash-streak').textContent = d.checkinTotal;
    $('dash-favs').textContent = d.totalFavorites;

    // Score chart
    var bars = $('chart-bars');
    var sessions = d.sessions.slice(-12);
    bars.innerHTML = sessions.map(s =>
      '<div class="chart-bar-wrap">' +
        '<div class="chart-bar-score">' + s.score + '</div>' +
        '<div class="chart-bar" style="height:' + (s.score * 9) + 'px"></div>' +
        '<div class="chart-bar-date">' + (s.date || '').slice(5) + '</div>' +
      '</div>'
    ).join('');

    // Calendar — show last 28 days, highlight practice days
    var cal = $('cal-grid');
    cal.innerHTML = '';
    var practiceDates = new Set(d.sessions.map(s => s.date));
    var today = new Date().toISOString().slice(0, 10);
    for (var w = 3; w >= 0; w--) {
      for (var dd = 0; dd < 7; dd++) {
        var day = new Date();
        day.setDate(day.getDate() - (w * 7 + (6 - dd)));
        var ds = day.toISOString().slice(0, 10);
        var cell = document.createElement('div');
        cell.className = 'cal-day' + (practiceDates.has(ds) ? ' done' : '');
        cell.textContent = day.getDate();
        cell.title = ds;
        cal.appendChild(cell);
      }
    }
  } catch(e) { /* ignore */ }
}

// Save session stats when summary received
function onSummaryReceived(s, scenarioId) {
  try {
    fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: s.overallScore,
        scenario: scenarioId || 'unknown',
        turns: 0
      })
    }).catch(() => {});
  } catch(e) { /* ignore */ }
}

// ============ Init ============
loadScenarios();
loadCheckinState();
