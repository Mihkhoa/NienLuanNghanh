import "./banner.css";
import React from "react";
import { NavLink } from "react-router-dom";
import Banner_Product from "../../assets/images/Banner_Product.png";

function Banner(props) {
  return (
    <div className="banner">
      <img src={Banner_Product} alt="image_product" />
      <div className="banner_title">
        <h1>Nike Jordan</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
          assumenda, fugit, ullam et cupiditate quidem dolorem mollitia tenetur
          maxime.
        </p>
        <NavLink to="/">
          <div className="btn__buyProduct">MUA NGAY</div>
        </NavLink>
      </div>

      <div className="icon__socialNetwork">
        <div className="facebook">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/Mihkhoadao"
          >
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
        </div>
        <div className="instagram">
          <ion-icon name="logo-instagram"></ion-icon>
        </div>
        <div className="twitter">
          <ion-icon name="logo-twitter"></ion-icon>
        </div>
        <div className="youtube">
          <ion-icon name="logo-youtube"></ion-icon>
        </div>
      </div>
    </div>
  );
}

export default Banner;
