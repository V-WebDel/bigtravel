import Observable from '../framework/observable.js';
// import { UpdateType } from '../utils/const.js';

export default class InfoModel extends Observable {
  #totalCost = null;

  get totalCost() {
    return this.#totalCost;
  }

  setTotalCost = (totalCost) => {
    this.#totalCost = totalCost;
    this._notify(totalCost);
  };
}
