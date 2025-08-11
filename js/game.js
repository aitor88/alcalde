// --- GAME STATE ---
let gameState = {};
let shuffledCards = [];
let currentCardIndex = 0;

// --- DOM ELEMENTS ---
// References to DOM elements are established. These are assumed to be present in the HTML.
const cardEl = document.getElementById('card');
const hud = {
    pop: { bar: document.getElementById('pop-bar'), preview: document.getElementById('pop-preview') },
    tes: { bar: document.getElementById('tes-bar'), preview: document.getElementById('tes-preview') },
    par: { bar: document.getElementById('par-bar'), preview: document.getElementById('par-preview') },
    med: { bar: document.getElementById('med-bar'), preview: document.getElementById('med-preview') },
};
const decisionLeftEl = document.getElementById('decision-left');
const decisionRightEl = document.getElementById('decision-right');
const consequenceTextEl = document.getElementById('consequence-text');
const gameOverModal = document.getElementById('game-over-modal');
// The 'restartButton' constant is removed from here. It's now handled only in main.js

// --- GAME LOGIC FUNCTIONS ---

function initGame() {
    gameState = {
        stats: { pop: 50, tes: 50, par: 50, med: 50 },
        turn: 0,
        gameOver: false,
    };
    shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    currentCardIndex = 0;
    
    gameOverModal.classList.add('hidden', 'opacity-0');

    updateUI();
    drawCard();
    addDragListeners(); // Renamed for clarity
}

function updateUI() {
    for (const key in gameState.stats) {
        const value = Math.max(0, Math.min(100, gameState.stats[key]));
        hud[key].bar.style.width = `${value}%`;
    }
}

function drawCard() {
    if (gameState.gameOver) return;
    if (currentCardIndex >= shuffledCards.length) {
        currentCardIndex = 0;
        shuffledCards.sort(() => Math.random() - 0.5);
    }

    const cardData = shuffledCards[currentCardIndex];
    document.getElementById('card-character-name').textContent = cardData.name;
    document.getElementById('card-text').textContent = cardData.text;
    document.getElementById('character-image').src = cardData.character;
    
    decisionLeftEl.textContent = cardData.left.text;
    decisionRightEl.textContent = cardData.right.text;
    decisionLeftEl.style.opacity = 0;
    decisionRightEl.style.opacity = 0;
}

function showFeedback(stat, change) {
    if (change === 0) return;
    const feedbackContainer = document.getElementById('feedback-container');
    const popup = document.createElement('div');
    popup.className = 'feedback-popup absolute font-bold text-2xl pointer-events-none';
    popup.textContent = `${change > 0 ? '+' : ''}${change}`;
    popup.style.color = change > 0 ? '#22c55e' : '#ef4444';
    
    const barRect = hud[stat].bar.getBoundingClientRect();
    popup.style.left = `${barRect.left + barRect.width / 2}px`;
    popup.style.top = `${barRect.top}px`;

    feedbackContainer.appendChild(popup);
    setTimeout(() => popup.remove(), 1500);
}

function showPreview(direction) {
    const cardData = shuffledCards[currentCardIndex];
    const effects = (direction === 'left') ? cardData.left.effects : cardData.right.effects;

    for (const key in hud) {
        const previewEl = hud[key].preview;
        const change = effects[key];
        if (change !== 0) {
            previewEl.textContent = '●';
            previewEl.classList.add('visible');
        } else {
            previewEl.classList.remove('visible');
        }
    }
}

function hidePreview() {
    for (const key in hud) {
        hud[key].preview.classList.remove('visible');
    }
}

function showConsequences(consequenceText) {
    consequenceTextEl.textContent = consequenceText;
    consequenceTextEl.classList.add('consequence-modal');
    consequenceTextEl.style.animation = 'none';
    consequenceTextEl.offsetHeight; /* Trigger reflow */
    consequenceTextEl.style.animation = null; 
    setTimeout(() => {
        consequenceTextEl.textContent = '';
    }, 3500);
}

function checkGameOver() {
    for (const key in gameState.stats) {
        if (gameState.stats[key] <= 0 || gameState.stats[key] >= 100) {
            gameState.gameOver = true;
            let reason = "";
            const isMin = gameState.stats[key] <= 0;

            switch(key) {
                case 'pop': reason = isMin ? "El pueblo te odia tanto que te ha echado en una moción de censura popular." : "Tu popularidad es tan alta que te has creído un mesías y tu partido te ha incapacitado."; break;
                case 'tes': reason = isMin ? "¡Bancarrota! Los hombres de negro de Bruselas han venido a quitarte las llaves." : "Has derrochado tanto que el dinero no vale nada. La economía ha colapsado."; break;
                case 'par': reason = isMin ? "Tu partido te ha apuñalado por la espalda en una reunión a la que no te invitaron." : "El culto a tu liderazgo es tal que nadie se atrevió a avisarte del desastre que se venía."; break;
                case 'med': reason = isMin ? "Un escándalo mediático ha acabado con tu carrera. Ahora eres un meme eterno." : "Controlas tanto los medios que nadie se cree nada. La gente busca la verdad en Telegram."; break;
            }
            
            document.getElementById('game-over-text').textContent = `Has durado ${gameState.turn} turnos. ${reason}`;
            gameOverModal.classList.remove('hidden');
            setTimeout(() => gameOverModal.classList.remove('opacity-0'), 10);
            return true;
        }
    }
    return false;
}

function handleDecision(direction) {
    const cardData = shuffledCards[currentCardIndex];
    const choice = (direction === 'left') ? cardData.left : cardData.right;
    
    cardEl.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
    cardEl.style.transform = `translateX(${direction === 'left' ? -500 : 500}px) rotate(${direction === 'left' ? -20 : 20}deg)`;
    cardEl.style.opacity = 0;
    
    for (const key in choice.effects) {
        gameState.stats[key] += choice.effects[key];
        gameState.stats[key] = Math.max(0, Math.min(100, gameState.stats[key]));
        showFeedback(key, choice.effects[key]);
    }
    gameState.turn++;
    updateUI();
    
    showConsequences(choice.consequence);

    if (!checkGameOver()) {
        setTimeout(() => {
            cardEl.style.transition = 'none';
            cardEl.style.transform = 'translateX(0) rotate(0)';
            cardEl.style.opacity = 1;
            currentCardIndex++;
            drawCard();
        }, 300);
    }
}


// --- DRAG LOGIC ---
let isDragging = false;
let startX = 0;
let currentX = 0;
let dragThreshold = 50;

function onDragStart(e) {
    if(gameState.gameOver) return;
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX;
    cardEl.classList.add('dragging');
}

function onDragMove(e) {
    if (!isDragging) return;
    currentX = (e.pageX || e.touches[0].pageX) - startX;
    
    const rotation = currentX / 20;
    cardEl.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
    
    if (currentX > 20) { // Dragging right
        decisionRightEl.style.opacity = 1;
        decisionLeftEl.style.opacity = 0;
        showPreview('right');
    } else if (currentX < -20) { // Dragging left
        decisionLeftEl.style.opacity = 1;
        decisionRightEl.style.opacity = 0;
        showPreview('left');
    } else { // Center
        decisionLeftEl.style.opacity = 0;
        decisionRightEl.style.opacity = 0;
        hidePreview();
    }
}

function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    cardEl.classList.remove('dragging');
    hidePreview();
    decisionLeftEl.style.opacity = 0;
    decisionRightEl.style.opacity = 0;

    if (currentX > dragThreshold) {
        handleDecision('right');
    } else if (currentX < -dragThreshold) {
        handleDecision('left');
    } else {
        cardEl.style.transform = 'translateX(0) rotate(0)';
    }
}

function addDragListeners() {
    cardEl.addEventListener('mousedown', onDragStart);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
    
    cardEl.addEventListener('touchstart', onDragStart);
    document.addEventListener('touchmove', onDragMove);
    document.addEventListener('touchend', onDragEnd);
}
