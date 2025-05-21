import React from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ rating, editable = false, onRatingChange }) => {
    const handleClick = (newRating) => {
        if (editable && onRatingChange) {
            onRatingChange(newRating);
        }
    };

    return (
        <div className="rating-stars">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <FaStar
                        key={index}
                        className="star"
                        color={starValue <= rating ? '#ffc107' : '#e4e5e9'}
                        size={20}
                        onClick={() => handleClick(starValue)}
                        style={{ cursor: editable ? 'pointer' : 'default' }}
                    />
                );
            })}
        </div>
    );
};

export default RatingStars;