import React from 'react';

export default function ErrorState({ error }) {
  return (
    <section
      className="filmoja-login-area section_70 bg-main"
      style={{
        background: '#e6e7e9',
        maxWidth: '100%',
        borderTop: '1px solid #ccc',
      }}
    >
      <div className="container">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    </section>
  );
}
