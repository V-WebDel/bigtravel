import { render, RenderPosition, remove } from '../framework/render.js';
import TripSortView from '../view/trip-sort-view.js';
import PointsListView from '../view/trip-point-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter';
import PointNewPresenter from './new-point-presenter.js';
import { sortPointUp, comparePrice, compareDuration } from '../utils/point.js';
import { filter, SortType, UserAction, UpdateType, FilterType } from '../utils/const.js';

export default class TripPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;

  #pointsListView = new PointsListView();
  #sortComponent = null;
  #emptyListView = null;
  #pointNewPresenter = null;
  #pointPresenter = new Map();

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;


  constructor(container, pointsModel, filterModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#pointsListView.element, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredPoints.sort(sortPointUp);
      case SortType.TIME:
        return filteredPoints.sort(compareDuration);
      case SortType.PRICE:
        return filteredPoints.sort(comparePrice);
    }
    return filteredPoints;
  }

  init = () => {
    this.#renderTrip();
  };


  createPoint = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearTrip();
    this.#renderTrip();
  };

  #renderSort = () => {
    this.#sortComponent = new TripSortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#container);
  };


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };


  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearTrip({resetSortType: true});
        this.#renderTrip();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListView.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    this.#emptyListView = new EmptyListView(this.#filterType);
    render(this.#emptyListView, this.#pointsListView.element, RenderPosition.AFTERBEGIN);
  };

  #clearTrip = ({resetSortType = false} = {}) => {
    // const pointCount = this.points.length;

    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#emptyListView) {
      remove(this.#emptyListView);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };


  #renderTrip = () => {
    const pointCount = this.points.length;

    this.#renderSort();
    render(this.#pointsListView, this.#container);

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderPoints(this.points);
  };
}
