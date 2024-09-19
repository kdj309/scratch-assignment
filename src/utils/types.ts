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
}
export interface actionsContext {
  sprites: sprite[];
  setSprites: Dispatch<SetStateAction<sprite[]>>;
}
