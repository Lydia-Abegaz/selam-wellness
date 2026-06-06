import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import TopBar from '../components/layout/TopBar';

const MOODS = [
  { emoji: '🌟', label: 'Radiant', rec: 'Keep the energy flowing! Try a 10-minute active movement session or connect with a friend.' },
  { emoji: '😊', label: 'Good', rec: 'A great day for maintenance. Consider a calming Ethiopian coffee ceremony ritual.' },
  { emoji: '😌', label: 'Calm', rec: 'Perfect state for reflection. Try journaling for 5 minutes or listening to traditional flute music.' },
  { emoji: '😔', label: 'Low', rec: 'Be gentle with yourself. We recommend a warm shower with berbere aromatherapy and early sleep.' },
  { emoji: '😰', label: 'Anxious', rec: 'Take a breath. Try our guided 3-minute grounding exercise and reach out to your circle.' },
];

export default function MoodJournal({ navigate }) {
  const [entries, setEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    fetch('/api/mood')
      .then(r => r.json())
      .then(data => setEntries(data))
      .catch(err => console.error(err));
  }, []);

  const handleSave = () => {
    if (!selectedMood) return;
    setSaving(true);
    fetch('/api/mood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood: selectedMood.label, note }),
    })
      .then(r => r.json())
      .then(newEntry => {
        setEntries(prev => [newEntry, ...prev]);
        setSaving(false);
        setSaved(true);
        setRecommendation(selectedMood.rec);
        setTimeout(() => {
          setSaved(false);
        }, 3000);
      })
      .catch(err => {
        console.error(err);
        setSaving(false);
      });
  };

  return (
    <PageWrapper>
      <TopBar title="Self-Care Hub" showBack onBack={() => navigate('home')} />

      {/* Log Today's Mood */}
      <section style={{
        background: '#FFF', borderRadius: '20px', padding: 'var(--space-xl)',
        boxShadow: '0 2px 16px rgba(44,24,16,0.07)',
        marginBottom: 'var(--space-xl)',
      }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-coffee)', marginBottom: 'var(--space-md)' }}>
          Daily Check-in
        </h3>
        <p style={{ color: 'var(--color-charcoal-soft)', fontSize: '14px', marginBottom: 'var(--space-lg)' }}>
          How are you feeling today? We'll tailor a self-care routine based on your energy.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 'var(--space-lg)' }}>
          {MOODS.map(mood => (
            <motion.button
              key={mood.label}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSelectedMood(mood);
                setRecommendation(null);
              }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                padding: '8px',
                borderRadius: '12px',
                background: selectedMood?.label === mood.label ? 'var(--color-parchment)' : 'transparent',
                outline: selectedMood?.label === mood.label ? '2px solid var(--color-terracotta)' : 'none',
              }}
            >
              <span style={{ fontSize: '32px' }}>{mood.emoji}</span>
              <span style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', fontWeight: selectedMood?.label === mood.label ? '700' : '400' }}>
                {mood.label}
              </span>
            </motion.button>
          ))}
        </div>

        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Add a private note... (optional)"
          style={{
            width: '100%', background: 'var(--color-parchment)', border: 'none',
            borderRadius: '12px', padding: '12px', outline: 'none',
            fontFamily: 'var(--font-body)', fontSize: '15px',
            color: 'var(--color-charcoal)', resize: 'none',
            minHeight: '80px', boxSizing: 'border-box',
            marginBottom: 'var(--space-md)',
          }}
        />

        <AnimatePresence mode="wait">
          {saved ? (
            <motion.div key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', color: 'var(--color-sage)', fontWeight: '600', padding: '12px' }}
            >
              ✓ Checked in!
            </motion.div>
          ) : recommendation ? null : (
            <motion.button key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleSave}
              disabled={!selectedMood || saving}
              style={{
                width: '100%', padding: '14px',
                background: selectedMood ? 'var(--color-terracotta)' : 'rgba(193,68,14,0.3)',
                color: '#FFF', border: 'none', borderRadius: 'var(--radius-full)',
                fontSize: '15px', fontWeight: '600', cursor: selectedMood ? 'pointer' : 'not-allowed',
                transition: 'background 0.2s',
              }}
            >
              {saving ? 'Saving...' : 'Get Today\'s Routine'}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Personalized Recommendation */}
        <AnimatePresence>
          {recommendation && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                background: 'rgba(122,158,126,0.1)',
                borderLeft: '4px solid var(--color-sage)',
                padding: '16px',
                borderRadius: '8px',
              }}>
                <div style={{ fontWeight: '600', color: 'var(--color-coffee)', marginBottom: '8px', fontSize: '14px' }}>
                  Recommended Ritual
                </div>
                <div style={{ color: 'var(--color-charcoal-soft)', fontSize: '14px', lineHeight: 1.5 }}>
                  {recommendation}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      {/* History */}
      <section>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-coffee)', marginBottom: 'var(--space-md)' }}>
          Recent Check-ins
        </h3>
        {entries.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--color-charcoal-muted)', padding: 'var(--space-xl) 0' }}>
            <p>No entries yet. Log your first check-in above!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {entries.slice(0, 5).map(entry => {
              const moodObj = MOODS.find(m => m.label === entry.mood) || { emoji: '💭', label: entry.mood };
              return (
                <div key={entry.id} style={{
                  background: '#FFF', borderRadius: '16px', padding: 'var(--space-lg)',
                  boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
                  display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '28px' }}>{moodObj.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600', color: 'var(--color-coffee)' }}>{moodObj.label}</span>
                      <span style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)' }}>{entry.date}</span>
                    </div>
                    {entry.note && (
                      <p style={{ fontSize: '14px', color: 'var(--color-charcoal-soft)', lineHeight: 1.5, margin: 0 }}>
                        {entry.note}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
