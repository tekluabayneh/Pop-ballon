import './style.css'
import CreateGame from './Game/index'

// Fix 1: Use correct selector for the button
const StartButton = document.querySelector("button")!;

// Fix 2: Use correct event name "addEventListener" (not "addEventListner")
//        And pass just the function, not `() => startGame()`
StartButton.addEventListener("click", startGame);

// Your startGame function
function startGame() {
  document.getElementById('home-screen')!.style.display = 'none';
  document.getElementById('game-container')!.style.display = 'block';

  // Start Phaser game
  CreateGame();
}

