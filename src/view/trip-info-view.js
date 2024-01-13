import AbstractView from '../framework/view/abstract-view.js';

const createInfo = (citiesName, dateStart, dateEnd, totalCost) => (
  `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${citiesName}</h1>

      <p class="trip-info__dates">${dateStart}&nbsp;&mdash;&nbsp;${dateEnd}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>
  </section>`

);

export default class TripInfoView extends AbstractView {
  #citiesName = null;
  #dateStart = null;
  #dateEnd = null;
  #totalCost = null;

  constructor(citiesName, dateStart, dateEnd, totalCost) {
    super();
    this.#citiesName = citiesName;
    this.#dateStart = dateStart;
    this.#dateEnd = dateEnd;
    this.#totalCost = totalCost;
  }

  get template() {
    return createInfo(this.#citiesName, this.#dateStart, this.#dateEnd, this.#totalCost);
  }
}
