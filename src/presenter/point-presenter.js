import { render, replace, remove } from '../framework/render.js';
import PointAddAndEditView from '../view/point-add-and-edit-view.js';
import TripPointItemView from '../view/trip-point-item-view.js';
import { UserAction, UpdateType } from '../utils/const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointAddAndEditComponent = null;

  #point = null;
  #offersModel = null;
  #destinationsModel = null;
  #offersList = null;
  #destinations = null;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeData, changeMode, offersModel, destinationsModel) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init = (point, offersList, destinations) => {
    this.#point = point;
    this.#offersList = offersList;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointAddAndEditComponent = this.#pointAddAndEditComponent;

    this.#pointComponent = new TripPointItemView(point, offersList);
    this.#pointAddAndEditComponent = new PointAddAndEditView(point, offersList, destinations);

    this.#pointComponent.setEditClickHandler(this.#replacePointToForm);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointAddAndEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointAddAndEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointAddAndEditComponent.setCloseClickHandler(this.resetView);

    if (prevPointComponent === null || prevPointAddAndEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointAddAndEditComponent, prevPointAddAndEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointAddAndEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointAddAndEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointAddAndEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointAddAndEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointAddAndEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };


  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointAddAndEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleFormSubmit = (update) => {
    // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
    const isMinorUpdate = true;

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceFormToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
    this.#replaceFormToPoint();
  };
}
