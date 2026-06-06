export default function PageWrapper({ children, style: customStyle = {} }) {
  return (
    <div
      className="no-scrollbar"
      style={{
        padding: 'var(--space-md)',
        paddingBottom: 'var(--space-3xl)',
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
