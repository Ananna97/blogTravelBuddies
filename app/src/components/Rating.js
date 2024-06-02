import React from 'react';

const Rating = ({ ratings }) => {
    const calculateAverageRating = () => {
        if (!ratings || ratings.length === 0) {
            return 0;
        }

        const totalRating = ratings.reduce((sum, rating) => sum + rating.value, 0);
        return totalRating / ratings.length;
    };

    const averageRating = calculateAverageRating();

    return (
        <div>
            <p>Average Rating: {averageRating.toFixed(2)}</p>
        </div>
    );
};

export default Rating;
