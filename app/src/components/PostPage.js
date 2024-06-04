import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Grid, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import Rating from './Rating';
import Comment from './Comment';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [ratingValue, setRatingValue] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/posts/${id}`);
                setPost(response.data);
                setComments(response.data.comments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/comments/${id}`, { text: newComment });
            const newCommentData = response.data;
            setComments([...comments, newCommentData]);
            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleRatingSubmit = async () => {
        try {
            await axios.post(`/ratings/${id}`, { value: ratingValue });
            // Fetch updated post data
            const response = await axios.get(`/posts/${id}`);
            const updatedPostData = response.data;
            // Update state with the new post data
            setPost(updatedPostData);
            setComments(updatedPostData.comments);
            // Clear rating input
            setRatingValue('');
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

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
        } else if (post.id === 2) {
            imageUrl = "../../bologna.jpg";
        } else {
            imageUrl = "../../amsterdam.jpg";
        }
        return (
            <img
                src={imageUrl}
                alt="Custom"
                style={{ width: '100%', height: 'auto' }}
            />
        );
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h3" gutterBottom align="center">
                    {post.title}
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" mb={10}>
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
                    <Grid item xs={12} sm={8}>
                        <Box px={2} style={{ marginRight: '20px', marginBottom: '20px', marginLeft: '10px', width: '800px', backgroundColor: '#FBF8DD' }}>
                            <Typography style={{ padding: '60px', width: '800px', backgroundColor: '#f8f6eb' }} variant="body1" paragraph>
                                {post.body}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Typography variant="h5" gutterBottom>
                    <Rating ratings={post.ratings} />
                </Typography>

                <Typography variant="h5" gutterBottom>
                    Comments
                </Typography>
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}

                <form onSubmit={handleCommentSubmit}>
                    <TextField
                        label="Add a comment"
                        variant="outlined"
                        fullWidth
                        value={newComment}
                        onChange={handleCommentChange}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                        Submit
                    </Button>
                </form>

                <TextField
                    label="Add your rating"
                    variant="outlined"
                    value={ratingValue}
                    onChange={(e) => setRatingValue(e.target.value)}
                />
                <Button onClick={handleRatingSubmit} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    Submit Rating
                </Button>
            </CardContent>
        </Card>
    );
};

export default PostPage;
