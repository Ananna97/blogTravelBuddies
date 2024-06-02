import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Grid, Box } from '@mui/material';
import axios from 'axios';
import Rating from './Rating'; // Import the Rating component
import Comment from './Comment'; // Import the Comment component

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

    const renderImage = () => {
        let imageUrl = '';
        if (post.id === 1) {
            imageUrl = "../../barcelona.jpg";
        } else {
            if (post.id === 2) {
                imageUrl = "../../bologna.jpg";
            } else {
                imageUrl = "../../amsterdam.jpg";
            }
        }
        return (
            <img
                src={imageUrl}  // Replace with your custom image URL
                alt="Custom"
                style={{width: '100%', height: 'auto'}}
            />
        );
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h3" gutterBottom align="center">
                    {post.title}
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" mb={10} >
                    <Typography variant="body2" color="text.secondary" style={{ marginRight: '20px', fontSize: '1rem' }}>
                        Category: {post.categoryName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginRight: '20px', fontSize: '1rem' }}>
                        Author: {post.authorFirstName} {post.authorLastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginRight: '20px', fontSize: '1rem' }}>
                        Created At: {new Date(post.createdAt).toLocaleString()}
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        {renderImage()}
                    </Grid>
                    <Grid item xs={12} sm={8} >
                        <Box px={2}
                             style={{
                                 marginRight: '20px',
                                 marginBottom: '20px',
                                 marginLeft: '10px',
                                 width: '800px',
                                 backgroundColor: '#FBF8DD' // Grey background color
                             }}>
                            <Typography variant="body1" paragraph>
                                {post.body}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Typography variant="h5" gutterBottom>
                    <Rating ratings={post.ratings} />
                </Typography>
                {post.comments.map(comment => {
                    console.log(comment);
                    return (<Comment key={comment.id} comment={comment} />);
                })}
            </CardContent>
        </Card>
    );
};

export default PostPage;
