import { render, remove, RenderPosition } from '../framework/render.js';
import PointAddAndEditView from '../view/point-add-and-edit-view.js';
// import {nanoid} from 'nanoid';
import { UserAction, UpdateType } from '../utils/const.js';

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointAddAndEditComponent = null;
  #destroyCallback = null;
  #offersModel = null;
  #destinationsModel = null;
  #offersList = null;
  #destinations = null;

  constructor(pointListContainer, changeData, changeMode, offersModel, destinationsModel) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init = (callback, offersList, destinations) => {
    this.#destroyCallback = callback;
    this.#offersList = offersList;
    this.#destinations = destinations;

    if (this.#pointAddAndEditComponent !== null) {
      return;
    }

    this.#pointAddAndEditComponent = new PointAddAndEditView(this.#destroyCallback, this.#offersList, this.#destinations);

    this.#pointAddAndEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointAddAndEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointAddAndEditComponent.setCloseClickHandler(this.#handleDeleteClick);

    render(this.#pointAddAndEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  destroy = () => {
    if (this.#pointAddAndEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointAddAndEditComponent);
    this.#pointAddAndEditComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  setSaving = () => {
    this.#pointAddAndEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#pointAddAndEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointAddAndEditComponent.shake(resetFormState);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
