import Grid from '@mui/material/Grid2';
import './App.css';
import Actions from './components/Actions';
import Code from './components/Code';
import SpriteContainer from './components/SpriteContainer';
import { Container, Stack } from '@mui/material';
import Navbar from './components/Navbar';
import SpriteOptions from './components/SpriteOptions';

function App() {
  return (
    <>
      <Stack direction='column'>
        <Navbar></Navbar>
        <Container sx={{ backgroundColor: 'hsl(216deg 100% 95.1%)' }} maxWidth='xl'>
          <Grid container spacing={2} sx={{ height: 'calc(100vh - 65px)' }}>
            <Grid size={3} sx={{ backgroundColor: '#f9f9f9' }}>
              <Code></Code>
            </Grid>
            <Grid size={5} sx={{ backgroundColor: '#f9f9f9' }}>
              <Actions></Actions>
            </Grid>
            <Grid size={4} sx={{ backgroundColor: 'white' }}>
              <SpriteContainer></SpriteContainer>
            </Grid>
          </Grid>
        </Container>
      </Stack>
      <SpriteOptions />
    </>
  );
}

export default App;
