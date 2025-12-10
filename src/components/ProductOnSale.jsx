import React from "react";
import styles from "./ProductOnSale.module.css";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";

const ProductOnSale = () => {
    const products = [
        {
            id: 1,
            name: "Premium Bluetooth Speaker",
            price: 59.99,
            originalPrice: 99.99,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
            rating: 4.5,
            reviews: 128
        },
        {
            id: 2,
            name: "Leather Wallet",
            price: 24.99,
            originalPrice: 49.99,
            image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
            rating: 4.8,
            reviews: 256
        },
        {
            id: 3,
            name: "Digital Camera",
            price: 299.99,
            originalPrice: 499.99,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
            rating: 4.7,
            reviews: 89
        },
        {
            id: 4,
            name: "Gaming Mouse",
            price: 39.99,
            originalPrice: 69.99,
            image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
            rating: 4.6,
            reviews: 342
        },
        {
            id: 5,
            name: "Wireless Earbuds",
            price: 79.99,
            originalPrice: 129.99,
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
            rating: 4.9,
            reviews: 512
        },
        {
            id: 6,
            name: "Smart Fitness Band",
            price: 49.99,
            originalPrice: 89.99,
            image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
            rating: 4.4,
            reviews: 178
        },
        {
            id: 7,
            name: "Portable Charger",
            price: 29.99,
            originalPrice: 54.99,
            image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
            rating: 4.5,
            reviews: 421
        },
        {
            id: 8,
            name: "LED Desk Lamp",
            price: 34.99,
            originalPrice: 64.99,
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
            rating: 4.3,
            reviews: 93
        }
    ];

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} size={14} fill="#FFC107" color="#FFC107" />);
        }
        if (hasHalfStar) {
            stars.push(<Star key="half" size={14} fill="#FFC107" color="#FFC107" style={{opacity: 0.5}} />);
        }
        while (stars.length < 5) {
            stars.push(<Star key={`empty-${stars.length}`} size={14} color="#E0E0E0" />);
        }
        return stars;
    };

    return (
        <section className={styles.saleSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2>🔥 Products On Sale</h2>
                    <p>Limited time offers - Grab them before they're gone!</p>
                </div>

                <div className={styles.productsGrid}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.productCard}>
                            {/* Product Image */}
                            <div className={styles.productImage}>
                                <img src={product.image} alt={product.name} />
                                
                                {/* Quick Actions Overlay */}
                                <div className={styles.quickActions}>
                                    <button className={styles.actionBtn} title="Add to Wishlist">
                                        <Heart size={18} />
                                    </button>
                                    <button className={styles.actionBtn} title="Quick View">
                                        <Eye size={18} />
                                    </button>
                                    <button className={styles.actionBtn} title="Add to Cart">
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className={styles.productInfo}>
                                <h3 className={styles.productName}>{product.name}</h3>
                                
                                {/* Rating */}
                                <div className={styles.ratingContainer}>
                                    <div className={styles.stars}>
                                        {renderStars(product.rating)}
                                    </div>
                                    <span className={styles.reviews}>({product.reviews})</span>
                                </div>

                                {/* Price */}
                                <div className={styles.priceContainer}>
                                    <span className={styles.price}>${product.price}</span>
                                    <span className={styles.originalPrice}>${product.originalPrice}</span>
                                    <span className={styles.discount}>
                                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                    </span>
                                </div>

                                {/* Add to Cart Button */}
                                <button className={styles.addToCartBtn}>
                                    <ShoppingCart size={18} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductOnSale;
