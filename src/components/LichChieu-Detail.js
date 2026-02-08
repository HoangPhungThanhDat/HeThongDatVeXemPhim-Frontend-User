import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import promotionApi from "../api/PromotionApi";

function KhuyenMaiDetail() {
  return (
    <div
      className="filmoja-login-area section_30 bg-main"
      style={{
        background: "#e6e7e9",
        maxWidth: "100%",
        borderTop: "1px solid #ccc",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div
              className="browse-option-box"
              style={{
                background: "transparent",
                padding: "10px",
                width: "100%",
                display: "block",
                marginBottom: "5px",
                border: "3px solid #f37737",
              }}
            >
              <h3
                style={{ width: "100%", textAlign: "center", color: "#f37a3b" }}
              >
                STARLIGHT ĐÀ NẴNG
              </h3>
              <p
                style={{ width: "100%", textAlign: "center", color: "#22272b" }}
              >
                1900 1722
              </p>
              <p
                style={{ width: "100%", textAlign: "center", color: "#22272b" }}
              >
                Tầng 4 Toà nhà Nguyễn Kim, 46 Điện Biên Phủ, TP. Đà Nẵng
              </p>
            </div>

            <div
              className="tabs movies ui-tabs ui-corner-all ui-widget ui-widget-content"
              id="schedule-tabs"
            >
              <div className="tv-panel-list">
                <div className="tv-tab">
                  <ul
                    className="nav nav-pills tv-tab-switch schedule-list"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active show"
                        id="pills-popular-tab-0"
                        data-toggle="pill"
                        href="#pills-popular-0"
                        role="tab"
                        aria-controls="pills-popular-0"
                        aria-selected="true"
                      >
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "0 15px",
                            color: "#f37737",
                            fontWeight: 600,
                          }}
                        >
                          Thứ Ba
                        </p>
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "5px 15px",
                            color: "#2b2b31",
                          }}
                        >
                          06/01/2026
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="pills-popular-tab-1"
                        data-toggle="pill"
                        href="#pills-popular-1"
                        role="tab"
                        aria-controls="pills-popular-1"
                        aria-selected="false"
                      >
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "0 15px",
                            color: "#f37737",
                            fontWeight: 600,
                          }}
                        >
                          Thứ Tư
                        </p>
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "5px 15px",
                            color: "#2b2b31",
                          }}
                        >
                          07/01/2026
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="pills-popular-tab-2"
                        data-toggle="pill"
                        href="#pills-popular-2"
                        role="tab"
                        aria-controls="pills-popular-2"
                        aria-selected="false"
                      >
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "0 15px",
                            color: "#f37737",
                            fontWeight: 600,
                          }}
                        >
                          Thứ Năm
                        </p>
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "5px 15px",
                            color: "#2b2b31",
                          }}
                        >
                          08/01/2026
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="pills-popular-tab-3"
                        data-toggle="pill"
                        href="#pills-popular-3"
                        role="tab"
                        aria-controls="pills-popular-3"
                        aria-selected="false"
                      >
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "0 15px",
                            color: "#f37737",
                            fontWeight: 600,
                          }}
                        >
                          Thứ Sáu
                        </p>
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "5px 15px",
                            color: "#2b2b31",
                          }}
                        >
                          09/01/2026
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="pills-popular-tab-4"
                        data-toggle="pill"
                        href="#pills-popular-4"
                        role="tab"
                        aria-controls="pills-popular-4"
                        aria-selected="false"
                      >
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "0 15px",
                            color: "#f37737",
                            fontWeight: 600,
                          }}
                        >
                          Thứ Bảy
                        </p>
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "5px 15px",
                            color: "#2b2b31",
                          }}
                        >
                          10/01/2026
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="pills-popular-tab-5"
                        data-toggle="pill"
                        href="#pills-popular-5"
                        role="tab"
                        aria-controls="pills-popular-5"
                        aria-selected="false"
                      >
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "0 15px",
                            color: "#f37737",
                            fontWeight: 600,
                          }}
                        >
                          Chủ Nhật
                        </p>
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "5px 15px",
                            color: "#2b2b31",
                          }}
                        >
                          11/01/2026
                        </p>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content" id="pills-tabContent">
                  {/* Nội dung các tab ở đây - giữ nguyên HTML bên trong */}
                  <div
                    className="tab-pane fade show active"
                    id="pills-popular-0"
                    role="tabpanel"
                    aria-labelledby="pills-popular-tab-0"
                  >
                    <div className="tab-movies movie-list-box">
                      <div class="single-movie-list">
                        <div class="single-movie-list-left col-lg-3 col-md-4 col-sm-12">
                          <a href="/film/ai-thuong-ai-men-t16/1f628e48-468b-4c2e-b5e0-6291a89e7163.html">
                            <img
                              src="https://starlight.vn/Areas/Admin/Content/Fileuploads/images/Poster2024/Ai-thuong-ai-men.jpg"
                              alt="top movie"
                            />
                          </a>
                        </div>
                        <div class="single-movie-list-right  col-lg-9 col-md-8 col-sm-12">
                          <h3>
                            <a href="/film/ai-thuong-ai-men-t16/1f628e48-468b-4c2e-b5e0-6291a89e7163.html">
                              AI THƯƠNG AI MẾN (T16)
                            </a>
                          </h3>
                          <ul>
                            <li class="rating">2D</li>
                            <li class="rating">T16</li>
                          </ul>
                          <p class="list-genre">Gia Đ&#236;nh, H&#224;i</p>

                          <div class="movie-list-info">
                            <p>
                              Đạo diễn: <span>Thu Trang</span>
                            </p>
                            <p>
                              Diễn vi&#234;n:{" "}
                              <span>
                                Ngọc Thu&#226;̣n, Thu Trang, Tr&#226;m Anh, Võ
                                Đi&#234;̀n Gia Huy, Khả Như, La Thành, Trương
                                Minh Thảo, Tiến Luật và m&#244;̣t s&#244;́
                                di&#234;̃n vi&#234;n khác
                              </span>
                            </p>
                            <p>&nbsp;</p>
                            <span>
                              Lấy bối cảnh miền T&#226;y s&#244;ng nước, Ai
                              Thương Ai Mến xoay quanh Hai Mến — người phụ nữ
                              mất cha mẹ, một m&#236;nh gồng g&#225;nh gia
                              đ&#236;nh giữa nợ nần v&#224; những bi kị...
                            </span>
                          </div>

                          <div
                            className="col-md-12 col-sm-12"
                            style={{ padding: 0 }}
                          >
                            <hr class="space-1" />
                            <span
                              className="time past item"
                              style={{
                                display: "inline-flex",
                                marginBottom: "10px",
                              }}
                            >
                              12:40
                            </span>

                            <a
                              href="/chon-ghe"
                              style={{
                                display: "inline-flex",
                                marginBottom: "10px",
                              }}
                            >
                              <span className="time item">23:05</span>
                            </a>

                            <hr class="space-1" />
                            <img
                              src="https://starlight.vn/Areas/Admin/Content/Fileuploads/images/goldclass.png"
                              style={{
                                width: "150px",
                                height: "auto",
                                clear: "both",
                              }}
                            />
                            <hr class="space-1" />
                            <span
                              class="time past item"
                              style={{
                                display: "inline-flex",
                                marginBottom: "10px",
                              }}
                            >
                              17:10
                            </span>
                          </div>
                        </div>
                        <div class="top-action"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KhuyenMaiDetail;
