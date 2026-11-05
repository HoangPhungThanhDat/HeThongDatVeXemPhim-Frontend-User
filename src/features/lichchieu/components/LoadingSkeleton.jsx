import React from 'react';

export default function LoadingSkeleton() {
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
              <div className="blog-page-list row">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="single-news-item col-lg-6 col-md-6 col-sm-12"
                    style={{ padding: '10px' }}
                  >
                    <div className="news-image" style={{ position: 'relative' }}>
                      <div
                        style={{
                          background: '#ddd',
                          height: '300px',
                          animation: 'pulse 1.5s infinite',
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
