export default function ParticleBurst({ x, y, color, pid }) {
  const items = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * 360;
    const dist = 38 + (i % 3) * 14;
    const tx = Math.cos((angle * Math.PI) / 180) * dist;
    const ty = Math.sin((angle * Math.PI) / 180) * dist;
    const size = 4 + (i % 3) * 3;
    return { tx, ty, size, delay: (i % 4) * 0.03 };
  });

  return (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: it.size,
            height: it.size,
            borderRadius: i % 2 === 0 ? '50%' : '3px',
            background: i % 3 === 1 ? '#1a1917' : color,
            animationName: `pb_${pid}_${i}`,
            animationDuration: '0.65s',
            animationDelay: `${it.delay}s`,
            animationTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
            animationFillMode: 'forwards',
          }}
        />
      ))}
      <style>
        {items
          .map(
            (it, i) =>
              `@keyframes pb_${pid}_${i}{0%{opacity:1;transform:translate(0,0) scale(1) rotate(0deg);}100%{opacity:0;transform:translate(${it.tx}px,${it.ty}px) scale(0) rotate(${i * 36}deg);}}`,
          )
          .join('')}
      </style>
    </div>
  );
}
