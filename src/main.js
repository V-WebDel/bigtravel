import {render, RenderPosition} from './framework/render.js';
import AddPointBtnView from './view/add-point-btn-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');

const newPointButtonComponent = new AddPointBtnView();
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);

render(new TripInfoView(), tripMain, RenderPosition.AFTERBEGIN);


const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, tripMain);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);


filterPresenter.init();
tripPresenter.init();
