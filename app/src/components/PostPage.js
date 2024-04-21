import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Card, CardContent, Typography, CircularProgress, Rating} from '@mui/material';
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
                <Typography variant="h5" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="subtitle2">
                    Author: {post.authorFirstName} {post.authorLastName}
                </Typography>
                <Typography variant="caption">
                    Created At: {new Date(post.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Ratings:
                    {post.ratings.map(rating => (
                        <span key={rating.id}> {rating.value} </span>
                    ))}
                </Typography>
                <Typography variant="body1" paragraph>
                    {post.body}
                </Typography>

            </CardContent>
        </Card>
    );
};

export default PostPage;
