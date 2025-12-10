import React, { useState, useEffect } from "react";
import styles from "./VoucherPromo.module.css";
import { Gift, Copy, Clock, Tag, Percent, Sparkles, Check } from "lucide-react";

const VoucherPromo = () => {
    const [copiedCode, setCopiedCode] = useState(null);
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 45,
        seconds: 30
    });

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const vouchers = [
        {
            id: 1,
            code: "SAVE50",
            discount: "50% OFF",
            title: "Super Sale Weekend",
            description: "Get 50% off on all electronics",
            minSpend: "$100",
            color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            icon: <Percent size={32} />
        },
        {
            id: 2,
            code: "FREESHIP",
            discount: "FREE SHIPPING",
            title: "Free Delivery",
            description: "No delivery charges on orders above $50",
            minSpend: "$50",
            color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            icon: <Gift size={32} />
        },
        {
            id: 3,
            code: "NEW25",
            discount: "25% OFF",
            title: "New Customer Special",
            description: "Welcome bonus for first-time shoppers",
            minSpend: "$30",
            color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            icon: <Sparkles size={32} />
        },
        {
            id: 4,
            code: "BUNDLE20",
            discount: "20% OFF",
            title: "Bundle & Save",
            description: "Buy 3 or more items and save big",
            minSpend: "$75",
            color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            icon: <Tag size={32} />
        }
    ];

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <section className={styles.voucherSection}>
            <div className={styles.container}>
                {/* Section Header */}
                <div className={styles.sectionHeader}>
                    <div className={styles.titleWrapper}>
                        <Gift size={32} className={styles.giftIcon} />
                        <h2>🎁 Voucher & Promotional</h2>
                    </div>
                    <p>Exclusive offers & amazing deals just for you!</p>
                </div>

                {/* Countdown Timer */}
                <div className={styles.countdownBanner}>
                    <div className={styles.countdownContent}>
                        <h3>⚡ Flash Sale Ending Soon!</h3>
                        <div className={styles.countdown}>
                            <div className={styles.timeBox}>
                                <span className={styles.timeValue}>{String(timeLeft.hours).padStart(2, '0')}</span>
                                <span className={styles.timeLabel}>Hours</span>
                            </div>
                            <span className={styles.separator}>:</span>
                            <div className={styles.timeBox}>
                                <span className={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                                <span className={styles.timeLabel}>Minutes</span>
                            </div>
                            <span className={styles.separator}>:</span>
                            <div className={styles.timeBox}>
                                <span className={styles.timeValue}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                                <span className={styles.timeLabel}>Seconds</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Voucher Grid */}
                <div className={styles.voucherGrid}>
                    {vouchers.map((voucher) => (
                        <div key={voucher.id} className={styles.voucherCard}>
                            <div className={styles.voucherHeader} style={{ background: voucher.color }}>
                                <div className={styles.voucherIcon}>
                                    {voucher.icon}
                                </div>
                                <div className={styles.discountBadge}>
                                    {voucher.discount}
                                </div>
                            </div>

                            <div className={styles.voucherBody}>
                                <h3 className={styles.voucherTitle}>{voucher.title}</h3>
                                <p className={styles.voucherDesc}>{voucher.description}</p>

                                <div className={styles.minSpend}>
                                    <Tag size={16} />
                                    <span>Min. Spend: {voucher.minSpend}</span>
                                </div>

                                <div className={styles.codeSection}>
                                    <div className={styles.codeBox}>
                                        <span className={styles.codeLabel}>CODE:</span>
                                        <span className={styles.code}>{voucher.code}</span>
                                    </div>
                                    <button 
                                        className={styles.copyBtn}
                                        onClick={() => handleCopy(voucher.code)}
                                    >
                                        {copiedCode === voucher.code ? (
                                            <>
                                                <Check size={18} />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={18} />
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className={styles.validity}>
                                    <Clock size={14} />
                                    <span>Valid till: Dec 31, 2024</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Banner */}
                <div className={styles.ctaBanner}>
                    <div className={styles.ctaContent}>
                        <h3>Want More Exclusive Deals?</h3>
                        <p>Subscribe to our newsletter and get special vouchers delivered to your inbox</p>
                        <div className={styles.emailForm}>
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className={styles.emailInput}
                            />
                            <button className={styles.subscribeBtn}>
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VoucherPromo;
