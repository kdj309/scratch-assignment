import { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { actionsContext, availableSprite, contextWrapperProps, sprite } from '../utils/types';
import useImage from 'use-image';
import catsprit from '../assets/catsprite.svg';
import { initializeAvailableSprites } from '../utils/constants';

export const ActionsContext = createContext<actionsContext>({
  sprites: [],
  setSprites: () => null,
  availableSprites: [],
  setAvailableSprites: () => null,
});
export const useActionsContext = () => {
  const ctx = useContext(ActionsContext);
  return ctx;
};

export const ActionContextWrapper: FunctionComponent<contextWrapperProps> = ({ children }) => {
  const [image, status] = useImage(catsprit);
  const [sprites, setSprites] = useState<sprite[]>([]);
  const [availableSprites, setAvailableSprites] = useState<availableSprite[]>(initializeAvailableSprites);

  useEffect(() => {
    if (status === 'loaded' && image != undefined) {
      setSprites([
        {
          id: 'cat',
          activeActions: [],
          image,
          name: 'Cat',
          x: 100,
          y: 100,
          size: 200,
          visible: true,
          isActive: true,
          rotation: 0,
          isStaged: true,
        },
      ]);
    }
  }, [status]);

  return (
    <ActionsContext.Provider value={{ sprites, setSprites, availableSprites, setAvailableSprites }}>
      {children}
    </ActionsContext.Provider>
  );
};
