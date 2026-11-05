// src/features/datve/components/thanhtoan/Steps.jsx

import React from 'react';
import { STEPS } from './constants';

export default function Steps({ current }) {
  const steps = STEPS.map((s, index) => ({
    ...s,
    state: current > index ? 'done' : current === index ? 'active' : 'idle',
  }));

  return (
    <div className="ck-steps">
      {steps.map((s, i) => (
        <React.Fragment key={s.label}>
          {i > 0 && <div className="ck-step-sep" />}
          <div className="ck-step">
            <div className={`ck-step-n ${s.state}`}>{s.state === 'done' ? '✓' : i + 1}</div>
            <span className={`ck-step-lbl ${s.state}`}>{s.label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
