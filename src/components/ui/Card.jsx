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
      background: 'var(--color-ivory-dark)',
      border: '1px solid rgba(44, 24, 16, 0.06)',
    },
    rose: {
      background: 'var(--color-rose-soft)',
      border: '1px solid rgba(181, 118, 138, 0.15)',
    },
    terracotta: {
      background: 'linear-gradient(135deg, #C1440E 0%, #E8845A 100%)',
      border: 'none',
      color: '#FAF3E0',
    },
    gold: {
      background: 'linear-gradient(135deg, #D4A017 0%, #F0C84A 100%)',
      border: 'none',
      color: 'var(--color-coffee)',
    },
    parchment: {
      background: 'var(--color-parchment)',
      border: '1px solid rgba(44, 24, 16, 0.06)',
    },
  };

  const v = variantStyles[variant] || variantStyles.default;

  const Component = animate ? motion.div : 'div';
  const animateProps = animate
    ? {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: index * 0.08, duration: 0.35, ease: 'easeOut' },
        whileTap: onClick ? { scale: 0.98 } : undefined,
      }
    : {};

  return (
    <Component
      onClick={onClick}
      style={{
        ...v,
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
        boxShadow: 'var(--shadow-card)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        ...customStyle,
      }}
      {...animateProps}
      {...props}
    >
      {children}
    </Component>
  );
}
