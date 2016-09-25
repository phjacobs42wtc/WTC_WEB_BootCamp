define({
  HZ: 60,
  MINWIDTH: 800,
  MINHEIGHT: 600,
  TANKWIDTH: 30,
  TANKHEIGHT: 20,
  BULLETRADIUS: 3,
  ENEMYCOUNT: 5,
  DIRECTION: {
    LEFT: 1,
    UP: 2,
    RIGHT: 3,
    DOWN: 4
  },
  LEVEL: {
    ONE: 1,
    TWO: 2,
    THREE: 3
  },
  MYSTEP: 10,
  TANKSTEPS: [3, 6, 9],
  BULLETSTEPS: [5, 10, 15],
  DEFCOLOR: '#0eb83a',
  STYLE: [{
      MY: '#0eb83a',
      ENEMY: '#493131'
    },
    {
      MY: '#2add9c',
      ENEMY: '#bf242a'
    },
    {
      MY: '#3eede7',
      ENEMY: '#845a33'
    }
  ],
});