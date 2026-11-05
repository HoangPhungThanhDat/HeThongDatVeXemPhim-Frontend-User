import React from 'react';
import { useParams } from 'react-router-dom';
import { usePromotionDetail } from '../hooks/usePromotionDetail';
import { PromotionDetailContent, LoadingDetail, ErrorDetail } from '../components';

function ChiTietKhuyenMaiPage() {
  const { id } = useParams();
  const { promotion, loading, error } = usePromotionDetail(id);

  if (loading) {
    return <LoadingDetail />;
  }

  if (error) {
    return <ErrorDetail error={error} />;
  }

  return (
    <section
      className="filmoja-login-area section_15 bg-main"
      style={{
        background: '#e6e7e9',
        maxWidth: '100%',
        borderTop: '1px solid #ccc',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="p-detail" style={{ width: '100%' }}>
            <PromotionDetailContent promotion={promotion} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChiTietKhuyenMaiPage;
