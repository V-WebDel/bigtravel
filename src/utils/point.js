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
  const datePoint = dayjs(date).format('D MMM');

  return datePoint;
}


// Время в формате "часы минуты"
function humanizePointTime(time) {
  const timePoint = dayjs(time).format('HH:mm');

  return timePoint;
}


// // Прошедшее события
// const isFuturePoint = (date) => date && dayjs(date).isBefore(dayjs(), 'D');

// // Будущие события
// const isPastPoint = (date) => date && dayjs(date).isAfter(dayjs(), 'D');


// Будущие события
const isPastPoint = (dateBegin) => {
  if (dayjs().isAfter(dateBegin, 'D') > 0) {
    return true;
  }
  else {
    return false;
  }
};

// Прошедшее события
const isFuturePoint = (dateEnd) => {
  if (dayjs().isBefore(dateEnd, 'D') > 0) {
    return true;
  }
  else {
    return false;
  }
};

export { formatDuration, humanizePointDateFull, humanizePointDateForm, humanizePointDateTime, humanizePointDate, humanizePointTime, isFuturePoint, isPastPoint };
