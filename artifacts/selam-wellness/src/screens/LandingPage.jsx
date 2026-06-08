import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const NAV_LINKS = [
  { label: 'Circles',   id: 'circles' },
  { label: "Women's",   id: 'womens' },
  { label: 'Events',    id: 'events' },
  { label: 'Growth',    id: 'growth' },
];

const TICKER = ['Circles', 'Self-Care', "Women's Health", 'Retreats', 'Mindfulness', 'Idir Spirit', 'Mahber', 'Growth', 'Community', 'Buna Ritual'];

function Ticker() {
  return (
    <div style={{ overflow: 'hidden', background: 'var(--color-secondary-container)', padding: '14px 0', borderTop: '1px solid rgba(120,90,0,0.12)', borderBottom: '1px solid rgba(120,90,0,0.12)' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', whiteSpace: 'nowrap' }}
      >
        {[...TICKER, ...TICKER].map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 16, paddingRight: 48, fontSize: 12, fontWeight: 700, color: 'var(--color-on-secondary-container)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {item}
            <span style={{ fontSize: 5, color: 'var(--color-primary)', opacity: 0.7 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function LandingPage({ navigate }) {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 700], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', fontFamily: 'var(--font-body)', overflowX: 'hidden' }}>

      {/* ── Nav ── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div style={{ padding: '0 40px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            Selam Wellness
          </span>
          <nav style={{ display: 'flex', gap: 36 }}>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => navigate(l.id)}
                style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.80)', cursor: 'pointer', padding: 0, textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.80)'}
              >{l.label}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => navigate('login')} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.22)', padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 500, color: '#fff', cursor: 'pointer' }}>
              Sign in
            </button>
            <button onClick={() => navigate('register')} style={{ background: '#fff', border: 'none', padding: '9px 22px', borderRadius: 999, fontSize: 13, fontWeight: 700, color: 'var(--color-primary)', cursor: 'pointer' }}>
              Join Free
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>

        <motion.div style={{ y: heroImgY, position: 'absolute', inset: '-15% 0 -15% 0', zIndex: 0 }}>
          <img src="/coffee-fire.png" alt="Ethiopian coffee ceremony" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        </motion.div>

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,6,3,0.55) 0%, rgba(15,6,3,0.20) 35%, rgba(15,6,3,0.70) 70%, rgba(15,6,3,0.92) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(0deg, rgba(253,199,63,1) 0px, rgba(253,199,63,1) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(253,199,63,1) 0px, rgba(253,199,63,1) 1px, transparent 1px, transparent 48px)', pointerEvents: 'none' }} />

        {/* Floating badge */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
          style={{ position: 'absolute', top: 96, right: 40, zIndex: 5, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(253,199,63,0.10)', backdropFilter: 'blur(12px)', border: '1px solid rgba(253,199,63,0.28)', borderRadius: 18, padding: '12px 18px' }}>
          <span style={{ fontSize: 18 }}>🕯️</span>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Coffee Ceremony</div>
        </motion.div>

        {/* Headline */}
        <motion.div style={{ opacity: heroOpacity, position: 'relative', zIndex: 3, padding: '0 40px 0' }}>
          <motion.h1 initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(64px, 10vw, 148px)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.04em', color: '#fff', margin: 0 }}>
            Find your
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', marginBottom: 0 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(64px, 10vw, 148px)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.04em', fontStyle: 'italic', color: 'var(--color-secondary-container)', margin: 0 }}>
              Selam.
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 10 }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('register')}
                style={{ height: 54, padding: '0 36px', background: '#fff', color: 'var(--color-primary)', border: 'none', borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                Join Free
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('circles')}
                style={{ height: 54, padding: '0 32px', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.22)', borderRadius: 999, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                Explore →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.6 }}
          style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'stretch', borderTop: '1px solid rgba(255,255,255,0.09)', marginTop: 52 }}>
          {[
            { n: '12k+', label: 'Members' },
            { n: '48',   label: 'Circles' },
            { n: '4',    label: 'Pillars' },
            { n: '∞',    label: 'Community' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: '28px 40px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.09)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,40px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{s.n}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── PILLARS BENTO ── */}
      <section style={{ padding: '80px 40px', background: 'var(--color-background)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 700, color: 'var(--color-on-surface)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              Four pillars<br />of peace.
            </h2>
            <button onClick={() => navigate('home')} style={{ background: 'none', border: '1.5px solid var(--color-outline-variant)', padding: '12px 28px', borderRadius: 999, fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)', cursor: 'pointer' }}>
              Enter →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridTemplateRows: '240px 240px', gap: 16 }}>

            {/* Circles */}
            <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('circles')}
              style={{ gridColumn: '1 / 3', gridRow: '1 / 3', background: 'var(--color-primary)', borderRadius: 28, border: 'none', cursor: 'pointer', padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: -40, right: -40, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: 'repeating-linear-gradient(90deg, var(--color-secondary-container) 0px, var(--color-secondary-container) 10px, transparent 10px, transparent 18px)', opacity: 0.5 }} />
              <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>👥</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>Circles</div>
            </motion.button>

            {/* Self-Care */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('self-care')}
              style={{ gridColumn: '3 / 4', gridRow: '1 / 2', background: 'var(--color-secondary-fixed)', borderRadius: 24, border: 'none', cursor: 'pointer', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0px, transparent 8px, rgba(120,90,0,1) 8px, rgba(120,90,0,1) 9px)', pointerEvents: 'none' }} />
              <div style={{ fontSize: 28 }}>🌿</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-on-secondary-fixed)', letterSpacing: '-0.02em' }}>Self-Care</div>
            </motion.button>

            {/* Experiences */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('experiences')}
              style={{ gridColumn: '4 / 5', gridRow: '1 / 3', borderRadius: 24, border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', textAlign: 'left', overflow: 'hidden', position: 'relative' }}>
              <img src="/kuriftu-spa.png" alt="Kuriftu Resort Spa" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,6,3,0.90) 0%, rgba(15,6,3,0.30) 50%, transparent 100%)' }} />
              <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Experiences</div>
              </div>
            </motion.button>

            {/* Women's */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('womens')}
              style={{ gridColumn: '3 / 4', gridRow: '2 / 3', background: 'var(--color-primary-fixed)', borderRadius: 24, border: 'none', cursor: 'pointer', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
              <div style={{ fontSize: 28 }}>🌙</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-on-primary-fixed)', letterSpacing: '-0.02em' }}>Women's</div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── SPLIT: jebena/herbs photo ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 480 }}>

        {/* Left — dark */}
        <div style={{ background: 'var(--color-on-surface)', padding: '72px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'repeating-linear-gradient(90deg, var(--color-secondary-container) 0px, var(--color-secondary-container) 12px, transparent 12px, transparent 20px)' }} />
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(253,199,63,0.10)', border: '1px solid rgba(253,199,63,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>⚗️</div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,3.5vw,50px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 32 }}>
              Rooted in<br />
              <em style={{ color: 'var(--color-secondary-container)', fontStyle: 'italic' }}>Mahber.</em>
            </h2>
            <button onClick={() => navigate('circles')} style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', padding: '13px 28px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Join a Circle →
            </button>
          </div>
        </div>

        {/* Right — photo only */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 440 }}>
          <img src="/jebena-herbs.png" alt="Ethiopian jebena and herbs" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,6,3,0.35) 0%, transparent 50%)' }} />
        </div>
      </section>

      {/* ── FEATURE ROW ── */}
      <section style={{ padding: '80px 40px', background: 'var(--color-surface-container-low)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { icon: '🌙', title: "Women's Haven", id: 'womens', bg: 'var(--color-primary-fixed)', fg: 'var(--color-on-primary-fixed)' },
            { icon: '📖', title: 'Growth',        id: 'growth', bg: 'var(--color-tertiary-fixed)', fg: 'var(--color-on-tertiary-fixed)' },
            { icon: '🗓️', title: 'Events',        id: 'events', bg: 'var(--color-secondary-fixed)', fg: 'var(--color-on-secondary-fixed)' },
          ].map((f, i) => (
            <motion.button key={i} whileHover={{ translateY: -4 }} whileTap={{ scale: 0.97 }} onClick={() => navigate(f.id)}
              style={{ background: f.bg, borderRadius: 24, border: 'none', padding: '36px 32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(0,0,0,0.05)', pointerEvents: 'none' }} />
              <span style={{ fontSize: 32 }}>{f.icon}</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: f.fg }}>{f.title}</div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '100px 40px', background: 'var(--color-background)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: 'var(--color-on-surface)', marginBottom: 48 }}>
            Your peace<br />starts{' '}
            <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>here.</em>
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button whileHover={{ translateY: -3 }} whileTap={{ scale: 0.96 }} onClick={() => navigate('register')}
              style={{ height: 60, padding: '0 48px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 999, fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 28px rgba(157,58,23,0.28)' }}>
              Join Free
            </motion.button>
            <motion.button whileHover={{ translateY: -3 }} whileTap={{ scale: 0.96 }} onClick={() => navigate('experiences')}
              style={{ height: 60, padding: '0 48px', background: 'transparent', color: 'var(--color-on-surface)', border: '2px solid rgba(67,52,46,0.20)', borderRadius: 999, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
              Book a Session
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: 'var(--color-on-surface)', padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#fff' }}>Selam Wellness</span>
          <div style={{ display: 'flex', gap: 28 }}>
            {['Circles', 'Self-Care', 'Booking', 'Privacy', 'Contact'].map(l => (
              <span key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.40)', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)' }}>© 2025 Selam Wellness</span>
        </div>
      </footer>
    </div>
  );
}
