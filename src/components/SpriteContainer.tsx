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
import { useCallback, useMemo, useRef, useState } from 'react';
import { maxCanvasHeight, maxSize } from '../utils/constants';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { activeAction, sprite } from '../utils/types';
import { IRect } from 'konva/lib/types';
import * as lodash from 'lodash';

export default function SpriteContainer() {
  const { sprites, setSprites, availableSprites, setAvailableSprites } = useActionsContext();
  const activeSprite = sprites.find((s) => s.isActive);
  const [visible, setvisible] = useState<boolean>(false);
  const layerRef = useRef(null);

  const handleVisibility = useCallback((_: React.MouseEvent<HTMLElement>, newValue: boolean) => {
    setvisible(newValue);
    setSprites((prev) => prev.map((s) => (s.isActive ? { ...s, visible: newValue } : s)));
  }, []);

  const executeActions = useCallback(
    (actions: activeAction[], allactions: activeAction[], copied: sprite) => {
      const updatedCopied = lodash.cloneDeep(copied);

      for (let index = 0; index < actions.length; index++) {
        const element = actions[index];
        if (element.category === 'Move X Steps') {
          updatedCopied.x += element.inputs[0];
        } else if (element.category === 'Rotate X degree') {
          updatedCopied.rotation = (updatedCopied.rotation || 0) + element.inputs[0];
        } else if (element.category === 'Go To X and Y') {
          updatedCopied.x = element.inputs[0];
          updatedCopied.y = element.inputs[1];
        } else if (element.category === 'Repeat Animation') {
          updatedCopied.activeActions = allactions.slice(0, index);
          executeActions(updatedCopied.activeActions, allactions, updatedCopied);
          break;
        }

        const { didCollide, otherSpriteId } = detectCollision(updatedCopied, sprites);
        if (didCollide) {
          const othersprite = sprites.find((s) => s.id === otherSpriteId);
          if (othersprite) {
            console.log('Collision Detection');
            updatedCopied.collision = true;
            const copiedOtherSprite = lodash.cloneDeep(othersprite);
            const temp = updatedCopied.activeActions;
            updatedCopied.activeActions = copiedOtherSprite.activeActions;
            copiedOtherSprite.activeActions = temp;

            setSprites((prevSprites) => {
              return prevSprites.map((s) => {
                if (s.id === updatedCopied.id) {
                  return updatedCopied;
                }
                if (s.id === othersprite.id) {
                  return copiedOtherSprite;
                }
                return s;
              });
            });
            handleCollision(
              copiedOtherSprite,
              updatedCopied,
              copiedOtherSprite.activeActions,
              updatedCopied.activeActions
            );
            break;
          }
        } else {
          updatedCopied.collision = false;
        }
      }

      if (updatedCopied.activeActions[0]?.category !== 'Repeat Animation') {
        updatedCopied.activeActions = [];
      }

      setSprites((prev) => prev.map((s) => (s.id === updatedCopied.id ? updatedCopied : s)));
    },
    [sprites]
  );
  const stagedSprites = useMemo(() => sprites.filter((s) => s.isStaged).map((s) => s.id), [sprites]);
  const detectCollision = useCallback((updatedSprite: sprite, allSprites: sprite[]) => {
    if (layerRef.current) {
      // @ts-ignore
      const activeNode = layerRef.current.findOne(`#${updatedSprite.id}`);
      let activeRect = activeNode.getClientRect();
      activeRect.x = updatedSprite.x;
      activeRect.y = updatedSprite.y;
      for (let sprite of allSprites) {
        if (sprite.id !== updatedSprite.id) {
          // @ts-ignore
          const otherNode = layerRef.current.findOne(`#${sprite.id}`);
          const otherRect = otherNode.getClientRect();
          if (haveIntersection(activeRect, otherRect)) {
            return { didCollide: true, otherSpriteId: sprite.id };
          }
        }
      }
    }

    return { didCollide: false, otherSpriteId: null };
  }, []);
  const handleCollision = useCallback(
    (spriteone: sprite, spritetwo: sprite, spriteOneActions: activeAction[], spriteTwoActions: activeAction[]) => {
      const updatedOneCopied = lodash.cloneDeep(spriteone);
      const updateTwoCopied = lodash.cloneDeep(spritetwo);
      for (let index = 0; index < spriteOneActions.length; index++) {
        const element = spriteOneActions[index];
        if (element.category === 'Move X Steps') {
          updatedOneCopied.x += element.inputs[0];
        } else if (element.category === 'Rotate X degree') {
          updatedOneCopied.rotation = (updatedOneCopied.rotation || 0) + element.inputs[0];
        } else if (element.category === 'Go To X and Y') {
          updatedOneCopied.x = element.inputs[0];
          updatedOneCopied.y = element.inputs[1];
        } else if (element.category === 'Repeat Animation') {
          updatedOneCopied.activeActions = spriteOneActions.slice(0, index);
          executeActions(updatedOneCopied.activeActions, spriteOneActions, updatedOneCopied);
          break;
        }
      }
      for (let index = 0; index < spriteTwoActions.length; index++) {
        const element = spriteTwoActions[index];
        if (element.category === 'Move X Steps') {
          updateTwoCopied.x += element.inputs[0];
        } else if (element.category === 'Rotate X degree') {
          updateTwoCopied.rotation = (updatedOneCopied.rotation || 0) + element.inputs[0];
        } else if (element.category === 'Go To X and Y') {
          updateTwoCopied.x = element.inputs[0];
          updateTwoCopied.y = element.inputs[1];
        } else if (element.category === 'Repeat Animation') {
          updateTwoCopied.activeActions = spriteTwoActions.slice(0, index);
          executeActions(updateTwoCopied.activeActions, spriteTwoActions, updateTwoCopied);
          break;
        }
      }
      if (updatedOneCopied.activeActions[0]?.category !== 'Repeat Animation') {
        updatedOneCopied.activeActions = [];
      }
      if (updateTwoCopied.activeActions[0]?.category !== 'Repeat Animation') {
        updateTwoCopied.activeActions = [];
      }

      setSprites((prev) =>
        prev.map((s) =>
          (s.id === updatedOneCopied.id
            ? { ...updatedOneCopied, collision: false }
            : s.id === updateTwoCopied.id
              ? { ...updateTwoCopied, collision: false }
              : s)
        )
      );
    },
    []
  );

  const haveIntersection = useCallback((r1: IRect, r2: IRect) => {
    return !(
      r2.x > r1.x + Math.floor(r1.width) ||
      r2.x + Math.floor(r2.width) < r1.x ||
      r2.y > r1.y + Math.floor(r1.height) ||
      r2.y + Math.floor(r2.height) < r1.y
    );
  }, []);
  const playHandler = useCallback(() => {
    if (activeSprite?.name) {
      const copied = lodash.cloneDeep(activeSprite);
      let originalActions = [...copied.activeActions];
      executeActions(copied.activeActions, originalActions, copied);
    }
  }, [activeSprite]);
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
              <Button onClick={() => playHandler()}>
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
              <Stage width={500} height={400} ref={layerRef}>
                <Layer>
                  <Group>
                    {sprites
                      .filter((s) => s.isStaged)
                      .map((s) => (
                        <Image
                          key={s.id}
                          image={s?.image}
                          id={s.id}
                          x={s?.x}
                          y={s?.y}
                          visible={s?.visible}
                          scaleX={Math.min(50, s?.size / maxSize)}
                          scaleY={Math.min(50, s?.size / maxCanvasHeight)}
                          rotation={s.rotation}
                          draggable={true}
                          onDragStart={() => {
                            setSprites((prev) =>
                              prev.map((i) =>
                                (i.id === s.id ? { ...i, isDragging: true, isActive: true } : { ...i, isActive: false })
                              )
                            );
                          }}
                          onDragEnd={(evt) => {
                            setSprites((prev) =>
                              prev.map((i) =>
                                (i.id === s.id ? { ...i, x: evt.target.x(), y: evt.target.y(), isDragging: false } : i)
                              )
                            );
                          }}
                          shadowEnabled={s.isDragging}
                          shadowColor='#9c7ade'
                          shadowBlur={15}
                          onDragMove={(e) => {
                              const id = e.target.id();
                              const rect = e.target.getClientRect();
                              if (layerRef?.current != undefined) {
                                setSprites((prevSprites) =>
                                  prevSprites.map((sprite) => {
                                    if (sprite.id !== id) {
                                      // @ts-ignore
                                      const otherRect = layerRef?.current.findOne(`#${sprite.id}`).getClientRect();
                                      if (haveIntersection(rect, otherRect)) {
                                        return { ...sprite, collision: true };
                                      }
                                      return { ...sprite, collision: false };
                                    }
                                    return sprite;
                                  })
                                );
                              }
                          }}
                          fill={s.collision ? 'red' : ''}
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
                (stagedSprites.includes(s.id) ? (
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
                    className={s.id === activeSprite?.id ? `tw-border-2 tw-border-[#9c7ade] ` : ''}
                  >
                    <Stack justifyContent='center' alignItems='center'>
                      <CardMedia
                        width={'28px'}
                        component='img'
                        sx={{ maxHeight: '32px', maxWidth: '32px', objectFit: 'contain' }}
                        height='28px'
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
                          onClick={(e) => {
                            setSprites((prev) => {
                              const copied = [...prev];
                              const filteredSprites = copied.filter((item) => item.id != s.id);
                              filteredSprites[0].isActive = true;
                              return filteredSprites;
                            });
                            setAvailableSprites((prev) =>
                              prev.map((item) => (item.id === s.id ? { ...item, isStaged: false } : item))
                            );
                            e.stopPropagation();
                          }}
                        >
                          <DeleteOutlineOutlinedIcon fontSize='small' />
                        </IconButton>
                      </CardActions>
                    </Stack>
                  </Card>
                ) : null)
              )}
            </Stack>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}
