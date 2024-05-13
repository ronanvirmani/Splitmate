import React from 'react'
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import PaidIcon from '@mui/icons-material/Paid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NorthEastIcon from '@mui/icons-material/NorthEast';

function Navbar() {
  return (
    <AppBar position="sticky" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                    mx: 2,
                    my: 4,
                    display: { md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    BillBlend
                </Typography>
                <Box sx={{ 
                    ml: "auto",
                }}>
                    <Button>
                        Login
                        <NorthEastIcon sx={{
                            ml:1
                        }}/>
                    </Button>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Navbar
