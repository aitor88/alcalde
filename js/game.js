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
        isCardFlipping: false,
    };
    shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    currentCardIndex = 0;
    
    gameOverModal.classList.add('hidden', 'opacity-0');
    cardEl.classList.remove('is-flipped');

    updateUI();
    drawCard();
    addDragListeners();
}

function updateUI() {
    for (const key in gameState.stats) {
        const value = Math.max(0, Math.min(100, gameState.stats[key]));
        hud[key].bar.style.width = `${value}%`;
    }
    timelineEl.textContent = `Año ${gameState.time.year}, Día ${gameState.time.day}`;
}

function advanceTime() {
    const daysPassed = Math.floor(Math.random() * 6) + 5;
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
    if (gameState.isCardFlipping) return;
    gameState.isCardFlipping = true;

    const cardData = shuffledCards[currentCardIndex];
    const choice = (direction === 'left') ? cardData.left : cardData.right;
    
    // 1. Apply effects and update stats
    for (const key in choice.effects) {
        gameState.stats[key] += choice.effects[key];
        gameState.stats[key] = Math.max(0, Math.min(100, gameState.stats[key]));
        showFeedback(key, choice.effects[key]);
    }
    advanceTime();
    updateUI();

    // 2. Show consequence on card back and flip it
    consequenceTextEl.textContent = choice.consequence;
    cardEl.classList.add('is-flipped');
    cardEl.classList.add('is-flipping');

    // 3. Check for game over after stats are updated
    if (checkGameOver()) {
        return; // Stop the flow if game is over
    }

    // 4. Wait for the player to read the consequence
    setTimeout(() => {
        // 5. Flip back to the front
        cardEl.classList.remove('is-flipped');

        // 6. After the flip-back animation is done, draw the next card
        setTimeout(() => {
            currentCardIndex++;
            drawCard();
            gameState.isCardFlipping = false;
            cardEl.classList.remove('is-flipping');
        }, 600); // This should match the CSS transition duration

    }, 3000); // Time to read the consequence
}


// --- DRAG LOGIC ---
let isDragging = false;
let startX = 0;
let currentX = 0;
let dragThreshold = 50;

function getEventX(e) {
    return e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
}

function onDragStart(e) {
    if (gameState.gameOver || gameState.isCardFlipping) return;
    isDragging = true;
    startX = getEventX(e);
    // Remove transition during drag for direct manipulation
    cardEl.style.transition = 'none';
}

function onDragMove(e) {
    if (!isDragging) return;
    if (e.type.startsWith('touch')) { e.preventDefault(); }

    currentX = getEventX(e) - startX;
    const rotation = currentX / 20;
    cardEl.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
    
    const cardData = shuffledCards[currentCardIndex];
    const opacity = Math.min(1, Math.abs(currentX) / dragThreshold);
    decisionTextEl.style.opacity = opacity;

    if (currentX > 0) {
        decisionTextEl.textContent = cardData.right.text;
        showPreview('right');
    } else if (currentX < 0) {
        decisionTextEl.textContent = cardData.left.text;
        showPreview('left');
    }
}

function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    hidePreview();
    
    // Restore transition for the snap-back or decision animation
    cardEl.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)';

    if (Math.abs(currentX) < dragThreshold) {
        cardEl.style.transform = 'translateX(0) rotate(0)';
        decisionTextEl.style.opacity = 0;
    } else {
        // Hide decision text and fly the card off-screen
        decisionTextEl.style.opacity = 0;
        const flyDirection = currentX > 0 ? 1 : -1;
        cardEl.style.transform = `translateX(${flyDirection * 500}px) rotate(${flyDirection * 30}deg)`;
        
        // Handle the decision after the card flies off
        setTimeout(() => {
            cardEl.style.transition = 'none';
            cardEl.style.transform = 'translateX(0) rotate(0)'; // Reset position off-screen
            handleDecision(currentX > 0 ? 'right' : 'left');
        }, 200);
    }
    currentX = 0;
}

function addDragListeners() {
    cardEl.addEventListener('mousedown', onDragStart);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
    
    cardEl.addEventListener('touchstart', onDragStart, { passive: false });
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);
}
