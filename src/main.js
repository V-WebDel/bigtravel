import {render, RenderPosition} from './framework/render.js';
import AddPointBtnView from './view/add-point-btn-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic hS2sfS4fgcl1sa2j';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';


const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');

const newPointButtonComponent = new AddPointBtnView();
const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new ApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel, offersModel, destinationsModel);
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
pointsModel.init();
offersModel.init();
destinationsModel.init();
