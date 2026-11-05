// src/features/datve/components/ghe/hooks/useCountdown.js

import { useState, useEffect } from 'react';
import { TIMER_DURATION } from '../constants';

export function useCountdown(onExpire) {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  return timeLeft;
}
