import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../utils/const.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createEmptyList = (filterType) => {
  const noTaskTextValue = NoTasksTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${noTaskTextValue}
    </p>`);
};

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyList(this.#filterType);
  }
}
