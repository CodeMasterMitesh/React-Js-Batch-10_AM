import React, { useState } from "react";
import styles from "./Blog.module.css";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { useLoaderData } from "react-router-dom";

export const Blog = () => {
  const newsdata = useLoaderData();
  console.log("News Data:", newsdata);
  
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Fashion",
    "Technology",
    "Lifestyle",
    "Shopping Tips",
    "Trends",
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Fashion Trends for Summer 2024",
      excerpt:
        "Discover the hottest fashion trends that will dominate this summer season...",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
      category: "Fashion",
      author: "Emily Davis",
      date: "Dec 8, 2025",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Smart Shopping: How to Save Money Online",
      excerpt:
        "Learn the best strategies to find great deals and maximize your savings...",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      category: "Shopping Tips",
      author: "Michael Chen",
      date: "Dec 7, 2025",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "The Future of E-Commerce Technology",
      excerpt:
        "Explore how AI and machine learning are transforming online shopping...",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      category: "Technology",
      author: "Sarah Johnson",
      date: "Dec 6, 2025",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Minimalist Living: Less is More",
      excerpt:
        "Embrace a simpler lifestyle and discover the joy of minimalism...",
      image:
        "https://images.unsplash.com/photo-1556228578-dd6c8e3e9c24?w=600&h=400&fit=crop",
      category: "Lifestyle",
      author: "David Kim",
      date: "Dec 5, 2025",
      readTime: "4 min read",
    },
    {
      id: 5,
      title: "2024 Holiday Shopping Guide",
      excerpt:
        "Get ready for the holiday season with our comprehensive shopping guide...",
      image:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&h=400&fit=crop",
      category: "Shopping Tips",
      author: "Emma Wilson",
      date: "Dec 4, 2025",
      readTime: "8 min read",
    },
    {
      id: 6,
      title: "Sustainable Fashion: A Complete Guide",
      excerpt:
        "Learn how to build an eco-friendly wardrobe without compromising style...",
      image:
        "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=600&h=400&fit=crop",
      category: "Fashion",
      author: "Lisa Anderson",
      date: "Dec 3, 2025",
      readTime: "6 min read",
    },
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPost = blogPosts[0];

  return (
    <div className={styles.blogPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1>Our Blog</h1>
          <p>Insights, tips, and inspiration for smart shopping</p>

          {/* Search Bar */}
          <div className={styles.searchBar}>
            <Search size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              className={styles.searchInput}
            />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.featuredPost}>
            <div className={styles.featuredImage}>
              <img src={featuredPost.image} alt={featuredPost.title} />
              <span className={styles.featuredBadge}>Featured</span>
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.category}>{featuredPost.category}</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className={styles.postMeta}>
                <span className={styles.metaItem}>
                  <User size={16} />
                  {featuredPost.author}
                </span>
                <span className={styles.metaItem}>
                  <Calendar size={16} />
                  {featuredPost.date}
                </span>
                <span className={styles.metaItem}>
                  <Clock size={16} />
                  {featuredPost.readTime}
                </span>
              </div>
              <a
                href={`/blog/${featuredPost.id}`}
                className={styles.readMoreBtn}
              >
                Read More
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.categoryFilter}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className={styles.postsSection}>
        <div className={styles.container}>
          <div className={styles.postsGrid}>
            {filteredPosts.slice(1).map((post) => (
              <article key={post.id} className={styles.postCard}>
                <div className={styles.postImage}>
                  <img src={post.image} alt={post.title} />
                  <span className={styles.postCategory}>{post.category}</span>
                </div>
                <div className={styles.postContent}>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className={styles.postFooter}>
                    <div className={styles.postMeta}>
                      <span className={styles.metaItem}>
                        <User size={14} />
                        {post.author}
                      </span>
                      <span className={styles.metaItem}>
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <a href={`/blog/${post.id}`} className={styles.readLink}>
                      Read More
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.newsSection}>
        <div className={styles.container}>
          <h2>News Articles from API</h2>
          {newsdata && newsdata.results && newsdata.results.length > 0 ? (
            <div className={styles.newsGrid}>
              {newsdata.results.map((item) => (
                <div key={item.link} className={styles.newsCard}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.image_url && (
                    <img src={item.image_url} alt={item.title} />
                  )}
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    Read Full Article
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p>No news data available. Please check your API key.</p>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className={styles.container}>
          <div className={styles.newsletterContent}>
            <h2>Subscribe to Our Newsletter</h2>
            <p>
              Get the latest articles and shopping tips delivered to your inbox
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.subscribeBtn}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
