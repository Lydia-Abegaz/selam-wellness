import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function LandingPage({ navigate }) {
  const [hoveredOrb, setHoveredOrb] = useState(null);

  const orbs = [
    { id: 'circles',     label: 'Circles',   icon: '👥', angle: 190, radius: 180 },
    { id: 'womens',      label: "Women's",   icon: '🌙', angle: 340, radius: 170 },
    { id: 'retreats',    label: 'Retreats',  icon: '⛰️', angle: 10,  radius: 200 },
    { id: 'daily',       label: 'Rituals',   icon: '🔮', angle: 220, radius: 220 },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5EDE0',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)',
    }}>

      {/* Ethiopian Star Background Pattern */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="star-pattern" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
            {/* Ethiopian 8-point star */}
            <g transform="translate(80,80)" fill="#8B4513" stroke="none">
              <polygon points="0,-55 12,-12 55,0 12,12 0,55 -12,12 -55,0 -12,-12" />
              <polygon points="0,-38 8,-8 38,0 8,8 0,38 -8,8 -38,0 -8,-8" fill="none" stroke="#8B4513" strokeWidth="1.5" />
              <circle r="8" fill="#8B4513" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#star-pattern)" />
      </svg>

      {/* NAVBAR */}
      <nav style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px', fontWeight: '700',
          color: 'var(--color-coffee)',
          letterSpacing: '0.02em',
        }}>
          Selam Wellness
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {[
            { label: 'Circles',    id: 'circles' },
            { label: "Women's",   id: 'womens' },
            { label: 'Retreats',   id: 'retreats' },
            { label: 'Library',    id: 'library' },
          ].map(item => (
            <button key={item.id} onClick={() => navigate(item.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '14px', fontWeight: '500',
              color: 'var(--color-charcoal-soft)',
            }}>
              {item.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={() => navigate('login')} style={{
            background: 'none', border: '1px solid rgba(44,24,16,0.25)',
            padding: '9px 20px', borderRadius: '999px',
            fontSize: '13px', fontWeight: '500',
            color: 'var(--color-coffee)', cursor: 'pointer',
          }}>
            Sign in
          </button>
          <button onClick={() => navigate('register')} style={{
            background: 'var(--color-coffee)',
            border: 'none',
            padding: '10px 22px', borderRadius: '999px',
            fontSize: '13px', fontWeight: '600',
            color: '#FAF3E0', cursor: 'pointer',
          }}>
            Join Free
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '0 60px',
        gap: '40px',
        position: 'relative', zIndex: 5,
      }}>

        {/* LEFT — Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 6vw, 88px)',
            fontWeight: '700',
            color: 'var(--color-coffee)',
            lineHeight: 1.0,
            marginBottom: '28px',
            letterSpacing: '-0.01em',
          }}>
            A digital<br />Ethiopian<br />wellness<br />village.
          </h1>

          <p style={{
            fontSize: '15px',
            color: 'var(--color-charcoal-soft)',
            lineHeight: 1.7,
            maxWidth: '420px',
            marginBottom: '36px',
          }}>
            Not another meditation app. Selam is a village of circles, rituals, cycle wisdom, practitioners, and real-world healing experiences — warm, rooted, and safe within three seconds.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('register')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'var(--color-coffee)',
                color: '#FAF3E0',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(44,24,16,0.25)',
              }}
            >
              <Heart size={16} fill="#FAF3E0" />
              Enter Women's Haven
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('circles')}
              style={{
                background: 'transparent',
                color: 'var(--color-coffee)',
                border: '1px solid rgba(44,24,16,0.3)',
                padding: '14px 28px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Explore circles
            </motion.button>
          </div>

          {/* Launch Partner Strip */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between',
            background: '#FFF',
            borderRadius: '16px',
            padding: '14px 20px',
            gap: '20px',
            boxShadow: '0 2px 16px rgba(44,24,16,0.08)',
            maxWidth: '420px',
          }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--color-terracotta)', letterSpacing: '0.08em', marginBottom: '4px' }}>
                ✦ Launch Partner: Kuriftu Resort
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-charcoal-soft)', fontWeight: '500' }}>
                Kuriftu Lake Spa Day — 1,800 ETB • Book with
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('experience', { id: 'kuriftu' })}
              style={{
                background: 'var(--color-coffee)',
                color: '#FAF3E0',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Book
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT — Circular Navigation Hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '520px',
          }}
        >
          {/* Concentric rings */}
          {[240, 180, 120].map((r, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: r * 2, height: r * 2,
              borderRadius: '50%',
              border: `1px solid rgba(139,69,19,${0.08 + i * 0.04})`,
              background: i === 2 ? `rgba(139,69,19,0.04)` : 'transparent',
              pointerEvents: 'none',
            }} />
          ))}

          {/* CENTER button — Daily Selam */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('daily')}
            style={{
              position: 'relative', zIndex: 5,
              width: '110px', height: '110px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #A44A3A, #7B2D1A)',
              border: 'none',
              color: '#FAF3E0',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 8px 32px rgba(164,74,58,0.4)',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.05em',
            }}
          >
            <span style={{ fontSize: '22px' }}>🕯️</span>
            Daily Selam
          </motion.button>

          {/* ORBITING buttons */}
          {orbs.map((orb) => {
            const rad = (orb.angle * Math.PI) / 180;
            const x = Math.cos(rad) * orb.radius;
            const y = Math.sin(rad) * orb.radius;
            return (
              <motion.button
                key={orb.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(orb.id)}
                onMouseEnter={() => setHoveredOrb(orb.id)}
                onMouseLeave={() => setHoveredOrb(null)}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                  background: hoveredOrb === orb.id ? 'var(--color-coffee)' : 'rgba(255,255,255,0.9)',
                  color: hoveredOrb === orb.id ? '#FAF3E0' : 'var(--color-coffee)',
                  border: '1px solid rgba(44,24,16,0.15)',
                  padding: '10px 18px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 16px rgba(44,24,16,0.12)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  zIndex: 4,
                }}
              >
                <span>{orb.icon}</span>
                {orb.label}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
}
