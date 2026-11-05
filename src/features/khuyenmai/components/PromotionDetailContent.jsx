import React from 'react';
import { formatDescription } from '../utils';

export default function PromotionDetailContent({ promotion }) {
  return (
    <div className="single-blog-page" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div className="single-news-item">
        <div className="news-image" style={{ float: 'right' }}>
          <img src={promotion.ImageUrl} style={{ marginTop: '5px' }} alt={promotion.Title} />
        </div>
        <div className="news-text">
          <div className="post-content" style={{ paddingTop: 0 }}>
            <h1
              style={{
                paddingTop: '20px',
                fontSize: '35px',
                textTransform: 'uppercase',
                color: '#f37737',
              }}
            >
              CT U22 RẠP Gấu Phim
            </h1>
            <p>
              <i className="fa fa-clock-o"></i>11-Thg3-2025
            </p>
            <div
              className="fb-share-button"
              data-href="https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html"
              data-layout="button"
              data-size="small"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/sharer/sharer.php?u=https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html"
                className="fb-xfbml-parse-ignore"
              >
                Chia sẻ
              </a>
            </div>
            <p>
              <p style={{ textAlign: 'center' }}>
                <strong>
                  <span style={{ fontSize: '16px' }}>
                    <span style={{ color: '#ff0000' }}>
                      <span
                        style={{
                          fontFamily:
                            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {promotion.Title}
                      </span>
                    </span>
                  </span>
                </strong>
              </p>
              <p style={{ textAlign: 'center' }}>
                <strong>
                  <span style={{ fontSize: '16px' }}>
                    <span style={{ color: '#ff0000' }}>
                      <span
                        style={{
                          fontFamily:
                            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        <img src={promotion.ImageUrl} alt={promotion.Title} />
                      </span>
                    </span>
                  </span>
                </strong>
              </p>
              <div>
                {/* Nội dung chi tiết */}
                {promotion.Description && (
                  <div
                    className="promotion-content"
                    dangerouslySetInnerHTML={{
                      __html: formatDescription(promotion.Description),
                    }}
                  />
                )}
              </div>
              <div>&nbsp;</div>
            </p>
          </div>
        </div>
      </div>
      <div className="clearfix" style={{ marginBottom: '20px' }}></div>
      <a
        href="/lich-chieu"
        style={{
          padding: '10px 30px',
          background: 'linear-gradient(45deg, #f27737, #f0a884)',
          marginTop: '30px',
          borderRadius: '3px',
          color: '#e6e7e9',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        Đặt vé
      </a>
    </div>
  );
}
