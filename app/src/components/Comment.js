import React, {useEffect, useState} from 'react';
import {Card, CardContent, CircularProgress, Typography} from '@mui/material';
import {useParams} from "react-router-dom";
import axios from "axios";

const Comment = () => {
    const { id } = useParams();
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await axios.get(`/comments/${id}`);
                setComment(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchComment();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Card variant="outlined" style={{ marginBottom: '10px' }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary" >
                    <b>{comment.authorCommentFirstName} {comment.authorCommentLastName} : </b>
                </Typography>
                <Typography variant="body1">
                    {comment.text}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Comment;
