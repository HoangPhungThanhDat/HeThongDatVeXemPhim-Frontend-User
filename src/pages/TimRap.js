import React, { useState, useEffect } from "react";
import arrowDown from "../assets/images/black-ar-down.png";
function TimRap() {

  return (
    <div>
         <div className="booking-form">
        <div className="col-lg-12 flex flex-wrap">
          {/* Select Rạp */}
          <div className="booking-form-item" style={{ width: "20%" }}>
            <div className="select-box slTheater">
              <div className="select-box__current uServer" tabIndex={1}>
                <div className="select-box__value">
                  <input
                    className="select-box__input"
                    type="radio"
                    id="theater"
                    value="Rạp"
                    name="inputServer"
                    checked
                    readOnly
                  />
                  <p className="select-box__input-text">Rạp</p>
                </div>
                <img
                  className="select-box__icon"
                  src={arrowDown}
                  alt="Arrow Icon"
                />
              </div>
              <ul className="select-box__list">
                <li>
                  <label
                    className="select-box__option"
                    data-value="Rạp"
                    style={{ backgroundColor: "#36373b", color: "#fff" }}
                  >
                    Rạp
                  </label>
                </li>
              </ul>
            </div>
          </div>

          {/* Select Phim */}
          <div className="booking-form-item" style={{ width: "20%" }}>
            <div className="select-box slFilm">
              <div className="select-box__current uFilm" tabIndex={1}>
                <div className="select-box__value">
                  <input
                    className="select-box__input"
                    type="radio"
                    id="film"
                    value="Phim"
                    name="inputFilm"
                    checked
                    readOnly
                  />
                  <p className="select-box__input-text">Phim</p>
                </div>
                <img
                  className="select-box__icon"
                  src={arrowDown}
                  alt="Arrow Icon"
                />
              </div>
              <ul className="select-box__list">
                <li>
                  <label className="select-box__option" data-value="Phim">
                    Phim
                  </label>
                </li>
              </ul>
            </div>
          </div>

          {/* Select Ngày xem */}
          <div className="booking-form-item" style={{ width: "20%" }}>
            <div className="select-box slDate">
              <div className="select-box__current uDate" tabIndex={1}>
                <div className="select-box__value">
                  <input
                    className="select-box__input"
                    type="radio"
                    id="date"
                    value="Ngày xem"
                    name="inputDate"
                    checked
                    readOnly
                  />
                  <p className="select-box__input-text">Ngày xem</p>
                </div>
                <img
                  className="select-box__icon"
                  src={arrowDown}
                  alt="Arrow Icon"
                />
              </div>
              <ul className="select-box__list">
                <li>
                  <label className="select-box__option" data-value="Ngày xem">
                    Ngày xem
                  </label>
                </li>
              </ul>
            </div>
          </div>

          {/* Select Suất chiếu */}
          <div className="booking-form-item" style={{ width: "20%" }}>
            <div className="select-box slTime">
              <div className="select-box__current uTime" tabIndex={1}>
                <div className="select-box__value">
                  <input
                    className="select-box__input"
                    type="radio"
                    id="time"
                    value="Suất chiếu"
                    name="inputTime"
                    checked
                    readOnly
                  />
                  <p className="select-box__input-text">Suất chiếu</p>
                </div>
                <img
                  className="select-box__icon"
                  src={arrowDown}
                  alt="Arrow Icon"
                />
              </div>
              <ul className="select-box__list">
                <li>
                  <label className="select-box__option" data-value="Suất chiếu">
                    Suất chiếu
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimRap;
