import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { Layer, Stage, Image, Group } from 'react-konva';
import { useActionsContext } from '../context/ActionsWrapper';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import { useState } from 'react';
import { maxCanvasHeight, maxSize } from '../utils/constants';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { activeAction, sprite } from '../utils/types';

export default function SpriteContainer() {
  const { sprites, setSprites, availableSprites, setAvailableSprites } = useActionsContext();
  const activeSprite = sprites.find((s) => s.isActive);
  const [visible, setvisible] = useState<boolean>(false);
  const handleVisibility = (_: React.MouseEvent<HTMLElement>, newValue: boolean) => {
    setvisible(newValue);
    setSprites((prev) => prev.map((s) => (s.isActive ? { ...s, visible: newValue } : s)));
  };

  const executeActions = (actions: activeAction[], allactions: activeAction[], copied: sprite) => {
    for (let index = 0; index < actions.length; index++) {
      const element = actions[index];
      if (element.category === 'Move X Steps') {
        copied.x += element.inputs[0];
      } else if (element.category === 'Rotate X degree') {
        copied.rotation = (copied.rotation || 0) + element.inputs[0];
      } else if (element.category === 'Go To X and Y') {
        copied.x = element.inputs[0];
        copied.y = element.inputs[1];
      } else if (element.category === 'Repeat Animation') {
        copied.activeActions = allactions.slice(0, index);
        executeActions(copied.activeActions, allactions, copied);
        break;
      }
    }
    if (copied.activeActions[0]?.category !== 'Repeat Animation') {
      copied.activeActions = [];
    }
    setSprites((prev) => prev.map((s) => (s.isActive ? { ...copied } : s)));
  };

  const stagedSprites = sprites.filter((s) => s.isStaged).map((s) => s.id);
  return (
    <Stack>
      <Box sx={{ borderBottom: '1px solid hsl(0deg 0% 0% / 15%)', height: 'max-content' }} paddingInline={1}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          paddingBlock={'0.4rem'}
          paddingInline={'0.2rem'}
        >
          <Typography variant='subtitle1'>Sprite</Typography>
          {activeSprite?.name ? (
            <>
              <Button
                onClick={() => {
                  if (activeSprite?.name) {
                    const copied = { ...activeSprite };
                    let originalActions = [...copied.activeActions];
                    executeActions(copied.activeActions, originalActions, copied);
                  }
                }}
              >
                <PlayCircleFilledOutlinedIcon />
              </Button>
              <Button>
                <StopCircleOutlinedIcon></StopCircleOutlinedIcon>
              </Button>
            </>
          ) : (
            <></>
          )}
        </Stack>
      </Box>
      <Box width={'100%'} sx={{ height: '100%' }}>
        <Stack direction={'column'} gap={0.5}>
          <Box>
            {sprites.length ? (
              <Stage width={500} height={400}>
                <Layer>
                  <Group>
                    {sprites
                      .filter((s) => s.isStaged)
                      .map((s) => (
                        <Image
                          key={s.id}
                          image={s?.image}
                          x={s?.x}
                          y={s?.y}
                          visible={s?.visible}
                          scaleX={Math.min(50, s?.size / maxSize)}
                          scaleY={Math.min(50, s?.size / maxCanvasHeight)}
                          rotation={s.rotation}
                        />
                      ))}
                  </Group>
                </Layer>
              </Stage>
            ) : (
              <Stage width={500} height={400}></Stage>
            )}
          </Box>
          <Box>
            <Stack direction='row' marginBottom={1} paddingInline={1}>
              <TextField
                InputLabelProps={{ shrink: true }}
                variant='standard'
                size='small'
                label='Sprite'
                value={activeSprite?.name}
                onChange={(e) =>
                  setSprites((prev) => prev.map((s) => (s.isActive ? { ...s, name: e.target.value } : s)))
                }
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
                onChange={(e) =>
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
                onChange={(e) =>
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
                  onChange={(e) =>
                    setSprites((prev) => prev.map((s) => (s.isActive ? { ...s, size: parseInt(e.target.value) } : s)))
                  }
                  onBlur={(e) =>
                    setSprites((prev) => prev.map((s) => (s.isActive ? { ...s, size: parseInt(e.target.value) } : s)))
                  }
                ></TextField>
              </Box>
            </Stack>
          </Box>
          {availableSprites.length && (
            <Stack
              direction='row'
              flexWrap='wrap'
              sx={{
                borderTop: '1px solid hsl(0deg 0% 0% / 15%)',
                maxWidth: '100dvw',
                maxHeight: '100dvh',
                overflowY: 'auto',
              }}
              gap={2}
            >
              {availableSprites.map((s) =>
                stagedSprites.includes(s.id) ? (
                  <Card
                    key={s.id}
                    sx={{ cursor: 'pointer', paddingBlock: 1 }}
                    onClick={() => {
                      setSprites((prev) => {
                        const copied = [...prev].map((i) => ({ ...i, isActive: false }));
                        const activeSprite = copied.map((i) => (i.id === s.id ? { ...i, isActive: true } : i));
                        return activeSprite;
                      });
                    }}
                    className={s.id === activeSprite?.id ? `tw-border-2 tw-border-[#b5a5d4] ` : ''}
                  >
                    <Stack justifyContent='center' alignItems='center'>
                      <CardMedia
                        width={'32px'}
                        component='img'
                        sx={{ maxHeight: '32px', maxWidth: '32px' }}
                        height='32px'
                        image={s.image}
                      ></CardMedia>
                    </Stack>
                    <Stack direction='row'>
                      <CardHeader
                        titleTypographyProps={{ variant: 'body2', color: 'primary' }}
                        title={s.name}
                        sx={{ paddingBlock: 0 }}
                      ></CardHeader>
                      <CardActions disableSpacing sx={{ paddingBlock: 0 }}>
                        <IconButton
                          aria-label='delete'
                          size='small'
                          onClick={() => {
                            setSprites((prev) => prev.filter((item) => item.id != s.id));
                            setAvailableSprites((prev) =>
                              prev.map((item) => (item.id === s.id ? { ...item, isStaged: false } : item))
                            );
                          }}
                        >
                          <DeleteOutlineOutlinedIcon fontSize='small' />
                        </IconButton>
                      </CardActions>
                    </Stack>
                  </Card>
                ) : null
              )}
            </Stack>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}
