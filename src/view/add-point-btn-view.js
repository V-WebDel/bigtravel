import AbstractView from '../framework/view/abstract-view.js';

const createAddBtn = () => (
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'
);

export default class AddPointBtnView extends AbstractView{
  get template() {
    return createAddBtn();
  }

  setClickHandler = (callback) => {
    // Мы могли бы сразу передать callback в addEventListener,
    // но тогда бы для удаления обработчика в будущем,
    // нам нужно было бы производить это снаружи, где-то там,
    // где мы вызывали setClickHandler, что не всегда удобно

    // 1. Поэтому колбэк мы запишем во внутреннее свойство
    this._callback.click = callback;

    // 2. В addEventListener передадим абстрактный обработчик
    this.element.addEventListener('click'. this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();

    // 3. А внутри абстрактного обработчика вызовем колбэк
    this._callback.click();
  };
}
