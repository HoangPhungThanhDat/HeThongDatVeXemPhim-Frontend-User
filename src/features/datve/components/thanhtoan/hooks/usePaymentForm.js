// src/features/datve/components/thanhtoan/hooks/usePaymentForm.js

import { useState } from 'react';
import { getUserInfo } from '../utils';

export function usePaymentForm() {
  const userInfo = getUserInfo();

  const [form, setForm] = useState({
    name: userInfo.fullname || '',
    email: userInfo.email || '',
    phone: userInfo.phone || '',
  });

  const [card, setCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    holder: '',
  });

  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const setCardField = (key, value) => {
    setCard((c) => ({ ...c, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (paymentMethod) => {
    const e = {};
    if (!form.name.trim()) e.name = 'Vui lòng nhập họ tên';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email không hợp lệ';
    if (!form.phone.match(/^(0|\+84)\d{9}$/)) e.phone = 'Số điện thoại không hợp lệ';

    if (paymentMethod === 'card') {
      if (card.number.replace(/\s/g, '').length < 16) e.cardNumber = 'Số thẻ không đủ 16 chữ số';
      if (!card.expiry.match(/^\d{2}\/\d{2}$/)) e.cardExpiry = 'Hạn thẻ không hợp lệ';
      if (card.cvv.length < 3) e.cardCvv = 'CVV không hợp lệ';
      if (!card.holder.trim()) e.cardHolder = 'Vui lòng nhập tên chủ thẻ';
    }

    if (!agreed) e.agreed = 'Vui lòng đồng ý với điều khoản';
    setErrors(e);
    return { isValid: Object.keys(e).length === 0, errors: e };
  };

  return {
    form,
    card,
    errors,
    agreed,
    setAgreed,
    setField,
    setCardField,
    setErrors,
    validate,
    resetForm: () => {
      setForm({ name: '', email: '', phone: '' });
      setCard({ number: '', expiry: '', cvv: '', holder: '' });
      setAgreed(false);
      setErrors({});
    },
  };
}
