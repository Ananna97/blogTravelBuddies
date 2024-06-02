import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Comment = ({ comment }) => {
    return (
        <Card variant="outlined" style={{ marginBottom: '10px' }}>
            <CardContent>
                <Typography variant="body1">
                    {comment.text}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Author: {comment.authorCommentFirstName} {comment.authorCommentLastName}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Comment;
