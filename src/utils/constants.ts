import catsprit from '../assets/catsprite.svg';
import applesprite from '../assets/applesprite.svg';
import boysprite from '../assets/boysprite.svg';
import { availableSprite } from './types';
export const actions = ['Move X Steps', 'Turn X degree', 'Go To X and Y Direction'];
export const controls = ['Repeat Animation'];
export const maxCanvasWidth = 500;
export const maxSize = maxCanvasWidth;
export const maxCanvasHeight = 400;
export const initializeAvailableSprites = (): availableSprite[] => [
  {
    id: 'cat',
    image: catsprit,
    name: 'Cat',
    isStaged: true,
  },
  {
    id: 'apple',
    image: applesprite,
    name: 'Apple',
    isStaged: false,
  },
  {
    id: 'boy',
    image: boysprite,
    name: 'Boy',
    isStaged: false,
  },
];
