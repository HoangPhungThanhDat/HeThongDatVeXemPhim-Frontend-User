// src/features/trangchu/pages/TrangChuPage.jsx
import React from 'react';
import TimRap from '../components/TimRap';
import PhimDangChieu from '../components/PhimDangChieu';
import PhimSapChieu from '../components/PhimSapChieu';
import PhimMoi from '../components/PhimMoi';
import KhuyenMai from '../components/KhuyenMai';
import TinTuc from '../components/TinTuc';
import PhimHot from '../components/PhimHot';

import BannerHero from '../components/BannerHero';

function TrangChuPage() {
  return (
    <div className="trang-chu-page">
      <BannerHero />
      <TimRap />
      {/* Phim đang chiếu */}
      <PhimDangChieu />
      {/* Phim sắp chiếu */}
      <PhimSapChieu />

      {/* Khuyến mãi */}
      <KhuyenMai />
      <PhimHot />
      {/* Tin tức */}
      <TinTuc />
    </div>
  );
}

export default TrangChuPage;
