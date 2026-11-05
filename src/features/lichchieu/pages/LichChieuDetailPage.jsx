import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { CinemaInfo, DateTabs, MovieList, LoadingSpinner, EmptyMovieState } from '../components';

import { useCinemaInfo } from '../hooks/useCinemaInfo';
import { useShowtimes } from '../hooks/useShowtimes';
import { generateDates } from '../utils/dateUtils';

function LichChieuDetailPage() {
  const { cinemaId } = useParams();

  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState(dates[0].dateStr);

  const { cinemaInfo, loading: cinemaLoading } = useCinemaInfo(cinemaId);
  const { movies, loading: showtimesLoading } = useShowtimes(cinemaId, selectedDate);

  return (
    <div
      className="filmoja-login-area section_30 bg-main"
      style={{
        background: '#e6e7e9',
        maxWidth: '100%',
        borderTop: '1px solid #ccc',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {/* ── Thông tin rạp ── */}
            <CinemaInfo cinemaInfo={cinemaInfo} loading={cinemaLoading} />

            {/* ── Tabs + Nội dung ── */}
            <div
              className="tabs movies ui-tabs ui-corner-all ui-widget ui-widget-content"
              id="schedule-tabs"
            >
              <div className="tv-panel-list">
                <div className="tv-tab">
                  {/* ── Tab chọn ngày ── */}
                  <DateTabs
                    dates={dates}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                </div>

                {/* ── Danh sách phim theo ngày ── */}
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" role="tabpanel">
                    {/* Loading */}
                    {showtimesLoading ? (
                      <LoadingSpinner message="Đang tải lịch chiếu..." />
                    ) : movies.length === 0 ? (
                      /* Không có lịch chiếu */
                      <EmptyMovieState message="Không có lịch chiếu cho ngày này" />
                    ) : (
                      /* Danh sách phim */
                      <MovieList
                        movies={movies}
                        selectedDate={selectedDate}
                        cinemaInfo={cinemaInfo}
                      />
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

export default LichChieuDetailPage;
