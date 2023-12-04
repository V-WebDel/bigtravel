import { getRandomNumber, getRandomElements, getRandomElement } from '../util.js';

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

const isFavorites = [true, false];

const generatePoint = () => ({
  id: 1,
  type: getRandomElement(types),
  name: getRandomElement(names),
  date: '2019-07-10T22:55:56.845Z',
  dateFrom: '2019-07-11T10:00:00.000Z',
  dateTo: '2019-07-11T12:25:13.375Z',
  basePrice: getRandomNumber(100, 1500, 0),
  isFavorite: getRandomElement(isFavorites),

  pictures: [
    {
      src: `../public/img/photos/${getRandomNumber(1, 5, 0)}.jpg`,
      description: 'Chamonix parliament building'
    }
  ],

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


  Destination: {
    name: ['Amsterdam', 'Chamonix', 'Geneva'],
    description: getRandomElements(descriptions),
    pictures: [
      {
        'src': './img/photos/1.jpg',
        'description': 'Chamonix parliament building'
      },
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
      {
        'src': './img/photos/5.jpg',
        'description': 'Chamonix parliament building'
      },
    ]
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
    id: 0,
    isFavorite: getRandomElement(isFavorites),
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
});

export { generatePoint, names };
