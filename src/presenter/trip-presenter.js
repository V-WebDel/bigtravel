import { render, replace } from '../framework/render.js';
import TripSortView from '../view/trip-sort-view.js';
import PointAddAndEditView from '../view/point-add-and-edit-view.js';
import PointsListView from '../view/trip-point-list-view.js';
import PointItemView from '../view/trip-point-item-view.js';
import EmptyListView from '../view/empty-list-view.js';

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
      replace(pointAddAndEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointAddAndEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointAddAndEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointAddAndEditComponent.setCloseClickHandler(() => {
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
