// import TripControlsView from '../view/trip-controls-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EventAddView from '../view/event-add-view.js';
import EventEditView from '../view/event-edit-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import { RenderPosition, render } from '../render.js';

const EVENTS_COUNT = 3;

export default class TripPresenter {
  sortComponent = new TripSortView();
  editsEvent = new EventEditView();
  addEvent = new EventAddView();
  listTripEvents = new TripEventsListView();

  init = (container) => {
    this.container = container;

    render(this.sortComponent, this.container);
    render(this.listTripEvents, this.container);
    render(this.addEvent, this.listTripEvents.getElement());
    render(this.editsEvent, this.listTripEvents.getElement(), RenderPosition.AFTERBEGIN);

    for(let i = 0; i < EVENTS_COUNT; i++) {
      render(new TripEventsItemView(), this.listTripEvents.getElement());
    }
  };
}
