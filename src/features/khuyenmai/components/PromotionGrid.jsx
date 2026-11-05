import React from 'react';
import PromotionCard from './PromotionCard';

export default function PromotionGrid({ promotions }) {
  return (
    <div className="km-grid">
      {promotions.map((promotion) => (
        <PromotionCard key={promotion.PromotionId || promotion.id} promotion={promotion} />
      ))}

      <style>{`
        .km-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }
        @media (max-width: 768px) {
          .km-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 16px;
          }
        }
        @media (max-width: 480px) {
          .km-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
