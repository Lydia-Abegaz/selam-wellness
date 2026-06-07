export default function Avatar({ name, size = 40, color, isAnonymous = false, style: customStyle = {} }) {
  const initials = isAnonymous
    ? '👤'
    : name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || '?';

  const bgColor = color || 'var(--color-parchment)';

  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: '50%',
        background: isAnonymous ? 'var(--color-charcoal-muted)' : bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: '600',
        fontSize: size * 0.38,
        color: isAnonymous ? '#FAF3E0' : 'var(--color-coffee)',
        border: `2px solid rgba(44, 24, 16, 0.1)`,
        ...customStyle,
      }}
    >
      {initials}
    </div>
  );
}
