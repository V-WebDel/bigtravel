import AbstractView from '../framework/view/abstract-view.js';

const createAddBtn = () => (
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'
);

export default class AddPointBtnView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createAddBtn();
  }

  setClickHandler = (callback) => {
    this._callback.newBtnClick = callback;
    this.element.addEventListener('click', callback);
  };

}

