import { isFuturePoint, isPastPoint } from './point';

const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PAST: 'Past',
};

const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.date)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point.date)),
};

export {filter};
