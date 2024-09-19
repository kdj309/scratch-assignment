import { Box, Button, Stack, Typography } from '@mui/material';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { Layer, Stage, Image } from 'react-konva';
import catsprit from '../assets/catsprite.svg';
import useImage from 'use-image';
export default function SpriteContainer() {
  const [image] = useImage(catsprit);
  return (
    <Stack>
      <Box sx={{ borderBottom: '1px solid hsl(0deg 0% 0% / 15%)', height: 'max-content', paddingBlock: '0.4rem' }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='subtitle1'>Sprite</Typography>
          <Button>
            <PlayCircleFilledOutlinedIcon />
            <StopCircleOutlinedIcon></StopCircleOutlinedIcon>
          </Button>
        </Stack>
      </Box>
      <Box width={'100%'} sx={{ height: '100%' }}>
        <Stack direction={'column'}>
          <Stage width={500} height={400}>
            <Layer>
              <Image image={image} x={image?.x} y={image?.y} />
            </Layer>
          </Stage>
          <Box></Box>
        </Stack>
      </Box>
    </Stack>
  );
}
