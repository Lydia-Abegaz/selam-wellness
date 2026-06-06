import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, Mic, HelpCircle, BarChart2, ShieldCheck, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';

export default function CreatePost({ navigate, params }) {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [postType, setPostType] = useState('Text');
  const [isPosting, setIsPosting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const circleId = params?.circleId;

  const handlePost = () => {
    setIsPosting(true);
    
    fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        circle: circleId,
        isAnonymous
      })
    })
    .then(res => res.json())
    .then(data => {
      setIsPosting(false);
      setIsDone(true);
      setTimeout(() => {
        navigate('circle-feed', { id: circleId });
      }, 1500);
    })
    .catch(err => {
      console.error(err);
      setIsPosting(false);
      setIsDone(true);
      setTimeout(() => navigate('circle-feed', { id: circleId }), 1500);
    });
  };

  const types = [
    { id: 'Text', icon: null },
    { id: 'Image', icon: ImageIcon },
    { id: 'Voice', icon: Mic },
    { id: 'Question', icon: HelpCircle },
    { id: 'Poll', icon: BarChart2 },
  ];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--color-ivory)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-md)',
        borderBottom: '1px solid rgba(44,24,16,0.08)',
      }}>
        <button
          onClick={() => navigate('circle-feed', { id: circleId })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
        >
          <X size={24} color="var(--color-coffee)" />
        </button>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '600', color: 'var(--color-coffee)' }}>
          Share with your circle
        </span>
        <div style={{ width: '32px' }} /> {/* Spacer */}
      </div>

      <div style={{ padding: 'var(--space-md)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* User Info / Anonymous Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar name="Hana M." size={40} isAnonymous={isAnonymous} />
            <span style={{ fontWeight: '600', color: 'var(--color-coffee)' }}>
              {isAnonymous ? 'Anonymous' : 'Hana M.'}
            </span>
          </div>
          
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: 'var(--color-charcoal-soft)',
            cursor: 'pointer',
          }}>
            Post Anonymously
            <div style={{
              width: '40px', height: '24px',
              borderRadius: '12px',
              background: isAnonymous ? 'var(--color-terracotta)' : 'var(--color-parchment)',
              position: 'relative',
              transition: 'background 0.3s',
            }}>
              <motion.div
                layout
                style={{
                  width: '20px', height: '20px',
                  borderRadius: '10px',
                  background: '#FFF',
                  position: 'absolute',
                  top: '2px',
                  left: isAnonymous ? '18px' : '2px',
                }}
              />
            </div>
          </label>
        </div>

        {/* Anonymous Warning Card */}
        <AnimatePresence>
          {isAnonymous && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                background: 'var(--color-rose-soft)',
                border: '1px solid rgba(181, 118, 138, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-md)',
                marginBottom: 'var(--space-lg)',
                display: 'flex',
                gap: '12px',
              }}>
                <ShieldCheck size={20} color="var(--color-rose-deep)" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '13px', color: 'var(--color-charcoal-soft)' }}>
                  <p style={{ fontWeight: '600', color: 'var(--color-coffee)', marginBottom: '2px' }}>Safe Space Mode</p>
                  <p>Your name and photo will be hidden. Visible only within this circle.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Area */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your heart today?"
          style={{
            flex: 1,
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            color: 'var(--color-charcoal)',
            resize: 'none',
          }}
        />
        <div style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)', textAlign: 'right', marginTop: '8px' }}>
          Amharic keyboard supported
        </div>
      </div>

      {/* Footer Controls */}
      <div style={{
        padding: 'var(--space-md)',
        borderTop: '1px solid rgba(44,24,16,0.08)',
        background: 'var(--color-ivory)',
      }}>
        {/* Type Selector */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: 'var(--space-md)', overflowX: 'auto', paddingBottom: '4px' }}>
          {types.map(t => (
            <button
              key={t.id}
              onClick={() => setPostType(t.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                background: postType === t.id ? 'var(--color-parchment)' : 'transparent',
                border: 'none', borderRadius: '16px',
                padding: '6px 12px', cursor: 'pointer',
                color: postType === t.id ? 'var(--color-coffee)' : 'var(--color-charcoal-muted)',
                fontWeight: postType === t.id ? '500' : '400',
              }}
            >
              {t.icon && <t.icon size={16} />}
              {t.id}
            </button>
          ))}
        </div>

        {/* Status / Submit Button */}
        <AnimatePresence mode="wait">
          {isPosting ? (
            <motion.div key="posting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', padding: '14px', color: 'var(--color-charcoal-muted)' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: '16px', height: '16px', border: '2px solid var(--color-terracotta)', borderTopColor: 'transparent', borderRadius: '50%' }} />
              Reviewing your post...
            </motion.div>
          ) : isDone ? (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', padding: '14px', color: 'var(--color-sage)', fontWeight: '600' }}>
              <CheckCircle size={20} />
              Looks good. Posting now.
            </motion.div>
          ) : (
            <motion.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Button fullWidth onClick={handlePost} disabled={content.trim() === ''}>
                Share with Circle
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
