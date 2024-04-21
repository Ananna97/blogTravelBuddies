import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import Logo from '../logo.png';

const Navbar = ({ isLoggedIn, onLogout }) => {
    const location = useLocation();

    const handleLogout = () => {
        console.log(isLoggedIn)
        onLogout();
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#FFAE31' }}>
            <Toolbar>
                {/* Logo on the left */}
                <IconButton edge="start" color="inherit" aria-label="logo">
                    <img src={Logo} alt="Logo" style={{ width: '160px', height: 'auto' }} />
                </IconButton>
                {isLoggedIn && location.pathname !== '/login' && (
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
