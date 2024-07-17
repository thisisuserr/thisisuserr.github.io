const nInput = document.getElementById('n-input');
const startButton = document.getElementById('start-button');
const gameScreen = document.getElementById('game-screen');
const probleminfo = document.getElementById('probleminfo');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-button');
const actionButtons = document.getElementById('action-buttons');
const remainingStones = document.getElementById('remaining-stones');
const yourLastMove = document.getElementById('your-last-move');
const computerLastMove = document.getElementById('computer-last-move');

let n, cur, playerPrv, botPrv, win, prevOne;

function line() {
  console.log('-------------------------------------------------------');
}

function remain() {
  remainingStones.textContent = cur;
}

function botGet(c) {
  console.log(`The computer took ${c} stones!`);
  cur += c;
  playerPrv = c;
  computerLastMove.textContent = c;
}

function startGame() 
{
  n = parseInt(nInput.value);
  cur = 0;
  playerPrv = 0; yourLastMove.textContent = 0;
  botPrv = 0; computerLastMove.textContent = 0;
  win = false;
  prevOne = false;

  document.getElementById('input-container').classList.add('hidden');
  gameScreen.classList.remove('hidden');
  actionButtons.classList.remove('hidden');
  probleminfo.classList.add('hidden');

  remain();
  updateActionButtons();
}

function updateActionButtons() {
  actionButtons.innerHTML = '';
  for (let i = 1; i <= Math.min(playerPrv + 1, n - cur); i++) {
    const button = document.createElement('button');
    button.textContent = cur + i;
    button.addEventListener('click', () => {
      cur += i;
      botPrv = i;
      yourLastMove.textContent = i;
      updateGame();
    });
    actionButtons.appendChild(button);
  }
}

function updateGame() 
{
  if (cur >= n) {
    remain();
    showResult('축하합니다!');
    return;
  }

  if (win) {
    if (prevOne) {
      botGet(3 - botPrv);
      prevOne = false;
    } else if (botPrv === 1) {
      botGet(1);
      prevOne = true;
    } else {
      botGet(5 - botPrv);
    }
    line();
    remain();
  } 
  else if (cur === 1 && ((n % 5) % 3) !== 1) 
  {
    win = true;
    if (n % 5 === 0) {
      botGet(1);
      prevOne = true;
    } else if (n % 5 === 2) {
      botGet(1);
    } else if (n % 5 === 3) {
      botGet(2);
    }
    line();
    remain();
  } 
  else 
  {
    let flag = false;
    for (let i = 1; i <= botPrv; i++) 
    {
      if ((n - cur - i) % 5 === 0) 
      {
        win = true;
        botGet(i); line();
        flag = true; break;
      }
    }
    if (!flag) 
    {
      const nextMove = Math.floor(Math.random() * botPrv) + 1;
      botGet(nextMove); line();
    }
  }

  if (cur >= n) 
  {
    showResult('아쉽게도 패배했어요..');
  } 
  else 
  {
    updateActionButtons();
  }

  remain();
}

function showResult(message) 
{
  resultMessage.textContent = `${message}`;
  actionButtons.classList.add('hidden');
  resultScreen.classList.remove('hidden');
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', () => {
  document.getElementById('input-container').classList.remove('hidden');
  actionButtons.classList.remove('hidden');
  gameScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  probleminfo.classList.remove('hidden');
});
