import {useContext} from 'react';
import RatingStars from './RatingStars';
import { RatingsContext } from '../context/RatingsContext';

const ProductCard = ({ product }) => {
    const { ratings } = useContext(RatingsContext);
    const productRating = ratings[product.id] || Math.round(product.rating.rate);

    return (
        <div className="product-card">
            <h3>{product.title}</h3>
            <RatingStars rating={productRating} />
        </div>
    );
};

export default ProductCard;