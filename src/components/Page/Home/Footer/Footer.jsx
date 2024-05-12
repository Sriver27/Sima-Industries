import React from "react";
import "../Footer/Footer.css";
import Logo from "../../../assets/logo2_cropped.png";

const Footer = () => {
  return (
    <div className="containerfooter">
      <div className="note">

      We believe in delivering quality and the best in class furnitures
      </div>
      <div className="container-company">
      <img src={Logo} alt="Logo" className="logomobile" style={{width:"110px", transform:"scale(1.3)"}}/>
      <div className="product-name">
        Sima Industries
      </div>
      </div>
    </div>
  );
};

export default Footer;
