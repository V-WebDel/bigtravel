import { render, RenderPosition, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import TripSortView from '../view/trip-sort-view.js';
import PointsListView from '../view/trip-point-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import TripInfoView from '../view/trip-info-view.js';
import LoadingView from '../view/loading-view';
import PointPresenter from './point-presenter';
import PointNewPresenter from './new-point-presenter.js';
import { sortPointUp, comparePrice, compareDuration, humanizePointDate } from '../utils/point.js';
import { filter, SortType, UserAction, UpdateType, FilterType } from '../utils/const.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const tripMain = document.querySelector('.trip-main');

export default class TripPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #tripInfoView = null;

  #pointsListView = new PointsListView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #emptyListView = null;
  #pointNewPresenter = null;
  #pointPresenter = new Map();

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor(container, pointsModel, filterModel, offersModel, destinationsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#pointsListView.element, this.#handleViewAction, this.#handleModeChange);

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


  createPoint = async (callback) => {
    const listOffers = await this.#offersModel.get();
    const listDestinations = await this.#destinationsModel.get();

    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback, listOffers, listDestinations);
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


  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearTrip();
        this.#renderTrip();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderTripInfo = async (points) => {
    // Получаем даты начала и завершения маршрута
    const datesFrom = points.map((point) => point.dateFrom);
    const datesTo = points.map((point) => point.dateTo);
    const dateFrom = new Date(Math.min(...datesFrom));
    const dateTo = new Date(Math.max(...datesTo));

    let matchMonthdateStart;
    let matchMonthdateEnd;

    if (dateFrom.getMonth() === dateTo.getMonth()) {
      matchMonthdateStart = dateFrom.getDate().toString();
      matchMonthdateEnd = humanizePointDate(dateTo);
    } else {
      matchMonthdateStart = humanizePointDate(dateFrom);
      matchMonthdateEnd = humanizePointDate(dateTo);
    }

    const dateStart = matchMonthdateStart;
    const dateEnd = matchMonthdateEnd;

    // Получаем названия городов из точек маршрута
    const cities = points.reduce((acc, point) => {
      if (acc.length === 0 || acc[acc.length - 1] !== point.destination.name) {
        acc.push(point.destination.name);
      }
      return acc;
    }, []);

    let citiesString;

    if (cities.length === 2) {
      citiesString = `${cities[0]} - ${cities[1]}`;
    } else if (cities.length === 3) {
      citiesString = `${cities[0]} - ${cities[1]} - ${cities[2]}`;
    } else {
      citiesString = `${cities[0]} ... ${cities[cities.length - 1]}`;
    }

    // Получаем общую стоимость маршрута
    const baseCost = points.reduce((total, point) => total + point.basePrice, 0);

    let offersCost = 0;
    const listOffers = await this.#offersModel.get();

    for (const point of points) {
      // Получаем офферы из модели

      // Получаем список офферов по типу
      const currentOffer = listOffers.find((itemOffer) => itemOffer.type === point.type);

      // Добавляем стоимость офферов из точки
      currentOffer.offers.forEach((item) => {
        if(point.offers.includes(item.id)) {
          offersCost += item.price;
        }
      });
    }
    const totalCost = baseCost + offersCost;

    this.#tripInfoView = new TripInfoView(citiesString, dateStart, dateEnd, totalCost);

    render(this.#tripInfoView, tripMain, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point, offersList, destinations) => {
    const pointPresenter = new PointPresenter(this.#pointsListView.element, this.#handleViewAction, this.#handleModeChange);

    pointPresenter.init(point, offersList, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = async (points) => {
    const listOffers = await this.#offersModel.get();
    const listDestinations = await this.#destinationsModel.get();

    points.forEach((point) => this.#renderPoint(point, listOffers, listDestinations));
  };

  #renderNoPoints = () => {
    this.#emptyListView = new EmptyListView(this.#filterType);
    render(this.#emptyListView, this.#pointsListView.element, RenderPosition.AFTERBEGIN);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#pointsListView.element, RenderPosition.AFTERBEGIN);
  };

  #clearTrip = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#tripInfoView);
    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#emptyListView) {
      remove(this.#emptyListView);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };


  #renderTrip = () => {
    this.#renderSort();
    render(this.#pointsListView, this.#container);

    if (this.#isLoading || this.#isLoading === undefined) {
      this.#renderLoading();
      return;
    }

    const pointCount = this.points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderPoints(this.points);
    this.#renderTripInfo(this.points);
  };
}
