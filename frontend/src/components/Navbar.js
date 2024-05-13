import React from 'react'
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <AppBar position="sticky" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mx: 2,
                    my: 4,
                    display: { xs: 'block', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    fontSize: 'auto'
                    }}
                >
                    Splitmate
                </Typography>
                <Box sx={{ 
                    ml: "auto",
                }}>
                    <Link to="/login" style={{textDecoration: 'none', color: 'inherit'}}>
                        <Button>
                            Login
                            <NorthEastIcon sx={{
                                ml:1
                            }}/>
                        </Button>
                    </Link>
                    
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Navbar
