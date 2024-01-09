import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizePointDateForm, humanizePointTime } from '../utils/point.js';

import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';


const BLANK_POINT = {
  type: 'flight',
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: {name: '', description: ' ', pictures: []},
  offers: [],
  // deleteCancel: true, // Параметр для условия отображения кнопки Cancel или Delete (в данный момент не задействован т.к. условие привязано к параметру point.id)
};

const createEventTypes = (typesArr, typeCurrent) => {

  const typeList = [];

  if(typesArr !== undefined) {
    const typeArrays = typesArr.map((obj) => obj.type);

    typeArrays.forEach((item) => {
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
  }
};

const createDestinationNames = (destinationArr) => {
  const destinationList = [];

  const cityArrays = destinationArr.map((obj) => obj.name);

  cityArrays.forEach((item) => {
    destinationList.push(`<option value="${item}"></option>`);
  });

  return destinationList.join(' ');
};


const editPointTemplate = (point = {}, offersList, destinations) => {

  const {
    basePrice = 0,
    dateFrom = null,
    dateTo = null,
    type = 'flight',
    offers = [],
    destination = {name: '', description: ' ', pictures: []},
    // deleteCancel = false, // Параметр для условия отображения кнопки Cancel или Delete (в данный момент не задействован т.к. условие привязано к параметру point.id)
    isDisabled,
    isSaving,
    isDeleting,
  } = point;

  const timePointFrom = dateFrom !== null ? humanizePointTime(dateFrom) : '';
  const timePointTo = dateTo !== null ? humanizePointTime(dateTo) : '';
  const datePointFrom = dateFrom !== null ? humanizePointDateForm(dateFrom) : '';
  const datePointTo = dateTo !== null ? humanizePointDateForm(dateTo) : '';

  const isSubmitDisabled = (destination.name === '' || basePrice === '' || dateFrom === null || dateTo === null);

  const getOfferList = (listOffers, currentType) => {
    const offerList = [];

    if (listOffers !== undefined) {
      const currentOffer = listOffers.find((itemOffer) => itemOffer.type === currentType);

      if (currentOffer) {
        currentOffer.offers.forEach((item, index) => {
          const isChecked = offers.includes(item.id);
          offerList.push(`
            <div class="event__offer-selector">
              <input class="event__offer-checkbox visually-hidden" id="event-offer-luggage-${index + 1}" type="checkbox" name="event-offer-luggage" ${isChecked ? 'checked' : ''}>
              <label class="event__offer-label" for="event-offer-luggage-${index + 1}">
                <span class="event__offer-title">${item.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${item.price}</span>
              </label>
            </div>
          `);
        });
      }

      return offerList.join(' ');
    }
  };


  const createDescription = (cityName, descriptionArray) => {

    const hasCity = descriptionArray.some((object) => object.name === cityName);

    if (descriptionArray && hasCity) {
      const descriptionItem = descriptionArray.filter((object) => object.name === cityName);

      if(descriptionItem) {
        return `<p class="event__destination-description">${descriptionItem[0].description}</p>`;
      }

      return '';
    }
  };

  const createPhotos = (cityName, descriptionArray) => {

    const hasCity = descriptionArray.some((object) => object.name === cityName);

    if (descriptionArray && hasCity) {
      const descriptionItem = descriptionArray.filter((object) => object.name === cityName);
      const photosList = [];

      descriptionItem[0].pictures.forEach((item) => {
        photosList.push(
          `<img class="event__photo" src="${item.src}" alt="${item.description}">`
        );
      });

      if(photosList.length !== 0){
        return photosList.join(' ');
      }

      return '';
    }
  };

  const getSectionDestination = () => {

    const description = createDescription(destination.name, destinations);
    const photos = createPhotos(destination.name, destinations);

    if( description !== undefined) {
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

  const showListOffers = getOfferList(offersList, type) !== undefined ? `<section class="event__section  event__section--offers"><h3 class="event__section-title  event__section-title--offers">Offers</h3><div class="event__available-offers">${getOfferList(offersList, type)}</div></section>` : '';
  const eventTypes = createEventTypes(offersList, type);
  const eventDestinationNames = createDestinationNames(destinations);
  const sectionDestination = getSectionDestination();
  const btnDeleteCancel = point.id ? `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>` : `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Cancel</button>`;

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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">

              ${eventDestinationNames}

            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${datePointFrom} ${timePointFrom}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${datePointTo} ${timePointTo}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled || isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>

          ${btnDeleteCancel}

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


export default class PointAddAndEditView extends AbstractStatefulView {
  #datepicker = null;
  #offersList = null;
  #destinations = null;

  constructor(point = BLANK_POINT, offersList, destinations) {
    super();
    this.#offersList = offersList;
    this.#destinations = destinations;

    this._state = PointAddAndEditView.parsePointToState(point);

    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  get template() {
    return editPointTemplate(this._state, this.#offersList, this.#destinations);
  }

  reset = (point) => {
    this.updateElement(
      PointAddAndEditView.parsePointToState(point),
    );
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepickerFrom = () => {
    const inputElement = this.element.querySelector('input[name="event-start-time"]');

    if (this._state.dateFrom) {
      this.#datepicker = flatpickr(
        inputElement,
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateFrom,
          onChange: this.#dateFromChangeHandler,
        }
      );
    } else {
      inputElement.addEventListener('focus', () => {
        this.#datepicker = flatpickr(
          inputElement,
          {
            minDate: new Date(),
            enableTime: true,
            dateFormat: 'd/m/y H:i',
            defaultDate: new Date(),
            onChange: this.#dateFromChangeHandler,
          }
        );
      }, { once: true });
    }
  };

  #setDatepickerTo = () => {
    const inputElement = this.element.querySelector('input[name="event-end-time"]');

    if (this._state.dateTo) {
      this.#datepicker = flatpickr(
        inputElement,
        {
          minDate: this._state.dateFrom,
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateTo,
          onChange: this.#dateToChangeHandler,
        }
      );
    } else {
      inputElement.addEventListener('focus', () => {
        this.#datepicker = flatpickr(
          inputElement,
          {
            minDate: this._state.dateFrom,
            enableTime: true,
            dateFormat: 'd/m/y H:i',
            defaultDate: this._state.dateTo,
            onChange: this.#dateToChangeHandler,
          }
        );
      }, { once: true });
    }
  };


  setCloseClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick(PointAddAndEditView.parsePointToState(this._state));
  };


  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(PointAddAndEditView.parseStateToPoint(this._state));
  };


  #typeClickHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.currentTarget.value,
      offers: []
    });
  };

  #destinationInputChangeHandler = (evt) => {
    evt.preventDefault();

    const hasCity = this.#destinations.some((object) => object.name === evt.target.value);
    const selectedDestination = this.#destinations.find((object) => object.name === evt.target.value);

    if (selectedDestination && hasCity) {
      const { description, pictures } = selectedDestination;

      this.updateElement({
        destination: {
          name: evt.target.value,
          description: description,
          pictures: pictures,
        }
      });
    } else {
      this.updateElement({
        destination: {
          name: evt.target.value,
          description: ' ',
          pictures: [],
        }
      });
    }
  };

  #priceInputChangeHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      basePrice: +evt.target.value
    });
  };

  #offersCheckChangeHandler = () => {
    const arrOffers = [];

    this.element.querySelectorAll('input[name="event-offer-luggage"]:checked').forEach((element, index) => {
      arrOffers.push(index + 1);
    });

    this._setState({
      offers: arrOffers
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(PointAddAndEditView.parseStateToPoint(this._state));
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };


  #setInnerHandlers = () => {
    this.element.querySelectorAll('input[name="event-type"]').forEach((element) => {
      element.addEventListener('change', this.#typeClickHandler);
    });
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceInputChangeHandler);
    this.element.querySelectorAll('input[name="event-offer-luggage"]').forEach((element) => {
      element.addEventListener('change', this.#offersCheckChangeHandler);
    });
  };


  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state,
      type: state.type || 'flight',
      basePrice: state.basePrice || 0,
      dateFrom: state.dateFrom || new Date(),
      dateTo: state.dateTo || new Date(),
      id: state.id || '',
      isFavorite: state.isFavorite || false,
      offers: state.offers || [],
    };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
    this.setCloseClickHandler(this._callback.editClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

}
