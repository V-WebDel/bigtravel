import {createElement} from '../render.js';


export default class TripEventsListView {
  #element = null;

  get template() {
    return `<ul class="trip-events__list">
    </ul>`;
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
