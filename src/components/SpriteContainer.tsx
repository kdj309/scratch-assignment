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

export default function SpriteContainer() {
  const { sprites, setSprites, availableSprites } = useActionsContext();
  const activeSprite = sprites.find((s) => s.isActive);
  const [visible, setvisible] = useState<boolean>(false);
  const handleVisibility = (_: React.MouseEvent<HTMLElement>, newValue: boolean) => {
    setvisible(newValue);
    setSprites((prev) => prev.map((s) => (s.isActive ? { ...s, visible: newValue } : s)));
  };

  const executeActions = () => {
    if (activeSprite?.name) {
      const copied = { ...activeSprite };
      for (let index = 0; index < copied?.activeActions?.length; index++) {
        const element = copied?.activeActions[index];
        if (element.category === 'Move X Steps') {
          copied.x += element.inputs[0];
        } else if (element.category === 'Rotate X degree') {
          copied.rotation = (copied.rotation || 0) + element.inputs[0];
        } else if (element.category === 'Go To X and Y') {
          copied.x = element.inputs[0];
          copied.y = element.inputs[1];
        }
      }
      copied.activeActions = [];
      setSprites((prev) => prev.map((s) => (s.isActive ? { ...copied } : s)));
    }
  };
  const stagedSprites = sprites.filter((s) => s.isStaged).map((s) => s.id);
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
          {activeSprite?.name ? (
            <>
              <Button
                onClick={() => {
                  executeActions();
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
      {sprites.length && (
        <Box width={'100%'} sx={{ height: '100%' }}>
          <Stack direction={'column'} gap={1}>
            <Box>
              <Stage width={500} height={400}>
                <Layer>
                  <Group>
                    {sprites
                      .filter((s) => s.isStaged)
                      .map((s) => (
                        <Image
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
            </Box>

            <Box>
              <Stack direction='row' marginBlock={1} paddingInline={1}>
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
                    <Card key={s.id}>
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
                        <CardHeader titleTypographyProps={{ variant: 'body2',color:"primary" }} title={s.name}></CardHeader>
                        <CardActions disableSpacing>
                          <IconButton aria-label='delete' size='small'>
                            <DeleteOutlineOutlinedIcon fontSize='small' />
                          </IconButton>
                        </CardActions>
                      </Stack>
                    </Card>
                  ) : (
                    <></>
                  )
                )}
              </Stack>
            )}
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
