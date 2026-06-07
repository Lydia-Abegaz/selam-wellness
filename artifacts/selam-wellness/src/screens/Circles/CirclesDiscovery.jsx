import { useState, useEffect } from 'react';
import { Search, Lock } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import TopBar from '../../components/layout/TopBar';
import CircleCard from '../../components/features/CircleCard';
import CallModal from '../../components/features/CallModal';
import Button from '../../components/ui/Button';
import { mockCircles } from '../../data/mockCircles';
import { CIRCLE_CATEGORIES } from '../../design-system/tokens';

export default function CirclesDiscovery({ navigate }) {
  const [circles, setCircles] = useState(mockCircles);
  const [showCallModal, setShowCallModal] = useState(false);

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || '') + '/api/circles')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setCircles(data);
        }
      })
      .catch(err => console.error('Error fetching circles:', err));
  }, []);

  const featuredCircle = circles.find(c => c.isWomensOnly);
  const otherCircles = circles.filter(c => c.id !== featuredCircle?.id);

  return (
    <PageWrapper>
      <TopBar title="Circles" showBell onBell={() => navigate('notifications')} />

      {/* Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--color-ivory)',
        borderBottom: '2px solid var(--color-coffee)',
        padding: '8px 4px',
        marginBottom: 'var(--space-xl)',
      }}>
        <Search size={20} color="var(--color-charcoal-muted)" />
        <input
          type="text"
          placeholder="Search for a community..."
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--color-coffee)',
            flex: 1,
          }}
        />
      </div>

      {/* Featured Banner */}
      {featuredCircle && (
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{
            background: 'var(--color-rose-soft)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-lg)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Lock size={14} color="var(--color-rose-deep)" />
              <span style={{ fontSize: '12px', color: 'var(--color-rose-deep)', fontWeight: '600' }}>Safe Space</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              color: 'var(--color-coffee)',
              marginBottom: '4px',
            }}>
              {featuredCircle.name}
            </h2>
            <p style={{ color: 'var(--color-charcoal-soft)', fontSize: '14px', marginBottom: '16px' }}>
              {featuredCircle.members.toLocaleString()} members
            </p>
            <Button variant="womens" onClick={() => navigate('circle-feed', { id: featuredCircle.id })}>
              Join Circle
            </Button>
            
            {/* Background pattern graphic */}
            <div style={{
              position: 'absolute',
              right: '-20px',
              bottom: '-20px',
              opacity: 0.1,
              fontSize: '120px',
            }}>
              🌸
            </div>
          </div>
        </section>
      )}

      {/* Categories Scroll */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          marginBottom: 'var(--space-xl)',
          paddingBottom: '8px',
        }}
      >
        <Button variant="primary" size="sm">All</Button>
        {CIRCLE_CATEGORIES.map(cat => (
          <Button key={cat} variant="secondary" size="sm" style={{ whiteSpace: 'nowrap' }}>
            {cat}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {otherCircles.map((circle, i) => (
          <CircleCard
            key={circle.id}
            circle={circle}
            index={i}
            onTap={() => navigate('circle-feed', { id: circle.id })}
            onCall={() => setShowCallModal(true)}
          />
        ))}
      </div>

      {showCallModal && <CallModal onClose={() => setShowCallModal(false)} />}
    </PageWrapper>
  );
}
