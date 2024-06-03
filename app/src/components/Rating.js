import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const Rating = ({ ratings, postId }) => {
    const [userRating, setUserRating] = useState(0); // State to hold user's input rating
    const [ratingSubmitted, setRatingSubmitted] = useState(false);

    const handleRatingChange = (event) => {
        setUserRating(parseInt(event.target.value));
    };

    const handleRatingSubmit = async () => {
        try {
            await axios.post(`/ratings/${postId}?value=${userRating}`);
            const response = await axios.get(`/posts/${postId}`);
            setRatingSubmitted(true);
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    const calculateAverageRating = () => {
        if (!ratings || ratings.length === 0) {
            return 0;
        }

        const totalRating = ratings.reduce((sum, rating) => sum + rating.value, 0);
        return totalRating / ratings.length;
    };

    const averageRating = calculateAverageRating();

    return (
        <Box>
            <p>Average Rating: {averageRating.toFixed(2)}</p>
            <Box display="flex" alignItems="center" mb={2}>
                <TextField
                    label="Your Rating"
                    variant="outlined"
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 10 } }}
                    value={userRating}
                    onChange={handleRatingChange}
                />
                <Button variant="contained"  style={{ backgroundColor: '#FFAE31', marginLeft:'10px'}} onClick={handleRatingSubmit} disabled={ratingSubmitted}>
                    Submit Rating
                </Button>
            </Box>
        </Box>
    );
};

export default Rating;
