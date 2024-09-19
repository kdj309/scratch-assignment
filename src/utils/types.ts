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
export interface activeActions {
  category: string;
  inputs: number[];
}
export interface actionsContext {
  activeActions: activeActions[];
  setActiveActions: Dispatch<SetStateAction<activeActions[]>>;
}
