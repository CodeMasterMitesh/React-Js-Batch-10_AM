import React from "react";
import styles from "./Shop.module.css";

export const Shop = () => {
    return (
        <div className={styles.shopPage}>
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <h1>Shop All Products</h1>
                    <p>Discover our complete collection of amazing products</p>
                </div>
                
                <div className={styles.comingSoon}>
                    <div className={styles.icon}>🛍️</div>
                    <h2>Shop Page Coming Soon!</h2>
                    <p>We're working hard to bring you an amazing shopping experience.</p>
                </div>
            </div>
        </div>
    );
};
