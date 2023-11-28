import EventAddBtnView from './view/event-add-btn-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripInfoView from './view/trip-info-view.js';
import { RenderPosition, render } from './render.js';
import TripPresenter from './presenter/trip-presenter.js';

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter();


render(new TripInfoView(), tripMain, RenderPosition.AFTERBEGIN);
render(new TripFiltersView(), tripControlsFilters);
render(new EventAddBtnView(), tripMain);

tripPresenter.init(tripEvents);
