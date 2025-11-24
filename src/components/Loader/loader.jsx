import React from "react";
import "./loader.css";
import waterLoader from "../../files/lg.gif";

const Loader = () => {
  return (
    <div className="global-loader">
      <img src={waterLoader} alt="Cargando..." className="loader-icon" />
      <p>Cargando...</p>
    </div>
  );
};

export default Loader;
