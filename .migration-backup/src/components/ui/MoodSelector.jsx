import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOODS } from '../../design-system/tokens';

export default function MoodSelector({ onSelect, selected }) {
  const [activeMood, setActiveMood] = useState(selected || null);

  const handleSelect = (index) => {
    setActiveMood(index);
    onSelect?.(MOODS[index]);
  };

  return (
    <div style={{
      display: 'flex',
      gap: 'var(--space-sm)',
      justifyContent: 'center',
      padding: 'var(--space-md) 0',
    }}>
      {MOODS.map((mood, i) => (
        <motion.button
          key={i}
          whileTap={{ scale: 0.9 }}
          animate={activeMood === i ? { scale: 1.15 } : { scale: 1 }}
          onClick={() => handleSelect(i)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: activeMood === i
              ? 'rgba(193, 68, 14, 0.12)'
              : 'transparent',
            border: activeMood === i
              ? '2px solid var(--color-terracotta)'
              : '2px solid transparent',
            borderRadius: 'var(--radius-md)',
            padding: '10px 12px',
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
          }}
        >
          <span style={{ fontSize: '28px', lineHeight: 1 }}>{mood.emoji}</span>
          <span style={{
            fontSize: '10px',
            fontFamily: 'var(--font-body)',
            color: activeMood === i
              ? 'var(--color-terracotta)'
              : 'var(--color-charcoal-muted)',
            fontWeight: activeMood === i ? '600' : '400',
          }}>
            {mood.amharic}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
