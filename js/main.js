// This script runs after the entire page is loaded.
// It manages the menu and starts the game with a clean, robust flow.

window.onload = () => {
    const mainMenu = document.getElementById('main-menu');
    const nameScreen = document.getElementById('name-screen');
    const gameContainer = document.getElementById('game-container');
    
    const startGameButton = document.getElementById('start-game-button');
    const continueButton = document.getElementById('continue-button');
    const restartButton = document.getElementById('restart-button');
    const playerNameInput = document.getElementById('player-name-input');

    function showScreen(screenToShow) {
        // First, hide all screens
        mainMenu.classList.add('hidden');
        nameScreen.classList.add('hidden');
        gameContainer.classList.add('hidden');

        // Then, show the requested screen
        screenToShow.classList.remove('hidden');
    }

    function goToNameScreen() {
        showScreen(nameScreen);
        playerNameInput.focus();
    }

    function startGame() {
        const playerName = playerNameInput.value;
        showScreen(gameContainer);
        initGame(playerName);
    }

    // Event listeners for the new flow
    startGameButton.addEventListener('click', goToNameScreen);
    continueButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', () => showScreen(mainMenu));

    // Allow starting game by pressing Enter in the name input
    playerNameInput.addEventListener('keyup', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            continueButton.click();
        }
    });

    // Show the main menu by default when the page loads.
    showScreen(mainMenu);
};
