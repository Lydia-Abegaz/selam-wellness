export default function Badge({ children, variant = 'default', style: customStyle = {} }) {
  const variantStyles = {
    default: {
      background: 'var(--color-parchment)',
      color: 'var(--color-coffee)',
    },
    active: {
      background: 'rgba(122, 158, 126, 0.15)',
      color: 'var(--color-sage)',
    },
    women: {
      background: 'rgba(181, 118, 138, 0.15)',
      color: 'var(--color-rose-deep)',
    },
    gold: {
      background: 'rgba(212, 160, 23, 0.15)',
      color: '#B8860B',
    },
    terracotta: {
      background: 'rgba(193, 68, 14, 0.12)',
      color: 'var(--color-terracotta)',
    },
  };

  const v = variantStyles[variant] || variantStyles.default;

  return (
    <span
      style={{
        ...v,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 12px',
        borderRadius: 'var(--radius-full)',
        fontSize: '12px',
        fontWeight: '500',
        fontFamily: 'var(--font-body)',
        whiteSpace: 'nowrap',
        ...customStyle,
      }}
    >
      {children}
    </span>
  );
}
