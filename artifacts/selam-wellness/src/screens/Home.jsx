import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockPosts } from '../data/mockPosts';
import { mockCircles } from '../data/mockCircles';
import { mockExperiences } from '../data/mockExperiences';

const BENTO = [
  { label: 'Circles',    icon: '👥', bg: 'var(--color-surface-container-high)',  color: 'var(--color-primary)',                  id: 'circles'     },
  { label: 'Self-Care',  icon: '🌿', bg: 'var(--color-surface-container-low)',   color: 'var(--color-tertiary)',                 id: 'self-care'   },
  { label: "Women's",    icon: '🌙', bg: 'var(--color-primary-fixed)',            color: 'var(--color-on-primary-fixed-variant)', id: 'womens'      },
  { label: 'Bookings',   icon: '📅', bg: 'var(--color-secondary-fixed)',          color: 'var(--color-on-secondary-fixed)',        id: 'experiences' },
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

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,248,246,0.90)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(222,192,183,0.30)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '-0.01em' }}>Selam Wellness</span>
          <div style={{ display: 'flex', gap: 32 }}>
            {[['Circles','circles'], ['Self-Care','self-care'], ["Women's",'womens'], ['Booking','experiences']].map(([l,id]) => (
              <button key={id} onClick={() => navigate(id)} style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 500, color: 'var(--color-on-surface-variant)', cursor: 'pointer' }}>{l}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => navigate('notifications')} style={{ background: 'none', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: 18 }}>🔔</button>
            <button onClick={() => navigate('profile')} style={{ background: 'none', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: 18 }}>👤</button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 1140, margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Welcome */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,40px)', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
            Selam, {name} (ሰላም)
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-surface-container)', padding: '10px 18px', borderRadius: 14, border: '1px solid rgba(222,192,183,0.25)' }}>
            <span>🌱</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-primary-container)' }}>12-day streak</span>
          </div>
        </header>

        {/* Bento */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 48 }}>
          {BENTO.map((b, i) => (
            <motion.button key={i} whileHover={{ translateY: -3 }} whileTap={{ scale: 0.97 }} onClick={() => navigate(b.id)}
              style={{ position: 'relative', overflow: 'hidden', background: b.bg, borderRadius: 20, padding: '20px', aspectRatio: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{b.icon}</div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: b.color }}>{b.label}</span>
              <div style={{ position: 'absolute', right: -16, bottom: -16, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', pointerEvents: 'none' }} />
            </motion.button>
          ))}
        </section>

        {/* 2-col */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40 }}>

          {/* LEFT */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--color-primary)' }}>Daily Ritual</h2>
            </div>

            {/* Ritual card */}
            <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(222,192,183,0.25)', marginBottom: 16 }}>
              <div className="tibeb-border" style={{ height: 5, width: '100%' }} />
              <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center' }}>
                <div style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '16/10', background: 'linear-gradient(135deg, var(--color-surface-container-high), var(--color-surface-dim))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>☕</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Mindfulness</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 20 }}>Coffee Ceremony Meditation</h3>
                  <motion.button whileHover={{ translateY: -1 }} whileTap={{ scale: 0.97 }}
                    style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    ▶ Begin Session
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Mini action cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 36 }}>
              {[
                { icon: '📖', title: 'Journal',      onClick: () => navigate('mood') },
                { icon: '🌱', title: 'Walking Peace', onClick: () => navigate('self-care') },
              ].map((c, i) => (
                <motion.button key={i} whileHover={{ translateY: -2 }} whileTap={{ scale: 0.97 }} onClick={c.onClick}
                  style={{ background: 'var(--color-surface-container-low)', border: '1px solid rgba(222,192,183,0.25)', borderRadius: 16, padding: '16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{c.icon}</div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)' }}>{c.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Circles row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--color-on-surface)' }}>Your Circles</h2>
              <button onClick={() => navigate('circles')} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: 'var(--color-tertiary)', cursor: 'pointer' }}>See all →</button>
            </div>
            <div className="no-scrollbar" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
              {circles.slice(0, 5).map((c, i) => (
                <motion.button key={c.id || i} whileHover={{ translateY: -2 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('circle-feed', { id: c.id })}
                  style={{ flexShrink: 0, background: '#fff', border: '1px solid rgba(222,192,183,0.30)', borderRadius: 16, padding: '14px 18px', minWidth: 140, cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{c.emoji || '👥'}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-on-surface-variant)' }}>{c.memberCount || c.members || '—'} members</div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* RIGHT: Pulse */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--color-primary)' }}>Pulse</h2>
              <button onClick={() => navigate('circles')} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: 'var(--color-tertiary)', cursor: 'pointer' }}>View All</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {posts.slice(0, 3).map((p, i) => (
                <motion.div key={p.id || i} whileHover={{ translateX: 2 }}
                  style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid rgba(222,192,183,0.25)', cursor: 'pointer' }}
                  onClick={() => navigate('circles')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: i === 0 ? 'var(--color-surface-container)' : i === 1 ? 'var(--color-tertiary-fixed)' : 'var(--color-secondary-fixed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--color-primary)', flexShrink: 0 }}>
                      {(p.author?.name || p.circleId || 'A')[0]}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)' }}>{p.author?.name || p.circleId || 'Community'}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--color-on-surface-variant)', lineHeight: 1.5, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    "{p.content}"
                  </p>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['🤍', '🌱', '🙏'].map(r => (
                      <span key={r} style={{ fontSize: 12, background: 'var(--color-surface-container-low)', padding: '2px 8px', borderRadius: 999 }}>{r}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate('circles')}
              style={{ width: '100%', marginTop: 12, padding: '13px 0', border: '2px dashed var(--color-outline-variant)', borderRadius: 16, background: 'transparent', color: 'var(--color-on-surface-variant)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              + Start a New Circle
            </motion.button>

            {experiences[0] && (
              <div style={{ marginTop: 28 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 10 }}>Experiences</h3>
                <motion.div whileHover={{ translateY: -3 }} style={{ background: 'var(--color-surface-container)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => navigate('experience', { id: experiences[0]?.id })}>
                  <div style={{ height: 100, background: 'linear-gradient(135deg, var(--color-surface-container-high), var(--color-surface-dim))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>🏔️</div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: 12, color: 'var(--color-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{experiences[0].category || 'Wellness'}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 3 }}>{experiences[0].name || experiences[0].title}</div>
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
