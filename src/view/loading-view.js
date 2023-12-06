import {createElement} from '../render.js';


export default class LoadingView {
  #element = null;

  get template() {
    return '<p class="trip-events__msg">Loading...</p>';
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
