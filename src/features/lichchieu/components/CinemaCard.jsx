import React from 'react';
import { Link } from 'react-router-dom';
import {
  handleImageError,
  getCinemaImage,
  getCinemaPhone,
  getCinemaName,
  getCinemaAddress,
} from '../utils';

export default function CinemaCard({ cinema }) {
  const cinemaId = cinema.CinemaId;
  const name = getCinemaName(cinema);
  const address = getCinemaAddress(cinema);
  const phone = getCinemaPhone(cinema);
  const image = getCinemaImage(cinema);

  return (
    <div className="single-news-item col-lg-6 col-md-6 col-sm-12" style={{ padding: '10px' }}>
      <Link to={`/lich-chieu-detail/${cinemaId}`}>
        <div className="news-image">
          <img src={image} alt={name} onError={handleImageError} />
          <div
            style={{
              position: 'relative',
              bottom: 0,
              padding: '5px',
              backgroundImage: 'linear-gradient(to top, #000000 , #141415cc)',
              width: '100%',
              color: '#fff',
              letterSpacing: '2px',
            }}
          >
            <p style={{ color: '#f37737', fontWeight: 600, fontSize: '20px' }}>
              {name.toUpperCase()}
            </p>
            <p style={{ color: '#fff', minHeight: '45px' }}>{address}</p>
            <p style={{ color: '#fff' }}>
              <b>Hotline: </b> {phone}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
