import React from 'react';
import { usePromotions } from '../hooks/usePromotions';
import { PromotionGrid, LoadingState, ErrorState, EmptyState } from '../components';
import { API_MESSAGES } from '../constants';
import bg from '../../../assets/images/backgrounds/bgs5.jpg';

export default function DanhSachKhuyenMaiPage() {
  const { promotions, loading, error } = usePromotions();

  return (
    <div
      className="km-page-wrapper"
      style={{
        background: `url(${bg}) center / cover no-repeat fixed`,
        minHeight: '100vh',
        padding: '40px 20px',
      }}
    >
      <div className="km-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div className="km-heading" style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: '700',
              color: 'white',
              textAlign: 'center',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              margin: 0,
              position: 'relative',
            }}
          >
            Khuyến mãi &amp; Sự kiện
          </h2>
        </div>

        {/* Content */}
        {loading && <LoadingState />}

        {!loading && error && (
          <ErrorState message={API_MESSAGES.ERROR} onRetry={() => window.location.reload()} />
        )}

        {!loading && !error && promotions.length === 0 && (
          <EmptyState message={API_MESSAGES.EMPTY} />
        )}

        {!loading && !error && promotions.length > 0 && <PromotionGrid promotions={promotions} />}
      </div>
    </div>
  );
}
