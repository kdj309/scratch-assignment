import { Box, Button, Stack, Typography } from '@mui/material';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { Layer, Stage, Image } from 'react-konva';
import { useActionsContext } from '../context/ActionsWrapper';
export default function SpriteContainer() {
  const { sprites } = useActionsContext();
  const activeSprite = sprites.find((s) => s.isActive);
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
          <Box></Box>
        </Stack>
      </Box>
    </Stack>
  );
}
