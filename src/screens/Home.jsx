import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import TopBar from '../components/layout/TopBar';
import Card from '../components/ui/Card';
import MoodSelector from '../components/ui/MoodSelector';
import WhisperCard from '../components/features/WhisperCard';
import CircleCard from '../components/features/CircleCard';
import ExperienceCard from '../components/features/ExperienceCard';
import MoonCycleCard from '../components/features/MoonCycleCard';

import { mockPosts } from '../data/mockPosts';
import { mockCircles } from '../data/mockCircles';
import { mockExperiences } from '../data/mockExperiences';

export default function Home({ navigate }) {
  const [posts, setPosts] = useState(mockPosts);
  const [circles, setCircles] = useState(mockCircles);
  const [experiences, setExperiences] = useState(mockExperiences);

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || '') + '/api/posts').then(r => r.json()).then(d => { if (d && d.length) setPosts(d); }).catch(() => {});
    fetch((import.meta.env.VITE_API_URL || '') + '/api/circles').then(r => r.json()).then(d => { if (d && d.length) setCircles(d); }).catch(() => {});
    fetch((import.meta.env.VITE_API_URL || '') + '/api/experiences').then(r => r.json()).then(d => { if (d && d.length) setExperiences(d); }).catch(() => {});
  }, []);
  return (
    <PageWrapper>
      <TopBar title="ሰላም, Hana ✨" showBell onBell={() => navigate('notifications')} />

      {/* HERO CARD */}
      <Card
        style={{
          marginBottom: 'var(--space-lg)',
          borderTop: '4px solid var(--color-terracotta)',
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          color: 'var(--color-coffee)',
          marginBottom: '4px',
        }}>
          Good morning, Hana
        </h2>
        <p style={{
          color: 'var(--color-charcoal-soft)',
          fontSize: '14px',
          marginBottom: 'var(--space-md)',
        }}>
          How is your spirit today?
        </p>
        <MoodSelector onSelect={(mood) => console.log('Selected mood:', mood)} />
      </Card>

      {/* MOON CYCLE CARD */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <MoonCycleCard day={11} onTap={() => navigate('cycle')} />
      </div>

      {/* WHISPERS OF THE CIRCLE */}
      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <div style={styles.sectionHeader}>
          <div>
            <h3 style={styles.sectionTitle}>Whispers of the Circle</h3>
            <p style={styles.sectionSubtitle}>From your communities</p>
          </div>
          <button style={styles.seeAllBtn} onClick={() => navigate('circles')}>
            See all <ArrowRight size={14} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {posts.slice(0, 2).map((post, i) => (
            <WhisperCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* YOUR CIRCLES (Horizontal Scroll) */}
      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h3 style={{ ...styles.sectionTitle, marginBottom: 'var(--space-md)' }}>Your Circles</h3>
        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: 'var(--space-md)',
            overflowX: 'auto',
            paddingBottom: 'var(--space-sm)',
            margin: '0 calc(var(--space-md) * -1)',
            padding: '0 var(--space-md)',
          }}
        >
          {circles.slice(0, 4).map((circle, i) => (
            <CircleCard
              key={circle.id}
              circle={circle}
              compact
              index={i}
              onTap={() => navigate('circle-feed', { id: circle.id })}
            />
          ))}
        </div>
      </section>

      {/* WELLNESS EXPERIENCES */}
      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <div style={styles.sectionHeader}>
          <div>
            <h3 style={styles.sectionTitle}>Healing beyond the screen</h3>
            <p style={styles.sectionSubtitle}>Curated experiences</p>
          </div>
        </div>
        <ExperienceCard
          experience={experiences[0]}
          featured
          onTap={() => navigate('experience', { id: experiences[0]?.id })}
        />
      </section>
    </PageWrapper>
  );
}

const styles = {
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 'var(--space-md)',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px',
    color: 'var(--color-coffee)',
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: '13px',
    color: 'var(--color-charcoal-muted)',
    marginTop: '2px',
  },
  seeAllBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-terracotta)',
    fontSize: '13px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
  },
};
