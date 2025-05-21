import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RatingStars from '../components/RatingStars';
import { RatingsContext } from '../context/RatingsContext';
import '../styles/ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { ratings, updateRating } = useContext(RatingsContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentRating, setCurrentRating] = useState(
        ratings[id] !== undefined ? ratings[id] : null
    );

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) throw new Error('Product not found');
                const data = await response.json();

                setProduct(data);
                if (currentRating === null) {
                    setCurrentRating(Math.round(data.rating.rate));
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleRatingChange = (newRating) => {
        setCurrentRating(newRating);
        updateRating(id, newRating);
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="product-page">
                <div className="loading">Loading product details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-page">
                <div className="error">{error}</div>
                <button onClick={handleBack} className="back-button">
                    Go Back
                </button>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-page">
                <div className="error">Product data not available</div>
                <button onClick={handleBack} className="back-button">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="product-page">
            <h1 className="product-title">{product.title}</h1>

            <div className="image-container">
                <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                />
            </div>

            <div className="price-section">
                <span className="price-label">Price:</span>
                <span className="product-price">${product.price.toFixed(2)}</span>
            </div>

            <div className="description-section">
                <h3 className="description-title">Description:</h3>
                <p className="product-description">{product.description}</p>
            </div>

            <div className="rating-section">
                <h3 className="rating-title">Your Rating:</h3>
                <RatingStars
                    rating={currentRating}
                    editable={true}
                    onRatingChange={handleRatingChange}
                />
                <span className="rating-value">({currentRating}/5)</span>
            </div>

            <div className="actions">
                <button onClick={handleBack} className="back-button">
                    ← Back to Products
                </button>
            </div>
        </div>
    );
};

export default ProductPage;