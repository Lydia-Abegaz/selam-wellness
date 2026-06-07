import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import TopBar from '../components/layout/TopBar';

const CATEGORIES = [
  {
    id: 'skincare',
    icon: '🌿',
    label: 'Skincare',
    num: '01',
    desc: 'Botanical nourishment using Teff extracts, Moringa, and traditional herbal infusions.',
    color: 'var(--color-primary)',
    bg: 'rgba(189,82,45,0.08)',
  },
  {
    id: 'haircare',
    icon: '〰️',
    label: 'Hair Care',
    num: '02',
    desc: 'Honoring tradition through protective styling guidance and natural butter rituals.',
    color: 'var(--color-secondary)',
    bg: 'rgba(212,163,22,0.08)',
  },
  {
    id: 'rituals',
    icon: '☕',
    label: 'Rituals',
    num: '03',
    desc: 'Daily moments of peace centering on the coffee ceremony and meditative grounding.',
    color: 'var(--color-tertiary)',
    bg: 'rgba(45,90,66,0.08)',
  },
];

const ANCIENT_SECRETS = [
  {
    id: 1, tag: 'Natural Glow',
    title: 'Teff-Based Face Masks',
    desc: 'How the ancient super-grain exfoliates and brightens sensitive skin naturally.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY0_xZQ0kGEQmUuEvvecK9Bny8lW9p1u2Ya188TDf7fHetsUCjX9yR0AE-XXuKCAs_hr7I1HkD4UDF7EO-ALLAvNTeMYQDYiSa3637E5kgXLBBWfvouCQe_1OouvxgjknpeSxrdq5hEggM0JIsCkaK11cUEXBVs_4QMm_oNNU84zWcGV2LbGEj2su1b8Ap6RlWzS-o_XM63tJL8YQK665YCwFjhpgamLYLSvJMRpn0Q7KBMlj2lyLeWOITVQmQBmUrewhq37Lcx83H',
  },
  {
    id: 2, tag: 'Hair Health',
    title: 'Moringa & Marula Oil',
    desc: 'The ultimate sealant for high-porosity curls passed down through generations.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY8CwAlkbLWURXX9tna7d6w1XDI36U4hifcFoEsC538r7Uo8Bb-XQJGiy-5Sk0uLQHwbxEtZw_VxtRHIYQkucRlbd3c_VtxiQS4MZVbejizIKlqO64GDELjlsibMXf-P2xlIJ3xWhZy5ADeRwfSJo7Mv_mncHrkeclZN8Xe-0Ta7lADh3HI26iv4YmpZKGjhSos5DhqN_-bqQR5WGHUGyAWxoKbwiy0eeO1T0r90zkMAsaq0ntqzjvrp69cQjgiLH19QV72dOjPvLu',
  },
  {
    id: 3, tag: 'Detox',
    title: 'Traditional Steam Bath',
    desc: "Recreating the highland 'Wush' experience at home with eucalyptus and rose.",
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi-VToUJeCRM1cEQbnt-FmkDWAZl6RZ1AoxDvdKU_ebAjOotSjO_NAXLR5Yem7gM-kWHdzdb8zUqtGHTMprhIHSdfcu6rkTSWTs5tggOQ52RukP7ALNspsQP9MiYa9f5CGLCAOK7tXywO_fPW2SIpD6ZY1UYPVHWQw3ThhvNviB6j6zmRy38pH7SoUUKh0GPg2gwPMaoI83Oo_MwQfPT-Y97uUwmoEtM9kjVZETxMJ4yZHCX2JBwyg39wHDrTj1V',
  },
  {
    id: 4, tag: 'Body Care',
    title: 'Clay & Mineral Therapy',
    desc: 'The healing properties of volcanic soil and mud found in the Rift Valley.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByalIVRGCV0GI88g9HoEp5Z0j1xvWUa5e_qgAPZ40G9qAbOVZ1NXz7uWT9zXNFnTezvR3gd5E81tA0UtBBZTVPrRd501mdpvthpBga1IXQi-EmNriyxK_ngb92WMBhJ6oZsDOO_W8LUx3FI8V76elbzJvA5X3n7KL_fN1FYYAl7dX9FT7Zzs8BroKJSKIVBVtt2s8UCZZjIVvG0tlNkt5c3rrJtd2FnE_iqg8s31Ab3-OaW3viUeWV7Ch1ffhmrnR5BHOmNqpH5Kb7',
  },
];

const FOCUS_OPTIONS = [
  { id: 'energy', label: 'Energy', icon: '⚡' },
  { id: 'calm',   label: 'Calm',   icon: '🌿' },
  { id: 'healing',label: 'Healing',icon: '❤️' },
];

export default function SelfCareHub({ navigate }) {
  const [selectedFocus, setSelectedFocus] = useState('energy');

  return (
    <PageWrapper>
      <TopBar title="Self-Care Hub" />

      {/* ── HERO ────────────────────────────────── */}
      <section style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        height: '380px',
        marginBottom: 'var(--space-lg)',
        display: 'flex',
        alignItems: 'center',
      }}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO5V-iO5nIQLNcnPdUPnlUfU_zY6bvBf1OqwuilKnPe8i_e-8CIut2dF_j7yMKM25Bht60hiXziekVRA4T2TqqMPi8eDqNLovW1j324P6BCn6JJ3S8xVLxZhLs2_18qSVGV9MaEkgHZ6w6eFJei5fdhQxF0yWzTi5nm3roHTSi6zzrO5Qfa9W_YONnyHwuCUkjMT4ilxA5uPliiw8JUUsO2sjc1GJC_Q-sNsQh_STCesCRgQDTLcN2SWD3LUWkF4WTGbqUffTDUFmb"
          alt="Ethiopian self-care hero"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(44,25,19,0.82) 0%, rgba(44,25,19,0.2) 70%, transparent 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 var(--space-md)', maxWidth: '500px' }}>
          <span style={{
            background: 'var(--color-secondary-container)',
            color: 'var(--color-on-secondary-container)',
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.04em',
            display: 'inline-block',
            marginBottom: '16px',
          }}>Renew & Restore</span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: '700',
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}>Nurture Your Natural Selam</h1>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              padding: '14px 28px',
              borderRadius: 'var(--radius-xl)',
              fontSize: '14px', fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(189,82,45,0.4)',
            }}
          >
            Start Your Ritual <ArrowRight size={18} />
          </motion.button>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────── */}
      <section style={{ marginBottom: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-md)' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
              Explore the Hub
            </h2>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View All <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-gutter)' }}>
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-lift)' }}
              style={{
                background: 'var(--color-surface-container-low)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-md)',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{
                  background: cat.bg,
                  padding: '14px',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '28px',
                  lineHeight: 1,
                }}>
                  {cat.icon}
                </div>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '56px',
                  fontWeight: '700',
                  color: cat.color,
                  opacity: 0.06,
                  lineHeight: 1,
                  userSelect: 'none',
                }}>{cat.num}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '600', color: 'var(--color-on-surface)', margin: 0 }}>
                {cat.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DAILY RITUAL FEATURE ─────────────── */}
      <section style={{ marginBottom: 'var(--space-lg)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '600', color: 'var(--color-on-surface)', marginBottom: 'var(--space-md)' }}>
          Daily Rituals
        </h2>
        <div style={{
          background: 'var(--color-on-surface)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          boxShadow: 'var(--shadow-lift)',
        }}>
          {/* Left image */}
          <div style={{ position: 'relative', minHeight: '280px' }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdwhJD_YjFQVNOPkuCe2I8_JohRRAvvn4Iy7ZxxKPVvBskWiIf4AZuw7HMOl5J1khjaAPayLLT-l_EBdE8X6nqJpFLsGKTws15oIyclbM1fDylldDz-lzyoPbEVXv-qXWYyLHbjRw-jSrRjz3CQ2cPFH5pBDtqAiQG-Xni2KcoKdM-n2NKKigfePfhtZeqJXXCbdNArWfy2si0ZOkuHS_iAk_dUNf165l3shDcC_aMetfCjo27I7b8ZpfdqdSwD_1oGpy2iCskuhfr"
              alt="Coffee ceremony ritual"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
            />
            <button style={{
              position: 'absolute', inset: 0, margin: 'auto',
              width: '56px', height: '56px',
              background: 'var(--color-primary)',
              border: 'none',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(189,82,45,0.5)',
            }}>
              <Play size={24} fill="#fff" color="#fff" style={{ marginLeft: '3px' }} />
            </button>
          </div>
          {/* Right content */}
          <div style={{ padding: 'var(--space-md)', background: 'var(--color-surface-container-highest)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ height: '3px', width: '96px', background: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(189,82,45,0.25) 5px, rgba(189,82,45,0.25) 10px)', marginBottom: '20px' }} />
            <span style={{ color: 'var(--color-primary)', fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Mindfulness Track
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '600', color: 'var(--color-on-surface)', marginBottom: '12px' }}>
              Coffee Ceremony Grounding
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex' }}>
                {['AJ','MT','+12'].map((u, i) => (
                  <div key={u} style={{
                    width: '36px', height: '36px',
                    borderRadius: '50%',
                    background: i === 0 ? 'rgba(189,82,45,0.15)' : i === 1 ? 'rgba(212,163,22,0.15)' : 'rgba(45,90,66,0.15)',
                    border: '2px solid var(--color-surface-container-highest)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: '700',
                    color: 'var(--color-on-surface)',
                    marginLeft: i > 0 ? '-10px' : '0',
                    zIndex: 3 - i,
                  }}>{u}</div>
                ))}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>Joined by 1.2k others today</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANCIENT SECRETS ──────────────────── */}
      <section style={{ marginBottom: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
            Ancient Secrets
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[ChevronLeft, ChevronRight].map((Icon, i) => (
              <button key={i} style={{
                width: '36px', height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--color-outline-variant)',
                background: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-on-surface-variant)',
                transition: 'background 0.15s',
              }}>
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-gutter)' }}>
          {ANCIENT_SECRETS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{ cursor: 'pointer' }}
            >
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                aspectRatio: '4/5',
                position: 'relative',
                marginBottom: '12px',
              }}>
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', display: 'block' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                  <span style={{
                    background: 'rgba(253,249,244,0.9)',
                    backdropFilter: 'blur(8px)',
                    padding: '3px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'var(--color-primary)',
                  }}>{item.tag}</span>
                </div>
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-on-surface)', margin: 0 }}>{item.title}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BUILD YOUR FLOW ──────────────────── */}
      <section style={{
        background: 'var(--color-surface-container)',
        borderRadius: '32px',
        padding: 'var(--space-md)',
        border: '1px solid rgba(138,114,106,0.15)',
        marginBottom: 'var(--space-md)',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: '700', color: 'var(--color-on-surface)', marginBottom: '12px' }}>
            Build Your Flow
          </h2>
          <div style={{ textAlign: 'left', marginBottom: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'var(--color-primary)',
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '700',
              }}>1</div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
                What is your primary focus today?
              </h4>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {FOCUS_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedFocus(opt.id)}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-lg)',
                    border: selectedFocus === opt.id ? '2px solid var(--color-primary)' : '2px solid var(--color-outline-variant)',
                    background: selectedFocus === opt.id ? 'rgba(189,82,45,0.06)' : 'transparent',
                    color: selectedFocus === opt.id ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                    fontSize: '14px', fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontSize: '28px' }}>{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: '3px', background: 'rgba(138,114,106,0.2)', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-md)' }}>
            <div style={{ height: '100%', width: '33%', background: 'var(--color-primary)', borderRadius: 'var(--radius-full)' }} />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              padding: '16px 48px',
              borderRadius: 'var(--radius-full)',
              fontSize: '15px', fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(189,82,45,0.35)',
            }}
          >
            Next Question
          </motion.button>
        </div>
      </section>
    </PageWrapper>
  );
}
