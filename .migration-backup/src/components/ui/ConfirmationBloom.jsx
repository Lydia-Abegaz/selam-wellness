import { motion } from 'framer-motion';
import { useMemo } from 'react';

function TibebDiamond({ delay, x, color }) {
  return (
    <motion.div
      initial={{ y: -20, x, opacity: 1, rotate: 0 }}
      animate={{
        y: '100vh',
        opacity: [1, 1, 0],
        rotate: 360,
      }}
      transition={{
        duration: 2,
        delay,
        ease: 'easeIn',
      }}
      style={{
        position: 'absolute',
        top: 0,
        width: '12px',
        height: '12px',
        background: color,
        transform: 'rotate(45deg)',
      }}
    />
  );
}

export default function ConfirmationBloom({ show }) {
  const diamonds = useMemo(() => {
    const colors = ['#2C1810', '#D4A017', '#C1440E', '#7A9E7E', '#B5768A', '#F0C84A'];
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      delay: Math.random() * 0.8,
      x: Math.random() * 100 - 50 + '%',
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Tibeb diamond confetti */}
      {diamonds.map((d) => (
        <TibebDiamond key={d.id} {...d} />
      ))}

      {/* Center bloom */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-lg)',
        pointerEvents: 'auto',
      }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--color-sage)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(122, 158, 126, 0.4)',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FAF3E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
