import {createElement} from '../render.js';


export default class ListEmptyMsgView {
  #element = null;

  get template() {
    return `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`;
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
