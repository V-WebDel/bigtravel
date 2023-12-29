import Observable from '../framework/observable.js';


export default class OffersModel extends Observable {
  #pointsApiService = null;
  #offersList = [];

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get = async () => {
    this.#offersList = this.#pointsApiService.get();
    return this.#offersList;
  };

  init = async () => {
    try {
      const offers = await this.#pointsApiService.offers;
      this.#offersList = offers;
      console.log(this.#offersList);
    } catch(err) {
      this.#offersList = [];
    }
  };
}
