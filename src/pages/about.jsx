import React from "react";
import styles from "./About.module.css";
import { Target, Users, Award, TrendingUp, Heart, Shield } from "lucide-react";

export const About = () => {
    const stats = [
        { number: "10K+", label: "Happy Customers" },
        { number: "500+", label: "Products" },
        { number: "50+", label: "Team Members" },
        { number: "15+", label: "Awards Won" }
    ];

    const values = [
        {
            icon: <Target size={40} />,
            title: "Our Mission",
            description: "To provide high-quality products at affordable prices while delivering exceptional customer service."
        },
        {
            icon: <Users size={40} />,
            title: "Customer First",
            description: "We prioritize our customers' satisfaction and strive to exceed expectations with every interaction."
        },
        {
            icon: <Award size={40} />,
            title: "Quality Assured",
            description: "Every product is carefully selected and tested to ensure it meets our high standards of quality."
        },
        {
            icon: <TrendingUp size={40} />,
            title: "Continuous Growth",
            description: "We constantly evolve and improve to bring you the latest trends and innovative products."
        }
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        },
        {
            name: "Michael Chen",
            role: "Chief Technology Officer",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Marketing",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
        },
        {
            name: "David Kim",
            role: "Customer Experience Lead",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
        }
    ];

    return (
        <div className={styles.aboutPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <h1>About ShopHub</h1>
                        <p className={styles.heroText}>
                            Your trusted partner in online shopping, delivering quality products 
                            and exceptional service since 2020.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection}>
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        {stats.map((stat, index) => (
                            <div key={index} className={styles.statCard}>
                                <h2 className={styles.statNumber}>{stat.number}</h2>
                                <p className={styles.statLabel}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className={styles.storySection}>
                <div className={styles.container}>
                    <div className={styles.storyGrid}>
                        <div className={styles.storyImage}>
                            <img 
                                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&h=800&fit=crop" 
                                alt="Our Story" 
                            />
                        </div>
                        <div className={styles.storyContent}>
                            <h2>Our Story</h2>
                            <p>
                                Founded in 2020, ShopHub began with a simple vision: to make quality 
                                products accessible to everyone. What started as a small online store 
                                has grown into a thriving marketplace serving thousands of customers worldwide.
                            </p>
                            <p>
                                Our journey has been driven by passion, dedication, and an unwavering 
                                commitment to customer satisfaction. We carefully curate every product, 
                                ensuring that each item meets our strict quality standards.
                            </p>
                            <p>
                                Today, we're proud to be a trusted name in e-commerce, offering an 
                                extensive range of products across multiple categories, all backed by 
                                our promise of quality and excellent service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={styles.valuesSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Our Core Values</h2>
                        <p>The principles that guide everything we do</p>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((value, index) => (
                            <div key={index} className={styles.valueCard}>
                                <div className={styles.valueIcon}>{value.icon}</div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className={styles.teamSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Meet Our Team</h2>
                        <p>The passionate people behind ShopHub</p>
                    </div>
                    <div className={styles.teamGrid}>
                        {team.map((member, index) => (
                            <div key={index} className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <div className={styles.teamInfo}>
                                    <h3>{member.name}</h3>
                                    <p>{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div className={styles.ctaContent}>
                        <Heart size={48} className={styles.ctaIcon} />
                        <h2>Join Our Community</h2>
                        <p>Experience the difference of shopping with ShopHub today!</p>
                        <a href="/shop" className={styles.ctaButton}>Start Shopping</a>
                    </div>
                </div>
            </section>
        </div>
    );
};