export default function PageWrapper({ children, style: customStyle = {} }) {
  return (
    <div
      className="no-scrollbar"
      style={{
        padding: 'var(--space-md) var(--space-container-padding)',
        paddingBottom: 'var(--space-2xl)',
        maxWidth: '1140px',
        margin: '0 auto',
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
        zIndex: 1,
        ...customStyle,
      }}
    >
      {children}
    </div>
  );
}

