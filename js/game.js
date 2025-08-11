// --- GAME STATE ---
let gameState = {};
let shuffledCards = [];
let currentCardIndex = 0;

// --- DOM ELEMENTS ---
const cardEl = document.getElementById('card');
const hud = {
    pop: { bar: document.getElementById('pop-bar'), preview: document.getElementById('pop-preview') },
    tes: { bar: document.getElementById('tes-bar'), preview: document.getElementById('tes-preview') },
    par: { bar: document.getElementById('par-bar'), preview: document.getElementById('par-preview') },
    med: { bar: document.getElementById('med-bar'), preview: document.getElementById('med-preview') },
};
const decisionTextEl = document.getElementById('decision-text'); 
const consequenceTextEl = document.getElementById('consequence-text');
const gameOverModal = document.getElementById('game-over-modal');
const timelineEl = document.getElementById('timeline');

// --- GAME LOGIC FUNCTIONS ---

function initGame(playerName) {
    gameState = {
        playerName: playerName || "Alcalde/sa",
        stats: { pop: 50, tes: 50, par: 50, med: 50 },
        time: { year: 1, day: 1 },
        gameOver: false,
    };
    shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    currentCardIndex = 0;
    
    gameOverModal.classList.add('hidden', 'opacity-0');

    updateUI();
    drawCard();
    addDragListeners();
}

function updateUI() {
    // Update stats bars
    for (const key in gameState.stats) {
        const value = Math.max(0, Math.min(100, gameState.stats[key]));
        hud[key].bar.style.width = `${value}%`;
    }
    // Update timeline
    timelineEl.textContent = `Año ${gameState.time.year}, Día ${gameState.time.day}`;
}

function advanceTime() {
    const daysPassed = Math.floor(Math.random() * 6) + 5; // Advance 5 to 10 days
    gameState.time.day += daysPassed;
    if (gameState.time.day > 365) {
        gameState.time.day -= 365;
        gameState.time.year++;
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
    // Replace placeholder with actual player name
    document.getElementById('card-text').textContent = cardData.text.replace('{playerName}', gameState.playerName);
    document.getElementById('character-image').src = cardData.character;
    
    decisionTextEl.style.opacity = 0;
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
            
            const timeInPower = `Has aguantado ${gameState.time.year - 1} años y ${gameState.time.day} días en el poder.`;
            document.getElementById('game-over-text').textContent = `${timeInPower} ${reason}`;
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
    
    advanceTime();
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
    
    const cardData = shuffledCards[currentCardIndex];
    
    if (currentX > 20) { // Dragging right
        decisionTextEl.textContent = cardData.right.text;
        decisionTextEl.style.opacity = Math.min(1, Math.abs(currentX) / dragThreshold);
        showPreview('right');
    } else if (currentX < -20) { // Dragging left
        decisionTextEl.textContent = cardData.left.text;
        decisionTextEl.style.opacity = Math.min(1, Math.abs(currentX) / dragThreshold);
        showPreview('left');
    } else { // Center
        decisionTextEl.style.opacity = 0;
        hidePreview();
    }
}

function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    cardEl.classList.remove('dragging');
    hidePreview();
    decisionTextEl.style.opacity = 0;

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
