import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Circles',     id: 'circles' },
  { label: "Women's",     id: 'womens' },
  { label: 'Events',      id: 'events' },
  { label: 'Growth',      id: 'growth' },
];

const PILLARS = [
  { icon: '👥', label: 'Circles',     sub: 'Community',    id: 'circles',     span: 'col', bg: 'var(--color-primary)', fg: '#fff' },
  { icon: '🌿', label: 'Self-Care',   sub: 'Rituals',      id: 'self-care',   span: '',    bg: 'var(--color-secondary-fixed)', fg: 'var(--color-on-secondary-fixed)' },
  { icon: '🌙', label: "Women's",     sub: 'Health',       id: 'womens',      span: '',    bg: 'var(--color-primary-fixed)', fg: 'var(--color-on-primary-fixed)' },
  { icon: '⛰️', label: 'Experiences', sub: 'Retreats',     id: 'experiences', span: 'col', bg: 'var(--color-tertiary-container)', fg: '#fff' },
];

const TICKER = ['Circles', 'Self-Care', "Women's Health", 'Retreats', 'Mindfulness', 'Idir Spirit', 'Mahber', 'Growth', 'Community', 'Buna Ritual'];

function Ticker() {
  return (
    <div style={{ overflow: 'hidden', background: 'var(--color-secondary-container)', padding: '14px 0', borderTop: '1px solid rgba(120,90,0,0.12)', borderBottom: '1px solid rgba(120,90,0,0.12)' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap' }}
      >
        {[...TICKER, ...TICKER].map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 16, paddingRight: 48, fontSize: 13, fontWeight: 700, color: 'var(--color-on-secondary-container)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {item}
            <span style={{ fontSize: 6, color: 'var(--color-primary)', opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function LandingPage({ navigate }) {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', fontFamily: 'var(--font-body)', overflowX: 'hidden' }}>

      {/* ── Sticky Nav ── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, mixBlendMode: 'normal' }}>
        <div style={{ maxWidth: '100%', padding: '0 40px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
            Selam Wellness
          </span>
          <nav style={{ display: 'flex', gap: 36 }}>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => navigate(l.id)}
                style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.80)', cursor: 'pointer', padding: 0, letterSpacing: '0.02em', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.80)'}
              >{l.label}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => navigate('login')} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.22)', padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 500, color: '#fff', cursor: 'pointer' }}>
              Sign in
            </button>
            <button onClick={() => navigate('register')} style={{ background: '#fff', border: 'none', padding: '9px 22px', borderRadius: 999, fontSize: 13, fontWeight: 700, color: 'var(--color-primary)', cursor: 'pointer' }}>
              Join Free
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', background: 'linear-gradient(160deg, #1a0d08 0%, #3d1a0a 40%, #5c2510 70%, #9d3a17 100%)' }}>

        {/* Tibeb grid overlay */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'repeating-linear-gradient(0deg, rgba(253,199,63,1) 0px, rgba(253,199,63,1) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(253,199,63,1) 0px, rgba(253,199,63,1) 1px, transparent 1px, transparent 40px)', pointerEvents: 'none' }} />

        {/* Gold blob */}
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(253,199,63,0.20) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(157,58,23,0.40) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Badge top-right */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
          style={{ position: 'absolute', top: 110, right: 40, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(253,199,63,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(253,199,63,0.30)', borderRadius: 16, padding: '12px 18px' }}>
          <span style={{ fontSize: 18 }}>🕯️</span>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(253,199,63,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Daily Ritual</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Coffee Ceremony</div>
          </div>
        </motion.div>

        {/* Partner badge */}
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
          style={{ position: 'absolute', top: 200, right: 40, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 16, padding: '12px 18px' }}>
          <span style={{ fontSize: 18 }}>🏔️</span>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Partner</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Kuriftu Resort</div>
            <div style={{ fontSize: 11, color: 'rgba(253,199,63,0.9)', fontWeight: 600 }}>Lake Spa · 1,800 ETB</div>
          </div>
          <button onClick={() => navigate('experiences')} style={{ background: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)', border: 'none', padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Book</button>
        </motion.div>

        {/* BIG HEADLINE */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} transition={{ type: 'spring' }}>
          <div style={{ padding: '0 40px 0 40px', paddingBottom: 0 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--color-secondary-container)' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(253,199,63,0.80)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Peace is a communal journey</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(72px, 11vw, 160px)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.04em', color: '#fff', margin: 0, paddingBottom: 0 }}>
              Find your
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(72px, 11vw, 160px)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.04em', fontStyle: 'italic', color: 'var(--color-secondary-container)', margin: 0 }}>
                Selam.
              </h1>
              {/* Inline circle element */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 16 }}>
                <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('register')}
                  style={{ height: 56, padding: '0 36px', background: '#fff', color: 'var(--color-primary)', border: 'none', borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Join Free
                </motion.button>
                <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('circles')}
                  style={{ height: 56, padding: '0 36px', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.22)', borderRadius: 999, fontSize: 15, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Explore →
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom stat bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'stretch', borderTop: '1px solid rgba(255,255,255,0.09)', marginTop: 48 }}>
          {[
            { n: '12k+', label: 'Members' },
            { n: '48',   label: 'Active Circles' },
            { n: '4',    label: 'Pillars' },
            { n: '∞',    label: 'Community' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: '28px 40px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.09)' : 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{s.n}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, color: 'var(--color-on-surface)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              Four pillars<br />of peace.
            </h2>
            <button onClick={() => navigate('home')} style={{ background: 'none', border: '1.5px solid var(--color-outline-variant)', padding: '12px 28px', borderRadius: 999, fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)', cursor: 'pointer' }}>
              Enter the space →
            </button>
          </div>

          {/* Bento grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridTemplateRows: '240px 240px', gap: 16 }}>

            {/* Circles — tall left */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('circles')}
              style={{ gridColumn: '1 / 3', gridRow: '1 / 3', background: 'var(--color-primary)', borderRadius: 28, border: 'none', cursor: 'pointer', padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: -40, right: -40, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: -30, left: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
              <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>👥</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>Circles</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.60)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Community</div>
              </div>
            </motion.button>

            {/* Self-Care */}
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('self-care')}
              style={{ gridColumn: '3 / 4', gridRow: '1 / 2', background: 'var(--color-secondary-fixed)', borderRadius: 24, border: 'none', cursor: 'pointer', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
              <div style={{ fontSize: 28 }}>🌿</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-on-secondary-fixed)', letterSpacing: '-0.02em' }}>Self-Care</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-on-secondary-fixed-variant)', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 4, opacity: 0.7 }}>Rituals</div>
              </div>
            </motion.button>

            {/* Experiences */}
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('experiences')}
              style={{ gridColumn: '4 / 5', gridRow: '1 / 3', background: 'linear-gradient(160deg, #2d5a42 0%, var(--color-tertiary) 100%)', borderRadius: 24, border: 'none', cursor: 'pointer', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(255,255,255,0.025) 18px, rgba(255,255,255,0.025) 19px)', pointerEvents: 'none' }} />
              <div style={{ fontSize: 28 }}>⛰️</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Experiences</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 4 }}>Retreats</div>
              </div>
            </motion.button>

            {/* Women's */}
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('womens')}
              style={{ gridColumn: '3 / 4', gridRow: '2 / 3', background: 'var(--color-primary-fixed)', borderRadius: 24, border: 'none', cursor: 'pointer', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
              <div style={{ fontSize: 28 }}>🌙</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--color-on-primary-fixed)', letterSpacing: '-0.02em' }}>Women's</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-on-primary-fixed-variant)', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 4, opacity: 0.7 }}>Health</div>
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── SPLIT MANIFESTO ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 420 }}>
        {/* Left — dark */}
        <div style={{ background: 'var(--color-on-surface)', padding: '72px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="tibeb-pattern" style={{ width: 72, height: 72, borderRadius: 16, border: '2px solid rgba(253,199,63,0.30)' }} />
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 32 }}>
              Rooted in<br />
              <em style={{ color: 'var(--color-secondary-container)', fontStyle: 'italic' }}>Mahber.</em>
            </h2>
            <button onClick={() => navigate('circles')} style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', padding: '12px 28px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Join a Circle →
            </button>
          </div>
        </div>

        {/* Right — gold */}
        <div style={{ background: 'var(--color-secondary-fixed)', padding: '72px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 48 }}>☕</span>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 700, color: 'var(--color-on-secondary-fixed)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 32 }}>
              Every cup<br />a moment of peace.
            </h2>
            <button onClick={() => navigate('self-care')} style={{ background: 'var(--color-primary)', border: 'none', color: '#fff', padding: '12px 28px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Start a ritual →
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '100px 40px', background: 'var(--color-background)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: 'var(--color-on-surface)', marginBottom: 48 }}>
            Your peace<br />starts <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>here.</em>
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
              <span key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© 2025 Selam Wellness</span>
        </div>
      </footer>
    </div>
  );
}
