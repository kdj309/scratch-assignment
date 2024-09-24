import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDrag } from 'react-dnd';

export default function MoveToXandY() {
  const [xcount, setXcount] = useState<number>(120);
  const [ycount, setYcount] = useState<number>(120);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'action',
      item: { category: 'Go To X and Y', inputs: [xcount, ycount] },
      collect(monitor) {
        return {
          isDragging: Boolean(monitor.isDragging()),
        };
      },
    }),
    [xcount, ycount]
  );
  return (
    <Box
      ref={drag}
      sx={{
        backgroundColor: '#1976d2',
        p: 1,
        color: 'white',
        borderRadius: '9px',
        borderColor: isDragging ? 'black' : '',
      }}
    >
      <Typography variant='body2'>
        Go To X {xcount} and Y {ycount}
      </Typography>
      <Stack direction='column' gap={1}>
        <Box>
          <label htmlFor='stepscount'>X:</label>
          <input
            id='stepscount'
            value={xcount}
            type='number'
            onChange={(e) => setXcount(parseInt(e.target.value))}
            className='tw-w-36 tw-text-black tw-px-1 tw-border-r-4'
          />
        </Box>
        <Box>
          <label htmlFor='stepscount'>Y:</label>
          <input
            id='stepscount'
            value={ycount}
            type='number'
            onChange={(e) => setYcount(parseInt(e.target.value))}
            className='tw-w-36 tw-text-black tw-px-1 tw-border-r-4'
          />
        </Box>
      </Stack>
    </Box>
  );
}
