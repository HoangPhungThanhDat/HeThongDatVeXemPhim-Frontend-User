// src/features/phim/index.js

export { default as PhimDangChieuPage } from './pages/PhimDangChieuPage';
export { default as PhimSapChieuPage } from './pages/PhimSapChieuPage';
export { default as ChiTietPhimPage } from './pages/ChiTietPhimPage';

export * from './constants';
export * from './utils/movieUtils';
export * from './utils/trailerUtils';
export * from './utils/showtimeUtils';

export * from './hooks/useChiTietPhim';
export * from './hooks/usePhimDangChieu';
export * from './hooks/usePhimSapChieu';
export * from './hooks/useTrailerModal';
export * from './components/PhimDangChieu';
export * from './components/PhimSapChieu';
export * from './components/ChiTietPhim';
