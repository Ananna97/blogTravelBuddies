import React from 'react';
import {useLocation, Link, useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import Logo from '../logo.png';

const Navbar = ({ isLoggedIn }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const handleHome = () => {
        navigate('/posts');
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#FFAE31' }}>
            <Toolbar>
                {/* Logo on the left */}
                <IconButton onClick={handleHome} edge="start" color="inherit" aria-label="logo">
                    <img src={Logo} alt="Logo" style={{ width: '160px', height: 'auto' }} />
                </IconButton>

                {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/' && (
                    <Button onClick={handleLogout}
                            style={{backgroundColor:'transparent',
                                color:'white',
                                float: 'right',
                                marginTop: '20px',
                                marginLeft:'80%',
                                outline: 'none',
                                boxShadow: 'none',
                                marginBottom: '20px' }}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
