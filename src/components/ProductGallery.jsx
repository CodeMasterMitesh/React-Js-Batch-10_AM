import React, { useState } from "react";
import data from "./gallery.json";
import style from "./Gallery.module.css";
import { ShoppingCart, Eye, Star } from "lucide-react"; // Icons

export const ProductGallery = ({ name, type }) => {
  const filteredData = data.filter((ele) => ele.type === type);

  return (
    <section className={style.section}>
      <h2 className={style.heading}>{name}</h2>
      <div className={style.gallery_grid}>
        {filteredData.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    alert(`${product.title} added to cart!`);
  };

  return (
    <>
      <div className={style.card}>
        <div className={style.image_container}>
          <img
            src={`../images/${product.image}`}
            alt={product.title}
            className={style.image}
          />
          <div className={style.card_overlay}>
            <button
              className={style.icon_btn}
              onClick={() => setShowModal(true)}
              title="View Details"
            >
              <Eye size={20} />
            </button>
            <button
              className={style.icon_btn}
              onClick={handleAddToCart}
              title="Add to Cart"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>

        <div className={style.card_content}>
          <h3 className={style.card_title}>{product.title}</h3>
          <p className={style.card_price}>₹{product.price}</p>

          <div className={style.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < product.rating ? "gold" : "none"}
                stroke="gold"
              />
            ))}
          </div>
        </div>
      </div>

      {/* === MODAL === */}
      {showModal && (
        <div className={style.modal_backdrop} onClick={() => setShowModal(false)}>
          <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
            <img
              src={`../images/${product.image}`}
              alt={product.title}
              className={style.modal_img}
            />
            <h2>{product.title}</h2>
            <p>{product.text}</p>
            <p className={style.modal_price}>₹{product.price}</p>
            <button className={style.cart_btn} onClick={handleAddToCart}>
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};
