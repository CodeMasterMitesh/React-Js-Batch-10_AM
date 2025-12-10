import React from "react";
import style from "./ButtonUi.module.css";

export default function Button({ href, value }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={style.btn}
    >
      {value}
    </a>
  );
}
