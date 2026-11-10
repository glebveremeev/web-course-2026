export const pads = document.querySelectorAll('.pad');
export const startBtn = document.getElementById('start-btn');
export const levelEl = document.getElementById('level');
export const bestEl = document.getElementById('best');
export const message = document.getElementById('message');
export const AudioContext = window.AudioContext || window.webkitAudioContext;

let audioCtx = null;

export function playSound() {
 if (!audioCtx) { audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
const oscillator = audioCtx.createOscillator();
oscillator.type = 'square';
oscillator.frequansy.value = 600;
oscillator.connect(audioCtx.destination);
oscillator.start();
oscillator.stop(audioCtx.currentTime + 0.1);

export function showMessage(text, type = '') {
    message.textContent = text;
    message.className = 'message' + (type ? ' ' + type : '');
}

export function updateLevel(level) {
    levelEl.textContent = level;
}

export function updateBest(best) {
    bestEl.textContent = best;
}

export function setPadActive(index, active) {
    const pad = pads[index];
    if (!pad) return;
    pad.classList.toggle('active', active);
}

export function clearAllPads() {
    pads.forEach(pad => pad.classList.remove('active'));
}

export function enablePads(enabled) {
    pads.forEach(pad => {
        pad.disabled = !enabled;
        if (!enabled) pad.classList.remove('active');
    });
}

export function disableStartBtn(disabled, text = '') {
    startBtn.disabled = disabled;
    if (text) startBtn.textContent = text;
}