/**
 * Vitest Configuration
 * Cinema Booking System - Frontend Client
 * 
 * Cấu hình cho việc chạy unit test và integration test
 * 
 * @version 1.0.0
 * @since 2026-09-03
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // ============================================================
  // PLUGINS
  // ============================================================
  plugins: [react()],

  // ============================================================
  // RESOLVE ALIAS (Giống với vite.config.js)
  // ============================================================
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@config': path.resolve(__dirname, './src/config'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@hoc': path.resolve(__dirname, './src/hoc'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  // ============================================================
  // TEST CONFIGURATION
  // ============================================================
  test: {
    // ----- Môi trường test -----
    // jsdom: Giả lập môi trường trình duyệt cho React components
    environment: 'jsdom',
    
    // ----- File test -----
    // Chỉ định các file là test
    include: [
      'src/**/*.{test,spec}.{js,jsx}',
      'tests/**/*.{test,spec}.{js,jsx}',
    ],
    
    // Bỏ qua các file/folder không cần test
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.{git,cache}/**',
    ],
    
    // ----- Global APIs -----
    // Cho phép sử dụng describe, it, expect mà không cần import
    globals: true,
    
    // ----- Coverage (Đo lường mức độ test) -----
    coverage: {
      // Provider cho coverage
      provider: 'v8',
      
      // Các báo cáo xuất ra
      reporter: ['text', 'json', 'html', 'lcov'],
      
      // File báo cáo
      reportsDirectory: './coverage',
      
      // File cần đo coverage
      include: [
        'src/**/*.{js,jsx}',
      ],
      
      // File bỏ qua đo coverage
      exclude: [
        'src/**/*.{test,spec}.{js,jsx}',
        'src/**/index.js',
        'src/**/constants.js',
        'src/**/hangSo.js',
        'src/api/**/*',
        'src/config/**/*',
        'src/constants/**/*',
        'src/lib/**/*',
        'src/theme/**/*',
        'src/main.jsx',
        'src/**/*.stories.{js,jsx}',
      ],
      
      // Ngưỡng coverage (nếu không đạt sẽ báo lỗi)
      thresholds: {
        statements: 70,
        branches: 60,
        functions: 70,
        lines: 70,
      },
    },
    
    // ----- Setup files -----
    // File chạy trước khi test (thiết lập môi trường)
    setupFiles: ['./src/setupTests.js'],
    
    // ----- Mock -----
    // Tự động mock các module bên ngoài
    // mock: true,
    
    // ----- Environment options -----
    environmentOptions: {
      jsdom: {
        // URL giả lập
        url: 'http://localhost:3005',
      },
    },
    
    // ----- Test timeout -----
    testTimeout: 10000, // 10 giây
    
    // ----- Hook timeout -----
    hookTimeout: 10000,
    
    // ----- Threads (chạy song song) -----
    // Chạy test song song để tăng tốc
    threads: true,
    
    // Số lượng thread (mặc định: CPU cores)
    // maxThreads: 4,
    // minThreads: 2,
    
    // ----- Watch mode -----
    watch: false,
    
    // ----- Báo cáo -----
    reporters: ['default', 'html'],
    
    // ----- Output file -----
    outputFile: {
      json: './test-results.json',
      html: './test-report/index.html',
    },
    
    // ----- Bail (dừng khi có lỗi) -----
    bail: 0, // 0 = không dừng, 1 = dừng khi có 1 lỗi
    
    // ----- Retry (chạy lại test bị fail) -----
    retry: 0,
    
    // ----- Max concurrency -----
    maxConcurrency: 5,
    
    // ----- Sequence (thứ tự chạy test) -----
    sequence: {
      // shuffle: false, // Trộn thứ tự test
      // concurrency: 1,
    },
    
    // ----- Cache -----
    cache: {
      dir: './node_modules/.vitest',
    },
    
    // ----- Clear mocks -----
    clearMocks: true,
    
    // ----- Restore mocks -----
    restoreMocks: true,
    
    // ----- Mock timing -----
    // mockTiming: true,
    
    // ----- Globbing -----
    // Chỉ định pattern cho file test
    // testMatch: ['**/*.test.js', '**/*.spec.js'],
    
    // ----- Update snapshots -----
    updateSnapshot: false,
    
    // ----- Diff options -----
    // diff: true,
    
    // ----- CSS -----
    // Bỏ qua CSS khi test
    css: true,
    
    // ----- Transform mode -----
    // transformMode: {
    //   web: [/\.[jt]sx?$/],
    // },
  },
});