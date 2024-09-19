import { useState } from 'react';
import { actions } from '../utils/constants';
import { Box, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';

export default function RotateInput() {
  const [degreeValue, setDegreeValue] = useState<number>(45);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'action',
      item: { category: 'Rotate X degree', inputs: [degreeValue] },
      collect(monitor) {
        return {
          isDragging: !!monitor.isDragging(),
        };
      },
    }),
    [degreeValue]
  );

  return (
    <Box
      sx={{
        backgroundColor: '#1976d2',
        p: 1,
        color: 'white',
        borderRadius: '9px',
        borderColor: isDragging ? 'black' : '',
      }}
      key={`${actions[0]}`}
      ref={drag}
    >
      <Typography variant='body2'>Turn {degreeValue} degree</Typography>
      <Box>
        <label htmlFor='degreevalue'>X:</label>
        <input
          id='degreevalue'
          value={degreeValue}
          type='number'
          onChange={(e) => setDegreeValue(parseInt(e.target.value))}
          className='tw-w-36 tw-text-black tw-px-1 tw-border-r-4'
        />
      </Box>
    </Box>
  );
}
