import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/ui/Button';
import { mockCircles } from '../../data/mockCircles';

export default function Welcome({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({
    languages: [],
    interests: [],
    circles: [],
  });

  // Step animations
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: 'easeOut' },
  };

  const toggleSelection = (category, item) => {
    setSelections(prev => {
      const list = prev[category];
      if (list.includes(item)) {
        return { ...prev, [category]: list.filter(i => i !== item) };
      }
      return { ...prev, [category]: [...list, item] };
    });
  };

  // STEP 1: Welcome
  const renderStep0 = () => (
    <motion.div key="step0" {...fadeUp} style={styles.centerContainer}>
      <div style={styles.tibebBorderTop} />
      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '72px',
          color: 'var(--color-coffee)',
          marginBottom: '16px',
        }}
      >
        ሰላም
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{
          letterSpacing: '0.2em',
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--color-terracotta)',
          marginBottom: '16px',
        }}>
          SELAM WELLNESS
        </div>
        <p style={{
          color: 'var(--color-charcoal-soft)',
          fontSize: '16px',
          marginBottom: '48px',
        }}>
          Your community. Your peace. Your health.
        </p>
        <Button onClick={() => setStep(1)} size="lg">
          Begin Your Journey →
        </Button>
      </motion.div>
      <div style={styles.tibebBorderBottom} />
    </motion.div>
  );

  // STEP 2: Language
  const renderStep1 = () => (
    <motion.div key="step1" {...fadeUp} style={styles.topContainer}>
      <h2 style={styles.heading}>Choose your language<br/>ቋንቋዎን ይምረጡ</h2>
      <div style={styles.pillGrid}>
        {['Amharic', 'English', 'Afaan Oromo', 'Tigrinya'].map(lang => {
          const isSelected = selections.languages.includes(lang);
          return (
            <motion.button
              key={lang}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSelection('languages', lang)}
              style={{
                ...styles.pill,
                background: isSelected ? 'var(--color-coffee)' : 'transparent',
                color: isSelected ? 'var(--color-ivory)' : 'var(--color-coffee)',
                borderColor: isSelected ? 'var(--color-coffee)' : 'rgba(44,24,16,0.2)',
              }}
            >
              {lang}
            </motion.button>
          );
        })}
      </div>
      <div style={styles.fixedBottom}>
        <Button
          fullWidth
          disabled={selections.languages.length === 0}
          onClick={() => setStep(2)}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );

  // STEP 3: Interests
  const renderStep2 = () => (
    <motion.div key="step2" {...fadeUp} style={styles.topContainer}>
      <h2 style={styles.heading}>What does wellness mean to you?</h2>
      <p style={styles.subtext}>Select at least 3 to personalize your space.</p>
      <div style={styles.pillGrid}>
        {['Community', 'Mindfulness', "Women's Health", 'Fitness', 'Nutrition', 'Sleep', 'Beauty', 'Career', 'Relationships', 'Spirituality', 'Traditional Healing', 'Stress Relief'].map(interest => {
          const isSelected = selections.interests.includes(interest);
          return (
            <motion.button
              key={interest}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSelection('interests', interest)}
              style={{
                ...styles.pill,
                background: isSelected ? 'var(--color-terracotta)' : 'transparent',
                color: isSelected ? 'var(--color-ivory)' : 'var(--color-coffee)',
                borderColor: isSelected ? 'var(--color-terracotta)' : 'rgba(44,24,16,0.2)',
              }}
            >
              {interest}
            </motion.button>
          );
        })}
      </div>
      <div style={styles.fixedBottom}>
        <Button
          fullWidth
          disabled={selections.interests.length < 3}
          onClick={() => setStep(3)}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );

  // STEP 4: Circles
  const renderStep3 = () => (
    <motion.div key="step3" {...fadeUp} style={styles.topContainer}>
      <h2 style={styles.heading}>Join your first circle</h2>
      <p style={styles.subtext}>Connect with others on the same journey.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {mockCircles.slice(0, 6).map(circle => {
          const isSelected = selections.circles.includes(circle.id);
          return (
            <motion.div
              key={circle.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSelection('circles', circle.id)}
              style={{
                background: isSelected ? 'rgba(44,24,16,0.05)' : 'var(--color-ivory-dark)',
                border: `1px solid ${isSelected ? 'var(--color-coffee)' : 'rgba(0,0,0,0.05)'}`,
                borderLeft: `4px solid ${circle.color}`,
                padding: 'var(--space-md)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '18px', color: 'var(--color-coffee)' }}>
                  {circle.name}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)' }}>
                  {circle.members.toLocaleString()} members
                </span>
              </div>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                border: `2px solid ${isSelected ? 'var(--color-coffee)' : 'rgba(0,0,0,0.2)'}`,
                background: isSelected ? 'var(--color-coffee)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {isSelected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FAF3E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div style={styles.fixedBottom}>
        <Button
          fullWidth
          disabled={selections.circles.length === 0}
          onClick={onComplete}
        >
          Enter Selam →
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  centerContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-xl)',
    position: 'relative',
  },
  topContainer: {
    height: '100%',
    padding: 'var(--space-xl) var(--space-lg) 120px',
    overflowY: 'auto',
  },
  heading: {
    fontFamily: 'var(--font-display)',
    fontSize: '32px',
    color: 'var(--color-coffee)',
    lineHeight: 1.2,
    marginBottom: 'var(--space-sm)',
  },
  subtext: {
    color: 'var(--color-charcoal-soft)',
    marginBottom: 'var(--space-xl)',
    fontSize: '15px',
  },
  pillGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-sm)',
  },
  pill: {
    padding: '12px 20px',
    borderRadius: 'var(--radius-full)',
    border: '1px solid',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  },
  fixedBottom: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '430px',
    padding: 'var(--space-lg)',
    background: 'linear-gradient(to top, var(--color-ivory) 80%, transparent)',
    zIndex: 10,
  },
  tibebBorderTop: {
    position: 'absolute', top: 0, left: 0, right: 0, height: '12px',
    backgroundImage: 'url("data:image/svg+xml,...")', // We rely on the global Tibeb pattern instead for simplicity
    background: 'var(--color-terracotta)',
  },
  tibebBorderBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '12px',
    background: 'var(--color-coffee)',
  }
};
