import React from 'react';
import { MESSAGES } from '../constants';

export default function EmptyState({ message }) {
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
            <div className="col-12 py-5 text-center">
              <i className="fa fa-film" style={{ fontSize: '64px', color: '#ccc' }}></i>
              <p className="text-muted mt-3" style={{ fontSize: '18px' }}>
                {message || MESSAGES.EMPTY}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
