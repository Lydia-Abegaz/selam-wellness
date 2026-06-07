import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import TopBar from '../../components/layout/TopBar';
import Button from '../../components/ui/Button';

const TOPICS = [
  { id: 1, title: "Menstrual Health", tag: "Reproductive", summary: "Understanding your cycle, common irregularities, endometriosis, PCOS, and when to seek care.", detail: "PCOS affects 1 in 10 women. Endometriosis affects 1 in 8. Both are frequently underdiagnosed in Ethiopia. Symptoms: irregular periods, pelvic pain, fatigue.", source: "WHO, ACOG" },
  { id: 2, title: "Hormonal Health", tag: "Endocrine", summary: "Thyroid disorders, hormonal imbalances, perimenopause, and mood changes across the cycle.", detail: "Thyroid disorders are 5–8x more common in women. Hormonal shifts affect mood, sleep, and energy. Regular TSH screening is recommended after 35.", source: "American Thyroid Association" },
  { id: 3, title: "Mental Health & Women", tag: "Mental Wellness", summary: "Postpartum depression, anxiety, trauma responses, and the unique mental health profile of women.", detail: "1 in 5 women experience postpartum depression. In Ethiopia, studies show rates as high as 34% but most go undiagnosed.", source: "Ethiopian Journal of Health Sciences, WHO" },
  { id: 4, title: "Nutrition & Anemia", tag: "Nutrition", summary: "Iron deficiency, teff-based nutrition, pregnancy nutrition, and cycle-aware eating.", detail: "Iron deficiency anemia affects 29% of Ethiopian women of reproductive age. Teff is one of the richest plant sources of iron globally.", source: "Ethiopian Public Health Institute" },
  { id: 5, title: "Cervical & Breast Health", tag: "Screening", summary: "HPV, cervical cancer screening, breast self-exam, and when to see a doctor.", detail: "Cervical cancer is the most common cancer among Ethiopian women. HPV vaccination and annual Pap smears are the most effective prevention.", source: "IARC, Ethiopian Cancer Association" },
  { id: 6, title: "Pregnancy & Maternal Health", tag: "Maternal", summary: "Prenatal care, warning signs, maternal mental health, and postpartum recovery.", detail: "Ethiopia has made significant progress reducing maternal mortality, but gaps remain in rural access. Every woman deserves evidence-based prenatal care.", source: "WHO Ethiopia" },
  { id: 7, title: "Sexual & Reproductive Rights", tag: "Rights", summary: "Informed consent, access to contraception, understanding your reproductive rights.", detail: "Access to family planning reduces maternal mortality by up to 44%. All women have the right to make informed decisions about their reproductive health.", source: "UNFPA" },
  { id: 8, title: "Awareness & Advocacy", tag: "Community", summary: "How to raise awareness in your community, talk to family, and support other women.", detail: "Community health education led by women has been shown to improve health outcomes more than clinical interventions alone.", source: "Lancet Global Health" }
];

export default function WomensHaven({ navigate, user }) {
  const [posts, setPosts] = useState([]);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [composerText, setComposerText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || '') + '/api/posts?circle=womens')
      .then(r => r.json())
      .then(d => { if (d && d.length) setPosts(d); })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = () => {
    if (!composerText.trim()) return;
    setIsSubmitting(true);
    // Simulate posting
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        author: isAnonymous ? 'Anonymous' : (user?.name || 'Hana M.'),
        avatar: '', // Use initials fallback
        content: composerText,
        time: 'Just now',
        likes: 0,
        comments: 0
      };
      setPosts(prev => [newPost, ...prev]);
      setComposerText('');
      setIsAnonymous(false);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <PageWrapper>
      <TopBar title="Women's Health" />

      {/* SECTION 1 - Hero Intro */}
      <section style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 36px)',
          color: 'var(--color-coffee)',
          lineHeight: 1.1
        }}>
          Know your body. Own your health.
        </h1>
      </section>

      {/* SECTION 2 - Health Topics Grid */}
      <section style={{ marginBottom: 'var(--space-2xl)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {TOPICS.map((topic, i) => {
            const isExpanded = expandedTopic === topic.id;
            return (
              <motion.div
                key={topic.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                style={{
                  background: '#FFF',
                  borderRadius: '16px',
                  padding: 'var(--space-lg)',
                  border: '1px solid rgba(44,24,16,0.06)',
                  cursor: 'pointer',
                  boxShadow: isExpanded ? '0 8px 24px rgba(44,24,16,0.08)' : '0 2px 8px rgba(44,24,16,0.03)',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: 'var(--color-rose-deep)',
                    background: 'var(--color-rose-soft)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}>
                    {topic.tag}
                  </span>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                    <ChevronDown size={18} color="var(--color-charcoal-muted)" />
                  </motion.div>
                </div>
                
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  color: 'var(--color-coffee)',
                  margin: 0
                }}>
                  {topic.title}
                </h3>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    >
                      <div style={{
                        background: 'rgba(247,219,223,0.3)',
                        padding: '16px',
                        borderRadius: '8px',
                      }}>
                        <p style={{ fontSize: '14px', color: 'var(--color-charcoal-soft)', lineHeight: 1.6, margin: '0 0 12px 0' }}>
                          {topic.detail}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-charcoal-muted)' }}>
                          <FileText size={12} /> Source: {topic.source}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3 - Raise Awareness Post Composer */}
      <section style={{ marginBottom: 'var(--space-2xl)' }}>
        <div style={{
          background: '#FFF',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(44,24,16,0.04)',
          border: '1px solid rgba(44,24,16,0.06)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-coffee)', marginBottom: '16px' }}>
            Share your story or raise awareness
          </h3>
          <textarea
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
            placeholder="Share an experience, ask a question, or raise awareness about a women's health topic..."
            style={{
              width: '100%', background: 'var(--color-parchment)', border: 'none',
              borderRadius: '12px', padding: '16px', outline: 'none',
              fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-charcoal)',
              resize: 'none', minHeight: '100px', boxSizing: 'border-box',
              marginBottom: '16px'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-charcoal-soft)', cursor: 'pointer' }}>
              <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} style={{ accentColor: 'var(--color-rose-deep)' }} />
              Post anonymously
            </label>
            <Button variant="womens" onClick={handleSubmit} disabled={!composerText.trim() || isSubmitting}>
              {isSubmitting ? 'Sharing...' : 'Share with the community'}
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4 - Community Whispers */}
      <section>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-coffee)', marginBottom: '16px' }}>
          Community Whispers
        </h3>
        {posts.length === 0 ? (
          <p style={{ color: 'var(--color-charcoal-muted)' }}>No posts yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {posts.map(post => (
              <div key={post.id} style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: 'var(--space-lg)',
                boxShadow: 'var(--shadow-soft)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-rose-soft), var(--color-rose-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: '600', fontSize: '14px' }}>
                      {post.author?.[0] || 'A'}
                    </div>
                    <span style={{ fontWeight: '600', fontSize: '15px' }}>{post.author}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)' }}>{post.time}</span>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--color-charcoal-soft)', lineHeight: 1.6, marginBottom: 'var(--space-md)' }}>
                  {post.content}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '16px', color: 'var(--color-charcoal-muted)', fontSize: '13px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={14} /> {post.likes || post.reactions?.['🤍'] || 0}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageCircle size={14} /> {post.comments}</span>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: 'var(--color-terracotta)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Read More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </PageWrapper>
  );
}
