import { ArrowLeft, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopBar({
  title,
  subtitle,
  showBack = false,
  showBell = false,
  onBack,
  onBell,
  rightElement,
  style: customStyle = {},
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 'var(--space-md)',
      ...customStyle,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
        {showBack && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-coffee)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ArrowLeft size={22} />
          </motion.button>
        )}
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: subtitle ? '20px' : '24px',
            fontWeight: '600',
            color: 'var(--color-coffee)',
            lineHeight: 1.2,
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              fontSize: '12px',
              color: 'var(--color-charcoal-muted)',
              marginTop: '2px',
            }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
        {rightElement}
        {showBell && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBell}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-coffee)',
              padding: '6px',
              position: 'relative',
            }}
          >
            <Bell size={22} />
            {/* Notification dot */}
            <div style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--color-terracotta)',
              border: '2px solid var(--color-ivory)',
            }} />
          </motion.button>
        )}
      </div>
    </div>
  );
}
