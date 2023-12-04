// import TripControlsView from '../view/trip-controls-view.js';
import TripSortView from '../view/trip-sort-view.js';
import PointAddAndEditView from '../view/point-add-and-edit-view.js';
import TripEventsListView from '../view/trip-point-list-view.js';
import TripPointItemView from '../view/trip-point-item-view.js';
import { RenderPosition, render } from '../render.js';

export default class TripPresenter {
  sortComponent = new TripSortView();
  addAndEditPoint = new PointAddAndEditView();
  listTripEvents = new TripEventsListView();

  init = (container, pointsModel) => {
    this.container = container;
    this.pointsModel = pointsModel;
    this.tripsTasks = [...this.pointsModel.getPoints()];

    render(this.sortComponent, this.container);
    render(this.listTripEvents, this.container);
    render(new PointAddAndEditView(this.tripsTasks[0]), this.listTripEvents.getElement(), RenderPosition.AFTERBEGIN);

    for(let i = 0; i < this.tripsTasks.length; i++) {
      render(new TripPointItemView(this.tripsTasks[i]), this.listTripEvents.getElement());
    }
  };
}
