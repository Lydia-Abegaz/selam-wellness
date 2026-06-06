import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Calendar, Check, ArrowLeft } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { mockExperiences } from '../../data/mockExperiences';

export default function ExperienceDetail({ navigate, params }) {
  const [experiences, setExperiences] = useState(mockExperiences);

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || '') + '/api/experiences')
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setExperiences(data); })
      .catch(err => console.error('Error loading experiences:', err));
  }, []);

  const expId = params?.id || experiences[0]?.id;
  const exp = experiences.find(e => e.id === expId) || experiences[0] || mockExperiences[0];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--color-ivory)' }}>
      {/* Header Image Area */}
      <div style={{
        height: '300px',
        position: 'relative',
        background: 'linear-gradient(135deg, #C1440E 0%, #E8845A 50%, #D4A017 100%)',
      }}>
        <button
          onClick={() => navigate('retreats')}
          style={{
            position: 'absolute',
            top: 'var(--space-xl)',
            left: 'var(--space-md)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(4px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          <ArrowLeft size={20} color="var(--color-coffee)" />
        </button>
      </div>

      <PageWrapper style={{
        flex: 1,
        marginTop: '-24px',
        background: 'var(--color-ivory)',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        padding: 'var(--space-xl) var(--space-md) 100px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
          <Badge variant="gold">{exp.category}</Badge>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-coffee)', fontWeight: '600' }}>
            <Star size={18} fill="var(--color-gold)" color="var(--color-gold)" />
            {exp.rating}
          </div>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          color: 'var(--color-coffee)',
          lineHeight: 1.1,
          marginBottom: 'var(--space-sm)',
        }}>
          {exp.name}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-charcoal-muted)', fontSize: '14px', marginBottom: 'var(--space-lg)' }}>
          <MapPin size={16} />
          {exp.location} · {exp.distance}
        </div>

        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-coffee)', marginBottom: '8px' }}>About this experience</h3>
          <p style={{ fontSize: '15px', color: 'var(--color-charcoal-soft)', lineHeight: 1.6 }}>
            {exp.description}
          </p>
        </div>

        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-coffee)', marginBottom: '12px' }}>Highlights</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {exp.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(122,158,126,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={14} color="var(--color-sage)" />
                </div>
                <span style={{ fontSize: '15px', color: 'var(--color-charcoal)' }}>{h}</span>
              </div>
            ))}
          </div>
        </div>

      </PageWrapper>

      {/* Fixed Bottom Booking Bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        padding: 'var(--space-md) var(--space-lg)',
        background: 'rgba(250,243,224,0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(44,24,16,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50,
      }}>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)', marginBottom: '2px' }}>Price</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '24px', color: 'var(--color-coffee)' }}>
            <span style={{ fontSize: '16px' }}>{exp.currency}</span> {exp.price.toLocaleString()}
          </div>
        </div>
        <Button size="lg" onClick={() => navigate('booking', { id: exp.id })}>
          Book Now
        </Button>
      </div>

    </div>
  );
}
