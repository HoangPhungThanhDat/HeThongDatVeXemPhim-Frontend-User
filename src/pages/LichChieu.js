import React, { useState, useEffect } from "react";
import CinemaApi from "../api/CinemasApi";
import defaultCinemaImg from "../assets/images/bmt.jpg";

const LichChieu = () => {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveCinemas();
  }, []);

  const fetchActiveCinemas = async () => {
    try {
      setLoading(true);
      const result = await CinemaApi.getActiveCinemas();
      
      if (result.success) {
        setCinemas(result.data);
      } else {
        console.error("Lỗi:", result.message);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách rạp:", error);
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div>
        <section
          className="filmoja-blog-page section_30 bg-main"
          style={{
            minHeight: "500px",
            background: "#e6e7e9",
            maxWidth: "100%",
            borderTop: "1px solid"
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="blog-page-list row">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="single-news-item col-lg-6 col-md-6 col-sm-12" style={{ padding: "10px" }}>
                      <div className="news-image" style={{ position: "relative" }}>
                        <div
                          style={{
                            background: "#ddd",
                            height: "300px",
                            animation: "pulse 1.5s infinite"
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  // No data state
  if (!loading && cinemas.length === 0) {
    return (
      <div>
        <section
          className="filmoja-blog-page section_30 bg-main"
          style={{
            minHeight: "500px",
            background: "#e6e7e9",
            maxWidth: "100%",
            borderTop: "1px solid"
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12 text-center py-5">
                <i className="fa fa-film" style={{ fontSize: "64px", color: "#ccc" }}></i>
                <p className="text-muted mt-3" style={{ fontSize: "18px" }}>
                  Chưa có rạp chiếu phim nào
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section
        className="filmoja-blog-page section_30 bg-main"
        style={{
          minHeight: "500px",
          background: "#e6e7e9",
          maxWidth: "100%",
          borderTop: "1px solid"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="blog-page-list row">
                {cinemas.map((cinema) => (
                  <div 
                    key={cinema.CinemaId} 
                    className="single-news-item col-lg-6 col-md-6 col-sm-12" 
                    style={{ padding: "10px" }}
                  >
                    <a href={`/lich-chieu-detail`}>
                    {/* <a href={`/lich-chieu-detail/${cinema.CinemaId}`}> */}

                      <div className="news-image">
                        <img
                          src={cinema.ImageUrl || defaultCinemaImg}
                          alt={cinema.Name}
                          onError={(e) => {
                            e.target.src = defaultCinemaImg;
                          }}
                        />
                        <div
                          style={{
                            position: "relative",
                            bottom: 0,
                            padding: "5px",
                            backgroundImage: "linear-gradient(to top, #000000 , #141415cc)",
                            width: "100%",
                            color: "#fff",
                            letterSpacing: "2px"
                          }}
                        >
                          <p style={{ color: "#f37737", fontWeight: 600, fontSize: "20px" }}>
                            {cinema.Name.toUpperCase()}
                          </p>
                          <p style={{ color: "#fff", minHeight: "45px" }}>
                            {cinema.Address}
                          </p>
                          <p style={{ color: "#fff" }}>
                            <b>Hotline: </b> {cinema.Phone || "1900 1722"}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LichChieu;