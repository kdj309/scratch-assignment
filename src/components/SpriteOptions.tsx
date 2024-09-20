import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router';
import { useActionsContext } from '../context/ActionsWrapper';
import applesrc from '../assets/applesprite.svg';
import boysrc from '../assets/boysprite.svg';
import useImage from 'use-image';
import { sprite } from '../utils/types';
import { getSpriteVersion } from '../utils/utils';

export default function SpriteOptions() {
  const [apple] = useImage(applesrc);
  const [boy] = useImage(boysrc);

  const navigate = useNavigate();
  const { availableSprites, setSprites, setAvailableSprites } = useActionsContext();
  const actions = [
    {
      icon: <AutoAwesomeOutlinedIcon />,
      name: 'Surprise',
      onClick: () => {
        const randomnormalsprite = availableSprites.filter((s) => !s.isStaged)[
          Math.floor(Math.random() * availableSprites.length)
        ];
        let randomSprite: sprite;
        console.log({ randomnormalsprite });
        if (randomnormalsprite.id === 'apple' && apple != undefined) {
          randomSprite = getSpriteVersion(randomnormalsprite.id, apple, randomnormalsprite.name);
        } else if (randomnormalsprite.id === 'boy' && boy != undefined) {
          randomSprite = getSpriteVersion(randomnormalsprite.id, boy, randomnormalsprite.name);
        }
        setSprites((prev) => [...prev, randomSprite]);
        setAvailableSprites((prev) => prev.map((s) => (s.id === randomSprite.id ? { ...s, isStaged: false } : s)));
      },
    },
    { icon: <SearchOutlinedIcon />, name: 'Choose New Sprite', onClick: () => navigate('/sprites') },
  ];
  return (
    <SpeedDial
      ariaLabel='SpeedDial basic example'
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.onClick} />
      ))}
    </SpeedDial>
  );
}
