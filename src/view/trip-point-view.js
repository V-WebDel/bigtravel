import {createElement} from '../render.js';


export default class TripEventsView {
  #element = null;

  get template() {
    return `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>`;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
