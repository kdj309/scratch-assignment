import { ReactNode } from 'react';

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
