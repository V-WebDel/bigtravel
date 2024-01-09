import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


// Функция помещает задачи без даты в конце списка, возвращая нужный вес для колбэка sort
export const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortPointUp = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

export const sortPointDown = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.date, pointB.date);

  return weight ?? dayjs(pointB.date).diff(dayjs(pointA.date));
};


export const comparePrice = (pointA, pointB) => {
  const pointPriceA = pointA.basePrice;
  const pointPriceB = pointB.basePrice;
  return pointPriceB - pointPriceA;
};

export const compareDuration = (pointA, pointB) => {
  const pointDurationA = dayjs(pointA.dateTo) - dayjs(pointA.dateFrom);
  const pointDurationB = dayjs(pointB.dateTo) - dayjs(pointB.dateFrom);
  return pointDurationB - pointDurationA;
};

export const compareTwoDates = (dateBegin, dateEnd) => {
  if (dayjs(dateEnd) > dayjs(dateBegin)) {
    return true;
  }
  else {
    return false;
  }
};


// Продолжительность события
export const formatDuration = (start, end) => {

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

export { humanizePointDateFull, humanizePointDateForm, humanizePointDateTime, humanizePointDate, humanizePointTime, isFuturePoint, isPastPoint };
