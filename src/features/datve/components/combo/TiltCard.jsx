import React, { useRef, useCallback } from 'react';

export default function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const glowRef = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-6px) scale(1.02)`;
    el.style.transition = 'transform 0.07s linear';
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(0,0,0,.05) 0%, transparent 65%)`;
    }
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateY(0) scale(1)';
    el.style.transition = 'transform 0.55s cubic-bezier(.22,1,.36,1)';
    if (glowRef.current) glowRef.current.style.background = 'transparent';
  }, []);

  return (
    <div ref={ref} className={className} style={style} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          zIndex: 3,
          pointerEvents: 'none',
          transition: 'background .15s',
        }}
      />
      {children}
    </div>
  );
}
