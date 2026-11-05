// src/features/datve/components/thanhtoan/hooks/useTimer.js

import { useState, useEffect, useRef } from 'react';
import { TIMER_DURATION } from '../constants';

export function useTimer() {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const timerRef = useRef(null);

  const resetTimer = () => {
    setTimeLeft(TIMER_DURATION);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  return { timeLeft, resetTimer };
}
