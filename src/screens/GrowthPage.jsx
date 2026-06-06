import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Edit3, Smile, Target, CheckCircle, Plus } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import TopBar from '../components/layout/TopBar';
import Button from '../components/ui/Button';

const LESSONS_DATA = [
  { id: 1, topic: 'Emotional Intelligence', title: 'What is a feeling vs a thought?', xp: 10 },
  { id: 2, topic: 'Emotional Intelligence', title: 'The pause: responding vs reacting', xp: 10 },
  { id: 3, topic: 'Wellness Basics', title: 'What sleep actually does to your brain', xp: 10 },
  { id: 4, topic: 'Wellness Basics', title: 'Why your gut and mood are connected', xp: 10 },
  { id: 5, topic: 'Relationships', title: 'Setting a boundary without guilt', xp: 15 },
  { id: 6, topic: 'Relationships', title: 'How to ask for what you need', xp: 15 },
  { id: 7, topic: 'Stress & Regulation', title: 'The 5-4-3-2-1 grounding method', xp: 10 },
  { id: 8, topic: 'Stress & Regulation', title: 'Why deep breathing actually works', xp: 10 },
];

const SIDEBAR_TABS = ['Lessons', 'Journal', 'Mood', 'Goals'];

export default function GrowthPage({ navigate }) {
  const [activeSection, setActiveSection] = useState('Lessons');
  const [toastMessage, setToastMessage] = useState(null);

  // Lessons State
  const [completedLessons, setCompletedLessons] = useState([]);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [lessonSlide, setLessonSlide] = useState(0);

  // Journal/Mood State
  const [journalEntries, setJournalEntries] = useState([]);
  const [journalText, setJournalText] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [moodReason, setMoodReason] = useState('');

  // Goals State
  const [goals, setGoals] = useState([
    { id: 1, text: 'Complete 3 wellness lessons this week', done: false },
    { id: 2, text: 'Write in my journal 3 times', done: false }
  ]);
  const [newGoalText, setNewGoalText] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalXP = completedLessons.reduce((sum, id) => {
    const lesson = LESSONS_DATA.find(l => l.id === id);
    return sum + (lesson ? lesson.xp : 0);
  }, 0);

  const handleCompleteLesson = (lesson) => {
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons([...completedLessons, lesson.id]);
      showToast(`+${lesson.xp} XP earned!`);
    }
    setActiveLessonId(null);
    setLessonSlide(0);
  };

  const handleSaveJournal = () => {
    if (!journalText.trim()) return;
    setJournalEntries([{ id: Date.now(), text: journalText, time: 'Just now', type: 'journal' }, ...journalEntries]);
    setJournalText('');
    showToast('Journal entry saved privately.');
  };

  const handleSaveMood = () => {
    if (!selectedMood) return;
    setJournalEntries([{ id: Date.now(), text: `Felt ${selectedMood}. ${moodReason}`, time: 'Just now', type: 'mood' }, ...journalEntries]);
    setSelectedMood('');
    setMoodReason('');
    showToast('Mood logged privately.');
  };

  const handleAddGoal = () => {
    if (!newGoalText.trim()) return;
    setGoals([...goals, { id: Date.now(), text: newGoalText, done: false }]);
    setNewGoalText('');
  };

  const handleToggleGoal = (id) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        if (!g.done) showToast('Goal completed! 🎉');
        return { ...g, done: !g.done };
      }
      return g;
    }));
  };

  return (
    <PageWrapper>
      <TopBar title="Growth" showBack onBack={() => navigate('home')} />

      <div style={{
        display: 'flex',
        gap: '32px',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '24px 0'
      }}>
        {/* LEFT SIDEBAR */}
        <div style={{ width: '200px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{
            background: 'var(--color-ivory)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(44,24,16,0.05)'
          }}>
            <div style={{ fontSize: '13px', color: 'var(--color-charcoal-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total XP</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-sage)', fontFamily: 'var(--font-display)' }}>⚡️ {totalXP}</div>
          </div>

          {SIDEBAR_TABS.map(tab => {
            const isActive = activeSection === tab;
            let Icon = BookOpen;
            if (tab === 'Journal') Icon = Edit3;
            if (tab === 'Mood') Icon = Smile;
            if (tab === 'Goals') Icon = Target;

            return (
              <button
                key={tab}
                onClick={() => setActiveSection(tab)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  border: isActive ? '1px solid rgba(44,24,16,0.1)' : 'none',
                  background: isActive ? '#FFF' : 'transparent',
                  color: isActive ? 'var(--color-coffee)' : 'var(--color-charcoal-soft)',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '15px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: isActive ? '0 4px 12px rgba(44,24,16,0.05)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={18} color={isActive ? 'var(--color-terracotta)' : 'var(--color-charcoal-muted)'} />
                {tab}
              </button>
            );
          })}
        </div>

        {/* RIGHT CONTENT */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {activeSection === 'Lessons' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-coffee)', marginBottom: '8px' }}>Learn & Grow</h2>
              <p style={{ color: 'var(--color-charcoal-soft)', marginBottom: '32px' }}>Micro-lessons on emotional intelligence and wellness.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {LESSONS_DATA.map(lesson => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  return (
                    <div key={lesson.id} style={{
                      background: '#FFF', borderRadius: '16px', padding: '20px',
                      border: '1px solid rgba(44,24,16,0.06)',
                      display: 'flex', flexDirection: 'column'
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-terracotta)', textTransform: 'uppercase', marginBottom: '8px' }}>
                        {lesson.topic}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--color-coffee)', marginBottom: '16px', flex: 1 }}>
                        {lesson.title}
                      </h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-sage)' }}>⚡️ {lesson.xp} XP</span>
                        {isCompleted ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-sage)', fontSize: '14px', fontWeight: '600' }}>
                            <CheckCircle size={16} /> Completed
                          </div>
                        ) : (
                          <Button size="sm" onClick={() => setActiveLessonId(lesson.id)}>Start</Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeSection === 'Journal' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-coffee)', marginBottom: '8px' }}>Your private journal</h2>
              <p style={{ color: 'var(--color-charcoal-soft)', marginBottom: '32px' }}>Never shared, never sold.</p>

              <div style={{ background: '#FFF', borderRadius: '16px', padding: '20px', border: '1px solid rgba(44,24,16,0.06)', marginBottom: '32px' }}>
                <textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="What's on your mind today?"
                  style={{
                    width: '100%', background: 'var(--color-parchment)', border: 'none', borderRadius: '8px',
                    padding: '16px', minHeight: '120px', resize: 'none', outline: 'none',
                    fontFamily: 'var(--font-body)', fontSize: '15px', marginBottom: '16px', boxSizing: 'border-box'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={handleSaveJournal} disabled={!journalText.trim()}>Save Entry</Button>
                </div>
              </div>

              {journalEntries.filter(e => e.type === 'journal').map(entry => (
                <div key={entry.id} style={{ padding: '16px 0', borderBottom: '1px solid rgba(44,24,16,0.06)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)', marginBottom: '8px' }}>{entry.time}</div>
                  <div style={{ color: 'var(--color-charcoal-soft)', lineHeight: 1.6 }}>{entry.text}</div>
                </div>
              ))}
            </motion.div>
          )}

          {activeSection === 'Mood' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-coffee)', marginBottom: '32px' }}>Mood Check-in</h2>

              <div style={{ background: '#FFF', borderRadius: '16px', padding: '32px', border: '1px solid rgba(44,24,16,0.06)', textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
                  {['😔', '😐', '🙂', '😊', '😄'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => setSelectedMood(emoji)}
                      style={{
                        fontSize: '40px', background: selectedMood === emoji ? 'var(--color-parchment)' : 'transparent',
                        border: selectedMood === emoji ? '2px solid var(--color-coffee)' : '2px solid transparent',
                        borderRadius: '50%', width: '70px', height: '70px', cursor: 'pointer',
                        transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                {selectedMood && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <textarea
                      value={moodReason}
                      onChange={(e) => setMoodReason(e.target.value)}
                      placeholder="What's behind this feeling?"
                      style={{
                        width: '100%', background: 'var(--color-parchment)', border: 'none', borderRadius: '8px',
                        padding: '16px', minHeight: '80px', resize: 'none', outline: 'none',
                        fontFamily: 'var(--font-body)', fontSize: '15px', marginBottom: '16px', boxSizing: 'border-box'
                      }}
                    />
                    <Button onClick={handleSaveMood}>Log Mood</Button>
                  </motion.div>
                )}
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-coffee)', marginBottom: '16px' }}>Recent Check-ins</h3>
              {journalEntries.filter(e => e.type === 'mood').slice(0, 5).map(entry => (
                <div key={entry.id} style={{ padding: '12px 0', borderBottom: '1px solid rgba(44,24,16,0.06)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)', marginBottom: '4px' }}>{entry.time}</div>
                  <div style={{ color: 'var(--color-charcoal-soft)' }}>{entry.text}</div>
                </div>
              ))}
            </motion.div>
          )}

          {activeSection === 'Goals' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-coffee)', marginBottom: '8px' }}>Your growth goals</h2>
              <p style={{ color: 'var(--color-charcoal-soft)', marginBottom: '32px' }}>Small steps lead to big changes.</p>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                <input
                  type="text"
                  value={newGoalText}
                  onChange={(e) => setNewGoalText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddGoal()}
                  placeholder="Add a new goal..."
                  style={{
                    flex: 1, background: '#FFF', border: '1px solid rgba(44,24,16,0.1)', borderRadius: '8px',
                    padding: '12px 16px', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '15px'
                  }}
                />
                <Button onClick={handleAddGoal}><Plus size={20} /></Button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {goals.map(goal => (
                  <div key={goal.id} style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    background: '#FFF', padding: '16px', borderRadius: '12px',
                    border: '1px solid rgba(44,24,16,0.06)',
                    opacity: goal.done ? 0.6 : 1
                  }}>
                    <input
                      type="checkbox"
                      checked={goal.done}
                      onChange={() => handleToggleGoal(goal.id)}
                      style={{ width: '20px', height: '20px', accentColor: 'var(--color-sage)', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '16px', color: 'var(--color-coffee)', textDecoration: goal.done ? 'line-through' : 'none' }}>
                      {goal.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lesson Modal */}
      {activeLessonId && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{
            background: '#FFF', borderRadius: '24px', padding: '32px', width: '90%', maxWidth: '400px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-coffee)', marginBottom: '24px' }}>
              {LESSONS_DATA.find(l => l.id === activeLessonId)?.title}
            </h3>
            
            <div style={{ height: '120px', display: 'flex', alignItems: 'center', fontSize: '16px', color: 'var(--color-charcoal-soft)', lineHeight: 1.6, marginBottom: '32px' }}>
              {lessonSlide === 0 && "Your brain is wired to protect you, which is why we often react emotionally before thinking logically."}
              {lessonSlide === 1 && "Creating a pause—even just taking one deep breath—allows your prefrontal cortex to catch up."}
              {lessonSlide === 2 && "This pause is the difference between an impulsive reaction and an intentional response. You have the power to choose."}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === lessonSlide ? 'var(--color-terracotta)' : 'var(--color-parchment)' }} />
                ))}
              </div>
              <Button onClick={() => {
                if (lessonSlide < 2) setLessonSlide(s => s + 1);
                else handleCompleteLesson(LESSONS_DATA.find(l => l.id === activeLessonId));
              }}>
                {lessonSlide < 2 ? 'Next' : 'Complete Lesson'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            style={{
              position: 'fixed', bottom: '40px', left: '50%',
              background: 'var(--color-sage)', color: '#FFF',
              padding: '12px 24px', borderRadius: '999px',
              fontSize: '14px', fontWeight: '600',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 8px 24px rgba(122,158,126,0.3)', zIndex: 1000
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
