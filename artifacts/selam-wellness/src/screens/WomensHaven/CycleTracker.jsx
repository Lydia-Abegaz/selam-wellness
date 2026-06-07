import { motion } from 'framer-motion';
import PageWrapper from '../../components/layout/PageWrapper';
import TopBar from '../../components/layout/TopBar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { Sparkles } from 'lucide-react';
import { CYCLE_PHASES, SYMPTOMS } from '../../design-system/tokens';
import { useState } from 'react';

export default function CycleTracker({ navigate }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  
  const currentDay = 11;
  const currentPhase = CYCLE_PHASES[1]; // Inner Spring
  
  const toggleSymptom = (s) => {
    if (selectedSymptoms.includes(s)) setSelectedSymptoms(selectedSymptoms.filter(x => x !== s));
    else setSelectedSymptoms([...selectedSymptoms, s]);
  };

  return (
    <PageWrapper style={{ background: 'var(--color-rose-soft)' }}>
      <TopBar title="Cycle Syncing" showBack onBack={() => navigate('womens')} />

      {/* The Arc Visualization */}
      <div style={{
        position: 'relative',
        height: '240px',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 'var(--space-xl)',
        marginBottom: 'var(--space-lg)',
      }}>
        <svg width="280" height="200" viewBox="0 0 280 200" style={{ overflow: 'visible' }}>
          {/* Base Track */}
          <path d="M 40 200 A 100 100 0 1 1 240 200" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="24" strokeLinecap="round" />
          
          {/* Active Phase (Inner Spring: ~25% to 50% of the arc) */}
          <path d="M 58 118 A 100 100 0 0 1 140 100" fill="none" stroke="var(--color-sage)" strokeWidth="24" strokeLinecap="round" />
          
          {/* Current Day Dot (Glowing Terracotta) */}
          <circle cx="100" cy="108" r="8" fill="var(--color-terracotta)" style={{ filter: 'drop-shadow(0 0 8px var(--color-terracotta-soft))' }} />
          
          {/* Center Info */}
          <text x="140" y="160" textAnchor="middle" fontSize="64" dominantBaseline="middle" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}>
            🌱
          </text>
        </svg>
      </div>

      {/* Phase Card */}
      <Card style={{ marginBottom: 'var(--space-xl)', textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          color: 'var(--color-coffee)',
          marginBottom: '4px',
        }}>
          {currentPhase.name}
        </h2>
        <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '14px', marginBottom: 'var(--space-md)' }}>
          Day {currentDay} of 28
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
          {currentPhase.traits.map(t => (
            <Badge key={t} variant="active">{t}</Badge>
          ))}
        </div>
        
        <p style={{ fontSize: '14px', color: 'var(--color-charcoal-soft)', lineHeight: '1.6' }}>
          Your energy is rising. This is the time for new beginnings, planning, and leaning into your creative power.
        </p>
      </Card>

      {/* Symptoms Log */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '20px',
        color: 'var(--color-coffee)',
        marginBottom: 'var(--space-md)',
      }}>
        Log Symptoms
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'var(--space-xl)' }}>
        {SYMPTOMS.map(s => {
          const active = selectedSymptoms.includes(s);
          return (
            <motion.button
              key={s}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSymptom(s)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${active ? 'var(--color-rose-deep)' : 'rgba(181, 118, 138, 0.3)'}`,
                background: active ? 'var(--color-rose-deep)' : 'transparent',
                color: active ? '#FFF' : 'var(--color-coffee)',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              {s}
            </motion.button>
          )
        })}
      </div>

      {/* Insights */}
      <Card variant="parchment" style={{ borderLeft: '4px solid var(--color-sage)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={16} color="var(--color-sage)" />
          <span style={{ fontWeight: '600', color: 'var(--color-coffee)' }}>Daily Insight</span>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--color-charcoal-soft)', lineHeight: '1.5' }}>
          Based on your Inner Spring phase, this is an ideal week for scheduling difficult conversations or starting new projects. Your communication skills are peaking.
        </p>
      </Card>

    </PageWrapper>
  );
}
