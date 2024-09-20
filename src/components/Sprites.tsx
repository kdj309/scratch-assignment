import { Box, Grid2, IconButton, Stack, Typography } from '@mui/material';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useNavigate } from 'react-router';
import AvailableSpritesContainer from './AvailableSpritesContainer';

export default function AllSprites() {
  const navigate = useNavigate();
  return (
    <Stack direction='column' gap={1}>
      <Grid2 container spacing={2} sx={{ backgroundColor: '#855cd6', color: 'white' }}>
        <Grid2 size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ p: 1 }}>
            <IconButton onClick={() => navigate(-1)}>
              <KeyboardBackspaceOutlinedIcon className='!tw-text-white' />
            </IconButton>
          </Box>
        </Grid2>
        <Grid2 size={8}>
          <Stack height='100%' justifyContent='center' alignItems='start'>
            <Typography variant='h5'>Choose a sprite</Typography>
          </Stack>
        </Grid2>
      </Grid2>
      <AvailableSpritesContainer />
    </Stack>
  );
}
