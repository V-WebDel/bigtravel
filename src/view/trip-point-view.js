import {createElement} from '../render.js';


export default class TripEventsView {
  getTemplate() {
    return `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>`;
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
