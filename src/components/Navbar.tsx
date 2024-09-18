import { Box, Button } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import logo from '../assets/logo.svg';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { usethemeUtils } from '../context/ThemeWrapper';
export default function Navbar() {
  const { colorMode, toggleColorMode } = usethemeUtils();
  return (
    <Grid2 container spacing={2} sx={{ backgroundColor: '#855cd6', color: 'white' }}>
      <Grid2 size={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ p: 1 }}>
          <img src={logo} width={120} height='3rem' className='tw-object-contain'></img>
        </Box>
      </Grid2>
      <Grid2 size={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box>
          <Button color='inherit' onClick={() => toggleColorMode()}>
            {colorMode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </Button>
        </Box>
      </Grid2>
    </Grid2>
  );
}
