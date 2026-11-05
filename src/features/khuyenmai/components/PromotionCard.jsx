import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { handleImageError, getPromotionId, getPromotionTitle, getPromotionImage } from '../utils';

export default function PromotionCard({ promotion }) {
  const id = getPromotionId(promotion);
  const title = getPromotionTitle(promotion);
  const image = getPromotionImage(promotion);

  return (
    <Link to={ROUTES.PROMOTION_DETAIL(id)} className="km-card">
      <div className="km-card-img">
        <img src={image} alt={title} onError={handleImageError} loading="lazy" />
        <div className="km-card-overlay">
          <span className="km-card-view">Xem chi tiết</span>
        </div>
      </div>
      <p className="km-card-title">{title}</p>

      <style>{`
        .km-card {
          display: block;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .km-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
          border-color: rgba(249, 115, 22, 0.3);
        }
        .km-card-img {
          position: relative;
          overflow: hidden;
          padding-top: 133.33%; /* 3:4 ratio */
          background: #1a1a2e;
        }
        .km-card-img img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .km-card:hover .km-card-img img {
          transform: scale(1.05);
        }
        .km-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .km-card:hover .km-card-overlay {
          opacity: 1;
        }
        .km-card-view {
          padding: 8px 20px;
          background: #f97316;
          color: white;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }
        .km-card:hover .km-card-view {
          transform: translateY(0);
        }
        .km-card-title {
          padding: 12px 16px;
          margin: 0;
          color: #e5e7eb;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-align: center;
          min-height: 48px;
        }
      `}</style>
    </Link>
  );
}
