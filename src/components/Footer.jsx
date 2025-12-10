import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                {/* Company Info */}
                <div className={styles.footerSection}>
                    <div className={styles.footerLogo}>
                        <div className={styles.logoIcon}>🛍️</div>
                        <h3>ShopHub</h3>
                    </div>
                    <p className={styles.footerDescription}>
                        Your one-stop destination for quality products at amazing prices. 
                        Shop with confidence and enjoy the best shopping experience.
                    </p>
                    <div className={styles.socialLinks}>
                        <a href="https://facebook.com" className={styles.socialLink} aria-label="Facebook">
                            <Facebook size={20} />
                        </a>
                        <a href="https://twitter.com" className={styles.socialLink} aria-label="Twitter">
                            <Twitter size={20} />
                        </a>
                        <a href="https://instagram.com" className={styles.socialLink} aria-label="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="https://youtube.com" className={styles.socialLink} aria-label="YouTube">
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className={styles.footerSection}>
                    <h4 className={styles.footerTitle}>Quick Links</h4>
                    <ul className={styles.footerLinks}>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/company">Our Story</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className={styles.footerSection}>
                    <h4 className={styles.footerTitle}>Customer Service</h4>
                    <ul className={styles.footerLinks}>
                        <li><Link to="/help">Help Center</Link></li>
                        <li><Link to="/shipping">Shipping Info</Link></li>
                        <li><Link to="/returns">Returns & Exchange</Link></li>
                        <li><Link to="/track-order">Track Order</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className={styles.footerSection}>
                    <h4 className={styles.footerTitle}>Get In Touch</h4>
                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <MapPin size={18} />
                            <span>123 Commerce St, Ahmedabad, India</span>
                        </div>
                        <div className={styles.contactItem}>
                            <Phone size={18} />
                            <span>+91 98765 43210</span>
                        </div>
                        <div className={styles.contactItem}>
                            <Mail size={18} />
                            <span>support@shophub.com</span>
                        </div>
                    </div>
                    <div className={styles.newsletter}>
                        <h5>Subscribe to Newsletter</h5>
                        <form className={styles.newsletterForm}>
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                className={styles.newsletterInput}
                            />
                            <button type="submit" className={styles.newsletterBtn}>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.footerBottom}>
                <div className={styles.footerBottomContainer}>
                    <p>&copy; {currentYear} ShopHub. All rights reserved.</p>
                    <div className={styles.footerBottomLinks}>
                        <Link to="/privacy">Privacy Policy</Link>
                        <span className={styles.separator}>|</span>
                        <Link to="/terms">Terms of Service</Link>
                        <span className={styles.separator}>|</span>
                        <Link to="/cookies">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}