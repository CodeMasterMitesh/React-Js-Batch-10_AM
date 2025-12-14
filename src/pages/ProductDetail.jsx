import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useCart } from '../context/CartContext';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/products/${productId}`);
      if (data.success) {
        setProduct(data.product);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const result = await addToCart(productId, quantity);
    if (result.success) {
      alert('Added to cart!');
      // Can redirect to cart or keep user on page
    } else {
      alert(result.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return <div className={styles.container}><p>Loading...</p></div>;
  }

  if (error || !product) {
    return (
      <div className={styles.container}>
        <p>{error || 'Product not found'}</p>
        <button onClick={() => navigate('/shop')} className={styles.backBtn}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img 
              src={product.images?.[selectedImage] || '/placeholder.png'} 
              alt={product.name}
            />
            {product.isFeatured && (
              <div className={styles.badge}>Featured</div>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx}`}
                  className={selectedImage === idx ? styles.activeThumbnail : ''}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className={styles.details}>
          <h1>{product.name}</h1>
          
          <div className={styles.rating}>
            <span className={styles.ratingValue}>⭐ {product.rating?.toFixed(1) || 'N/A'}</span>
            <span className={styles.ratingCount}>({product.reviews?.length || 0} reviews)</span>
          </div>

          <p className={styles.category}>
            Category: <span>{product.category?.name || 'Uncategorized'}</span>
          </p>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.pricing}>
            <div className={styles.price}>
              <span className={styles.currentPrice}>₹{product.price?.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className={styles.originalPrice}>₹{product.originalPrice?.toFixed(2)}</span>
                  <span className={styles.discount}>
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>
          </div>

          <div className={styles.stock}>
            {product.stock > 0 ? (
              <span className={styles.inStock}>
                ✓ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className={styles.outOfStock}>Out of Stock</span>
            )}
          </div>

          <div className={styles.actions}>
            <div className={styles.quantityControl}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
                max={product.stock}
              />
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>

            <button
              className={styles.addToCartBtn}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              🛒 Add to Cart
            </button>
          </div>

          <div className={styles.specifications}>
            <h3>Specifications</h3>
            <ul>
              <li><strong>SKU:</strong> {product.sku}</li>
              <li><strong>Stock:</strong> {product.stock} units</li>
              {product.brand && <li><strong>Brand:</strong> {product.brand}</li>}
              {product.weight && <li><strong>Weight:</strong> {product.weight}</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
