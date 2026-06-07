import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Circles',   id: 'circles' },
  { label: "Women's",   id: 'womens' },
  { label: 'Events',    id: 'events' },
  { label: 'Growth',    id: 'growth' },
];

const PILLARS = [
  { icon: '👥', label: 'Community',   color: 'var(--color-secondary-container)',  text: 'var(--color-on-secondary-container)', desc: 'Rediscover the strength of collective support through digital Idir circles.' },
  { icon: '🌿', label: 'Self-Care',   color: 'var(--color-tertiary-container)',   text: 'var(--color-on-tertiary-container)',  desc: 'Daily practices inspired by traditional rituals for the modern mind.' },
  { icon: '🌙', label: "Women's",     color: 'var(--color-primary-fixed)',        text: 'var(--color-on-primary-fixed)',       desc: 'Dedicated spaces for women to share wisdom and nurture sisterhood.' },
  { icon: '✨', label: 'Experiences', color: 'var(--color-secondary)',            text: 'var(--color-on-secondary)',           desc: 'Curated offline gatherings that celebrate heritage and health.' },
];

export default function LandingPage({ navigate }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', fontFamily: 'var(--font-body)', overflowX: 'hidden' }}>

      {/* ── Sticky Nav ─────────────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,248,246,0.90)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(222,192,183,0.30)',
        boxShadow: '0 1px 4px rgba(67,52,46,0.06)',
      }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '-0.01em' }}>
            Selam Wellness
          </span>
          <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => navigate(l.id)} style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 500, color: 'var(--color-on-surface-variant)', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-on-surface-variant)'}
              >{l.label}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => navigate('login')} style={{ background: 'none', border: '1.5px solid rgba(157,58,23,0.30)', padding: '9px 22px', borderRadius: 999, fontSize: 13, fontWeight: 500, color: 'var(--color-primary)', cursor: 'pointer' }}>
              Sign in
            </button>
            <button onClick={() => navigate('register')} style={{ background: 'var(--color-primary)', border: 'none', padding: '10px 22px', borderRadius: 999, fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', boxShadow: '0 4px 14px rgba(157,58,23,0.28)' }}>
              Join Free
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '64px 0 48px', position: 'relative', overflow: 'hidden' }}>
        {/* Soft glow blobs */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 480, height: 480, borderRadius: '50%', background: 'rgba(253,199,63,0.12)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(157,58,23,0.08)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

          {/* Left — Copy */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            {/* Badge */}
            <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 999, background: 'var(--color-secondary-fixed)', color: 'var(--color-on-secondary-fixed)', fontSize: 13, fontWeight: 600, marginBottom: 24, letterSpacing: '0.01em' }}>
              ✦ Peace is a communal journey
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px,5vw,64px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--color-on-surface)', marginBottom: 20 }}>
              Find your{' '}
              <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Selam</em>
              {' '}in the<br />heart of community.
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--color-on-surface-variant)', maxWidth: 460, marginBottom: 36 }}>
              Bridging ancestral Ethiopian wisdom with modern well-being. A space designed for the contemporary digital lifestyle, rooted in the warmth of cultural togetherness.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
              <motion.button whileHover={{ translateY: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('register')}
                style={{ height: 52, padding: '0 32px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 20px rgba(157,58,23,0.30)' }}>
                Join the Community
              </motion.button>
              <motion.button whileHover={{ translateY: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('circles')}
                style={{ height: 52, padding: '0 32px', background: 'transparent', color: 'var(--color-primary)', border: '2px solid var(--color-primary)', borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                Explore Circles →
              </motion.button>
            </div>

            {/* Launch Partner Strip */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, background: '#fff', borderRadius: 14, padding: '14px 20px', boxShadow: '0 4px 20px rgba(67,52,46,0.09)', border: '1px solid rgba(222,192,183,0.40)' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>✦ Launch Partner: Kuriftu Resort</div>
                <div style={{ fontSize: 13, color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>Kuriftu Lake Spa Day — 1,800 ETB</div>
              </div>
              <button onClick={() => navigate('experiences')} style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Book
              </button>
            </div>
          </motion.div>

          {/* Right — Visual hub */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 500 }}>
            {/* Rings */}
            {[340, 250, 160].map((r, i) => (
              <div key={i} style={{ position: 'absolute', width: r, height: r, borderRadius: '50%', border: `1px solid rgba(157,58,23,${0.07 + i * 0.04})`, background: i === 2 ? 'rgba(157,58,23,0.04)' : 'transparent', pointerEvents: 'none' }} />
            ))}
            {/* Tibeb accent block */}
            <div className="tibeb-pattern" style={{ position: 'absolute', bottom: 10, right: 10, width: 100, height: 100, borderRadius: 16, border: '3px solid var(--color-background)', zIndex: 1 }} />
            {/* Gold glow */}
            <div style={{ position: 'absolute', top: 30, left: 30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(253,199,63,0.15)', filter: 'blur(40px)', pointerEvents: 'none' }} />

            {/* Center button */}
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('home')}
              style={{ position: 'relative', zIndex: 5, width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary-container), var(--color-primary))', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, boxShadow: '0 8px 32px rgba(157,58,23,0.38)', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>
              <span style={{ fontSize: 24 }}>🕯️</span>
              Daily Selam
            </motion.button>

            {/* Orbit pills */}
            {[
              { label: '👥 Circles',    angle: 200, r: 195, id: 'circles' },
              { label: '🌙 Women\'s',  angle: 345, r: 185, id: 'womens' },
              { label: '⛰️ Events',    angle: 20,  r: 210, id: 'events' },
              { label: '🔮 Rituals',   angle: 225, r: 230, id: 'home' },
            ].map(({ label, angle, r, id }) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <motion.button key={id} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => navigate(id)}
                  style={{ position: 'absolute', left: `calc(50% + ${Math.cos(rad) * r}px)`, top: `calc(50% + ${Math.sin(rad) * r}px)`, transform: 'translate(-50%,-50%)', background: 'rgba(255,255,255,0.90)', backdropFilter: 'blur(8px)', border: '1px solid rgba(157,58,23,0.15)', color: 'var(--color-on-surface)', padding: '9px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 16px rgba(67,52,46,0.12)', whiteSpace: 'nowrap', zIndex: 4, transition: 'all 0.2s' }}>
                  {label}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Pillars Section ────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'var(--color-surface-container-low)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 56px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 12 }}>The Pillars of Peace</h2>
            <p style={{ fontSize: 16, color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>
              Wellness isn't just an individual pursuit — it's a shared experience built on four foundational strengths.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {PILLARS.map((p, i) => (
              <motion.div key={i} whileHover={{ translateY: -4 }} transition={{ duration: 0.2 }}
                className="glass-card"
                style={{ padding: '32px 24px', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'default' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: p.color, color: p.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>
                  {p.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 10 }}>{p.label}</h3>
                <p style={{ fontSize: 14, color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rooted in Mahber ───────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ background: 'var(--color-surface-container-highest)', borderRadius: 28, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', boxShadow: '0 4px 24px rgba(67,52,46,0.07)' }}>
            {/* Image placeholder */}
            <div style={{ background: 'linear-gradient(135deg, var(--color-surface-container-high), var(--color-surface-dim))', minHeight: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>
              ☕
            </div>
            {/* Copy */}
            <div style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 16 }}>
                Rooted in <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Mahber</em>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--color-on-surface-variant)', lineHeight: 1.7, marginBottom: 24 }}>
                Long before digital networks, we had the <strong style={{ color: 'var(--color-on-surface)' }}>Idir</strong> and <strong style={{ color: 'var(--color-on-surface)' }}>Mahber</strong> — systems of mutual aid and spiritual gathering. Selam Wellness digitizes these ancestral "gojos," creating a modern sanctuary where every member is seen, heard, and supported.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Verified member circles based on shared life experiences.', 'Support systems that mimic the security of an Idir.', 'Culturally sensitive resources and professional guidance.'].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--color-on-surface-variant)' }}>
                    <span style={{ color: 'var(--color-primary)', marginTop: 1 }}>✓</span>{t}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('circles')} style={{ alignSelf: 'flex-start', background: 'var(--color-on-surface)', color: 'var(--color-surface)', border: 'none', padding: '12px 28px', borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Learn about our heritage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <div className="tibeb-pattern" style={{ position: 'relative', borderRadius: 28, background: 'var(--color-secondary-fixed)', padding: '64px 48px', textAlign: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, color: 'var(--color-on-secondary-fixed)', marginBottom: 14 }}>Ready to nurture your peace?</h2>
              <p style={{ fontSize: 17, color: 'var(--color-on-secondary-fixed)', opacity: 0.80, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.65 }}>
                Join thousands of others redefining wellness through the lens of community and heritage.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
                <button onClick={() => navigate('register')} style={{ height: 52, padding: '0 36px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 20px rgba(157,58,23,0.30)' }}>
                  Join the Community
                </button>
                <button onClick={() => navigate('experiences')} style={{ height: 52, padding: '0 36px', background: '#fff', color: 'var(--color-on-surface)', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  Book a Session
                </button>
              </div>
              <p style={{ fontSize: 12, color: 'var(--color-on-secondary-fixed)', opacity: 0.60, letterSpacing: '0.02em' }}>Start your 14-day journey for free. No credit card required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer style={{ background: 'var(--color-surface-container-highest)', borderTop: '1px solid rgba(222,192,183,0.40)', padding: '56px 0 32px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-primary)', marginBottom: 12 }}>Selam Wellness</div>
            <p style={{ fontSize: 14, color: 'var(--color-on-surface-variant)', lineHeight: 1.65, maxWidth: 320, marginBottom: 24 }}>
              Nurturing peace and community through ancestral wisdom and modern wellness practices for the Ethiopian youth.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: 12 }}>Explore</div>
              {['Circles', 'Self-Care', 'Booking'].map(l => (
                <div key={l} style={{ fontSize: 14, color: 'var(--color-on-surface-variant)', marginBottom: 8, cursor: 'pointer' }}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: 12 }}>Legal</div>
              {['Privacy Policy', 'Terms of Service', 'Partner with Us', 'Contact'].map(l => (
                <div key={l} style={{ fontSize: 14, color: 'var(--color-on-surface-variant)', marginBottom: 8, cursor: 'pointer' }}>{l}</div>
              ))}
            </div>
          </div>
          <div style={{ gridColumn: '1 / -1', paddingTop: 24, borderTop: '1px solid rgba(222,192,183,0.30)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 13, color: 'var(--color-on-surface-variant)', opacity: 0.75 }}>© 2025 Selam Wellness. Nurturing Peace & Community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
