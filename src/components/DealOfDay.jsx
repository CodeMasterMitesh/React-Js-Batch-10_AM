import React, { useState } from "react";
import styles from "./DealOfDay.module.css";
import { ShoppingCart, Heart, Eye } from "lucide-react";

const DealOfDay = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Electronics", "Fashion", "Home", "Beauty", "Sports"];

    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            category: "Electronics",
            price: 79.99,
            originalPrice: 129.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
            discount: 38
        },
        {
            id: 2,
            name: "Smart Watch",
            category: "Electronics",
            price: 199.99,
            originalPrice: 299.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
            discount: 33
        },
        {
            id: 3,
            name: "Designer Sunglasses",
            category: "Fashion",
            price: 89.99,
            originalPrice: 149.99,
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
            discount: 40
        },
        {
            id: 4,
            name: "Running Shoes",
            category: "Sports",
            price: 69.99,
            originalPrice: 119.99,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
            discount: 42
        },
        {
            id: 5,
            name: "Coffee Maker",
            category: "Home",
            price: 49.99,
            originalPrice: 89.99,
            image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
            discount: 44
        },
        {
            id: 6,
            name: "Skincare Set",
            category: "Beauty",
            price: 39.99,
            originalPrice: 79.99,
            image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
            discount: 50
        },
        {
            id: 7,
            name: "Laptop Backpack",
            category: "Fashion",
            price: 59.99,
            originalPrice: 99.99,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
            discount: 40
        },
        {
            id: 8,
            name: "Yoga Mat",
            category: "Sports",
            price: 29.99,
            originalPrice: 59.99,
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
            discount: 50
        }
    ];

    const filteredProducts = activeCategory === "All" 
        ? products 
        : products.filter(product => product.category === activeCategory);

    return (
        <section className={styles.dealSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2>⚡ Deal of the Day</h2>
                    <p>Don't miss out on today's amazing deals!</p>
                </div>

                {/* Category Filter */}
                <div className={styles.categoryFilter}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`${styles.filterBtn} ${activeCategory === category ? styles.activeFilter : ""}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className={styles.productsGrid}>
                    {filteredProducts.map((product) => (
                        <div key={product.id} className={styles.productCard}>
                            {/* Discount Badge */}
                            <div className={styles.discountBadge}>-{product.discount}%</div>

                            {/* Product Image */}
                            <div className={styles.productImage}>
                                <img src={product.image} alt={product.name} />
                                
                                {/* Quick Actions */}
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
                                <span className={styles.category}>{product.category}</span>
                                <h3 className={styles.productName}>{product.name}</h3>
                                <div className={styles.priceContainer}>
                                    <span className={styles.price}>${product.price}</span>
                                    <span className={styles.originalPrice}>${product.originalPrice}</span>
                                </div>
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

export default DealOfDay;
