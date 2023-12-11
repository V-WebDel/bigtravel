import AbstractView from '../framework/view/abstract-view.js';

const createTripEvents = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`
);

export default class TripEventsView extends AbstractView {
  get template() {
    return createTripEvents();
  }
}
