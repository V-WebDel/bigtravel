import {createElement} from '../render.js';


export default class LoadingView {
  getTemplate() {
    return '<p class="trip-events__msg">Loading...</p>';
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
