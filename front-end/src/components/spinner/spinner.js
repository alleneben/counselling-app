import React from "react";
import "./index.scss";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Spinner({ size, color = "#ffff", type = "Oval" }) {
  return (
    <div className="loader">
      <Loader type={type} color={color} height={size} width={size} />
    </div>
  );
}
