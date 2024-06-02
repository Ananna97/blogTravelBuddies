import React from 'react';
import { Card, CardContent, Typography, Button, Avatar, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PostDisplayCard = ({ post }) => {
    const navigate = useNavigate();

    const handleSeeMore = () => {
        navigate(`/posts/${post.id}`);
    };

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
                        {renderImage()}
                    </Box>
                }
                <Button variant="contained" onClick={handleSeeMore}
                        style={{backgroundColor: "#FFAE31", marginTop: '10px'}}>
                    See More
                </Button>
            </CardContent>
        </Card>
);
};

export default PostDisplayCard;
