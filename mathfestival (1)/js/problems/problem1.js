const initialArray = [3, 10, 8, 4, 11, 6, 9, 1];
let score = 0;
let infotext = "버튼을 최대한 적게 사용해서 오름차순으로 정렬되게 만드세요!";

function createArrayDisplay() {
  const arrayContainer = document.getElementById('array-container');
  arrayContainer.innerHTML = '';

  initialArray.forEach((num, index) => {
    const numberContainer = document.createElement('div');
    numberContainer.classList.add('number-container');

    const upButton = document.createElement('button');
    upButton.textContent = '▲';
    upButton.addEventListener('click', () => handleButtonClick(index, true));

    const numberDisplay = document.createElement('span');
    numberDisplay.textContent = num;

    const downButton = document.createElement('button');
    downButton.textContent = '▼';
    downButton.addEventListener('click', () => handleButtonClick(index, false));

    numberContainer.appendChild(upButton);
    numberContainer.appendChild(numberDisplay);
    numberContainer.appendChild(downButton);
    arrayContainer.appendChild(numberContainer);
  });

  updateScore();
}

function handleButtonClick(index, isUp) {
  if (isUp) {
    initialArray[index]++;
  } else {
    initialArray[index]--;
  }
  score++;
  createArrayDisplay();
  checkIfSorted();
}

function checkIfSorted() {
  const isSorted = initialArray.slice().sort((a, b) => a - b).every((num, index) => num === initialArray[index]);
  if (isSorted) {
    infotext = "축하합니다!";
    hideButtons();
    showResetButton();
    
    const informationText = document.getElementById('infotext');
    informationText.textContent = infotext;
  }
}

function hideButtons() {
  const buttons = document.querySelectorAll('#array-container button');
  buttons.forEach(button => button.style.display = 'none');
}

function showResetButton() {
  const resetButton = document.getElementById('reset-button');
  resetButton.style.display = 'inline-block';
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  score = 0;
  infotext = "버튼을 최대한 적게 사용해서 오름차순으로 정렬되게 만드세요!";
  initialArray.length = 0;
  initialArray.push(...[3, 10, 8, 4, 11, 6, 9, 1]);
  createArrayDisplay();
  const resetButton = document.getElementById('reset-button');
  resetButton.style.display = 'none';
}

function updateScore() {
  const scoreDisplay = document.getElementById('score');
  scoreDisplay.textContent = score;

  const informationText = document.getElementById('infotext');
  informationText.textContent = infotext;
}

createArrayDisplay();
resetGame();