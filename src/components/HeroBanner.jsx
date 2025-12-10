import React, { useEffect, useState } from "react";
import style from "./HeroBanner.module.css";
import { ChevronLeft, ChevronRight, ShoppingBag, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "New Arrivals",
    description: "Discover the latest trends in fashion and style. Up to 50% off on selected items.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    cta: "Shop Now",
    ctaLink: "/shop",
    badge: "50% OFF"
  },
  {
    id: 2,
    title: "Tech Essentials",
    subtitle: "Upgrade Your Lifestyle",
    description: "Get the latest gadgets and electronics at unbeatable prices. Limited time offer!",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=600&fit=crop",
    cta: "Explore Now",
    ctaLink: "/shop",
    badge: "NEW"
  },
  {
    id: 3,
    title: "Home & Living",
    subtitle: "Transform Your Space",
    description: "Beautiful furniture and decor to make your house a home. Free shipping available.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=600&fit=crop",
    cta: "View Collection",
    ctaLink: "/shop",
    badge: "FREE SHIPPING"
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section className={style.heroSection}>
      <div className={style.heroContainer}>
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${style.slide} ${index === currentSlide ? style.active : ""}`}
          >
            {/* Background Image */}
            <div className={style.slideImage}>
              <img src={slide.image} alt={slide.title} />
              <div className={style.overlay}></div>
            </div>

            {/* Content */}
            <div className={style.slideContent}>
              <div className={style.container}>
                <div className={style.contentWrapper}>
                  {/* Badge */}
                  <div className={style.badge}>{slide.badge}</div>
                  
                  {/* Subtitle */}
                  <p className={style.subtitle}>{slide.subtitle}</p>
                  
                  {/* Title */}
                  <h1 className={style.title}>{slide.title}</h1>
                  
                  {/* Description */}
                  <p className={style.description}>{slide.description}</p>
                  
                  {/* CTA Button */}
                  <Link to={slide.ctaLink} className={style.ctaButton}>
                    <ShoppingBag size={20} />
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button 
          className={`${style.navButton} ${style.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={30} />
        </button>
        <button 
          className={`${style.navButton} ${style.nextButton}`}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={30} />
        </button>

        {/* Dots Navigation */}
        <div className={style.dotsContainer}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${style.dot} ${index === currentSlide ? style.activeDot : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className={style.featuresBar}>
        <div className={style.container}>
          <div className={style.features}>
            <div className={style.feature}>
              <div className={style.featureIcon}>
                <ShoppingBag size={24} />
              </div>
              <div className={style.featureText}>
                <h4>Free Shipping</h4>
                <p>On orders over $50</p>
              </div>
            </div>
            <div className={style.feature}>
              <div className={style.featureIcon}>
                <TrendingUp size={24} />
              </div>
              <div className={style.featureText}>
                <h4>Best Prices</h4>
                <p>Guaranteed lowest prices</p>
              </div>
            </div>
            <div className={style.feature}>
              <div className={style.featureIcon}>
                <Award size={24} />
              </div>
              <div className={style.featureText}>
                <h4>Quality Products</h4>
                <p>Top-notch quality assured</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
