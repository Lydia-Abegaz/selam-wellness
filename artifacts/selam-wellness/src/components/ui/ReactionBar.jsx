import { useState } from 'react';
import { motion } from 'framer-motion';
import { REACTIONS } from '../../design-system/tokens';

export default function ReactionBar({ reactions = {}, onReact }) {
  const [localReactions, setLocalReactions] = useState(reactions);
  const [tappedIndex, setTappedIndex] = useState(null);

  const handleReact = (emoji) => {
    setLocalReactions((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));
    setTappedIndex(emoji);
    setTimeout(() => setTappedIndex(null), 300);
    onReact?.(emoji);
  };

  return (
    <div style={{
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
    }}>
      {REACTIONS.map(({ emoji, label }) => {
        const count = localReactions[emoji] || 0;
        const isTapped = tappedIndex === emoji;

        return (
          <motion.button
            key={emoji}
            animate={isTapped ? { scale: [1, 1.4, 1] } : { scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={() => handleReact(emoji)}
            title={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: count > 0 ? 'rgba(44, 24, 16, 0.06)' : 'transparent',
              border: '1px solid rgba(44, 24, 16, 0.08)',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-charcoal-soft)',
              transition: 'var(--transition-fast)',
            }}
          >
            <span>{emoji}</span>
            {count > 0 && (
              <span style={{ fontSize: '12px', fontWeight: '500' }}>{count}</span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
