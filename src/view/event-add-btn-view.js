import {createElement} from '../render.js';


export default class EventAddBtnView {
  getTemplate() {
    return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
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
