import { Box, Button, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { Layer, Stage, Image } from 'react-konva';
import { useActionsContext } from '../context/ActionsWrapper';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import { useState } from 'react';

export default function SpriteContainer() {
  const { sprites, setSprites } = useActionsContext();
  const activeSprite = sprites.find((s) => s.isActive);
  const [visible, setvisible] = useState<boolean>(false);
  const handleVisibility = (_: React.MouseEvent<HTMLElement>, newValue: boolean) => {
    setvisible(newValue);
    setSprites((prev) => prev.map((s) => (s.isActive ? { ...s, visible: newValue } : s)));
  };

  return (
    <Stack>
      <Box sx={{ borderBottom: '1px solid hsl(0deg 0% 0% / 15%)', height: 'max-content' }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          paddingBlock={'0.4rem'}
          paddingInline={'0.2rem'}
        >
          <Typography variant='subtitle1'>Sprite</Typography>
          <Button>
            <PlayCircleFilledOutlinedIcon />
            <StopCircleOutlinedIcon></StopCircleOutlinedIcon>
          </Button>
        </Stack>
      </Box>
      <Box width={'100%'} sx={{ height: '100%' }}>
        <Stack direction={'column'} gap={2}>
          <Stage width={500} height={400}>
            <Layer>
              <Image image={activeSprite?.image} x={activeSprite?.image?.x} y={activeSprite?.image?.y} />
            </Layer>
          </Stage>
          <Box>
            <Stack direction='row' marginBlock={1}>
              <TextField
                InputLabelProps={{ shrink: true }}
                variant='standard'
                size='small'
                label='Sprite'
                value={activeSprite?.name}
                onBlur={(e) => setSprites((prev) => prev.map((s) => (s.isActive ? { ...s, name: e.target.value } : s)))}
              ></TextField>
              <TextField
                InputLabelProps={{ shrink: true }}
                type='number'
                variant='standard'
                size='small'
                label={
                  <span>
                    <SwapHorizOutlinedIcon fontSize='small' />X
                  </span>
                }
                value={activeSprite?.x}
                onBlur={(e) =>
                  setSprites((prev) => prev.map((s) => (s.isActive ? { ...s, x: parseInt(e.target.value) } : s)))
                }
              ></TextField>
              <TextField
                InputLabelProps={{ shrink: true }}
                type='number'
                variant='standard'
                size='small'
                label={
                  <span>
                    <HeightOutlinedIcon fontSize='small' />Y
                  </span>
                }
                value={activeSprite?.y}
                onBlur={(e) =>
                  setSprites((prev) => prev.map((s) => (s.isActive ? { ...s, y: parseInt(e.target.value) } : s)))
                }
              ></TextField>
            </Stack>
            <Stack direction='row' justifyContent='space-evenly'>
              <ToggleButtonGroup
                size='small'
                value={visible}
                exclusive
                onChange={handleVisibility}
                aria-label='text alignment'
              >
                <ToggleButton size='small' value={false} aria-label='left aligned'>
                  <VisibilityOffOutlinedIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton size='small' value={true} aria-label='centered'>
                  <VisibilityOutlinedIcon fontSize='small' />
                </ToggleButton>
              </ToggleButtonGroup>
              <Box>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  type='number'
                  variant='standard'
                  size='small'
                  label='size'
                  value={activeSprite?.size}
                  onBlur={(e) =>
                    setSprites((prev) => prev.map((s) => (s.isActive ? { ...s, size: parseInt(e.target.value) } : s)))
                  }
                ></TextField>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
