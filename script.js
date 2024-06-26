function calculateScore() {
  const inputNumbers = document.querySelectorAll('.input-number');
  const arr = Array.from(inputNumbers).map(input => parseInt(input.value));
  const scoreResult = document.getElementById('score-result');

  if (arr.length !== 20) {
    scoreResult.textContent = '입력이 잘못된 것 같네요.. 혹시 값이 빠지지는 않았나요?';
    return;
  }

  if (arr.some(isNaN)) {
    scoreResult.textContent = '입력이 잘못된 것 같네요.. 숫자 말고 다른 값이 들어갔나요?';
    return;
  }

  let score = 0;

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
  

  scoreResult.textContent = `${score}점을 맞으셨어요!`;
}

