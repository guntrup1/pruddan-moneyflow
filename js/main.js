"use strict";


// Функция для запуска таймера
function startTimer(duration) {
  let timerElement = document.getElementById('timer');
  let btn = document.getElementById('btn');

  // Получаем время старта таймера из localStorage
  let startTime = localStorage.getItem('startTime');
  if (!startTime) {
    // Если время старта не сохранено, устанавливаем текущее время
    startTime = Date.now();
    localStorage.setItem('startTime', startTime);
  }

  // Функция для обновления таймера
  function updateTimer() {
    let now = Date.now();
    let elapsedTime = now - startTime;
    let remainingTime = duration - elapsedTime;

    // Проверяем, не истекло ли время
    if (remainingTime <= 0) {
      // Если время истекло, удаляем время старта и останавливаем таймер
      localStorage.removeItem('startTime');
      clearInterval(interval);

      timerElement.classList.add('timer-ends');
      btn.classList.add('btn-ends');
      btn.href = '/';


      timerElement.textContent = 'ТИ ЗАПІЗНИВСЯ !';
      localStorage.setItem('startTime', '0');
      // Генерируем событие 'timerFinished'
      let event = new Event('timerFinished');
      document.dispatchEvent(event);

    } else {
      // Обновляем элемент с таймером
      let hours = Math.floor(remainingTime / 3600000);
          hours = hours < 10 ? "0" + hours : hours;
      let minutes = Math.floor((remainingTime % 3600000) / 60000);
          minutes = minutes < 10 ? "0" + minutes : minutes;
      let seconds = Math.floor((remainingTime % 60000) / 1000);
          seconds = seconds < 10 ? "0" + seconds : seconds;
      timerElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }

  // Обновляем таймер каждую секунду
  let interval = setInterval(updateTimer, 1000);
  updateTimer(); // Вызываем функцию сразу, чтобы отобразить оставшееся время
}

// Запускаем таймер на 24 часа (86400000 миллисекунд)
startTimer(86400000);





