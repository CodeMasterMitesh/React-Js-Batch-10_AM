import React from "react";
import data from './gallery.json'
import style from './Gallery.module.css'
import Button from './ButtonUi.jsx'

// console.log(style.heading);
export const NewArrivalGallery = ({name})=>{
    return (
        <> 
        <div className={style.heading}><h2>{name}</h2></div>
        <div className={style.main_gallery}>
            {data.map((ele,index)=>{
                if(ele.type == "newArrival"){
                    return <Gallery key={index} title={ele.title} image={ele.image} text={ele.text} />
                }
                // console.log(ele.type)
            })}
        </div> 
        </>
    )
}

export const FeatureGallery = ({name})=>{
    return (
        <> 
        <div className={style.heading}><h2>{name}</h2></div>
        <div className={style.main_gallery}>
            {data.map((ele,index)=>{
               if(ele.type == "featureProduct"){
                    return <Gallery key={index} title={ele.title} image={ele.image} text={ele.text} />
                }
            })}
        </div> 
        </>
        
    )
}
const Gallery = ({text,title,image})=>{
    return (
        <>
            <div className={style.gallery}>
                <div className={style.img}>
                    <img src={'../images/'+ image} width="200px" alt="" />
                </div>
                <div className={style.title}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <Button href='https://google.cpom' value='Click Me'/>
                </div>
            </div>
        </>
    )
}