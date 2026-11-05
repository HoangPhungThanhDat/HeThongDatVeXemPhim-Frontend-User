// src/features/phim/hooks/useTrailerModal.js

import { useState, useEffect } from 'react';
import { getYouTubeEmbedUrl } from '../utils/trailerUtils';

export function useTrailerModal() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState('');

  const openTrailer = (trailerUrl) => {
    // Kiểm tra trailerUrl hợp lệ
    if (!trailerUrl || typeof trailerUrl !== 'string' || trailerUrl.trim() === '') {
      console.warn('Trailer URL is empty or invalid:', trailerUrl);
      alert('Không có trailer cho phim này.');
      return;
    }

    console.log('🔍 Original trailer URL:', trailerUrl);
    console.log('🔍 Type of trailer URL:', typeof trailerUrl);

    const embedUrl = getYouTubeEmbedUrl(trailerUrl);
    console.log('🔍 Embed URL after conversion:', embedUrl);

    if (embedUrl) {
      setSelectedTrailer(embedUrl);
      setShowModal(true);
      document.body.style.overflow = 'hidden';
      console.log('✅ Modal opened with embed URL:', embedUrl);
    } else {
      console.error('❌ Invalid trailer URL:', trailerUrl);
      alert('Không thể phát trailer. URL không hợp lệ.');
    }
  };

  const closeTrailer = () => {
    setShowModal(false);
    setSelectedTrailer('');
    document.body.style.overflow = 'auto';
  };

  // Đóng modal khi nhấn ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showModal) {
        closeTrailer();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showModal]);

  return {
    showModal,
    selectedTrailer,
    openTrailer,
    closeTrailer,
  };
}
