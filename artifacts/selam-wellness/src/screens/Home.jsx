import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockPosts } from '../data/mockPosts';
import { mockCircles } from '../data/mockCircles';
import { mockExperiences } from '../data/mockExperiences';

const BENTO = [
  { label: 'Circles',    sub: 'Join local kinships',  icon: '👥', bg: 'var(--color-surface-container-high)',   color: 'var(--color-primary)',   id: 'circles'     },
  { label: 'Self-Care',  sub: 'Personal rituals',      icon: '🌿', bg: 'var(--color-surface-container-low)',    color: 'var(--color-tertiary)',  id: 'self-care'   },
  { label: "Women's",    sub: 'Empowered growth',      icon: '🌙', bg: 'var(--color-primary-fixed)',            color: 'var(--color-on-primary-fixed-variant)', id: 'womens' },
  { label: 'Bookings',   sub: 'Schedule a session',    icon: '📅', bg: 'var(--color-secondary-fixed)',          color: 'var(--color-on-secondary-fixed)',        id: 'experiences' },
];

export default function Home({ navigate, user }) {
  const [posts, setPosts]           = useState(mockPosts);
  const [circles, setCircles]       = useState(mockCircles);
  const [experiences, setExperiences] = useState(mockExperiences);

  const name = user?.name?.split(' ')[0] || 'Hana';

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || '';
    fetch(base + '/api/posts').then(r => r.json()).then(d => { if (d?.length) setPosts(d); }).catch(() => {});
    fetch(base + '/api/circles').then(r => r.json()).then(d => { if (d?.length) setCircles(d); }).catch(() => {});
    fetch(base + '/api/experiences').then(r => r.json()).then(d => { if (d?.length) setExperiences(d); }).catch(() => {});
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', fontFamily: 'var(--font-body)' }}>

      {/* ── Sticky Nav ───────────────────────────────────────────────────── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,248,246,0.90)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(222,192,183,0.30)', boxShadow: '0 1px 4px rgba(67,52,46,0.06)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '-0.01em' }}>Selam Wellness</span>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Circles', 'Self-Care', "Women's", 'Booking'].map(l => (
              <button key={l} style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 500, color: 'var(--color-on-surface-variant)', cursor: 'pointer' }}>{l}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'var(--color-on-surface-variant)' }}>🔔</button>
            <button style={{ background: 'none', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'var(--color-on-surface-variant)' }}>👤</button>
          </div>
        </div>
      </nav>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main style={{ maxWidth: 1140, margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* ── Welcome Header ─────────────────────────────────────────────── */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '-0.02em', marginBottom: 6 }}>
              Selam, {name} (ሰላም)
            </h1>
            <p style={{ fontSize: 15, color: 'var(--color-on-surface-variant)', fontStyle: 'italic' }}>
              "Peace is not the absence of conflict, but the presence of community."
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-surface-container)', padding: '10px 18px', borderRadius: 14, border: '1px solid rgba(222,192,183,0.25)' }}>
            <span style={{ fontSize: 18 }}>🌱</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-primary-container)' }}>Daily Streak: 12 Days</span>
          </div>
        </header>

        {/* ── Bento Grid: 4 Pillars ──────────────────────────────────────── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 48 }}>
          {BENTO.map((b, i) => (
            <motion.button key={i} whileHover={{ translateY: -3, boxShadow: '0 8px 24px rgba(67,52,46,0.12)' }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate(b.id)}
              style={{ position: 'relative', overflow: 'hidden', background: b.bg, borderRadius: 20, padding: '20px', aspectRatio: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'box-shadow 0.2s' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                {b.icon}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: b.color, marginBottom: 3 }}>{b.label}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: b.color, opacity: 0.70 }}>{b.sub}</div>
              </div>
              {/* Decorative circle */}
              <div style={{ position: 'absolute', right: -16, bottom: -16, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', pointerEvents: 'none' }} />
            </motion.button>
          ))}
        </section>

        {/* ── Main 2-col grid ────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40 }}>

          {/* ── LEFT: Daily Ritual + Mini Cards ─────────────────────────── */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--color-primary)' }}>Daily Ritual</h2>
              <span style={{ fontSize: 13, color: 'var(--color-on-surface-variant)' }}>Recommended for Morning</span>
            </div>

            {/* Featured Ritual Card */}
            <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(222,192,183,0.25)', boxShadow: '0 2px 12px rgba(67,52,46,0.06)', marginBottom: 16 }}>
              {/* Tibeb stripe */}
              <div className="tibeb-border" style={{ height: 6, width: '100%' }} />
              <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center' }}>
                {/* Image */}
                <div style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '16/10', background: 'linear-gradient(135deg, var(--color-surface-container-high), var(--color-surface-dim))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
                  ☕
                </div>
                {/* Text */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Mindfulness</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 10 }}>Coffee Ceremony Meditation</h3>
                  <p style={{ fontSize: 14, color: 'var(--color-on-surface-variant)', lineHeight: 1.6, marginBottom: 16 }}>
                    Experience the 'Buna' ritual as a slow-brewing meditation. Engage your senses with the aroma of roasting beans and the sound of pouring peace.
                  </p>
                  <motion.button whileHover={{ translateY: -1 }} whileTap={{ scale: 0.97 }}
                    style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    ▶ Begin Guided Session
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Mini cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: '📖', title: 'Journal Entry',  sub: 'Reflect on today\'s gratitude', onClick: () => navigate('mood') },
                { icon: '🌱', title: 'Walking Peace',   sub: '5 min garden breathing',       onClick: () => navigate('self-care') },
              ].map((c, i) => (
                <motion.button key={i} whileHover={{ translateY: -2 }} whileTap={{ scale: 0.97 }} onClick={c.onClick}
                  style={{ background: 'var(--color-surface-container-low)', border: '1px solid rgba(222,192,183,0.25)', borderRadius: 16, padding: '16px', display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer', textAlign: 'left', transition: 'box-shadow 0.2s' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 2px 6px rgba(67,52,46,0.08)', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 3 }}>{c.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-on-surface-variant)' }}>{c.sub}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Circles Scroll ──────────────────────────────────────────────── */}
            <div style={{ marginTop: 36 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--color-on-surface)' }}>Your Circles</h2>
                <button onClick={() => navigate('circles')} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: 'var(--color-tertiary)', cursor: 'pointer' }}>See all →</button>
              </div>
              <div className="no-scrollbar" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
                {circles.slice(0, 5).map((c, i) => (
                  <motion.button key={c.id || i} whileHover={{ translateY: -2 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('circle-feed', { id: c.id })}
                    style={{ flexShrink: 0, background: '#fff', border: '1px solid rgba(222,192,183,0.30)', borderRadius: 16, padding: '14px 18px', minWidth: 150, cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ fontSize: 22, marginBottom: 8 }}>{c.emoji || '👥'}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-on-surface-variant)' }}>{c.memberCount || c.members || '—'} members</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* ── RIGHT: Community Pulse ───────────────────────────────────── */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--color-primary)' }}>Pulse</h2>
              <button onClick={() => navigate('circles')} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: 'var(--color-tertiary)', cursor: 'pointer' }}>View All</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {posts.slice(0, 3).map((p, i) => (
                <motion.div key={p.id || i} whileHover={{ translateX: 3 }}
                  style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid rgba(222,192,183,0.25)', boxShadow: '0 1px 6px rgba(67,52,46,0.05)', cursor: 'pointer', transition: 'border-color 0.2s' }}
                  onClick={() => navigate('circles')}>
                  {/* Author row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: i === 0 ? 'var(--color-surface-container)' : i === 1 ? 'var(--color-tertiary-fixed)' : 'var(--color-secondary-fixed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'var(--color-primary)', flexShrink: 0 }}>
                      {(p.author?.name || p.circleId || 'A')[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)', lineHeight: 1.2 }}>{p.author?.name || p.circleId || 'Community'}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-on-surface-variant)' }}>Active</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--color-on-surface-variant)', lineHeight: 1.55, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    "{p.content}"
                  </p>
                  {/* Reactions */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['🤍', '🌱', '🙏'].map(r => (
                      <span key={r} style={{ fontSize: 12, background: 'var(--color-surface-container-low)', padding: '3px 8px', borderRadius: 999, color: 'var(--color-on-surface-variant)' }}>{r}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Start a circle CTA */}
            <motion.button whileHover={{ background: 'var(--color-surface-container-low)' }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('circles')}
              style={{ width: '100%', marginTop: 14, padding: '14px 0', border: '2px dashed var(--color-outline-variant)', borderRadius: 16, background: 'transparent', color: 'var(--color-on-surface-variant)', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.2s' }}>
              + Start a New Circle
            </motion.button>

            {/* Featured Experience ──────────────────────────────────────── */}
            {experiences[0] && (
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 12 }}>Healing beyond the screen</h3>
                <motion.div whileHover={{ translateY: -3 }}
                  style={{ background: 'var(--color-surface-container)', borderRadius: 18, overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(222,192,183,0.20)' }}
                  onClick={() => navigate('experience', { id: experiences[0]?.id })}>
                  <div style={{ height: 120, background: 'linear-gradient(135deg, var(--color-surface-container-high), var(--color-surface-dim))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🏔️</div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 12, color: 'var(--color-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>{experiences[0].category || 'Wellness'}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 4 }}>{experiences[0].title}</div>
                    <div style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 600 }}>{experiences[0].price || '—'} ETB</div>
                  </div>
                </motion.div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
