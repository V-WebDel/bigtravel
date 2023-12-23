import { render, remove, RenderPosition } from '../framework/render.js';
import PointAddAndEditView from '../view/point-add-and-edit-view.js';
import {nanoid} from 'nanoid';
import { UserAction, UpdateType } from '../utils/const.js';

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;

  #pointComponent = null;
  #pointAddAndEditComponent = null;
  #destroyCallback = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#pointAddAndEditComponent !== null) {
      return;
    }

    this.#pointAddAndEditComponent = new PointAddAndEditView();

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

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,

      {id: nanoid(), ...point},
    );
    this.destroy();
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
