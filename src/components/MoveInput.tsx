import { useState } from 'react';
import { actions } from '../utils/constants';
import { Box, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';

export default function MoveInput() {
  const [stepsCount, setStepsCount] = useState<number>(10);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'action',
      item: { category: 'Move X Steps', inputs: [stepsCount] },
      collect(monitor) {
        return {
          isDragging: !!monitor.isDragging(),
        };
      },
    }),
    [stepsCount]
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
      key={`${actions[0]}`}
    >
      <Typography variant='body2'>Move {stepsCount} steps</Typography>
      <Box>
        <label htmlFor='stepscount'>X:</label>
        <input
          id='stepscount'
          value={stepsCount}
          type='number'
          onChange={(e) => setStepsCount(parseInt(e.target.value))}
          className='tw-w-36 tw-text-black tw-px-1 tw-border-r-4'
        />
      </Box>
    </Box>
  );
}
