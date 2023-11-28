import {createElement} from '../render.js';


export default class ListEmptyMsgView {
  getTemplate() {
    return `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`;
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
