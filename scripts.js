// Countdown global variables
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const animateTimer = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // Clear any running timers.
  clearInterval(countdown);
  // animateTimer.classList.remove(".shake-timer");
  // The current timestamp in milliseconds.
  const now = Date.now();
  // Multiply by 1000 bc now is in milliseconds.
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 10) {
      // animateTimer.classList.add(".shake-animation");
      // animateTimer.setAttribute("id", "shake-animation")
    }

    // Check for stop
    if (secondsLeft < 0) {
      clearInterval(countdown);
      document.getElementById("display-time-left").innerHTML = "DONE";
      // Add completed animation
      return;
    }
    // Display seconds
    displayTimeLeft(secondsLeft);
  }, 1000);
}

if (timer != true) {
  document.getElementById("display-time-left").innerHTML = "Hi";
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = `Timer: ${display}`;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `EXPIRES: ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});