// src/pages/ChiTietPhim.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import MovieApi from "../api/MovieApi";

const timeButtonBase = {
  display: "inline-flex",
  marginBottom: "3px",
  marginRight: "4px",
  padding: "6px 12px",
  color: "white",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px",
  textDecoration: "none",
};

const isGoldRoom = (room = "") => room.toLowerCase().includes("gold");

/* ─── Chuyển bất kỳ dạng YouTube URL → embed URL ────────────── */
const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  if (!url.includes("http")) {
    return `https://www.youtube.com/embed/${url}?autoplay=1`;
  }
  let videoId = "";
  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("embed/")[1]?.split("?")[0];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
};

/* ═══════════════════════════════════════════════════════════════ */
function ChiTietPhim() {
  const { slugOrId }  = useParams();
  const { state }     = useLocation();
  const navigate      = useNavigate();

  /* ─── State phim & lịch chiếu ───────────────────────────────── */
  const [movie,        setMovie]        = useState(state?.movie || null);
  const [showtimes,    setShowtimes]    = useState([]);
  const [expanded,     setExpanded]     = useState(true);
  const [loadingMovie, setLoadingMovie] = useState(!state?.movie);
  const [loadingShow,  setLoadingShow]  = useState(true);
  const [error,        setError]        = useState(null);

  /* ─── State modal trailer ───────────────────────────────────── */
  const [showModal,       setShowModal]       = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState("");

  /* ─── Fetch ─────────────────────────────────────────────────── */
  useEffect(() => {
    if (!state?.movie && slugOrId) fetchMovieDetail();
    if (slugOrId) fetchShowtimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugOrId]);

  const fetchMovieDetail = async () => {
    try {
      setLoadingMovie(true);
      const result = await MovieApi.getMovieDetail(slugOrId);
      if (result.success && result.data) {
        setMovie(result.data);
      } else {
        setError("Không tìm thấy thông tin phim");
      }
    } catch {
      setError("Lỗi khi tải thông tin phim");
    } finally {
      setLoadingMovie(false);
    }
  };

  const fetchShowtimes = async () => {
    try {
      setLoadingShow(true);
      const result = await MovieApi.getShowtimes(slugOrId);
      if (result.success && Array.isArray(result.data)) {
        setShowtimes(result.data);
      }
    } catch (err) {
      console.warn("Không tải được lịch chiếu:", err);
    } finally {
      setLoadingShow(false);
    }
  };

  /* ─── Modal trailer ─────────────────────────────────────────── */
  const handleOpenTrailer = (e, trailerUrl) => {
    e.preventDefault();
    e.stopPropagation();
    const embedUrl = getYouTubeEmbedUrl(trailerUrl);
    if (embedUrl) {
      setSelectedTrailer(embedUrl);
      setShowModal(true);
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTrailer("");
    document.body.style.overflow = "auto";
  };

  /* ─── Helpers ───────────────────────────────────────────────── */
  const formatDuration = (minutes) => {
    if (!minutes) return "N/A";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h} giờ ${m} phút` : `${m} phút`;
  };

  const formatActors = (actors, max = 3) => {
    if (!Array.isArray(actors) || actors.length === 0) return "N/A";
    const names = actors.map((a) => a.Name);
    return names.length > max ? names.slice(0, max).join(", ") + "..." : names.join(", ");
  };

  const formatDirectors = (directors) => {
    if (!Array.isArray(directors) || directors.length === 0) return "N/A";
    return directors.map((d) => d.Name).join(", ");
  };

  const getGenreName = (genre) => genre?.Name || "N/A";

  const buildTicketUrl = (m, date, slot) =>
    `/dat-ve.html?film_name=${encodeURIComponent(m.Title)}`
    + `&time_id=${slot.TimeId}`
    + `&date=${date}`
    + `&format=${slot.Format || "2D"}`
    + `&room=${encodeURIComponent(slot.Room)}`
    + `&image=${encodeURIComponent(m.PosterUrl || "")}`
    + `&time=${slot.Time}`
    + `&l_age=${m.Rated || ""}`;

  /* ─── Loading / Error ───────────────────────────────────────── */
  if (loadingMovie) {
    return (
      <div style={{ textAlign: "center", padding: "60px" }}>
        <p style={{ color: "#555" }}>Đang tải thông tin phim...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "red" }}>
        <p>{error || "Không tìm thấy phim"}</p>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "12px",
            padding: "8px 18px",
            background: "#f37737",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Quay lại
        </button>
      </div>
    );
  }

  /* ─── Render ────────────────────────────────────────────────── */
  return (
    <>
      {/* ===== PHẦN 1: THÔNG TIN PHIM ===== */}
      <section
        style={{
          background: "#e6e7e9",
          maxWidth: "100%",
          borderTop: "1px solid #ccc",
          padding: "30px 0",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="movie-details-banner">
                <div className="row">

                  {/* Poster */}
                  <div className="col-lg-3 col-sm-4">
                    <div className="details-banner-thumb">
                      <img
                        src={movie.PosterUrl || "/default-poster.jpg"}
                        alt={movie.Title}
                        style={{ width: "100%", borderRadius: "6px" }}
                        onError={(e) => { e.target.src = "/default-poster.jpg"; }}
                      />
                    </div>
                  </div>

                  {/* Thông tin */}
                  <div className="col-lg-9 col-sm-8">
                    <div className="details-banner-info">

                      <h3 style={{ color: "#22272b" }}>{movie.Title}</h3>

                      {movie.Rated && (
                        <p
                          style={{
                            background: "#f37737",
                            display: "inline-block",
                            width: "35px",
                            height: "35px",
                            textAlign: "center",
                            lineHeight: "35px",
                            borderRadius: "2px",
                            color: "white",
                            fontWeight: "bold",
                            letterSpacing: "2px",
                            boxShadow: "1px 1px 4px 0px #4e4e54",
                            margin: "6px 0",
                          }}
                        >
                          {movie.Rated}
                        </p>
                      )}

                      <p style={{ color: "#22272b" }} className="details-genre">
                        {getGenreName(movie.genre)} - <span>2D</span>
                      </p>

                      {/* ── Nút Trailer → mở modal ── */}
                      {movie.TrailerUrl && (
                        <a
                          href="#"
                          className="filmoja-btn tablet-action"
                          style={{ marginBottom: "12px", display: "inline-block" }}
                          onClick={(e) => handleOpenTrailer(e, movie.TrailerUrl)}
                        >
                          <i className="fa fa-play" /> trailer
                        </a>
                      )}

                      <ul style={{ margin: "12px 0", paddingLeft: 0, listStyle: "none" }}>
                        <li><b>Đạo diễn</b>  : {formatDirectors(movie.directors)}</li>
                        <li><b>Ngày chiếu</b> : {movie.ReleaseDate || "N/A"}</li>
                        <li><b>Diễn viên</b>  : {formatActors(movie.actors)}</li>
                        <li><b>Thời lượng</b> : {formatDuration(movie.Duration)}</li>
                      </ul>

                      <div className="fb-share-button">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        >
                          Chia sẻ
                        </a>
                      </div>
                    </div>

                    {/* Mô tả */}
                    <div className="movie-details-page-box" style={{ marginTop: "16px" }}>
                      <p style={{ color: "#333", lineHeight: "1.7" }}>
                        {movie.Description || "Không có mô tả"}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PHẦN 2: LỊCH CHIẾU ===== */}
      <section
        style={{
          background: "#e6e7e9",
          maxWidth: "100%",
          padding: "30px 0",
          borderTop: "1px solid #ccc",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">

              <h4
                style={{
                  marginBottom: "15px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#444444",
                  textDecoration: "underline",
                  paddingLeft: "30px",
                }}
              >
                Lịch chiếu
              </h4>

              {/* Rạp */}
              <div
                style={{
                  height: expanded ? "auto" : "100px",
                  overflow: "hidden",
                  marginBottom: "15px",
                  transition: "height 0.3s ease",
                }}
              >
                {/* Header rạp */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "100px",
                    cursor: "pointer",
                  }}
                  onClick={() => setExpanded((v) => !v)}
                >
                  <h2
                    style={{
                      background: "#e6e7e9",
                      color: "#f37737",
                      textAlign: "left",
                      padding: "10px",
                      width: "95%",
                      fontSize: "23px",
                      border: "2px solid",
                      margin: 0,
                    }}
                  >
                    STARLIGHT BUÔN MA THUỘT
                    <br />
                    <small style={{ fontSize: "13px", color: "#333" }}>
                      Tầng 6 Tòa Nhà Vincom - 78 Lý Thường Kiệt - TP.BMT
                    </small>
                  </h2>
                  <div
                    style={{
                      width: "5%",
                      height: "100px",
                      fontSize: "30px",
                      background: "#f37737",
                      textAlign: "center",
                      color: "#fbfbfb",
                      paddingTop: "25px",
                    }}
                  >
                    <i className={`fa fa-angle-double-${expanded ? "down" : "up"}`} />
                  </div>
                </div>

                {/* Lịch theo ngày */}
                {loadingShow ? (
                  <p style={{ padding: "20px", color: "#666" }}>Đang tải lịch chiếu...</p>
                ) : showtimes.length === 0 ? (
                  <p style={{ padding: "20px", color: "#666" }}>Chưa có lịch chiếu</p>
                ) : (
                  showtimes.map(({ Date: date, Showtimes: slots }) => {
                    const regular = slots.filter((s) => !isGoldRoom(s.Room));
                    const gold    = slots.filter((s) =>  isGoldRoom(s.Room));

                    return (
                      <div
                        key={date}
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "15px 0",
                          borderBottom: "1px dotted #bbb",
                          paddingBottom: "10px",
                        }}
                      >
                        {/* Ngày */}
                        <div className="col-lg-2 col-md-3 col-sm-12" style={{ padding: 0 }}>
                          <span
                            style={{
                              background: "#444444",
                              display: "inline-flex",
                              width: "100%",
                              minHeight: "50px",
                              alignItems: "center",
                              padding: "0 8px",
                              color: "white",
                              fontWeight: "500",
                            }}
                          >
                            {date}
                          </span>
                        </div>

                        {/* Giờ chiếu */}
                        <div className="col-lg-10 col-md-9 col-sm-12" style={{ paddingRight: 0 }}>
                          {regular.map((slot) => (
                            <a
                              key={slot.TimeId}
                              href={buildTicketUrl(movie, date, slot)}
                              style={{ display: "inline-flex", marginBottom: "3px" }}
                            >
                              <span style={{ ...timeButtonBase, background: "#f37737" }}>
                                {slot.Time}
                              </span>
                            </a>
                          ))}

                          {gold.length > 0 && (
                            <>
                              <div style={{ clear: "both" }} />
                              <img
                                src="https://starlight.vn/Areas/Admin/Content/Fileuploads/images/goldclass.png"
                                style={{ width: "150px", height: "auto", display: "block", margin: "6px 0" }}
                                alt="Gold Class"
                              />
                              {gold.map((slot) => (
                                <a
                                  key={slot.TimeId}
                                  href={buildTicketUrl(movie, date, slot)}
                                  style={{ display: "inline-flex", marginBottom: "3px" }}
                                >
                                  <span style={{ ...timeButtonBase, background: "#c8a84b" }}>
                                    {slot.Time}
                                  </span>
                                </a>
                              ))}
                            </>
                          )}
                          <div style={{ clear: "both" }} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MODAL TRAILER ===== */}
      {showModal && (
        <div
          onClick={handleCloseModal}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          {/* Nội dung modal – click bên trong không đóng */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "90%",
              maxWidth: "1200px",
              animation: "slideUp 0.3s ease-in-out",
            }}
          >
            {/* Nút đóng */}
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "-40px",
                right: 0,
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "30px",
                cursor: "pointer",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                zIndex: 10000,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ff0000";
                e.currentTarget.style.transform = "rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.transform = "rotate(0deg)";
              }}
            >
              <i className="fa fa-times" />
            </button>

            {/* iframe YouTube – tỉ lệ 16:9 */}
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                background: "#000",
                borderRadius: "8px",
              }}
            >
              <iframe
                src={selectedTrailer}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ===== CSS ANIMATION ===== */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @media (max-width: 768px) {
          .trailer-close-btn { top: -35px !important; font-size: 25px !important; }
        }
      `}</style>
    </>
  );
}

export default ChiTietPhim;