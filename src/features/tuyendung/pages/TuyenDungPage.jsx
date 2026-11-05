// src/features/tuyendung/pages/TuyenDungPage.jsx

import React, { useState } from 'react';
import bg from '../../../assets/images/backgrounds/bgs5.jpg';

// ── Dữ liệu tĩnh ─────────────────────────────────────────────────────────────

const REASONS = [
  {
    icon: '🎬',
    title: 'Môi trường năng động',
    desc: 'Làm việc trong ngành giải trí sôi động, tiếp xúc với những bộ phim bom tấn mới nhất mỗi tuần.',
  },
  {
    icon: '🚀',
    title: 'Phát triển không giới hạn',
    desc: 'Lộ trình thăng tiến rõ ràng, được đào tạo kỹ năng chuyên môn và hỗ trợ học tập liên tục.',
  },
  {
    icon: '💰',
    title: 'Thu nhập hấp dẫn',
    desc: 'Lương cạnh tranh, thưởng hiệu suất, phụ cấp ăn uống và vé xem phim miễn phí hàng tháng.',
  },
  {
    icon: '🤝',
    title: 'Đội ngũ thân thiện',
    desc: 'Văn hóa làm việc cởi mở, đồng nghiệp hỗ trợ lẫn nhau, thường xuyên tổ chức team building.',
  },
  {
    icon: '🏥',
    title: 'Phúc lợi đầy đủ',
    desc: 'Bảo hiểm sức khỏe cao cấp, nghỉ phép linh hoạt, khám sức khỏe định kỳ hàng năm.',
  },
  {
    icon: '🎁',
    title: 'Ưu đãi đặc biệt',
    desc: 'Giảm giá vé xem phim cho gia đình, ưu tiên mua combo đồ ăn và tham gia buổi chiếu sớm.',
  },
];

const JOBS = [
  {
    id: 1,
    title: 'Nhân viên bán vé & Chăm sóc khách hàng',
    dept: 'Vận hành',
    type: 'Toàn thời gian',
    location: 'TP. Hồ Chí Minh',
    exp: 'Không yêu cầu kinh nghiệm',
  },
  {
    id: 2,
    title: 'Nhân viên pha chế & Phục vụ quầy bar',
    dept: 'F&B',
    type: 'Bán thời gian',
    location: 'TP. Hồ Chí Minh',
    exp: 'Dưới 1 năm',
  },
  {
    id: 3,
    title: 'Kỹ thuật viên máy chiếu & Âm thanh',
    dept: 'Kỹ thuật',
    type: 'Toàn thời gian',
    location: 'Hà Nội',
    exp: '1 – 2 năm',
  },
  {
    id: 4,
    title: 'Chuyên viên Marketing & Truyền thông',
    dept: 'Marketing',
    type: 'Toàn thời gian',
    location: 'TP. Hồ Chí Minh',
    exp: '2 – 3 năm',
  },
  {
    id: 5,
    title: 'Lập trình viên Frontend (ReactJS)',
    dept: 'Công nghệ',
    type: 'Toàn thời gian',
    location: 'Remote / HCM',
    exp: '1 – 3 năm',
  },
  {
    id: 6,
    title: 'Quản lý ca / Giám sát rạp',
    dept: 'Quản lý',
    type: 'Toàn thời gian',
    location: 'Đà Nẵng',
    exp: '2 – 4 năm',
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function TuyenDung() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
  });
  const [toast, setToast] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: gọi API gửi CV khi backend sẵn sàng
    setToast(true);
    setForm({ fullName: '', email: '', phone: '', position: '', experience: '', message: '' });
    setTimeout(() => setToast(false), 3500);
  };

  const scrollToForm = () => {
    document.getElementById('td-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        /* ── Reset & Base ── */
        .td-wrapper {
          background: #ffffff;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          min-height: 100vh;
        }

        /* ── Hero ── */
        .td-hero {
          position: relative;
          min-height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        .td-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: brightness(0.3);
          transform: scale(1.05);
        }
        .td-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4));
        }
        .td-hero-content {
          position: relative;
          z-index: 2;
          color: white;
          padding: 40px 20px;
          max-width: 800px;
        }
        .td-hero-badge {
          display: inline-block;
          background: #f37737;
          padding: 6px 20px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        .td-hero h1 {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 800;
          margin: 0 0 12px;
          line-height: 1.2;
        }
        .td-hero p {
          font-size: clamp(16px, 1.5vw, 20px);
          opacity: 0.85;
          margin: 0;
          font-weight: 400;
        }

        /* ── Container ── */
        .td-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 60px;
        }

        /* ── Section Title ── */
        .td-section-title {
          font-size: clamp(24px, 2.8vw, 32px);
          font-weight: 700;
          color: #1a1a2e;
          text-align: center;
          margin: 50px 0 10px;
        }
        .td-section-title span {
          color: #f37737;
          margin-right: 8px;
        }
        .td-section-title::after {
          content: '';
          display: block;
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #f37737, #f5a623);
          margin: 10px auto 0;
          border-radius: 4px;
        }

        /* ── Reasons Grid ── */
        .td-reasons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-top: 24px;
        }
        .td-reason-card {
          background: #f8f9fa;
          padding: 28px 24px;
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.04);
          cursor: default;
        }
        .td-reason-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          border-color: rgba(243, 119, 55, 0.2);
          background: #ffffff;
        }
        .td-reason-icon {
          font-size: 40px;
          margin-bottom: 12px;
          display: block;
        }
        .td-reason-card h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px;
        }
        .td-reason-card p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }

        /* ── Jobs ── */
        .td-jobs {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 24px;
        }
        .td-job-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8f9fa;
          padding: 20px 24px;
          border-radius: 14px;
          border: 1px solid rgba(0,0,0,0.04);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .td-job-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.07);
          border-color: rgba(243, 119, 55, 0.2);
          background: #ffffff;
        }
        .td-job-left {
          flex: 1;
        }
        .td-job-title {
          font-size: 17px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px;
        }
        .td-job-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .td-tag {
          font-size: 12px;
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 500;
          background: rgba(0,0,0,0.05);
          color: #4b5563;
        }
        .td-tag-dept { background: rgba(243, 119, 55, 0.12); color: #f37737; }
        .td-tag-type { background: rgba(37, 99, 235, 0.10); color: #2563eb; }
        .td-tag-location { background: rgba(16, 185, 129, 0.10); color: #059669; }
        .td-tag-exp { background: rgba(139, 92, 246, 0.10); color: #7c3aed; }

        .td-job-right {
          flex-shrink: 0;
          margin-left: 16px;
        }
        .td-apply-btn {
          padding: 10px 28px;
          background: linear-gradient(135deg, #f37737, #f5a623);
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .td-apply-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(243, 119, 55, 0.35);
        }

        /* ── Form ── */
        .td-form-box {
          background: #f8f9fa;
          padding: 40px 44px;
          border-radius: 20px;
          margin-top: 20px;
          border: 1px solid rgba(0,0,0,0.04);
        }
        .td-form-box h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 6px;
        }
        .td-form-box > p {
          color: #6b7280;
          margin: 0 0 24px;
          font-size: 15px;
        }

        .td-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 24px;
        }
        .td-form-group {
          display: flex;
          flex-direction: column;
        }
        .td-form-full {
          grid-column: 1 / -1;
        }
        .td-form-group label {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 5px;
        }
        .td-form-group input,
        .td-form-group select,
        .td-form-group textarea {
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s ease;
          background: #ffffff;
          font-family: inherit;
          width: 100%;
        }
        .td-form-group input:focus,
        .td-form-group select:focus,
        .td-form-group textarea:focus {
          outline: none;
          border-color: #f37737;
          box-shadow: 0 0 0 4px rgba(243, 119, 55, 0.10);
        }
        .td-form-group textarea {
          min-height: 120px;
          resize: vertical;
        }
        .td-form-group input::placeholder,
        .td-form-group textarea::placeholder {
          color: #9ca3af;
        }

        .td-form-submit {
          text-align: center;
          margin-top: 28px;
        }
        .td-submit-btn {
          padding: 14px 56px;
          background: linear-gradient(135deg, #f37737, #f5a623);
          color: white;
          border: none;
          border-radius: 40px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }
        .td-submit-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 10px 35px rgba(243, 119, 55, 0.35);
        }

        /* ── Toast ── */
        .td-toast {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: #1a1a2e;
          color: white;
          padding: 16px 28px;
          border-radius: 14px;
          font-weight: 500;
          font-size: 15px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.2);
          animation: slideIn 0.4s ease, fadeOut 0.4s ease 3.2s forwards;
          z-index: 999;
          border-left: 4px solid #22c55e;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeOut {
          to { opacity: 0; transform: translateX(40px); }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .td-form-grid {
            grid-template-columns: 1fr;
          }
          .td-job-card {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .td-job-right {
            margin-left: 0;
          }
          .td-apply-btn {
            width: 100%;
            text-align: center;
          }
          .td-form-box {
            padding: 28px 20px;
          }
          .td-reasons {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .td-reasons {
            grid-template-columns: 1fr;
          }
          .td-hero {
            min-height: 300px;
          }
          .td-job-meta {
            flex-direction: column;
            gap: 4px;
          }
          .td-tag {
            display: inline-block;
          }
        }
      `}</style>

      <div className="td-wrapper">
        {/* ── Hero ── */}
        <div className="td-hero">
          <div className="td-hero-bg" style={{ backgroundImage: `url(${bg})` }} />
          <div className="td-hero-overlay" />
          <div className="td-hero-content">
            <div className="td-hero-badge">🌟 Đang tuyển dụng</div>
            <h1>Cơ hội nghề nghiệp</h1>
            <p>Gia nhập đội ngũ của chúng tôi — nơi điện ảnh gặp gỡ đam mê</p>
          </div>
        </div>

        <div className="td-inner">
          {/* ── Lý do gia nhập ── */}
          <h2 className="td-section-title">
            <span>✦</span> Tại sao nên gia nhập chúng tôi?
          </h2>
          <div className="td-reasons">
            {REASONS.map((r, i) => (
              <div key={i} className="td-reason-card">
                <span className="td-reason-icon">{r.icon}</span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Vị trí tuyển dụng ── */}
          <h2 className="td-section-title">
            <span>✦</span> Vị trí đang tuyển
          </h2>
          <div className="td-jobs">
            {JOBS.map((job) => (
              <div key={job.id} className="td-job-card" onClick={scrollToForm}>
                <div className="td-job-left">
                  <p className="td-job-title">{job.title}</p>
                  <div className="td-job-meta">
                    <span className="td-tag td-tag-dept">🏢 {job.dept}</span>
                    <span className="td-tag td-tag-type">⏰ {job.type}</span>
                    <span className="td-tag td-tag-location">📍 {job.location}</span>
                    <span className="td-tag td-tag-exp">🎯 {job.exp}</span>
                  </div>
                </div>
                <div className="td-job-right">
                  <button
                    className="td-apply-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToForm();
                    }}
                  >
                    Ứng tuyển ngay
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Form ứng tuyển ── */}
          <div id="td-form-section">
            <h2 className="td-section-title">
              <span>✦</span> Gửi hồ sơ ứng tuyển
            </h2>
            <div className="td-form-box">
              <h3>Điền thông tin của bạn</h3>
              <p>Chúng tôi sẽ liên hệ lại trong vòng 3 – 5 ngày làm việc.</p>

              <form onSubmit={handleSubmit}>
                <div className="td-form-grid">
                  <div className="td-form-group">
                    <label>Họ và tên *</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Nguyễn Văn A"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="td-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="td-form-group">
                    <label>Số điện thoại *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="09xxxxxxxx"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="td-form-group">
                    <label>Vị trí ứng tuyển *</label>
                    <select name="position" value={form.position} onChange={handleChange} required>
                      <option value="">-- Chọn vị trí --</option>
                      {JOBS.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="td-form-group">
                    <label>Kinh nghiệm làm việc</label>
                    <select name="experience" value={form.experience} onChange={handleChange}>
                      <option value="">-- Chọn kinh nghiệm --</option>
                      <option value="none">Chưa có kinh nghiệm</option>
                      <option value="under1">Dưới 1 năm</option>
                      <option value="1to3">1 – 3 năm</option>
                      <option value="3to5">3 – 5 năm</option>
                      <option value="over5">Trên 5 năm</option>
                    </select>
                  </div>

                  <div className="td-form-group td-form-full">
                    <label>Giới thiệu bản thân</label>
                    <textarea
                      name="message"
                      placeholder="Chia sẻ thêm về bản thân, kỹ năng và lý do bạn muốn gia nhập chúng tôi..."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="td-form-submit">
                  <button type="submit" className="td-submit-btn">
                    🚀 Gửi hồ sơ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ── Toast thông báo ── */}
        {toast && (
          <div className="td-toast">✅ Hồ sơ đã được gửi thành công! Chúng tôi sẽ liên hệ sớm.</div>
        )}
      </div>
    </>
  );
}
