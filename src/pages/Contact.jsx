import React, { useState } from "react";
import styles from "./Contact.module.css";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you for contacting us! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const contactInfo = [
        {
            icon: <Phone size={28} />,
            title: "Phone",
            details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
            subtitle: "Mon-Fri 9am-6pm"
        },
        {
            icon: <Mail size={28} />,
            title: "Email",
            details: ["support@shophub.com", "info@shophub.com"],
            subtitle: "24/7 Support"
        },
        {
            icon: <MapPin size={28} />,
            title: "Office",
            details: ["123 Commerce Street", "Ahmedabad, Gujarat 380001"],
            subtitle: "Visit Us"
        },
        {
            icon: <Clock size={28} />,
            title: "Working Hours",
            details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 4pm"],
            subtitle: "Sunday Closed"
        }
    ];

    return (
        <div className={styles.contactPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <MessageCircle size={48} className={styles.heroIcon} />
                    <h1>Get In Touch</h1>
                    <p>Have questions? We'd love to hear from you. Send us a message!</p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className={styles.infoSection}>
                <div className={styles.container}>
                    <div className={styles.infoGrid}>
                        {contactInfo.map((info, index) => (
                            <div key={index} className={styles.infoCard}>
                                <div className={styles.iconWrapper}>{info.icon}</div>
                                <h3>{info.title}</h3>
                                {info.details.map((detail, idx) => (
                                    <p key={idx} className={styles.detail}>{detail}</p>
                                ))}
                                <p className={styles.subtitle}>{info.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map Section */}
            <section className={styles.formSection}>
                <div className={styles.container}>
                    <div className={styles.formGrid}>
                        {/* Contact Form */}
                        <div className={styles.formContainer}>
                            <div className={styles.formHeader}>
                                <h2>Send Us a Message</h2>
                                <p>Fill out the form below and we'll get back to you as soon as possible</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className={styles.contactForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="subject">Subject *</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your inquiry..."
                                        rows="5"
                                        required
                                    />
                                </div>

                                <button type="submit" className={styles.submitBtn}>
                                    <Send size={20} />
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Map & Additional Info */}
                        <div className={styles.mapContainer}>
                            <div className={styles.map}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.74842668336!2d72.41493028330024!3d23.020474167896407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1702478925623!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Office Location"
                                />
                            </div>

                            <div className={styles.additionalInfo}>
                                <h3>Why Choose Us?</h3>
                                <ul className={styles.featureList}>
                                    <li>✓ Fast response time (within 24 hours)</li>
                                    <li>✓ Dedicated customer support team</li>
                                    <li>✓ Multiple contact channels</li>
                                    <li>✓ Expert advice and assistance</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={styles.faqSection}>
                <div className={styles.container}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqGrid}>
                        <div className={styles.faqCard}>
                            <h4>What are your shipping times?</h4>
                            <p>Standard shipping takes 5-7 business days. Express shipping is available for 2-3 days delivery.</p>
                        </div>
                        <div className={styles.faqCard}>
                            <h4>Do you offer returns?</h4>
                            <p>Yes! We offer 30-day hassle-free returns on most products. Check our return policy for details.</p>
                        </div>
                        <div className={styles.faqCard}>
                            <h4>How can I track my order?</h4>
                            <p>Once shipped, you'll receive a tracking number via email to monitor your order status.</p>
                        </div>
                        <div className={styles.faqCard}>
                            <h4>Do you ship internationally?</h4>
                            <p>Yes, we ship to over 50 countries worldwide. International shipping rates vary by location.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};