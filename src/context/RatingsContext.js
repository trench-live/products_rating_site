import { createContext, useState, useEffect } from 'react';

export const RatingsContext = createContext();

export const RatingsProvider = ({ children }) => {
    const [ratings, setRatings] = useState(() => {
        const savedRatings = localStorage.getItem('productRatings');
        return savedRatings ? JSON.parse(savedRatings) : {};
    });

    useEffect(() => {
        localStorage.setItem('productRatings', JSON.stringify(ratings));
    }, [ratings]);

    const updateRating = (productId, newRating) => {
        setRatings(prev => ({
            ...prev,
            [productId]: newRating
        }));
    };

    return (
        <RatingsContext.Provider value={{ ratings, updateRating }}>
            {children}
        </RatingsContext.Provider>
    );
};