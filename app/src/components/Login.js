import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Box, Button, Grid, Paper, Typography} from '@mui/material';
import { MDBInput } from 'mdb-react-ui-kit';
import Globe from '../globe.png';
import Rating from "./Rating";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setError('Please enter both email and password.');
                return;
            }

            const response = await axios.post('/login', { email, password });
            console.log('Login successful:', response.data);
            history('/posts');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Invalid email or password.');
        }
    };

    return (
        <Grid container spacing={0} style={{ height: '100vh' }}>
            <Grid item xs={12} sm={6} style={{ backgroundColor: '#FDFBEE', position: 'relative' }}>
                <Box position="absolute" top="10%" left="5%" transform="translate(-50%, -50%)">
                    <img src={Globe} alt="Globe" style={{ width: '700px', height: 'auto' }} />
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} component={Paper} elevation={3} square>
                <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                    <Grid item xs={10}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Welocome to Travel Buddies!
                        </Typography>
                        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
                        <MDBInput wrapperClass='mb-4' placeholder='Email address' id='email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
                        <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        {error && <p className="text-danger">{error}</p>}

                        <Box textAlign='center'>
                            <Button variant='contained' style={{ backgroundColor: '#FFAE31', width: '30%' }} onClick={handleLogin}>
                                Log In
                            </Button>
                        </Box>
                        <div className="text-center">
                            <p>Not a member? <a color='black' href="/register">Register</a></p>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Login;
