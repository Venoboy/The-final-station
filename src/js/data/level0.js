const interactionObjectsData = {
  locker1: [
    {
      name: 'bullets',
      quantity: 12,
      unit: {
        sign: 'X',
        position: 'before',
      },
    },
  ],

  deadBody1: [
    {
      name: 'bullets',
      quantity: 12,
      unit: {
        sign: 'X',
        position: 'before',
      },
    },
    {
      name: 'cigarettes',
      quantity: 6,
      unit: {
        sign: '$',
        position: 'after',
      },
    },
  ],

  deadBody2: [
    {
      name: 'bullets',
      quantity: 6,
      unit: {
        sign: 'X',
        position: 'before',
      },
    },
  ],
};
const doorsPosition = [
  {
    x: 189,
    y: 177,
    id: 1,
  },
  {
    x: 278,
    y: 193,
    id: 2,
  },
  {
    x: 398,
    y: 193,
    id: 3,
  },
  {
    x: 526,
    y: 193,
    id: 4,
  },
  {
    x: 527,
    y: 251,
    id: 5,
  },
  {
    x: 419,
    y: 251.5,
    id: 6,
  },
  {
    x: 776,
    y: 193,
    id: 7,
  },
  {
    x: 768,
    y: 251,
    id: 8,
  },
  {
    x: 859,
    y: 251,
    id: 9,
  },
  {
    x: 949,
    y: 280.5,
    id: 10,
  },
  {
    x: 959,
    y: 329.5,
    id: 11,
  },
  {
    x: 845,
    y: 329.5,
    id: 12,
  },
];
const lidsPosition = [
  {
    x: 486,
    y: 206,
    id: 13,
  },
  {
    x: 791,
    y: 264,
    id: 14,
  },
  {
    x: 647,
    y: 293,
    id: 15,
  },
];
const lockersPosition = [
  {
    x: 163,
    y: 175,
  },
];
const deadBody1Position = [
  {
    x: 360,
    y: 202,
  },
];
const deadBody2Position = [
  {
    x: 1100,
    y: 360,
  },
];
const roomsData = [
  {
    points: [
      189, 150,
      278, 150,
      278, 210,
      189, 210,
    ],
    id: 2,
  },
  {
    points: [
      278, 165,
      400, 165,
      400, 215,
      278, 215,
    ],
    id: 3,
  },
  {
    points: [
      398, 171,
      526, 171,
      526, 209,
      398, 209,
    ],
    id: 4,
  },
  {
    points: [
      526, 0,
      776, 0,
      776, 230,
      726, 230,
      696, 260,
      596, 260,
      566, 230,
      526, 230,
    ],
    id: 5,
  },
  {
    points: [
      776, 171,
      860, 171,
      860, 270,
      767, 270,
      767, 230,
      776, 230,
    ],
    id: 6,
  },
  {
    points: [
      859, 230,
      950, 230,
      950, 310,
      859, 310,
    ],
    id: 7,
  },
  {
    points: [
      949, 0,
      1276, 0,
      1276, 512,
      959, 512,
      959, 310,
      949, 310,
    ],
    id: 8,
  },
  {
    points: [
      845, 300,
      959, 300,
      959, 400,
      845, 400,
    ],
    id: 9,
  },
  {
    points: [
      780, 265,
      845, 265,
      845, 400,
      780, 400,
    ],
    id: 10,
  },
  {
    points: [
      527, 230,
      570, 230,
      605, 260,
      695, 260,
      720, 230,
      768, 230,
      768, 310,
      527, 310,
    ],
    id: 11,
  },
  {
    points: [
      418, 207,
      527, 207,
      527, 300,
      418, 300,
    ],
    id: 12,
  },
  {
    points: [
      0, 210,
      419, 210,
      419, 280,
      425, 280,
      425, 512,
      0, 512,
    ],
    id: 13,
  },
  {
    points: [
      605, 295,
      695, 295,
      695, 512,
      605, 512,
    ],
    id: 14,
  },
];
const openRoomsData = new Map([
  [1, [1, 2]],
  [2, [2, 3]],
  [3, [3, 4]],
  [4, [4, 5]],
  [5, [11, 12]],
  [6, [13, 12]],
  [7, [5, 6]],
  [8, [11, 6]],
  [9, [6, 7]],
  [10, [7, 8]],
  [11, [8, 9]],
  [12, [9, 10]],
  [13, [12, 4]],
  [14, [6, 10]],
  [15, [11, 14]],
]);

export {
  interactionObjectsData, doorsPosition, lidsPosition,
  lockersPosition, deadBody1Position, deadBody2Position,
  roomsData, openRoomsData,
};
