import { useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LMS Project
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to the LMS
          </Typography>

          <Button variant="contained" color="primary" onClick={() => setCount(c => c + 1)}>
            Clicked {count} times
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default App
