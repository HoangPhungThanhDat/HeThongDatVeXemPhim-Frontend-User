import React, { useState, useEffect } from "react";
import tintuc1 from "../assets/images/doraemon.jpg";
import tintuc2 from "../assets/images/tham-tu-kien.jpg";
import tintuc3 from "../assets/images/LAT-MAT-8.jpg";
import tintuc4 from "../assets/images/quy-nhap-trang.jpg";
import tintuc5 from "../assets/images/flow.jpg";
import tintuc6 from "../assets/images/nha-gia-tien.jpg";
function DienAnh() {
  return (
    <div>
      <section className="filmoja-news-area section_70">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="news-side-list">
                <div className="single-news-side">
                  <div className="news-side-img">
                    <a href="/tin-tuc/phan-phim-dien-anh-doraemon-44-duoc-khen-hay-nhat-lich-su-1088.html">
                      <img
                        src={tintuc1}
                        alt="phan-phim-dien-anh-doraemon-44-duoc-khen-hay-nhat-lich-su"
                      />
                    </a>
                  </div>
                  <div className="news-side-text">
                    <h4>
                      <a href="/tin-tuc/phan-phim-dien-anh-doraemon-44-duoc-khen-hay-nhat-lich-su-1088.html">
                        Phần phim điện ảnh Doraemon 44 được khen “hay nhất lịch
                        sử”
                      </a>
                    </h4>
                    <div className="post-meta">
                      <p>
                        <a href="#">
                          <i className="fa fa-user"></i>admin
                        </a>
                      </p>
                      <p>
                        <a href="#">
                          <i className="fa fa-tags"></i>13/05/2025
                        </a>
                      </p>
                    </div>
                    <div className="post-content">
                      <p>
                        Phần phim thứ 44 của loạt phim Doraemon 2D với t&#234;n
                        gọi “Nobita v&#224; cuộc phi&#234;u lưu v&#224;o thế
                        giới trong tranh” đ&#227; ...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="news-side-list">
                <div className="single-news-side">
                  <div className="news-side-img">
                    <a href="/tin-tuc/‘tham-tu-kien-ky-an-khong-dau’-co-thuc-hien-phan-2-1087.html">
                      <img
                        src={tintuc2}
                        alt="‘tham-tu-kien-ky-an-khong-dau’-co-thuc-hien-phan-2"
                      />
                    </a>
                  </div>
                  <div className="news-side-text">
                    <h4>
                      <a href="/tin-tuc/‘tham-tu-kien-ky-an-khong-dau’-co-thuc-hien-phan-2-1087.html">
                        ‘Th&#225;m tử Ki&#234;n: Kỳ &#225;n kh&#244;ng đầu’
                        c&#243; thực hiện phần 2?
                      </a>
                    </h4>
                    <div className="post-meta">
                      <p>
                        <a href="#">
                          <i className="fa fa-user"></i>admin
                        </a>
                      </p>
                      <p>
                        <a href="#">
                          <i className="fa fa-tags"></i>13/05/2025
                        </a>
                      </p>
                    </div>
                    <div className="post-content">
                      <p>
                        Sau hơn 10 ng&#224;y c&#244;ng chiếu, &#39;Th&#225;m tử
                        Ki&#234;n: Kỳ &#225;n kh&#244;ng đầu&#39; c&#225;n mốc
                        doanh thu gần 200 tỉ đồng. Với th&#224;nh t&#237;ch ...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="news-side-list">
                <div className="single-news-side">
                  <div className="news-side-img">
                    <a href="/tin-tuc/lat-mat-8-lan-toa-thong-diep-tich-cuc-ve-gia-dinh-1086.html">
                      <img
                        src={tintuc3}
                        alt="lat-mat-8-lan-toa-thong-diep-tich-cuc-ve-gia-dinh"
                      />
                    </a>
                  </div>
                  <div className="news-side-text">
                    <h4>
                      <a href="/tin-tuc/lat-mat-8-lan-toa-thong-diep-tich-cuc-ve-gia-dinh-1086.html">
                        &#39;Lật Mặt 8&#39; lan tỏa th&#244;ng điệp t&#237;ch
                        cực về gia đ&#236;nh
                      </a>
                    </h4>
                    <div className="post-meta">
                      <p>
                        <a href="#">
                          <i className="fa fa-user"></i>admin
                        </a>
                      </p>
                      <p>
                        <a href="#">
                          <i className="fa fa-tags"></i>13/05/2025
                        </a>
                      </p>
                    </div>
                    <div className="post-content">
                      <p>
                        &quot;Lật mặt 8: V&#242;ng tay nắng&quot; đưa kh&#225;n
                        giả v&#224;o h&#224;nh tr&#236;nh tìm v&#234;̀ gia đình
                        của các nh&#226;n v&#226;̣t chính qua g&#243;c n...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="news-side-list">
                <div className="single-news-side">
                  <div className="news-side-img">
                    <a href="/tin-tuc/quy-nhap-trang-phim-kinh-di-lay-cam-hung-tu-cau-chuyen-co-that-tung-trailer-ron-toc-gay-1085.html">
                      <img
                        src={tintuc4}
                        alt="quy-nhap-trang-phim-kinh-di-lay-cam-hung-tu-cau-chuyen-co-that-tung-trailer-ron-toc-gay"
                      />
                    </a>
                  </div>
                  <div className="news-side-text">
                    <h4>
                      <a href="/tin-tuc/quy-nhap-trang-phim-kinh-di-lay-cam-hung-tu-cau-chuyen-co-that-tung-trailer-ron-toc-gay-1085.html">
                        &quot;Quỷ nhập tr&#224;ng&quot; - Phim kinh dị lấy cảm
                        hứng từ c&#226;u chuyện c&#243; thật tung trailer rợn
                        t&#243;c g&#225;y
                      </a>
                    </h4>
                    <div className="post-meta">
                      <p>
                        <a href="#">
                          <i className="fa fa-user"></i>admin
                        </a>
                      </p>
                      <p>
                        <a href="#">
                          <i className="fa fa-tags"></i>26/02/2025
                        </a>
                      </p>
                    </div>
                    <div className="post-content">
                      <p>
                        D&#224;n diễn vi&#234;n thực lực hai miền Nam - Bắc hội
                        trong bom tấn kinh dị đậm chất văn h&#243;a Việt
                        &quot;Quỷ nhập tr&#224;ng&quot;.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="news-side-list">
                <div className="single-news-side">
                  <div className="news-side-img">
                    <a href="/tin-tuc/bo-phim-gay-chan-dong-the-gioi-cong-bo-lich-chieu-tai-viet-nam-1084.html">
                      <img
                        src={tintuc5}
                        alt="bo-phim-gay-chan-dong-the-gioi-cong-bo-lich-chieu-tai-viet-nam"
                      />
                    </a>
                  </div>
                  <div className="news-side-text">
                    <h4>
                      <a href="/tin-tuc/bo-phim-gay-chan-dong-the-gioi-cong-bo-lich-chieu-tai-viet-nam-1084.html">
                        Bộ phim g&#226;y chấn động thế giới c&#244;ng bố lịch
                        chiếu tại Việt Nam
                      </a>
                    </h4>
                    <div className="post-meta">
                      <p>
                        <a href="#">
                          <i className="fa fa-user"></i>admin
                        </a>
                      </p>
                      <p>
                        <a href="#">
                          <i className="fa fa-tags"></i>26/02/2025
                        </a>
                      </p>
                    </div>
                    <div className="post-content">
                      <p>
                        &quot;Flow&quot; (Lạc tr&#244;i) - bộ phim hoạt
                        h&#236;nh g&#226;y chấn động thế giới sẽ ra mắt
                        kh&#225;n giả Việt Nam từ 7/3 tới.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="news-side-list">
                <div className="single-news-side">
                  <div className="news-side-img">
                    <a href="/tin-tuc/nha-gia-tien-chua-lanh-vet-seo-tuoi-tho-1083.html">
                      <img
                        src={tintuc6}
                        alt="nha-gia-tien-chua-lanh-vet-seo-tuoi-tho"
                      />
                    </a>
                  </div>
                  <div className="news-side-text">
                    <h4>
                      <a href="/tin-tuc/nha-gia-tien-chua-lanh-vet-seo-tuoi-tho-1083.html">
                        &#39;Nh&#224; gia ti&#234;n&#39; - chữa l&#224;nh vết
                        sẹo tuổi thơ
                      </a>
                    </h4>
                    <div className="post-meta">
                      <p>
                        <a href="#">
                          <i className="fa fa-user"></i>admin
                        </a>
                      </p>
                      <p>
                        <a href="#">
                          <i className="fa fa-tags"></i>26/02/2025
                        </a>
                      </p>
                    </div>
                    <div className="post-content">
                      <p>
                        Trong phim 18+ &quot;Nh&#224; gia ti&#234;n&quot;,
                        nh&#226;n vật Mỹ Ti&#234;n (Phương Mỹ Chi) vượt nỗi đau
                        bị hắt hủi để h&#224;n gắn m&#226;u thuẫn v...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DienAnh;
