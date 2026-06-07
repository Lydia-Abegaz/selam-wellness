export default function TibebPattern() {
  return (
    <svg
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.05,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="tibeb"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          {/* Diamond cross motif — Tibeb signature */}
          <rect x="18" y="2"  width="4" height="4" fill="#2C1810" transform="rotate(45 20 4)" />
          <rect x="18" y="34" width="4" height="4" fill="#2C1810" transform="rotate(45 20 36)" />
          <rect x="2"  y="18" width="4" height="4" fill="#2C1810" transform="rotate(45 4 20)" />
          <rect x="34" y="18" width="4" height="4" fill="#2C1810" transform="rotate(45 36 20)" />
          <line x1="20" y1="0"  x2="20" y2="40" stroke="#2C1810" strokeWidth="0.5" opacity="0.3" />
          <line x1="0"  y1="20" x2="40" y2="20" stroke="#2C1810" strokeWidth="0.5" opacity="0.3" />
          {/* Cross stitch detail */}
          <rect x="17" y="17" width="6" height="6" fill="none" stroke="#2C1810" strokeWidth="0.3" transform="rotate(45 20 20)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tibeb)" />
    </svg>
  );
}
