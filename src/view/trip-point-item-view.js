import { createElement } from '../render.js';
import { getRandomElements, formatDuration, humanizePointDateFull, humanizePointDateTime, humanizePointDate, humanizePointTime } from '../util.js';

const createPointTemplate = (point) => {
  const {
    date = null,
    name = '',
    type = 'flight',
    basePrice = '',
    dateFrom = null,
    dateTo = null,
    isFavorite = false,
    offers,
  } = point;

  const datePointFull = date !== null ? humanizePointDateFull(date) : '';
  const datePoint = date !== null ? humanizePointDate(date) : '';
  const timePointFrom = dateFrom !== null ? humanizePointTime(dateFrom) : '';
  const timePointTo = dateTo !== null ? humanizePointTime(dateTo) : '';
  const dateTimePointFrom = dateFrom !== null ? humanizePointDateTime(dateFrom) : '';
  const dateTimePointTo = dateTo !== null ? humanizePointDateTime(dateTo) : '';

  const durationAmount = formatDuration(dateFrom, dateTo);


  const offersElements = (arr) => {

    if (type in arr) {
      const offersArray = arr[type];
      const offerList = [];

      getRandomElements(offersArray).forEach((item) => {
        offerList.push(
          `<li class="event__offer">
            <span class="event__offer-title">${item.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
          </li>`
        );
      });

      return offerList.join(' ');
    } else {
      return '';
    }

    // if (Object.prototype.hasOwnProperty.call(arr, type)) {
    //   const offersArray = arr[type];
    //   const offerList = [];
    //   getRandomElements(offersArray).forEach((item) => {
    //     offerList.push(
    //       `<li class="event__offer">
    //         <span class="event__offer-title">${item.title}</span>
    //         &plus;&euro;&nbsp;
    //         <span class="event__offer-price">${item.price}</span>
    //       </li>`
    //     );
    //   });

    //   return offerList.join(' ');
    // }
  };

  // const showListOffers = offersElements(offers) === '' ? `<ul class="event__selected-offers">${offersElements(offers)}</ul>` : '';

  const favoriteClassName = isFavorite ? 'event__favorite-btn event__favorite-btn--active' : 'event__favorite-btn';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${datePointFull}">${datePoint}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateTimePointFrom}">${timePointFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTimePointTo}">${timePointTo}</time>
          </p>
          <p class="event__duration">${durationAmount}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>

        <ul class="event__selected-offers">
          ${offersElements(offers)}
        </ul>

        <button class="${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripPointItemView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createPointTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
