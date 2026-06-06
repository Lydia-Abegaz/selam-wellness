import { useState, useEffect } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import TopBar from '../../components/layout/TopBar';
import ExperienceCard from '../../components/features/ExperienceCard';
import Button from '../../components/ui/Button';
import { mockExperiences } from '../../data/mockExperiences';

export default function RetreatsDiscover({ navigate }) {
  const [experiences, setExperiences] = useState(mockExperiences);

  useEffect(() => {
    fetch('/api/experiences')
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setExperiences(data); })
      .catch(err => console.error('Error fetching experiences:', err));
  }, []);
  const categories = ['All', 'Spa', 'Retreats', 'Yoga', 'Nature', 'Resorts', 'Weekend'];

  return (
    <PageWrapper>
      {/* Hero Banner */}
      <div style={{
        margin: 'calc(var(--space-md) * -1) calc(var(--space-md) * -1) var(--space-xl)',
        padding: 'var(--space-3xl) var(--space-xl) var(--space-xl)',
        background: 'linear-gradient(to bottom, var(--color-parchment), var(--color-ivory))',
        position: 'relative',
        borderBottom: '1px solid rgba(44,24,16,0.05)',
      }}>
        {/* Top Tibeb Border for Hero */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '12px',
          background: 'var(--color-terracotta)',
          opacity: 0.8,
        }} />
        
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          color: 'var(--color-coffee)',
          lineHeight: 1.1,
          marginBottom: '8px',
          maxWidth: '80%',
        }}>
          Real-world healing
        </h1>
        <p style={{ color: 'var(--color-charcoal-soft)', fontSize: '14px', maxWidth: '280px' }}>
          Curated wellness experiences, from spa days to yoga retreats.
        </p>
      </div>

      {/* Category Filter */}
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
        {categories.map((cat, i) => (
          <Button key={cat} variant={i === 0 ? 'primary' : 'secondary'} size="sm" style={{ whiteSpace: 'nowrap' }}>
            {cat}
          </Button>
        ))}
      </div>

      {/* Featured Launch Partner */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            color: 'var(--color-coffee)',
          }}>
            Official Launch Partner
          </h2>
          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-terracotta)', letterSpacing: '0.05em' }}>
            KURIFTU RESORTS
          </span>
        </div>
        <ExperienceCard
          experience={experiences[0]}
          featured
          onTap={() => navigate('experience', { id: experiences[0]?.id })}
        />
      </div>

      {/* Grid of other experiences */}
      <div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          color: 'var(--color-coffee)',
          marginBottom: 'var(--space-md)',
        }}>
          Explore More
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-md)',
        }}>
          {experiences.slice(1).map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={i}
              onTap={() => navigate('experience', { id: exp.id })}
            />
          ))}
        </div>
      </div>

    </PageWrapper>
  );
}
