import React from 'react';
import { Card, CardContent, Typography, Button, Avatar, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PostDisplayCard = ({ post }) => {
    const navigate = useNavigate();

    const handleSeeMore = () => {
        navigate(`/posts/${post.id}`);
    };

    return (
        <Card
            variant="outlined"
            style={{
                marginBottom: '20px',
                width: '600px',
                backgroundColor: '#f0f0f0' // Grey background color
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src={post.userAvatar} alt="User Avatar" />
                    <Box ml={2}>
                        <Typography variant="subtitle1">
                            {post.authorFirstName} {post.authorLastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {new Date(post.createdAt).toLocaleString()}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body2" color="text.primary" paragraph>
                    {post.content.substring(0, 300)}...
                </Typography>
                {/*{post.imageUrl && (*/
                    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                        <img
                            src="../../gettyimages-1467072114-656f160a0a37b.jpg"  // Replace with your custom image URL
                            alt="Custom"
                            style={{width: '100%', height: 'auto'}}
                        />
                    </Box>
}
                <Button variant="contained" color="primary" onClick={handleSeeMore} style={{marginTop: '10px'}}>
                    See More
                </Button>
            </CardContent>
        </Card>
    );
};

export default PostDisplayCard;
