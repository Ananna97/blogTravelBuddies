import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Comment = ({ comment }) => {
    return (
        <Card variant="outlined" style={{ marginBottom: '10px' }}>
            <CardContent>
                {comment.authorCommentFirstName && comment.authorCommentLastName ? (
                    <Typography variant="body2" color="text.secondary">
                        <b>{comment.authorCommentFirstName} {comment.authorCommentLastName}:</b>
                    </Typography>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        <b>Anonymous:</b>
                    </Typography>
                )}
                <Typography variant="body1">
                    {comment.text}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Comment;
