// src/features/datve/components/thanhtoan/constants.js

import momoLogo from '../../../../assets/images/payment/momo.webp';
import vnpayLogo from '../../../../assets/images/payment/vnpay.jpg';
import zalopayLogo from '../../../../assets/images/payment/zalopay.webp';
import cardLogo from '../../../../assets/images/payment/card.jpg';

export const TIMER_DURATION = 4 * 60; // 240 giây
export const SERVICE_FEE = 10000;

export const PAYMENT_METHODS = [
  {
    id: 'momo',
    label: 'MoMo',
    desc: 'Ví điện tử MoMo',
    icon: momoLogo,
    color: '#a2198d',
    bg: '#fdf0fb',
  },
  {
    id: 'vnpay',
    label: 'VNPay',
    desc: 'Cổng thanh toán VNPay',
    icon: vnpayLogo,
    color: '#0063aa',
    bg: '#eef5fc',
  },
  {
    id: 'zalopay',
    label: 'ZaloPay',
    desc: 'Ví ZaloPay',
    icon: zalopayLogo,
    color: '#0068ff',
    bg: '#eef3ff',
  },
  {
    id: 'card',
    label: 'Thẻ ngân hàng',
    desc: 'Visa · Mastercard · JCB',
    icon: cardLogo,
    color: '#1a1917',
    bg: '#f0ede8',
  },
];

export const STEPS = [
  { label: 'Phim' },
  { label: 'Ghế' },
  { label: 'Đồ ăn' },
  { label: 'Thanh toán' },
];
