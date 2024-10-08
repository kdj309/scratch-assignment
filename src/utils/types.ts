import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface themeContext {
  toggleColorMode: () => void;
  colorMode: 'light' | 'dark';
}

export interface contextWrapperProps {
  children: ReactNode;
}
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface activeAction {
  category: string;
  inputs: number[];
}
export interface sprite {
  id: string;
  name: string;
  x: number;
  y: number;
  visible: boolean;
  size: number;
  isActive: boolean;
  activeActions: activeAction[];
  image: HTMLImageElement;
  rotation: number;
  isStaged: boolean;
  isDragging: boolean;
  collision: boolean;
}
export interface availableSprite extends Pick<sprite, 'id' | 'name' | 'isStaged'> {
  image: string;
}
export interface actionsContext {
  sprites: sprite[];
  setSprites: Dispatch<SetStateAction<sprite[]>>;
  availableSprites: availableSprite[];
  setAvailableSprites: Dispatch<SetStateAction<availableSprite[]>>;
}
