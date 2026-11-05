// src/features/phim/utils/trailerUtils.js

export const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';

  console.log('Original trailer URL:', url);

  // Nếu là YouTube ID thuần (11 ký tự)
  if (!url.includes('http') && url.length === 11) {
    return `https://www.youtube.com/embed/${url}?autoplay=1&rel=0`;
  }

  // Xử lý các dạng URL YouTube khác
  let videoId = '';

  try {
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/v/')) {
      videoId = url.split('v/')[1]?.split('?')[0];
    }

    // Loại bỏ ký tự không hợp lệ
    if (videoId) {
      videoId = videoId.replace(/[^a-zA-Z0-9_-]/g, '');
    }
  } catch (error) {
    console.error('Error parsing YouTube URL:', error);
  }

  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : '';
  console.log('Embed URL:', embedUrl);

  return embedUrl;
};
