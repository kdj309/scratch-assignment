import { Box, Stack, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import { controls } from '../utils/constants';

export default function RepeatAnimation() {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'action',
      item: { category: 'Repeat Animation', inputs: [] },
      collect(monitor) {
        return {
          isDragging: Boolean(monitor.isDragging()),
        };
      },
    }),
    []
  );
  return (
    <Box ref={drag} sx={{ borderColor: isDragging ? 'black' : '' }}>
      <Typography variant='subtitle2'>Controls</Typography>
      <Stack direction='column' marginY={2} gap={2}>
        {controls.map((item, i) => (
          <Box sx={{ backgroundColor: 'orange', p: 1, color: 'white', borderRadius: '9px' }} key={`${item}${i}`}>
            <Typography variant='body2'>{item}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
