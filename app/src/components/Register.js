import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { MDBInput } from 'mdb-react-ui-kit';
import Globe from '../globe.png';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('ROLE_CUSTOMER');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleSignup = async () => {
        try {
            if (!firstName || !lastName || !email || !password || !confirmPassword ) {
                setError('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const response = await axios.post('/register', {
                firstName,
                lastName,
                email,
                password,
                role,
            });
            console.log(response.data);
            history('/posts');
        } catch (error) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : error.message);
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
                        <Typography variant="h4" align="center" gutterBottom>Sign Up Page</Typography>
                        {error && <p className="text-danger">{error}</p>}
                        <MDBInput wrapperClass='mb-3' id='firstName' placeholder={"First Name"} value={firstName} type='text' onChange={(e) => setFirstName(e.target.value)}/>
                        <MDBInput wrapperClass='mb-3' id='lastName' placeholder={"Last Name"} value={lastName} type='text' onChange={(e) => setLastName(e.target.value)}/>
                        <MDBInput wrapperClass='mb-3' placeholder='Email Address' id='email' value={email} type='email' onChange={(e) => setEmail(e.target.value)}/>
                        <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <MDBInput wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPassword' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

                        <label className="form-label mb-1">Role:</label>
                        <select className="form-select mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="ROLE_USER">User</option>
                            <option value="ROLE_ADMIN">Admin</option>
                        </select>

                        <Box textAlign='center'>
                            <Button variant='contained' style={{ backgroundColor: '#FFAE31', width: '30%' }} onClick={handleSignup}>
                                Register
                            </Button>
                        </Box>

                        <div className="text-center">
                            <p>Already Register? <a href="/">Login</a></p>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Register;
