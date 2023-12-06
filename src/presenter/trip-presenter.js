// import TripControlsView from '../view/trip-controls-view.js';
import TripSortView from '../view/trip-sort-view.js';
import PointAddAndEditView from '../view/point-add-and-edit-view.js';
import PointsListView from '../view/trip-point-list-view.js';
import PointItemView from '../view/trip-point-item-view.js';
import EmptyListView from '../view/empty-list-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  #container = null;
  #pointsModel = null;

  #sortComponent = new TripSortView();
  #pointsListView = new PointsListView();
  #emptyListView = new EmptyListView();

  #tripsPoints = [];

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripsPoints = [...this.#pointsModel.points];

    this.#renderTrip();
  };

  #renderPoint = (point) => {
    const pointComponent = new PointItemView(point);
    const pointAddAndEditComponent = new PointAddAndEditView(point);

    const replacePointToForm = () => {
      this.#pointsListView.element.replaceChild(pointAddAndEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#pointsListView.element.replaceChild(pointComponent.element, pointAddAndEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointAddAndEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointAddAndEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointsListView.element);
  };

  #renderTrip = () => {
    render(this.#pointsListView, this.#container);


    if (this.#tripsPoints.length === 0) {
      render(this.#emptyListView, this.#pointsListView.element);
    } else {

      render(this.#sortComponent, this.#container);
      render(this.#pointsListView, this.#container);

      for(let i = 0; i < this.#tripsPoints.length; i++) {
        this.#renderPoint(this.#tripsPoints[i]);
      }
    }
  };
}
