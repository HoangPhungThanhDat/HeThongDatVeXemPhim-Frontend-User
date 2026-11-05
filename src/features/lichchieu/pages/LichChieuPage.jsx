import React from 'react';
import { useCinemas } from '../hooks/useCinemas';
import { CinemaGrid, LoadingSkeleton, EmptyState } from '../components';
import { MESSAGES } from '../constants';

const LichChieuPage = () => {
  const { cinemas, loading, error } = useCinemas();

  // Loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (error) {
    return <EmptyState message={error} />;
  }

  // No data state
  if (cinemas.length === 0) {
    return <EmptyState message={MESSAGES.EMPTY} />;
  }

  // Success state
  return (
    <div>
      <section
        className="filmoja-blog-page section_30 bg-main"
        style={{
          minHeight: '500px',
          background: '#e6e7e9',
          maxWidth: '100%',
          borderTop: '1px solid',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <CinemaGrid cinemas={cinemas} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LichChieuPage;
