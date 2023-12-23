import { getRandomNumber, getRandomElements, getRandomElement } from '../utils/common.js';
import { nanoid } from 'nanoid';

const names = ['Amsterdam', 'Chamonix', 'Geneva'];
const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

const dateTimes = [
  ['2023-11-18T14:30:45.123Z', '2023-11-18T16:30:45.123Z'],
  ['2024-02-03T08:12:30.987Z', '2024-02-03T11:12:30.987Z'],
  ['2023-10-25T19:45:21.654Z', '2023-10-25T20:30:21.654Z'],
  ['2024-03-12T03:27:15.789Z', '2024-03-12T08:50:15.789Z'],
  ['2023-11-01T12:50:10.234Z', '2023-11-01T18:00:10.234Z'],
  ['2024-04-20T22:05:36.543Z', '2024-04-20T23:30:36.543Z'],
  ['2023-09-15T17:40:59.876Z', '2023-09-15T20:05:59.876Z'],
  ['2024-04-02T06:18:42.321Z', '2024-04-02T12:00:42.321Z'],
  ['2023-12-07T10:55:28.465Z', '2023-12-07T13:25:28.465Z'],
  ['2024-01-28T01:33:54.210Z', '2024-01-28T02:33:54.210Z'],
];

const isFavorites = [true, false];

const generatePoint = () => {
  const dateTime = getRandomElement(dateTimes);
  const dateStart = dateTime[0];
  const dateFinish = dateTime[1];

  return {
    id: nanoid(),
    type: getRandomElement(types),
    name: getRandomElement(names),
    date: dateStart,
    dateFrom: dateStart,
    dateTo: dateFinish,
    basePrice: getRandomNumber(100, 1500, 0),
    isFavorite: getRandomElement(isFavorites),
    offers: [2],

    Destination: {
      name: ['Amsterdam', 'Chamonix', 'Geneva'],
      description: [
        {'Amsterdam': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.'},
        {'Chamonix': 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.'},
        {'Geneva': 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'},
      ],
      pictures: {
        'Amsterdam': [
          {
            'src': './img/photos/1.jpg',
            'description': 'Amsterdam parliament building'
          },
          {
            'src': './img/photos/2.jpg',
            'description': 'Amsterdam parliament building'
          },
        ],
        'Chamonix': [
          {
            'src': './img/photos/2.jpg',
            'description': 'Chamonix parliament building'
          },
          {
            'src': './img/photos/3.jpg',
            'description': 'Chamonix parliament building'
          },
          {
            'src': './img/photos/4.jpg',
            'description': 'Chamonix parliament building'
          },
        ],
        'Geneva': [
          {
            'src': './img/photos/4.jpg',
            'description': 'Geneva parliament building'
          },
          {
            'src': './img/photos/5.jpg',
            'description': 'Geneva parliament building'
          },
        ],
      }
    },

    OffersByType: {
      type: ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'],
      offers: {
        'taxi': [
          { id: 1, title: 'luxury car', price: 30 },
          { id: 2, title: 'airport transfer', price: 25 },
          { id: 3, title: 'city tour', price: 20 }
        ],
        'bus': [
          { id: 1, title: 'guided tour', price: 15 },
          { id: 2, title: 'wifi onboard', price: 10 },
          { id: 3, title: 'snacks and drinks', price: 8 }
        ],
        'train': [
          { id: 1, title: 'first class', price: 25 },
          { id: 2, title: 'meal included', price: 12 },
          { id: 3, title: 'extra legroom', price: 15 }
        ],
        'ship': [
          { id: 1, title: 'cabin upgrade', price: 40 },
          { id: 2, title: 'sunset cruise', price: 30 },
          { id: 3, title: 'onboard entertainment', price: 25 }
        ],
        'drive': [
          { id: 1, title: 'luxury car rental', price: 50 },
          { id: 2, title: 'GPS navigation', price: 10 },
          { id: 3, title: 'additional driver', price: 15 }
        ],
        'flight': [
          { id: 1, title: 'priority boarding', price: 20 },
          { id: 2, title: 'extra baggage allowance', price: 18 },
          { id: 3, title: 'in-flight meal', price: 15 }
        ],
        'sightseeing': [
          { id: 1, title: 'guided tour', price: 18 },
          { id: 2, title: 'skip-the-line tickets', price: 15 },
          { id: 3, title: 'photography package', price: 10 }
        ],
      },
    },

    LocalPoint: {
      basePrice: getRandomNumber(100, 500, 0),
      dateFrom: '2019-07-10T22:55:56.845Z',
      dateTo: '2019-07-11T11:22:13.375Z',
      destination: {
        'description': getRandomElements(descriptions),
        'name': getRandomElement(names),
        'pictures': [
          {
            'src': `../public/img/photos/${getRandomNumber(1, 5, 0)}.jpg`,
            'description': 'Chamonix parliament building'
          }
        ]
      },
      isFavorite: getRandomElement(isFavorites),
      offers: [2],
      type: getRandomElement(types)
    },

    Point: {
      name: getRandomElement(names),
      basePrice: getRandomNumber(100, 500, 0),
      dateFrom: '2019-07-10T22:55:56.845Z',
      dateTo: '2019-07-11T11:22:13.375Z',
      destination: {
        'description': getRandomElements(descriptions),
        'name': getRandomElement(names),
        'pictures': [
          {
            'src': `../public/img/photos/${getRandomNumber(1, 5, 0)}.jpg`,
            'description': 'Chamonix parliament building'
          }
        ]
      },
      id: nanoid(),
      isFavorite: getRandomElement(isFavorites),
      type: ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'],
      offers: [2],
    }
  };
};

const OffersByType = {
  type: ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'],
  offers: {
    'taxi': [
      { id: 1, title: 'luxury car', price: 30 },
      { id: 2, title: 'airport transfer', price: 25 },
      { id: 3, title: 'city tour', price: 20 }
    ],
    'bus': [
      { id: 1, title: 'guided tour', price: 15 },
      { id: 2, title: 'wifi onboard', price: 10 },
      { id: 3, title: 'snacks and drinks', price: 8 }
    ],
    'train': [
      { id: 1, title: 'first class', price: 25 },
      { id: 2, title: 'meal included', price: 12 },
      { id: 3, title: 'extra legroom', price: 15 }
    ],
    'ship': [
      { id: 1, title: 'cabin upgrade', price: 40 },
      { id: 2, title: 'sunset cruise', price: 30 },
      { id: 3, title: 'onboard entertainment', price: 25 }
    ],
    'drive': [
      { id: 1, title: 'luxury car rental', price: 50 },
      { id: 2, title: 'GPS navigation', price: 10 },
      { id: 3, title: 'additional driver', price: 15 }
    ],
    'flight': [
      { id: 1, title: 'priority boarding', price: 20 },
      { id: 2, title: 'extra baggage allowance', price: 18 },
      { id: 3, title: 'in-flight meal', price: 15 }
    ],
    'sightseeing': [
      { id: 1, title: 'guided tour', price: 18 },
      { id: 2, title: 'skip-the-line tickets', price: 15 },
      { id: 3, title: 'photography package', price: 10 }
    ],
  }
};

const Destination = {
  name: ['Amsterdam', 'Chamonix', 'Geneva'],
  description: [
    {'Amsterdam': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.'},
    {'Chamonix': 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.'},
    {'Geneva': 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'},
  ],
  pictures: {
    'Amsterdam': [
      {
        'src': './img/photos/1.jpg',
        'description': 'Amsterdam parliament building'
      },
      {
        'src': './img/photos/2.jpg',
        'description': 'Amsterdam parliament building'
      },
    ],
    'Chamonix': [
      {
        'src': './img/photos/2.jpg',
        'description': 'Chamonix parliament building'
      },
      {
        'src': './img/photos/3.jpg',
        'description': 'Chamonix parliament building'
      },
      {
        'src': './img/photos/4.jpg',
        'description': 'Chamonix parliament building'
      },
    ],
    'Geneva': [
      {
        'src': './img/photos/4.jpg',
        'description': 'Geneva parliament building'
      },
      {
        'src': './img/photos/5.jpg',
        'description': 'Geneva parliament building'
      },
    ],
  }
};

export { generatePoint, OffersByType, Destination, names };
