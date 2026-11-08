import axiosClient from '../api/axiosClient';

export const thanhToanService = {
  createPaymentUrl: (data) => {
    // data bao gồm: amount, booking_info
    const url = '/payment/create-url';
    return axiosClient.post(url, data);
  },
};