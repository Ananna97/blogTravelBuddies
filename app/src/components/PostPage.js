import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Grid, Box } from '@mui/material';
import axios from 'axios';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/posts/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!post) {
        return <Typography variant="h6">Post not found</Typography>;
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h3" gutterBottom align="center">
                    {post.title}
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" mb={10}>
                    <Typography variant="body2" color="text.secondary" style={{ marginRight: '20px', fontSize: '1rem' }}>
                        Author: {post.authorFirstName} {post.authorLastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginRight: '20px', fontSize: '1rem' }}>
                        Created At: {new Date(post.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontSize: '1rem' }}>
                        Ratings:
                        {post.ratings.map(rating => (
                            <span key={rating.id} style={{ margin: '0 5px' }}> {rating.value} </span>
                        ))}
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <img
                            src="../../gettyimages-1467072114-656f160a0a37b.jpg"  // Replace with your custom image URL
                            alt="Custom"
                            style={{width: '100%', height: 'auto'}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Box px={2}>
                            <Typography variant="body1" paragraph>
                                {post.body}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PostPage;
