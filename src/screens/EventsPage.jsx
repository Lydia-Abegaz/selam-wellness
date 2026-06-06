import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, CheckCircle } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import TopBar from '../components/layout/TopBar';

const EVENTS_DATA = [
  { id: 1, category: 'Retreat', title: 'Kuriftu Lake Wellness Day', location: 'Bishoftu', price: 'ETB 1,800', date: 'Jun 22, 2026', description: 'Lakeside spa, coffee ceremony, breathwork, and a closing circle with certified practitioners.', tone: 'water', featured: true, partner: 'Kuriftu Resort' },
  { id: 2, category: 'Retreat', title: 'Entoto Forest Reset', location: 'Entoto, Addis', price: 'ETB 2,400', date: 'Jun 29, 2026', description: 'Forest walking, breathwork, coffee reflection, and closing circle under eucalyptus shade.', tone: 'forest', featured: false },
  { id: 3, category: 'Workshop', title: 'Emotional Intelligence Masterclass', location: 'Online', price: 'ETB 350', date: 'Jun 15, 2026', description: 'A 3-hour live workshop on self-awareness, emotional regulation, and empathy skills.', tone: 'coffee', featured: false },
  { id: 4, category: 'Community', title: 'Women\'s Circle — New Moon', location: 'Addis Ababa', price: 'Free', date: 'Jun 19, 2026', description: 'Monthly in-person women\'s circle. Safe space, no agenda, just honest presence.', tone: 'forest', featured: false },
  { id: 5, category: 'Practitioner', title: 'Session: Dr. Selamawit G.', location: 'Online', price: 'ETB 850', date: 'Available today', description: 'Women\'s health, cycle education, and holistic nutrition. Book a private 60-min session.', tone: 'water', featured: false },
  { id: 6, category: 'Workshop', title: 'Teff & Iron Nutrition Talk', location: 'Online', price: 'ETB 150', date: 'Jun 18, 2026', description: 'Evidence-based nutrition for Ethiopian women — anemia prevention, cycle-aware eating.', tone: 'coffee', featured: false },
];

const CATEGORIES = ['All', 'Retreat', 'Workshop', 'Community', 'Practitioner'];

export default function EventsPage({ navigate }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);

  const filteredEvents = EVENTS_DATA.filter(e => selectedFilter === 'All' || e.category === selectedFilter);

  const handleRegister = () => {
    setToastMessage('Interest registered — you will be notified.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getToneColors = (tone) => {
    if (tone === 'water') return { bg: 'rgba(122,158,126,0.1)', border: 'var(--color-sage)' };
    if (tone === 'forest') return { bg: 'rgba(44,24,16,0.04)', border: 'var(--color-charcoal-muted)' };
    return { bg: 'rgba(193,68,14,0.06)', border: 'var(--color-terracotta)' };
  };

  return (
    <PageWrapper>
      <TopBar title="Events" showBack onBack={() => navigate('home')} />

      {/* SECTION 1 - Page Intro */}
      <section style={{ marginBottom: 'var(--space-2xl)' }}>
        <div style={{
          fontSize: '13px',
          fontWeight: '700',
          color: 'var(--color-terracotta)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}>
          Activities & Events
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 36px)',
          color: 'var(--color-coffee)',
          marginBottom: '12px',
          lineHeight: 1.1
        }}>
          Real experiences. Real healing.
        </h1>
        <p style={{
          color: 'var(--color-charcoal-soft)',
          fontSize: '16px',
          lineHeight: 1.6,
          maxWidth: '600px'
        }}>
          Wellness retreats, workshops, community events, and practitioner sessions — all aligned with your growth.
        </p>
      </section>

      {/* SECTION 2 - Filter Bar */}
      <section style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '16px',
        marginBottom: '24px',
        className: 'no-scrollbar'
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              border: selectedFilter === cat ? 'none' : '1px solid rgba(44,24,16,0.2)',
              background: selectedFilter === cat ? 'var(--color-coffee)' : 'transparent',
              color: selectedFilter === cat ? '#FFF' : 'var(--color-charcoal-soft)',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* SECTION 3 - Events Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {filteredEvents.map(event => {
          const colors = getToneColors(event.tone);
          return (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                background: '#FFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(44,24,16,0.06)',
                borderTop: `4px solid ${colors.border}`,
                boxShadow: '0 4px 16px rgba(44,24,16,0.04)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: 'var(--color-charcoal-soft)',
                  background: 'rgba(44,24,16,0.05)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {event.category}
                </span>
                {event.featured && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: 'var(--color-terracotta)',
                    letterSpacing: '0.05em'
                  }}>
                    PARTNER: {event.partner?.toUpperCase() || 'FEATURED'}
                  </span>
                )}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                color: 'var(--color-coffee)',
                marginBottom: '12px'
              }}>
                {event.title}
              </h3>

              <p style={{ fontSize: '14px', color: 'var(--color-charcoal-soft)', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>
                {event.description}
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '13px',
                color: 'var(--color-coffee)',
                fontWeight: '600',
                marginBottom: '24px',
                background: colors.bg,
                padding: '12px',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={14} color={colors.border} /> {event.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={14} color={colors.border} /> {event.date} • {event.price}
                </div>
              </div>

              <button onClick={handleRegister} style={{
                width: '100%',
                background: 'var(--color-coffee)',
                color: '#FFF',
                border: 'none',
                padding: '12px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-charcoal)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-coffee)'}
              >
                Register Interest
              </button>
            </motion.div>
          );
        })}
      </section>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            style={{
              position: 'fixed',
              bottom: '40px',
              left: '50%',
              background: 'var(--color-sage)',
              color: '#FFF',
              padding: '12px 24px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(122,158,126,0.3)',
              zIndex: 1000
            }}
          >
            <CheckCircle size={16} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </PageWrapper>
  );
}
