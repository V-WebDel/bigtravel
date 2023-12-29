import Observable from '../framework/observable.js';
import {UpdateType} from '../utils/const.js';
// import { generatePoint } from '../mock/point.js';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];

  // #points = Array.from({length: 5}, generatePoint);

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;

    // this.#pointsApiService.points.then((points) => {
    //   console.log(points.map(this.#adaptToClient));
    // });
  }

  get points() {
    return this.#points;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      console.log(this.#points);
    } catch(err) {
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
  };

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  };

  #adaptToClient = (point) => {
    const adaptedTask = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'], // На клиенте дата хранится как экземпляр Date
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'], // На клиенте дата хранится как экземпляр Date
      isFavorite: point['is_favorite'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedTask['base_price'];
    delete adaptedTask['date_from'];
    delete adaptedTask['date_to'];
    delete adaptedTask['is_favorite'];

    return adaptedTask;
  };
}
