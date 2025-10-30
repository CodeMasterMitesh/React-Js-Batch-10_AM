import React, { useEffect, useState } from "react";
import style from "./HeroBanner.module.css";

const banners = [
  "slider-25.jpg",
  "slider-25.jpg",
  "slider-25.jpg"
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={style.hero}>
      <img
        src={`../images/${banners[current]}`}
        alt="Hero Banner"
        className={style.image}
      />
      <div className={style.overlay_content}>
        <h2>Welcome to <span>ShopEase</span></h2>
        <p>Your one-stop destination for everything you love.</p>
        <a href="/" className={style.cta}>Start Shopping</a>
      </div>
    </section>
  );
};

export default HeroBanner;
