import { generatePoint } from '../mock/point.js';

export default class PointsModel {
  #point = Array.from({length: 5}, generatePoint);

  get points() {
    return this.#point;
  }
}
