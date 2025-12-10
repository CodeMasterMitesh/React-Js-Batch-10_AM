import React from "react";
import styles from "./ProductCategory.module.css";

const ProductCategory = () => {
    const categories = [
        {
            id: 1,
            name: "Electronics",
            image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
            count: 245
        },
        {
            id: 2,
            name: "Fashion",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
            count: 532
        },
        {
            id: 3,
            name: "Home & Kitchen",
            image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
            count: 187
        },
        {
            id: 4,
            name: "Beauty",
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
            count: 423
        },
        {
            id: 5,
            name: "Sports",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
            count: 156
        },
        {
            id: 6,
            name: "Books",
            image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop",
            count: 678
        },
        {
            id: 7,
            name: "Toys & Games",
            image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop",
            count: 289
        },
        {
            id: 8,
            name: "Furniture",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
            count: 134
        }
    ];

    return (
        <section className={styles.categorySection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2>Shop by Category</h2>
                    <p>Explore our wide range of product categories</p>
                </div>

                <div className={styles.categoryGrid}>
                    {categories.map((category) => (
                        <div key={category.id} className={styles.categoryCard}>
                            <div className={styles.categoryImage}>
                                <img src={category.image} alt={category.name} />
                                <div className={styles.categoryOverlay}>
                                    <button className={styles.shopNowBtn}>Shop Now</button>
                                </div>
                            </div>
                            <div className={styles.categoryInfo}>
                                <h3>{category.name}</h3>
                                <span className={styles.productCount}>{category.count} Products</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCategory;
