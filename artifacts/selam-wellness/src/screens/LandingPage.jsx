import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Circles',   id: 'circles' },
  { label: "Women's",   id: 'womens' },
  { label: 'Events',    id: 'events' },
  { label: 'Growth',    id: 'growth' },
];

const PILLARS = [
  { icon: '👥', label: 'Community',   color: 'var(--color-secondary-container)',  text: 'var(--color-on-secondary-container)', id: 'circles' },
  { icon: '🌿', label: 'Self-Care',   color: 'var(--color-tertiary-container)',   text: 'var(--color-on-tertiary-container)',  id: 'self-care' },
  { icon: '🌙', label: "Women's",     color: 'var(--color-primary-fixed)',        text: 'var(--color-on-primary-fixed)',       id: 'womens' },
  { icon: '✨', label: 'Experiences', color: 'var(--color-secondary)',            text: 'var(--color-on-secondary)',           id: 'experiences' },
];

export default function LandingPage({ navigate }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', fontFamily: 'var(--font-body)', overflowX: 'hidden' }}>

      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,248,246,0.90)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(222,192,183,0.30)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '-0.01em' }}>Selam Wellness</span>
          <nav style={{ display: 'flex', gap: 32 }}>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => navigate(l.id)}
                style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 500, color: 'var(--color-on-surface-variant)', cursor: 'pointer', padding: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-on-surface-variant)'}
              >{l.label}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => navigate('login')} style={{ background: 'none', border: '1.5px solid rgba(157,58,23,0.30)', padding: '9px 22px', borderRadius: 999, fontSize: 13, fontWeight: 500, color: 'var(--color-primary)', cursor: 'pointer' }}>Sign in</button>
            <button onClick={() => navigate('register')} style={{ background: 'var(--color-primary)', border: 'none', padding: '10px 22px', borderRadius: 999, fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Join Free</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '64px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 480, height: 480, borderRadius: '50%', background: 'rgba(253,199,63,0.10)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 999, background: 'var(--color-secondary-fixed)', color: 'var(--color-on-secondary-fixed)', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
              ✦ Peace is a communal journey
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px,5vw,64px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--color-on-surface)', marginBottom: 36 }}>
              Find your <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Selam</em>{' '}
              in the heart of community.
            </h1>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
              <motion.button whileHover={{ translateY: -2 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('register')}
                style={{ height: 52, padding: '0 32px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 20px rgba(157,58,23,0.28)' }}>
                Join the Community
              </motion.button>
              <motion.button whileHover={{ translateY: -2 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('circles')}
                style={{ height: 52, padding: '0 32px', background: 'transparent', color: 'var(--color-primary)', border: '2px solid var(--color-primary)', borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Explore Circles →
              </motion.button>
            </div>
            {/* Launch Partner */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, background: '#fff', borderRadius: 14, padding: '14px 20px', boxShadow: '0 4px 20px rgba(67,52,46,0.09)', border: '1px solid rgba(222,192,183,0.40)' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>✦ Launch Partner: Kuriftu Resort</div>
                <div style={{ fontSize: 13, color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>Kuriftu Lake Spa Day — 1,800 ETB</div>
              </div>
              <button onClick={() => navigate('experiences')} style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Book</button>
            </div>
          </motion.div>

          {/* Orbital hub */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 500 }}>
            {[340, 250, 160].map((r, i) => (
              <div key={i} style={{ position: 'absolute', width: r, height: r, borderRadius: '50%', border: `1px solid rgba(157,58,23,${0.07 + i * 0.04})`, background: i === 2 ? 'rgba(157,58,23,0.04)' : 'transparent', pointerEvents: 'none' }} />
            ))}
            <div className="tibeb-pattern" style={{ position: 'absolute', bottom: 10, right: 10, width: 90, height: 90, borderRadius: 16, border: '3px solid var(--color-background)' }} />
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('home')}
              style={{ position: 'relative', zIndex: 5, width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary-container), var(--color-primary))', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, boxShadow: '0 8px 32px rgba(157,58,23,0.38)', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>
              <span style={{ fontSize: 24 }}>🕯️</span>
              Daily Selam
            </motion.button>
            {[
              { label: '👥 Circles',   angle: 200, r: 195, id: 'circles' },
              { label: "🌙 Women's",  angle: 345, r: 185, id: 'womens' },
              { label: '⛰️ Events',   angle: 20,  r: 210, id: 'events' },
              { label: '🔮 Rituals',  angle: 225, r: 230, id: 'home' },
            ].map(({ label, angle, r, id }) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <motion.button key={id} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => navigate(id)}
                  style={{ position: 'absolute', left: `calc(50% + ${Math.cos(rad) * r}px)`, top: `calc(50% + ${Math.sin(rad) * r}px)`, transform: 'translate(-50%,-50%)', background: 'rgba(255,255,255,0.90)', backdropFilter: 'blur(8px)', border: '1px solid rgba(157,58,23,0.15)', color: 'var(--color-on-surface)', padding: '9px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', zIndex: 4 }}>
                  {label}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ padding: '72px 0', background: 'var(--color-surface-container-low)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, color: 'var(--color-on-surface)', textAlign: 'center', marginBottom: 48 }}>Four Pillars</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {PILLARS.map((p, i) => (
              <motion.button key={i} whileHover={{ translateY: -4 }} whileTap={{ scale: 0.97 }} onClick={() => navigate(p.id)}
                className="glass-card"
                style={{ padding: '36px 24px', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: 'none', cursor: 'pointer' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: p.color, color: p.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 16 }}>
                  {p.icon}
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--color-on-surface)' }}>{p.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '72px 0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <div className="tibeb-pattern" style={{ position: 'relative', borderRadius: 28, background: 'var(--color-secondary-fixed)', padding: '64px 48px', textAlign: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--color-on-secondary-fixed)', marginBottom: 32 }}>Ready to find your Selam?</h2>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                <button onClick={() => navigate('register')} style={{ height: 52, padding: '0 36px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Join Free</button>
                <button onClick={() => navigate('experiences')} style={{ height: 52, padding: '0 36px', background: '#fff', color: 'var(--color-on-surface)', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Book a Session</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--color-surface-container-highest)', borderTop: '1px solid rgba(222,192,183,0.40)', padding: '40px 0 24px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--color-primary)' }}>Selam Wellness</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Circles', 'Self-Care', 'Booking', 'Privacy', 'Contact'].map(l => (
              <span key={l} style={{ fontSize: 13, color: 'var(--color-on-surface-variant)', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', opacity: 0.6 }}>© 2025 Selam Wellness</span>
        </div>
      </footer>
    </div>
  );
}
