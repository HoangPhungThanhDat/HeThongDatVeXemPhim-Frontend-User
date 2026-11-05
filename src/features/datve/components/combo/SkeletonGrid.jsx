export default function SkeletonGrid() {
  return (
    <div className="sn-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="sn-card" style={{ opacity: 0.5 }}>
          <div
            style={{
              width: '100%',
              paddingTop: '65%',
              background: '#2a2825',
              borderRadius: 12,
            }}
          />
          <div className="sn-info">
            <div
              style={{
                height: 16,
                width: '70%',
                background: '#2a2825',
                borderRadius: 6,
                marginBottom: 8,
              }}
            />
            <div
              style={{
                height: 12,
                width: '90%',
                background: '#2a2825',
                borderRadius: 6,
                marginBottom: 16,
              }}
            />
            <div
              style={{
                height: 20,
                width: '40%',
                background: '#2a2825',
                borderRadius: 6,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
