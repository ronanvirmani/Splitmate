import React from 'react'
import Box from '@mui/material/Box';
import Highlights from '../components/Highlights';
import Hero from '../components/Hero';
import { useAuthContext } from '../hooks/useAuthContext';



function LandingPage() {

  const { user } = useAuthContext();

  // if (user){
  //   //redirect to the dashboard
  //   window.location.href = '/dashboard';
  // }

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
        <Hero />
        <Highlights />
    </Box>
  )
}

export default LandingPage
