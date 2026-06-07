import { motion } from 'framer-motion';

export default function Card({
  children,
  variant = 'default',
  onClick,
  style: customStyle = {},
  animate = true,
  index = 0,
  ...props
}) {
  const variantStyles = {
    default: {
      background: 'var(--color-surface-container-lowest)',
      border: '1px solid var(--color-outline-variant)',
    },
    rose: {
      background: 'var(--color-primary-container)',
      border: '1px solid rgba(189,82,45,0.15)',
    },
    terracotta: {
      background: 'linear-gradient(135deg, var(--color-primary) 0%, #D4734E 100%)',
      border: 'none',
      color: '#FFFFFF',
    },
    gold: {
      background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-gold-soft) 100%)',
      border: 'none',
      color: 'var(--color-coffee)',
    },
    parchment: {
      background: 'var(--color-surface-container-low)',
      border: '1px solid var(--color-outline-variant)',
    },
    surface: {
      background: 'var(--color-surface-container)',
      border: '1px solid var(--color-outline-variant)',
    },
  };

  const v = variantStyles[variant] || variantStyles.default;

  const Component = animate ? motion.div : 'div';
  const animateProps = animate
    ? {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: index * 0.08, duration: 0.3, ease: 'easeOut' },
        whileTap: onClick ? { scale: 0.98 } : undefined,
      }
    : {};

  return (
    <Component
      onClick={onClick}
      style={{
        ...v,
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-md)',
        boxShadow: 'var(--shadow-card)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        ...customStyle,
      }}
      {...animateProps}
      {...props}
    >
      {/* Tibeb strip for terracotta/featured cards */}
      {(variant === 'terracotta') && (
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '3px',
          background: 'rgba(255,255,255,0.25)',
        }} />
      )}
      {children}
    </Component>
  );
}

