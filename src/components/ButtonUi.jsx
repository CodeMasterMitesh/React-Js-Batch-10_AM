import React from "react";
import style from './ButtonUi.module.css'

const  Button = ({value,href}) =>{
    return (
        <a className={style.btn} href={href}>{value}</a>
    )
}
export default Button;