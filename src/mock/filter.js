import {Filter} from '../utils/const.js';

export const generateFilter = () => Object.entries(Filter).map(
  ([filterName]) => ({
    name: filterName,
  }),
);
