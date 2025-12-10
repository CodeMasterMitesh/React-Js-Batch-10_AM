import React from "react";
import styles from "./FeaturedProducts.module.css";
import { ShoppingCart, Heart, Eye, Star, Zap, Award } from "lucide-react";
import { useModal } from "./ModalContext";

const FeaturedProducts = () => {
  const { openQuickView, addToCart } = useModal();
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Earbuds Pro",
      price: 159.99,
      originalPrice: 249.99,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 2341,
      badge: "Editor's Choice",
      features: ["Active Noise Cancellation", "30h Battery"],
    },
    {
      id: 2,
      name: "Smart Watch Series X",
      price: 399.99,
      originalPrice: 549.99,
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 1876,
      badge: "Most Popular",
      features: ["Health Tracking", "GPS Built-in"],
    },
    {
      id: 3,
      name: "4K Action Camera Ultra",
      price: 279.99,
      originalPrice: 399.99,
      image:
        "https://images.unsplash.com/photo-1606510907446-c86d4f4ec0a8?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 987,
      badge: "Best Value",
      features: ["4K 60fps", "Waterproof"],
    },
    {
      id: 4,
      name: "Gaming Laptop Pro 2024",
      price: 1299.99,
      originalPrice: 1799.99,
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 654,
      badge: "Tech Award",
      features: ["RTX 4070", "144Hz Display"],
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        fill={index < Math.floor(rating) ? "#FFC107" : "none"}
        color="#FFC107"
      />
    ));
  };

  return (
    <section className={styles.featuredSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleWrapper}>
            <Award size={32} className={styles.awardIcon} />
            <h2>✨ Featured Products</h2>
          </div>
          <p>
            Handpicked excellence - Our curated selection of premium products
          </p>
        </div>

        <div className={styles.productsGrid}>
          {featuredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              {/* Badge */}
              <div className={styles.badge}>
                <Zap size={16} />
                {product.badge}
              </div>

              {/* Product Image */}
              <div className={styles.productImage}>
                <img src={product.image} alt={product.name} loading="lazy" />

                {/* Overlay */}
                <div className={styles.overlay}>
                  <div className={styles.quickActions}>
                    <button
                      className={styles.actionBtn}
                      title="Add to Wishlist"
                    >
                      <Heart size={20} />
                    </button>
                    <button
                      className={styles.actionBtn}
                      title="Quick View"
                      onClick={() =>
                        openQuickView({ ...product, category: "Featured" })
                      }
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>

                {/* Rating */}
                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {renderStars(product.rating)}
                  </div>
                  <span className={styles.ratingValue}>{product.rating}</span>
                  <span className={styles.reviews}>({product.reviews})</span>
                </div>

                {/* Features */}
                <div className={styles.features}>
                  {product.features.map((feature, index) => (
                    <span key={index} className={styles.featureTag}>
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price and Button */}
                <div className={styles.priceRow}>
                  <div className={styles.priceContainer}>
                    <span className={styles.price}>${product.price}</span>
                    <span className={styles.originalPrice}>
                      ${product.originalPrice}
                    </span>
                    <span className={styles.discount}>
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100,
                      )}
                      % OFF
                    </span>
                  </div>
                  <button
                    className={styles.cartBtn}
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
