
import Grid from '@mui/material/Grid2'
import './App.css'
import Actions from './components/Actions'
import Code from './components/Code'
import SpriteContainer from './components/SpriteContainer'

function App() {

  return (
    <Grid container spacing={3}>
      <Grid size={2}>
        <Code></Code>
      </Grid>
      <Grid size={6}>
        <Actions></Actions>
      </Grid>
      <Grid size={4}>
        <SpriteContainer></SpriteContainer>
      </Grid>
    </Grid>
  )
}

export default App
