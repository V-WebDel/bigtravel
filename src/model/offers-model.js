import Observable from '../framework/observable.js';


export default class OffersModel extends Observable {
  #pointsApiService = null;
  #offersList = [];

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get = async () => {
    this.#offersList = await this.#pointsApiService.offers;
    return this.#offersList;
  };

  init = async () => {
    try {
      const offers = await this.#pointsApiService.offers;
      this.#offersList = offers;
    } catch(err) {
      this.#offersList = [];
    }
  };
}
