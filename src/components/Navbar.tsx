import { Box, Button } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import logo from '../assets/logo.svg';

export default function Navbar() {
  return (
    <Grid2 container spacing={2}>
      <Grid2>
        <Box>
          <img src={logo} width={150} height={40} className='tw-object-contain'></img>
        </Box>
      </Grid2>
      <Grid2>
        <Box>
          <Button>Dark Mode/Light Mode</Button>
        </Box>
      </Grid2>
    </Grid2>
  );
}
