import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bannergau from "../assets/images/bannergau.png";
// 👈 Import ảnh
import "../assets/css/Style.css";
import arrowDown from "../assets/images/black-ar-down.png";

import slide1 from "../assets/images/tu-chien-tren-khong1.jpg";
import slide2 from "../assets/images/lam-giau-voi-ma.jpg";
import slide3 from "../assets/images/co-dau-ma.jpg";
import slide4 from "../assets/images/phim-hay-thang-9-1200x500.jpg";
import prev1 from "../assets/images/prev-1.png";
import next1 from "../assets/images/next-1.png";

function Header() {
  //banner
  useEffect(() => {
    if (window.$) {
      window.$(".filmoja-slide").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        nav: true,
        navText: [
          `<img src="${prev1}" style="width:40px;height:40px;" />`,
          `<img src="${next1}" style="width:40px;height:40px;" />`,
        ],
      });
    }
  }, []);

  //---------------------menu-------------------------------------
  useEffect(() => {
    const toggle = document.getElementById("navbar-toggle");
    const menu = document.getElementById("navbar-menu");
    const overlay = document.getElementById("overlay");
    const dropdowns = document.querySelectorAll(".dropdown");

    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        overlay?.classList.toggle("active");
      });
    }

    if (overlay) {
      overlay.addEventListener("click", () => {
        menu?.classList.remove("active");
        overlay.classList.remove("active");
      });
    }

    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle("open");
        }
      });
    });

    // cleanup khi component unmount
    return () => {
      if (toggle) {
        toggle.replaceWith(toggle.cloneNode(true));
      }
      if (overlay) {
        overlay.replaceWith(overlay.cloneNode(true));
      }
    };
  }, []);
  return (
    <div>
      <section className="filmoja-slider-area fix">
        <div className="filmoja-slide owl-carousel">
          <a href="#">
            <div className="filmoja-main-slide">
              <img src={slide1} alt="slide1" style={{ maxHeight: "550px" }} />
            </div>
          </a>
          <a href="#">
            <div className="filmoja-main-slide">
              <img src={slide2} alt="slide2" style={{ maxHeight: "550px" }} />
            </div>
          </a>
          <a href="#">
            <div className="filmoja-main-slide">
              <img src={slide3} alt="slide3" style={{ maxHeight: "550px" }} />
            </div>
          </a>
          <div className="filmoja-main-slide">
            <img src={slide4} alt="slide4" style={{ maxHeight: "550px" }} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;






































