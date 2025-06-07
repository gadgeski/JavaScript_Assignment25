const display = document.getElementById("display");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");

let startTime; // タイマー開始時のタイムスタンプ
let elapsedTime = 0; // 経過時間（ミリ秒）
let timerInterval; // setIntervalのID

function formatTime(ms) {
  const hours = Math.floor(ms / 3600000);
  ms %= 3600000;
  const minutes = Math.floor(ms / 60000);
  ms %= 60000;
  const seconds = Math.floor(ms / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10); // 10ミリ秒単位で表示

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
    String(milliseconds).padStart(2, "0"),
  ].join(":");
}

function startTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;

  startTime = Date.now() - elapsedTime; // 停止していた場合はその時点から再開
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
  }, 10); // 10ミリ秒ごとに更新
}

function stopTimer() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(timerInterval); // タイマーを停止
}

function resetTimer() {
  stopTimer(); // まずタイマーを停止
  elapsedTime = 0; // 経過時間をリセット
  display.textContent = formatTime(elapsedTime); // 表示をリセット
  startButton.disabled = false; // スタートボタンを再度有効化
  resetButton.disabled = true; // リセットボタンを無効化
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

// 初期表示を00:00:00.00にする
display.textContent = formatTime(0);
