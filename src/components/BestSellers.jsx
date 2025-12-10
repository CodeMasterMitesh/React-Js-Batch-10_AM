import React from "react";
import styles from "./BestSellers.module.css";
import { ShoppingCart, Heart, Eye, Star, TrendingUp } from "lucide-react";
import { useModal } from "./ModalContext";

const BestSellers = () => {
  const { openQuickView, addToCart } = useModal();
  const bestSellers = [
    {
      id: 1,
      name: "Ultra HD 4K Smart TV",
      price: 599.99,
      originalPrice: 899.99,
      image:
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 892,
      sold: 1234,
      badge: "#1",
    },
    {
      id: 2,
      name: "Wireless Noise Cancelling Headphones",
      price: 249.99,
      originalPrice: 349.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 1456,
      sold: 2341,
      badge: "#2",
    },
    {
      id: 3,
      name: "Premium Leather Handbag",
      price: 179.99,
      originalPrice: 299.99,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 678,
      sold: 987,
      badge: "#3",
    },
    {
      id: 4,
      name: "Professional DSLR Camera",
      price: 899.99,
      originalPrice: 1299.99,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 543,
      sold: 765,
      badge: "#4",
    },
    {
      id: 5,
      name: "Smart Fitness Tracker Pro",
      price: 129.99,
      originalPrice: 199.99,
      image:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 1023,
      sold: 1876,
      badge: "#5",
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
    <section className={styles.bestSellersSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleWrapper}>
            <TrendingUp size={32} className={styles.trendIcon} />
            <h2>🏆 Product Best Sellers</h2>
          </div>
          <p>Top-rated products loved by thousands of customers</p>
        </div>

        <div className={styles.productsGrid}>
          {bestSellers.map((product) => (
            <div key={product.id} className={styles.productCard}>
              {/* Rank Badge */}
              <div className={styles.rankBadge}>{product.badge}</div>

              {/* Product Image */}
              <div className={styles.productImage}>
                <img src={product.image} alt={product.name} loading="lazy" />

                {/* Quick Actions */}
                <div className={styles.quickActions}>
                  <button className={styles.actionBtn} title="Add to Wishlist">
                    <Heart size={18} />
                  </button>
                  <button
                    className={styles.actionBtn}
                    title="Quick View"
                    onClick={() =>
                      openQuickView({ ...product, category: "Best Sellers" })
                    }
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className={styles.actionBtn}
                    title="Add to Cart"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart size={18} />
                  </button>
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
                  <span className={styles.reviews}>({product.reviews})</span>
                </div>

                {/* Sales Info */}
                <div className={styles.salesInfo}>
                  <TrendingUp size={16} />
                  <span>{product.sold} sold</span>
                </div>

                {/* Price */}
                <div className={styles.priceContainer}>
                  <span className={styles.price}>${product.price}</span>
                  <span className={styles.originalPrice}>
                    ${product.originalPrice}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  className={styles.addToCartBtn}
                  onClick={() => addToCart(product)}
                >
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

export default BestSellers;
