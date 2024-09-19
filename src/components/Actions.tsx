import { Box } from '@mui/material';
import { useDrop } from 'react-dnd';

export default function Actions() {
  const {} = useDrop(() => ({
    accept: 'action',
    drop: (item) => console.log(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return <Box sx={{ width: '100%', borderRight: '1px solid hsl(0deg 0% 0% / 15%)', height: '100%' }}>Actions</Box>;
}
