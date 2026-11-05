import { TIMER_DURATION } from './constants';

export default function CountdownTimer({ timeLeft }) {
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const pct = timeLeft / TIMER_DURATION;
  const urgent = timeLeft <= 60;
  const expired = timeLeft === 0;
  const circumference = 2 * Math.PI * 15.9;
  const dashOffset = circumference * (1 - pct);

  return (
    <div className={`sn-timer${urgent ? 'urgent' : ''}${expired ? 'expired' : ''}`}>
      <svg className="sn-timer-ring" viewBox="0 0 36 36" aria-hidden="true">
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.15"
        />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 18 18)"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div className="sn-timer-inner">
        <div className="sn-timer-label">{expired ? 'Hết giờ' : 'Còn lại'}</div>
        <div className="sn-timer-time" key={expired ? 'expired' : undefined}>
          {mins}:{secs}
        </div>
      </div>
    </div>
  );
}
