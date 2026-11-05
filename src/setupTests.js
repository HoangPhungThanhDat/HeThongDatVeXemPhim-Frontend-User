/**
 * Setup Tests
 * Cinema Booking System - Frontend Client
 * 
 * File này chạy trước khi tất cả các test bắt đầu
 * Dùng để thiết lập môi trường test chung
 * 
 * @version 1.0.0
 * @since 2026-09-03
 */

// ============================================================
// IMPORT THƯ VIỆN
// ============================================================
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// ============================================================
// EXTEND EXPECT WITH JEST-DOM MATCHERS
// ============================================================
expect.extend(matchers);

// ============================================================
// CLEANUP AFTER EACH TEST
// ============================================================
// Tự động cleanup DOM sau mỗi test
afterEach(() => {
  cleanup();
});

// ============================================================
// MOCK GLOBAL OBJECTS (nếu cần)
// ============================================================

// Mock window.matchMedia (cho các component responsive)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver (cho lazy loading)
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// ============================================================
// MOCK LOCAL STORAGE
// ============================================================
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// ============================================================
// CONSOLE ERROR SUPPRESSION (tùy chọn)
// ============================================================
// Bỏ qua các lỗi không quan trọng trong test
// const originalError = console.error;
// console.error = (...args) => {
//   if (/Warning: ReactDOM.render is no longer supported/.test(args[0])) {
//     return;
//   }
//   originalError.call(console, ...args);
// };

console.log('✅ Setup tests completed!');