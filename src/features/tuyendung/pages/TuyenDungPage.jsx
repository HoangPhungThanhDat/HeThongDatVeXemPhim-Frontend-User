import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ── Dữ liệu mẫu dựa trên file HTML của bạn ─────────────────────────────
const JOBS_DATA = [
  {
    id: 1,
    title: 'TUYỂN DỤNG BUÔN MA THUỘT THÁNG 10/2026',
    slug: 'tuyen-dung-buon-ma-thuot-thang-10-2026-1011',
    image: '/Areas/Admin/Content/Fileuploads/images/QuangCao/a%20quang.jpg',
    author: 'admin',
    date: '12/10/2026',
    excerpt: ''
  },
  {
    id: 2,
    title: 'HIGHLANDS COFFEE – TUYỂN DỤNG ĐỘI NGŨ KHAI TRƯƠNG CỬA HÀNG MỚI TẠI BUÔN MA THUỘT',
    slug: 'highlands-coffee-–-tuyen-dung-doi-ngu-khai-truong-cua-hang-moi-tai-buon-ma-thuot-1010',
    image: '/Areas/Admin/Content/Fileuploads/images/Poster2024/2land%20td%20web.jpg',
    author: 'admin',
    date: '07/09/2026',
    excerpt: 'HIGHLANDS COFFEE – TUYỂN DỤNG ĐỘI NGŨ KHAI TRƯƠNG CỬA HÀNG MỚI TẠI BUÔN MA THUỘT'
  },
  {
    id: 3,
    title: 'Chuyên viên Hành chính – Nhân sự (HCNS)',
    slug: 'chuyen-vien-hanh-chinh-–-nhan-su-hcns-1009',
    image: '/Areas/Admin/Content/Fileuploads/images/POSTER2026/a%20quang.jpg',
    author: 'admin',
    date: '14/05/2026',
    excerpt: ''
  },
  {
    id: 4,
    title: 'Trưởng phòng Kỹ thuật',
    slug: 'truong-phong-ky-thuat-1008',
    image: '/Areas/Admin/Content/Fileuploads/images/Slide2024/TUYEN%20DUNG%20123.jpg',
    author: 'admin',
    date: '08/05/2026',
    excerpt: ''
  },
  {
    id: 5,
    title: 'TUYỂN DỤNG NHÂN SỰ RẠP BẢO LỘC THÁNG 5/2026',
    slug: 'tuyen-dung-nhan-su-rap-bao-loc-thang-5-2026-1007',
    image: '/Areas/Admin/Content/Fileuploads/images/POSTER/tuyendung.jpg',
    author: 'admin',
    date: '04/05/2026',
    excerpt: ''
  },
  {
    id: 6,
    title: 'Marketing Lead – Phụ trách truyền thông',
    slug: 'marketing-lead-–-phu-trach-truyen-thong-1006',
    image: '/Areas/Admin/Content/Fileuploads/images/Poster2024/a%20quang.jpg',
    author: 'admin',
    date: '04/03/2026',
    excerpt: 'Địa điểm làm việc: VP Đà Nẵng và các Địa điểm kinh doanh khác theo điều động của Công ty'
  },
  {
    id: 7,
    title: 'TUYỂN DỤNG NHÂN SỰ STARLIGHT THÁNG 07/2024',
    slug: 'tuyen-dung-nhan-su-starlight-thang-07-2024-1005',
    image: '/Areas/Admin/Content/Fileuploads/images/tuyen-dung(1).jpg',
    author: 'admin',
    date: '15/07/2024',
    excerpt: 'CÔNG TY CP ENTERTAINMENT 2020 (ĐƠN VỊ CHỦ QUẢN HỆ THỐNG RẠP CHIẾU PHIM STARLIGHT) CẦN TUYỂN:'
  },
  {
    id: 8,
    title: 'TUYỂN DỤNG NHÂN SỰ STARLIGHT PLEIKU',
    slug: 'tuyen-dung-nhan-su-starlight-pleiku-1002',
    image: '/Areas/Admin/Content/Fileuploads/images/POSTER/Thuan_duc_tuyen_dung_2023.png',
    author: 'admin',
    date: '09/12/2023',
    excerpt: 'RẠP CHIẾU PHIM STARLIGHT CINEMA PLEIKU THÔNG BÁO TUYỂN DỤNG NHÂN SỰ 2023 NHƯ SAU:'
  },
  {
    id: 9,
    title: 'Tuyển Dụng Starlight',
    slug: 'tuyen-dung-starlight-2',
    image: '/Areas/Admin/Content/Fileuploads/images/tuyendung.jpg',
    author: 'admin',
    date: '02/11/2023',
    excerpt: 'Tuyển dụng chuyên viên Test game Số lượng: 30 người Địa chỉ làm việc: Tầng 05 Chợ Siêu Thị Đà Nẵng – 46 Điện...'
  },
  {
    id: 10,
    title: 'Tuyển Dụng Starlight',
    slug: 'tuyen-dung-starlight-1',
    image: '/Areas/Admin/Content/Fileuploads/images/tuyen-dung(1).jpg',
    author: 'admin',
    date: '06/01/2022',
    excerpt: ''
  }
];

function TuyenDungPage() {
  // State quản lý phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Số bài viết trên 1 trang

  // Logic tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = JOBS_DATA.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(JOBS_DATA.length / itemsPerPage);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang khi đổi trang
  };

  return (
    <section 
      className="filmoja-blog-page section_15 container bg-main" 
      style={{ background: '#e6e7e9', maxWidth: '100% !important', borderTop: '1px solid', minHeight: '900px' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="blog-page-list row">
              
              {/* Lặp qua dữ liệu bài viết */}
              {currentItems.map((job) => (
                <div key={job.id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="news-side-list">
                    <div className="single-news-side">
                      
                      {/* Ảnh bài viết */}
                      <div className="news-side-img">
                        <Link to={`/tuyen-dung/${job.slug}.html`}>
                          <img src={job.image} alt={job.title} />
                        </Link>
                      </div>

                      {/* Nội dung chữ */}
                      <div className="news-side-text">
                        <h4>
                          <Link to={`/tuyen-dung/${job.slug}.html`}>{job.title}</Link>
                        </h4>
                        
                        <div className="post-meta">
                          <p><a href="#"><i className="fa fa-user"></i>{job.author}</a></p>
                          <p><a href="#"><i className="fa fa-tags"></i>{job.date}</a></p>
                        </div>
                        
                        <div className="post-content">
                          {job.excerpt && <p>{job.excerpt}</p>}
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="pagination-box-row">
                <ul className="pagination">
                  {/* Nút Previous */}
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a 
                      href="#!" 
                      className="page-link" 
                      onClick={(e) => { e.preventDefault(); if(currentPage > 1) handlePageChange(currentPage - 1); }}
                    >
                      <i className="fa fa-angle-left"></i>
                    </a>
                  </li>

                  {/* Các số trang */}
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                        <a 
                          href="#!" 
                          className="page-link" 
                          onClick={(e) => { e.preventDefault(); handlePageChange(pageNumber); }}
                        >
                          {pageNumber}
                        </a>
                      </li>
                    );
                  })}

                  {/* Nút Next */}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a 
                      href="#!" 
                      className="page-link" 
                      onClick={(e) => { e.preventDefault(); if(currentPage < totalPages) handlePageChange(currentPage + 1); }}
                    >
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

export default TuyenDungPage;