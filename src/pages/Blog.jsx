import React from "react";
import styles from "./Blog.module.css";

export const Blog = () => {
    return (
        <div className={styles.blogPage}>
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <h1>Our Blog</h1>
                    <p>Stay updated with the latest trends, tips, and news</p>
                </div>
                
                <div className={styles.comingSoon}>
                    <div className={styles.icon}>📝</div>
                    <h2>Blog Coming Soon!</h2>
                    <p>We're preparing exciting content for you. Stay tuned!</p>
                </div>
            </div>
        </div>
    );
};
