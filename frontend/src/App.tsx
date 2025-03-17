import { Box, Container } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Routes>
          {/* Routes will be added here */}
        </Routes>
      </Container>
    </Box>
  )
}

export default App