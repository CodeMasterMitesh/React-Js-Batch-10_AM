import React from "react";
import data from './gallery.json';
import style from './Gallery.module.css';
import Button from './ButtonUi.jsx';

export const NewArrivalGallery = ({ name }) => {
  const filteredData = data.filter((ele) => ele.type === "newArrival");
    // console.log(filteredData);
  return (
    <section className={style.section}>
      <h2 className={style.heading}>{name}</h2>
      <div className={style.gallery_grid}>
        {filteredData.map((ele, index) => (
          <GalleryCard
            key={index}
            title={ele.title}
            image={ele.image}
            text={ele.text}
          />
        ))}
      </div>
    </section>
  );
};

export const FeatureGallery = ({ name }) => {
  const filteredData = data.filter((ele) => ele.type === "featureProduct");
//   console.log(filteredData);
  return (
    <section className={style.section}>
      <h2 className={style.heading}>{name}</h2>
      <div className={style.gallery_grid}>
        {filteredData.map((ele, index) => (
          <GalleryCard
            key={index}
            title={ele.title}
            image={ele.image}
            text={ele.text}
          />
        ))}
      </div>
    </section>
  );
};

const GalleryCard = ({ text, title, image }) => {
  return (
    <div className={style.card}>
      <div className={style.image_container}>
        <img src={`../images/${image}`} alt={title} className={style.image} />
      </div>
      <div className={style.card_content}>
        <h3 className={style.card_title}>{title}</h3>
        <p className={style.card_text}>{text}</p>
        <Button href="https://google.com" value="Explore Now" />
      </div>
    </div>
  );
};
