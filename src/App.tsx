import Grid from '@mui/material/Grid2';
import './App.css';
import Actions from './components/Actions';
import Code from './components/Code';
import SpriteContainer from './components/SpriteContainer';
import { Stack } from '@mui/material';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Stack direction='column' gap={2}>
        <Navbar></Navbar>
        <Grid container spacing={2} sx={{ height: 'calc(100vh - 95px)' }}>
          <Grid size={3}>
            <Code></Code>
          </Grid>
          <Grid size={6}>
            <Actions></Actions>
          </Grid>
          <Grid size={3}>
            <SpriteContainer></SpriteContainer>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default App;
