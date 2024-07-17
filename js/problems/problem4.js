const aValue = document.getElementById('a-value');
const bValue = document.getElementById('b-value');
const multiplyAButton = document.getElementById('multiply-a');
const divideAButton = document.getElementById('divide-a');
const subtractBButton = document.getElementById('subtract-b');
const multiplyBButton = document.getElementById('multiply-b');
const divideBButton = document.getElementById('divide-b');
const subtractAButton = document.getElementById('subtract-a');
const resetButton = document.getElementById('reset');
const cancelButton = document.getElementById('cancel');
const gameOverContainer = document.getElementById('game-over-container');
const operationCountElement = document.getElementById('operation-count');
const playAgainButton = document.getElementById('play-again');
const aRes = document.getElementById('a-res');
const bRes = document.getElementById('b-res');

const initA = 83392300724381629557615557568n;
const initB = 30470716817048466190527344000n;
const res = 29348032n;

let a = initA;
let b = initB;
let operationCount = 0;

let stackA = [];
let stackB = [];

function savelog(){
  stackA.push(a);
  stackB.push(b);
}

function updateValues() {
  aValue.textContent = a;
  bValue.textContent = b;
  aRes.textContent = a;
  bRes.textContent = b;
  cnt.textContent = operationCount;
  updateButtonStates();
}

function updateButtonStates() {
  divideAButton.disabled = a % 2n !== 0n && a > 0n;
  divideBButton.disabled = b % 2n !== 0n && b > 0n;
  subtractAButton.disabled = b < a;
  subtractBButton.disabled = a < b;
  cancelButton.disabled = operationCount == 0;
}

function multiplyA() {
  savelog();
  a *= 2n;
  operationCount++;
  updateValues();
}

function divideA() {
  savelog();
  a /= 2n;
  operationCount++;
  updateValues();
}

function subtractB() {
  savelog();
  a -= b;
  operationCount++;
  updateValues();
}

function multiplyB() {
  savelog();
  b *= 2n;
  operationCount++;
  updateValues();
}

function divideB() {
  savelog();
  b /= 2n;
  operationCount++;
  updateValues();
}

function subtractA() {
  savelog();
  b -= a;
  operationCount++;
  updateValues();
}

function reset() {
  if (confirm('정말 초기화하시겠어요?')) {
    a = initA;
    b = initB;
    operationCount = 0;
    updateValues();
    gameOverContainer.classList.add('hidden');
  }
}

function cancel() {
  console.log(stackA.length);
  console.log(stackA[stackA.length - 1]);
  
  a = stackA[stackA.length - 1];
  stackA.pop();
  b = stackB[stackB.length - 1];
  stackB.pop();
  operationCount -= 1;
  updateValues();
}

function gameOver() {
  gameOverContainer.classList.remove('hidden');
  operationCountElement.textContent = operationCount;
  document.querySelectorAll('.btn').forEach(btn => btn.disabled = true);
  playAgainButton.disabled = false;
}

multiplyAButton.addEventListener('click', multiplyA);
divideAButton.addEventListener('click', divideA);
subtractBButton.addEventListener('click', subtractB);
multiplyBButton.addEventListener('click', multiplyB);
divideBButton.addEventListener('click', divideB);
subtractAButton.addEventListener('click', subtractA);
resetButton.addEventListener('click', reset);
cancelButton.addEventListener('click', cancel);

playAgainButton.addEventListener('click', () => {
  a = initA;
  b = initB;
  stackA = [];
  stackB = [];
  operationCount = 0;
  updateValues();
  gameOverContainer.classList.add('hidden');
  document.querySelectorAll('.btn').forEach(btn => btn.disabled = false);
  updateButtonStates();
});

updateValues();

setInterval(() => {
  if ((a === 0n && b === res) || (b === 0n && a === res)) {
    gameOver();
  }
}, 100);
