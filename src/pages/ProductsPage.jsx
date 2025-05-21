import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/ProductsPage.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="products-container">
            <h1>All Products</h1>
            <div className="products-grid">
                {products.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id} className="product-link">
                        <ProductCard product={product} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;