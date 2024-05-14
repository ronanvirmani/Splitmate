import React from 'react'
import Box from '@mui/material/Box';
import Highlights from '../components/Highlights';
import Hero from '../components/Hero';



function Home() {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
        <Hero />
        <Highlights />
    </Box>
  )
}

export default Home
