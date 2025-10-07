import React from "react";
import data from './gallery.json'

export const NewArrivalGallery = ({name})=>{
    return (
        <> 
        <div className="heading"><h2>{name}</h2></div>
        <div className="main_gallery">
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
        <div className="heading"><h2>{name}</h2></div>
        <div className="main_gallery">
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
            <div className="gallery">
                <div className="img">
                    <img src={'../images/'+ image} width="200px" alt="" />
                </div>
                <div className="title">
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
            </div>
        </>
    )
}