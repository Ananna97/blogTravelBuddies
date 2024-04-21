import React from 'react';
import { Card, CardContent, Typography, Button, Avatar, Grid } from '@mui/material';

const PostDisplayCard = ({ post }) => {
    const handleSeeMore = () => {
        // Redirect to the full post content page
        window.location.href = `/posts/${post.id}`;
    };

    return (
        <Card variant="outlined" style={{ marginBottom: '20px' }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Avatar src={post.userAvatar} alt="User Avatar" />
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {post.authorFirstName} {post.authorLastName}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="h5" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post.content.substring(0, 100)}...
                </Typography>
                <Button variant="contained" color="primary" onClick={handleSeeMore} style={{ marginTop: '10px' }}>
                    See More
                </Button>
            </CardContent>
        </Card>
    );
};

export default PostDisplayCard;
