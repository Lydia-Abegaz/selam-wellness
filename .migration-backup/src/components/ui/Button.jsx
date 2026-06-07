import { motion } from 'framer-motion';
import clsx from 'clsx';

const variants = {
  primary: {
    background: 'var(--color-coffee)',
    color: '#FAF3E0',
    border: 'none',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--color-coffee)',
    border: '1.5px solid var(--color-coffee)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-coffee)',
    border: 'none',
  },
  womens: {
    background: 'var(--color-rose-deep)',
    color: '#FAF3E0',
    border: 'none',
  },
  gold: {
    background: 'var(--color-gold)',
    color: 'var(--color-coffee)',
    border: 'none',
  },
  terracotta: {
    background: 'var(--color-terracotta)',
    color: '#FAF3E0',
    border: 'none',
  },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  style: customStyle = {},
  className = '',
  ...props
}) {
  const v = variants[variant] || variants.primary;

  const sizes = {
    sm: { padding: '8px 16px', fontSize: '13px' },
    md: { padding: '12px 24px', fontSize: '15px' },
    lg: { padding: '16px 32px', fontSize: '16px' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={disabled ? undefined : onClick}
      className={className}
      style={{
        ...v,
        ...s,
        width: fullWidth ? '100%' : 'auto',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-body)',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'var(--transition-fast)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        letterSpacing: '0.02em',
        ...customStyle,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
