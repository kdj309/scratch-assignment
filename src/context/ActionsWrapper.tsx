import { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { actionsContext, contextWrapperProps, sprite } from '../utils/types';
import useImage from 'use-image';
import catsprit from '../assets/catsprite.svg';

export const ActionsContext = createContext<actionsContext>({
  sprites: [],
  setSprites: () => null,
});
export const useActionsContext = () => {
  const ctx = useContext(ActionsContext);
  return ctx;
};

export const ActionContextWrapper: FunctionComponent<contextWrapperProps> = ({ children }) => {
  const [image, status] = useImage(catsprit);

  const [sprites, setSprites] = useState<sprite[]>([]);

  useEffect(() => {
    if (status === 'loaded' && image != undefined) {
      setSprites([
        {
          id: 'cat',
          activeActions: [],
          image,
          name: 'Cat Sprite',
          x: 100,
          y: 100,
          size: 200,
          visible: true,
          isActive: true,
        },
      ]);
    }
  }, [status]);

  return <ActionsContext.Provider value={{ sprites, setSprites }}>{children}</ActionsContext.Provider>;
};
