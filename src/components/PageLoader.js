import React from "react";

const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="loader-content">
        {/* Vòng tròn xoay ngoài */}
        <div className="loader-spinner"></div>
        
        {/* Logo ở giữa */}
        <div className="loader-logo">
          <svg className="logo-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
          </svg>
        </div>
      </div>
      
      {/* Text loading */}
      <div className="loader-text">
        <p>ĐANG TẢI...</p>
      </div>
    </div>
  );
};

export default PageLoader;