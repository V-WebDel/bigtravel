import {createElement} from '../render.js';
import { getRandomElements, humanizePointDateForm, humanizePointTime } from '../util.js';

const createDescription = (description) => {
  if( description !== undefined && description.length !== 0 ) {
    return `<p class="event__destination-description">${description}</p>`;
  } else {
    return '';
  }
};

const createPhotos = (photos) => {
  if(photos !== undefined) {
    const photosList = [];

    getRandomElements(photos).forEach((item) => {
      photosList.push(
        `<img class="event__photo" src="${item.src}" alt="${item.description}">`
      );
    });

    if(photosList.length !== 0){
      return photosList.join(' ');
    }
  } else {
    return '';
  }
};


const createEventTypes = (typesArr, typeCurrent) => {
  const typeList = [];
  typesArr.forEach((item) => {
    if(item === typeCurrent) {
      typeList.push(`<div class="event__type-item">
        <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" checked>
        <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
      </div>`);
    } else {
      typeList.push(`<div class="event__type-item">
        <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
        <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
      </div>`);
    }
  });

  return typeList.join(' ');
};

const createDestinationNames = (destinationArr) => {
  const destinationList = [];
  destinationArr.forEach((item) => {
    destinationList.push(`<option value="${item}"></option>`);
  });

  return destinationList.join(' ');
};


const editPointTemplate = (point = {}) => {
  const {
    name = '',
    type = 'flight',
    basePrice = '',
    dateFrom = null,
    dateTo = null,
    Destination,
    OffersByType,
    LocalPoint,
  } = point;

  const timePointFrom = dateFrom !== null ? humanizePointTime(dateFrom) : '';
  const timePointTo = dateTo !== null ? humanizePointTime(dateTo) : '';
  const datePointFrom = dateFrom !== null ? humanizePointDateForm(dateFrom) : '';
  const datePointTo = dateTo !== null ? humanizePointDateForm(dateTo) : '';

  const offersElements = (arr) => {

    if (Object.prototype.hasOwnProperty.call(arr, type)) {
      const offersArray = arr[type];
      const offerList = [];

      offersArray.forEach((item) => {
        if (LocalPoint.offers.includes(item.id)) {
          offerList.push(`<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">${item.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${item.price}</span>
            </label>
          </div>`);
        } else {
          offerList.push(`<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">${item.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${item.price}</span>
            </label>
          </div>`);
        }
      });

      return offerList.join(' ');
    }
  };

  const getSectionDestination = () => {

    const description = createDescription(Destination.description);
    const photos = createPhotos(Destination.pictures);

    if( description !== '') {
      let photosElement = '';

      const descrElement = `<p class="event__destination-description">${description}</p>`;

      if(photos !== '' && photos !== undefined) {
        photosElement = `<div class="event__photos-container">
          <div class="event__photos-tape">${photos}</div>
        </div>`;
      }
      return `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${descrElement} ${photosElement}
      </section>`;
    } else {
      return '';
    }
  };

  const showListOffers = offersElements(OffersByType.offers) !== undefined ? `<section class="event__section  event__section--offers"><h3 class="event__section-title  event__section-title--offers">Offers</h3><div class="event__available-offers">${offersElements(OffersByType.offers)}</div></section>` : '';
  const eventTypes = createEventTypes(OffersByType.type, type);
  const eventDestinationNames = createDestinationNames(Destination.name);
  const sectionDestination = getSectionDestination();

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">

        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                ${eventTypes}
                
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">

              ${type}

            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">

              ${eventDestinationNames}

            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${datePointFrom} ${timePointFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${datePointTo} ${timePointTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">

          ${showListOffers}
          
          ${sectionDestination}

        </section>
      </form>
    </li>`
  );
};

export default class PointAddAndEditView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get template() {
    return editPointTemplate(this.#point);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
