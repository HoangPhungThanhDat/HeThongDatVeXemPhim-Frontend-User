import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import CinemaApi from "../api/CinemasApi";

// ✅ FIX: Dùng local time thay vì toISOString() để tránh lệch múi giờ UTC+7
const toLocalDateStr = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper: tạo 7 ngày từ hôm nay (giờ Việt Nam)
const generateDates = () => {
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const result = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    result.push({
      label: i === 0 ? "Hôm Nay" : days[d.getDay()],
      dateStr: toLocalDateStr(d), // ✅ YYYY-MM-DD theo giờ địa phương
      display: d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    });
  }
  return result;
};

// Helper: kiểm tra suất chiếu đã qua chưa
const isShowtimePast = (selectedDate, startTime) => {
  const today = toLocalDateStr(new Date()); // ✅ so sánh đúng ngày local
  if (selectedDate !== today) return false;
  const now = new Date();
  const [hour, minute] = startTime.split(":").map(Number);
  const showDate = new Date();
  showDate.setHours(hour, minute, 0, 0);
  return showDate < now;
};

function LichChieuDetail() {
  const { cinemaId } = useParams();

  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState(dates[0].dateStr);
  const [cinemaInfo, setCinemaInfo] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cinemaLoading, setCinemaLoading] = useState(true);

  // Lấy thông tin rạp
  useEffect(() => {
    if (!cinemaId) return;
    const fetchCinema = async () => {
      setCinemaLoading(true);
      try {
        const result = await CinemaApi.getAll();
        if (result && result.success && Array.isArray(result.data)) {
          const found = result.data.find(
            (c) => String(c.CinemaId) === String(cinemaId)
          );
          setCinemaInfo(found || null);
        }
      } catch (err) {
        console.error("Lỗi lấy thông tin rạp:", err);
      } finally {
        setCinemaLoading(false);
      }
    };
    fetchCinema();
  }, [cinemaId]);

  // Lấy lịch chiếu mỗi khi đổi ngày
  useEffect(() => {
    if (!cinemaId) return;
    const fetchShowtimes = async () => {
      setLoading(true);
      setMovies([]);
      try {
        const raw = await axiosClient.get(
          `/cinemas/${cinemaId}/showtimes?date=${selectedDate}`
        );

        console.log("Backend trả về:", raw);

        let movieList = [];

        if (raw && Array.isArray(raw.movies)) {
          movieList = raw.movies;
        } else if (raw && Array.isArray(raw.data?.movies)) {
          movieList = raw.data.movies;
        } else if (raw && Array.isArray(raw.data)) {
          movieList = raw.data;
        } else if (Array.isArray(raw)) {
          movieList = raw;
        }

        setMovies(movieList);
      } catch (err) {
        console.error("Lỗi lấy lịch chiếu:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchShowtimes();
  }, [cinemaId, selectedDate]);

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
            {/* ── Thông tin rạp ── */}
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
                {cinemaLoading
                  ? "ĐANG TẢI..."
                  : cinemaInfo
                  ? cinemaInfo.Name.toUpperCase()
                  : "KHÔNG TÌM THẤY RẠP"}
              </h3>
              <p
                style={{ width: "100%", textAlign: "center", color: "#22272b" }}
              >
                {cinemaInfo?.Phone || "1900 1722"}
              </p>
              <p
                style={{ width: "100%", textAlign: "center", color: "#22272b" }}
              >
                {cinemaInfo?.Address || ""}
              </p>
            </div>

            {/* ── Tabs + Nội dung ── */}
            <div
              className="tabs movies ui-tabs ui-corner-all ui-widget ui-widget-content"
              id="schedule-tabs"
            >
              <div className="tv-panel-list">
                <div className="tv-tab">
                  {/* ── Tab chọn ngày (7 ngày động) ── */}
                  <ul
                    className="nav nav-pills tv-tab-switch schedule-list"
                    id="pills-tab"
                    role="tablist"
                  >
                    {dates.map((d, idx) => (
                      <li className="nav-item" key={idx}>
                        <a
                          className={`nav-link ${
                            selectedDate === d.dateStr ? "active show" : ""
                          }`}
                          role="tab"
                          style={{ cursor: "pointer" }}
                          onClick={() => setSelectedDate(d.dateStr)}
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
                            {d.label}
                          </p>
                          <p
                            style={{
                              width: "100%",
                              textAlign: "center",
                              padding: "5px 15px",
                              color: "#2b2b31",
                            }}
                          >
                            {d.display}
                          </p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ── Danh sách phim theo ngày ── */}
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" role="tabpanel">
                    {/* Loading */}
                    {loading ? (
                      <div style={{ textAlign: "center", padding: "50px 0" }}>
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: "36px", color: "#f37737" }}
                        />
                        <p style={{ marginTop: "12px", color: "#666" }}>
                          Đang tải lịch chiếu...
                        </p>
                      </div>
                    ) : movies.length === 0 ? (
                      /* Không có lịch chiếu */
                      <div style={{ textAlign: "center", padding: "50px 0" }}>
                        <i
                          className="fa fa-film"
                          style={{ fontSize: "48px", color: "#ccc" }}
                        />
                        <p
                          style={{
                            marginTop: "12px",
                            color: "#999",
                            fontSize: "16px",
                          }}
                        >
                          Không có lịch chiếu cho ngày này
                        </p>
                      </div>
                    ) : (
                      /* Danh sách phim */
                      <div className="tab-movies movie-list-box">
                        {movies.map((movie) => {
                          const showtimeList = Array.isArray(movie.showtimes)
                            ? movie.showtimes
                            : [];

                          const roomGroups = showtimeList.reduce((acc, st) => {
                            const key = `${st.Room || "Phòng"}||${
                              st.RoomType || "2D"
                            }`;
                            if (!acc[key]) acc[key] = [];
                            acc[key].push(st);
                            return acc;
                          }, {});

                          return (
                            <div
                              className="single-movie-list"
                              key={movie.MovieId}
                            >
                              {/* Poster phim */}
                              <div className="single-movie-list-left col-lg-3 col-md-4 col-sm-12">
                                <a href={`/phim/${movie.MovieId}`}>
                                  <img
                                    src={movie.PosterUrl}
                                    alt={movie.Title}
                                    onError={(e) => {
                                      e.target.src =
                                        "/assets/images/default-poster.jpg";
                                    }}
                                  />
                                </a>
                              </div>

                              {/* Thông tin + suất chiếu */}
                              {/* Thông tin + suất chiếu */}
                              <div className="single-movie-list-right col-lg-9 col-md-8 col-sm-12">
                                <h3>
                                  <a href={`/phim/${movie.MovieId}`}>
                                    {movie.Title}
                                  </a>
                                </h3>
                                <ul>
                                  <li className="rating">2D</li>
                                </ul>

                                {/* Thời lượng */}
                                <p className="list-genre">
                                  Thời lượng: {movie.Duration} phút
                                </p>

                                {/* Đạo diễn */}
                                {Array.isArray(movie.Directors) &&
                                  movie.Directors.length > 0 && (
                                    <p className="list-genre">
                                      <strong>Đạo diễn: </strong>
                                      {movie.Directors.join(", ")}
                                    </p>
                                  )}

                                {/* Diễn viên */}
                                {Array.isArray(movie.Actors) &&
                                  movie.Actors.length > 0 && (
                                    <p className="list-genre">
                                      <strong>Diễn viên: </strong>
                                      {movie.Actors.join(", ")}
                                    </p>
                                  )}

                                {/* Mô tả phim - giới hạn 2 dòng */}
                                {movie.Description && (
                                  <p
                                    className="list-genre"
                                    style={{
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {movie.Description}
                                  </p>
                                )}

                                <div
                                  className="col-md-12 col-sm-12"
                                  style={{ padding: 0 }}
                                >
                                  <hr className="space-1" />

                                  {Object.entries(roomGroups).map(
                                    ([key, sts]) => {
                                      const [roomName, roomType] =
                                        key.split("||");
                                      return (
                                        <div
                                          key={key}
                                          style={{ marginBottom: "12px" }}
                                        >
                                          {/* Label phòng */}
                                          <p
                                            style={{
                                              color: "#555",
                                              fontWeight: 600,
                                              marginBottom: "8px",
                                              fontSize: "13px",
                                            }}
                                          >
                                            🎬 {roomName}{" "}
                                            <span
                                              style={{
                                                color: "#f37737",
                                                fontWeight: 400,
                                              }}
                                            >
                                              ({roomType})
                                            </span>
                                          </p>

                                          {/* Các suất chiếu */}
                                          {sts.map((st) => {
                                            const past = isShowtimePast(
                                              selectedDate,
                                              st.StartTime
                                            );
                                            const priceLabel = st.Price
                                              ? `${Number(
                                                  st.Price
                                                ).toLocaleString("vi-VN")} đ`
                                              : "";

                                            return past ? (
                                              <span
                                                key={st.ShowtimeId}
                                                className="time past item"
                                                style={{
                                                  display: "inline-flex",
                                                  marginBottom: "10px",
                                                  marginRight: "8px",
                                                  opacity: 0.5,
                                                  cursor: "not-allowed",
                                                }}
                                                title={priceLabel}
                                              >
                                                {st.StartTime}
                                              </span>
                                            ) : (
                                              <a
                                                key={st.ShowtimeId}
                                                href={`/chon-ghe/${st.ShowtimeId}`}
                                                style={{
                                                  display: "inline-flex",
                                                  marginBottom: "10px",
                                                  marginRight: "8px",
                                                }}
                                                title={priceLabel}
                                              >
                                                <span className="time item">
                                                  {st.StartTime}
                                                </span>
                                              </a>
                                            );
                                          })}
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>

                              <div className="top-action"></div>
                            </div>
                          );
                        })}
                      </div>
                    )}
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

export default LichChieuDetail;
