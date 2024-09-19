import { createContext, FunctionComponent, useContext, useState } from 'react';
import { actionsContext, activeAction, contextWrapperProps } from '../utils/types';

export const ActionsContext = createContext<actionsContext>({
  activeActions: [],
  setActiveActions: () => null,
});
export const useActionsContext = () => {
  const ctx = useContext(ActionsContext);
  return ctx;
};

export const ActionContextWrapper: FunctionComponent<contextWrapperProps> = ({ children }) => {
  const [activeActions, setActiveActions] = useState<activeAction[]>([]);

  return <ActionsContext.Provider value={{ activeActions, setActiveActions }}>{children}</ActionsContext.Provider>;
};
