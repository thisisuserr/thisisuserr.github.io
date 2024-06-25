from flask import Flask, request, render_template
import re

app = Flask(__name__)

def f(arr):
    if len(arr) != 20:
        n = len(arr)
        return f'배열의 원소 개수가 맞지 않아요! 주어진 원소 개수: {n}\n다시 입력해주세요.'
    else:
        for i in range(len(arr)):
            s = str(arr[i])
            if re.match('[^\d]', s):
                return f'입력 상태가 올바르지 않아요! 올바르지 않은 입력: {s}\n다시 입력해주세요.'
            else:
                arr[i] = int(arr[i])

        exist = [0] * 200
        for i in range(20):
            cur = 0
            for j in range(i, 20):
                cur += arr[j]
                if cur < 200:
                    exist[cur] = 1

        for i in range(1, 200):
            if exist[i] == 0:
                return f'점수: {i - 1}'
    return '정상 처리되었습니다.'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    arr = request.form['array_input'].split()
    result = f(arr)
    return render_template('index.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)
