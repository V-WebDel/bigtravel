import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


// Продолжительность события
const formatDuration = (start, end) => {

  const diff = dayjs.duration(dayjs(end).diff(dayjs(start)));

  const days = diff.days();
  const hours = diff.hours();
  const minutes = diff.minutes();

  let result = '';

  if (days > 0) {
    result += `${days}D `;
  }

  if (hours > 0 || days > 0) {
    result += `${hours}H `;
  }

  result += `${minutes}M`;

  return result;
};


// Дата в формате "год месяц день"
function humanizePointDateFull(date) {
  const datePoint = dayjs(date).format('YYYY-MM-DD');

  return datePoint;
}

// Дата в формате "день месяц год"
function humanizePointDateForm(date) {
  const datePoint = dayjs(date).format('DD/MM/YY');

  return datePoint;
}

// Дата и время в формате "год месяц день часы минуты"
function humanizePointDateTime(date) {
  const datePoint = dayjs(date).format('YYYY-MM-DDTHH:mm');

  return datePoint;
}


// Дата в формате "день месяц"
function humanizePointDate(date) {
  const datePoint = dayjs(date).format('D MMMM');

  return datePoint;
}


// Время в формате "часы минуты"
function humanizePointTime(time) {
  const timePoint = dayjs(time).format('HH:mm');

  return timePoint;
}


// Рандомное число в заданном диапазаоне
function getRandomInteger(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}

// Рандомное число в заданном диапазаоне и указанием числа после запятой
function getRandomNumber(min, max, digits = 1) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  const randomNumber = Math.random() * (upper - lower) + lower;

  return +randomNumber.toFixed(digits);
}

// Рандомное количество элементов массива
function getRandomElements(arr) {

  const randomElements = [];
  const cloneArray = arr.slice();

  for (let i = 0; i < getRandomNumber(0, arr.length, 0); i++) {
    const randomIndex = Math.floor(Math.random() * cloneArray.length);
    randomElements.push(cloneArray.splice(randomIndex, 1)[0]);
  }

  return randomElements;
}

// Рандомный элемент массива
function getRandomElement(arr) {

  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
}


// Функция debounce для устранения дребезга
function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


// Функция throttle для пропуска кадров
function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}


export { getRandomNumber, getRandomElements, getRandomElement, debounce, throttle, formatDuration, humanizePointDateFull, humanizePointDateForm, humanizePointDateTime, humanizePointDate, humanizePointTime };
