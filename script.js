function calculateScore() {
  const inputArray = document.getElementById('input-array').value.split(' ');
  const scoreResult = document.getElementById('score-result');

  if (inputArray.length !== 20) {
    scoreResult.textContent = '원소 개수가 맞지 않는 것 같아요!';
    return;
  }

  const arr = inputArray.map(Number);
  let score = 0;

  if (arr.some(isNaN)) {
    scoreResult.textContent = '숫자 말고 다른 게 들어간 것 같아요!';
    return;
  }

  const exist = new Array(200).fill(0);
  for (let i = 0; i < 20; i++) {
    let cur = 0;
    for (let j = i; j < 20; j++) {
      cur += arr[j];
      if (cur < 200) {
        exist[cur] = 1;
      }
    }
  }

  for (let i = 1; i < 200; i++) {
    if (exist[i] === 0) {
      score = i - 1;
      break;
    }
  }

  scoreResult.textContent = `${score}점이에요!`;
}
