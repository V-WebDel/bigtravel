import EventAddBtnView from './view/event-add-btn-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripInfoView from './view/trip-info-view.js';
import { RenderPosition, render } from './render.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';

const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(tripEvents, pointsModel);


render(new TripInfoView(), tripMain, RenderPosition.AFTERBEGIN);
render(new TripFiltersView(), tripControlsFilters);
render(new EventAddBtnView(), tripMain);

tripPresenter.init();
