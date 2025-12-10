import React, { useState } from "react";
import styles from "./Shop.module.css";
import { ShoppingCart, Heart, Eye, Star, Filter, Search } from "lucide-react";
import { useModal } from "../components/ModalContext";

export const Shop = () => {
  const { openQuickView, addToCart } = useModal();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Books",
  ];

  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 149.99,
      originalPrice: 199.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      category: "Electronics",
      price: 299.99,
      originalPrice: 399.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 456,
      inStock: true,
    },
    {
      id: 3,
      name: "Designer Sunglasses",
      category: "Fashion",
      price: 89.99,
      originalPrice: 149.99,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 123,
      inStock: true,
    },
    {
      id: 4,
      name: "Running Shoes Pro",
      category: "Sports",
      price: 119.99,
      originalPrice: 179.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 567,
      inStock: true,
    },
    {
      id: 5,
      name: "Coffee Maker Deluxe",
      category: "Home & Kitchen",
      price: 79.99,
      originalPrice: 129.99,
      image:
        "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 189,
      inStock: true,
    },
    {
      id: 6,
      name: "Skincare Gift Set",
      category: "Beauty",
      price: 59.99,
      originalPrice: 99.99,
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 345,
      inStock: true,
    },
    {
      id: 7,
      name: "Leather Backpack",
      category: "Fashion",
      price: 89.99,
      originalPrice: 139.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 234,
      inStock: false,
    },
    {
      id: 8,
      name: "Best Seller Novel Collection",
      category: "Books",
      price: 39.99,
      originalPrice: 59.99,
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 678,
      inStock: true,
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory,
  );

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
    <div className={styles.shopPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>Shop All Products</h1>
          <p>Discover amazing products at unbeatable prices</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.shopLayout}>
          {/* Sidebar Filters */}
          <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3>
                <Filter size={20} />
                Filters
              </h3>
            </div>

            {/* Categories */}
            <div className={styles.filterGroup}>
              <h4>Categories</h4>
              <div className={styles.categoryList}>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                    {selectedCategory === category && (
                      <span className={styles.checkmark}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className={styles.filterGroup}>
              <h4>Price Range</h4>
              <div className={styles.priceOptions}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="price"
                    value="all"
                    checked={priceRange === "all"}
                    onChange={(e) => setPriceRange(e.target.value)}
                  />
                  All Prices
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="price"
                    value="under50"
                    checked={priceRange === "under50"}
                    onChange={(e) => setPriceRange(e.target.value)}
                  />
                  Under $50
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="price"
                    value="50to100"
                    checked={priceRange === "50to100"}
                    onChange={(e) => setPriceRange(e.target.value)}
                  />
                  $50 - $100
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="price"
                    value="over100"
                    checked={priceRange === "over100"}
                    onChange={(e) => setPriceRange(e.target.value)}
                  />
                  Over $100
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className={styles.mainContent}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <p className={styles.resultCount}>
                Showing {filteredProducts.length} products
              </p>
              <select
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  {!product.inStock && (
                    <div className={styles.outOfStock}>Out of Stock</div>
                  )}

                  <div className={styles.productImage}>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                    <div className={styles.quickActions}>
                      <button
                        className={styles.actionBtn}
                        title="Add to Wishlist"
                      >
                        <Heart size={18} />
                      </button>
                      <button
                        className={styles.actionBtn}
                        title="Quick View"
                        onClick={() => openQuickView(product)}
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.productInfo}>
                    <span className={styles.category}>{product.category}</span>
                    <h3 className={styles.productName}>{product.name}</h3>

                    <div className={styles.rating}>
                      <div className={styles.stars}>
                        {renderStars(product.rating)}
                      </div>
                      <span className={styles.reviews}>
                        ({product.reviews})
                      </span>
                    </div>

                    <div className={styles.priceRow}>
                      <div className={styles.prices}>
                        <span className={styles.price}>${product.price}</span>
                        <span className={styles.originalPrice}>
                          ${product.originalPrice}
                        </span>
                      </div>
                    </div>

                    <button
                      className={styles.addToCartBtn}
                      disabled={!product.inStock}
                      onClick={() => product.inStock && addToCart(product)}
                    >
                      <ShoppingCart size={18} />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
