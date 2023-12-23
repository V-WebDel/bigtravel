import {Filter} from '../utils/const.js';

export const generateFilter = (points) => Object.entries(Filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    // count: filterPoints(points).length,
  }),
);
