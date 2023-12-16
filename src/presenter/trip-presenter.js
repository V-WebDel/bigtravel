import { render, RenderPosition } from '../framework/render.js';
import TripSortView from '../view/trip-sort-view.js';
import PointsListView from '../view/trip-point-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils/common.js';
import { sortPointUp, comparePrice, compareDuration } from '../utils/point.js';
import {SortType} from '../utils/sort.js';

export default class TripPresenter {
  #container = null;
  #pointsModel = null;

  #sortComponent = new TripSortView();
  #pointsListView = new PointsListView();
  #emptyListView = new EmptyListView();

  #tripsPoints = [];
  #pointPresenter = new Map();

  #currentSortType = SortType.DEFAULT;
  #sourcedTripsPoints = [];


  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripsPoints = [...this.#pointsModel.points];

    this.#sourcedTripsPoints = [...this.#pointsModel.points];
    this.#renderTrip();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripsPoints = updateItem(this.#tripsPoints, updatedPoint);
    this.#sourcedTripsPoints = updateItem(this.#sourcedTripsPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #clearList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderList = () => {
    render(this.#pointsListView, this.#container);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearList();
    this.#renderPoints(this.#tripsPoints);
  };

  #sortPoints = (sortType) => {

    switch (sortType) {
      case SortType.DEFAULT:
        this.#tripsPoints.sort(sortPointUp);
        break;
      case SortType.TIME:
        this.#tripsPoints.sort(compareDuration);
        break;
      case SortType.PRICE:
        this.#tripsPoints.sort(comparePrice);
        break;
      default:
        this.#tripsPoints = [...this.#sourcedTripsPoints];
    }

    this.#currentSortType = sortType;
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListView.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (from, to) => {
    this.#tripsPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints= () => {
    render(this.#emptyListView, this.#pointsListView.element, RenderPosition.AFTERBEGIN);
  };

  #renderTrip = () => {
    if (this.#tripsPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderPoints(this.#tripsPoints);

    this.#renderSort();
    this.#renderList();
  };
}
