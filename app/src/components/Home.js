import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import PostFeed from './PostFeed';

function Home({ email }) {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setPosts([]);  // Set to an empty array in case of error
            }
        };
        fetchPosts();
    }, []);

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginBottom: '20px' }}>
                Logout
            </Button>
            <Box mt={2}>
                <PostFeed posts={posts} />
            </Box>
        </Box>
    );
}

export default Home;
