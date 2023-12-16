import AddPointBtnView from './view/add-point-btn-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripInfoView from './view/trip-info-view.js';
import {render, RenderPosition} from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';

const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(tripEvents, pointsModel);

const filters = generateFilter(PointsModel);

render(new TripInfoView(), tripMain, RenderPosition.AFTERBEGIN);
render(new TripFiltersView(filters), tripControlsFilters);
render(new AddPointBtnView(), tripMain);

tripPresenter.init();
