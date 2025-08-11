// This script runs after the entire page is loaded.
// It manages the menu and starts the game.

window.onload = () => {
    const mainMenu = document.getElementById('main-menu');
    const gameContainer = document.getElementById('game-container');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');

    function showMainMenu() {
        gameContainer.classList.add('hidden');
        gameContainer.classList.remove('flex');
        mainMenu.classList.remove('hidden');
    }

    function startGame() {
        mainMenu.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        gameContainer.classList.add('flex');
        initGame();
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', showMainMenu);

    // Show the main menu by default when the page loads
    showMainMenu();
};
