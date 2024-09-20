import { sprite } from './types';

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export function getSpriteVersion(id: string, image: HTMLImageElement, name: string): sprite {
  return {
    id,
    activeActions: [],
    image,
    name,
    x: 100,
    y: 100,
    size: 200,
    visible: true,
    isActive: true,
    rotation: 0,
    isStaged: true,
  };
}
