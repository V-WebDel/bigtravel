import {createElement} from '../render.js';


export default class EventAddBtnView {
  #element = null;

  get template() {
    return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
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
