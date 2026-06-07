import { motion } from 'framer-motion';
import Avatar from '../ui/Avatar';
import ReactionBar from '../ui/ReactionBar';
import { MessageCircle, Bookmark } from 'lucide-react';
import { useState } from 'react';

export default function WhisperCard({ post, index = 0, style: customStyle = {} }) {
  const { author, time, content, reactions, comments, isAnonymous, circle } = post;
  const [expanded, setExpanded] = useState(false);

  const isLong = content.length > 150;
  const displayContent = isLong && !expanded ? content.slice(0, 150) + '...' : content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' }}
      style={{
        background: 'var(--color-ivory-dark)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
        boxShadow: 'var(--shadow-soft)',
        borderLeft: `3px solid ${post.circleColor || 'var(--color-terracotta)'}`,
        ...customStyle,
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        marginBottom: 'var(--space-sm)',
      }}>
        <Avatar name={author} size={36} isAnonymous={isAnonymous} />
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{
              fontWeight: '600',
              fontSize: '14px',
              color: 'var(--color-coffee)',
            }}>
              {isAnonymous ? 'Anonymous' : author}
            </span>
            {circle && (
              <span style={{
                fontSize: '11px',
                color: 'var(--color-charcoal-muted)',
              }}>
                in {circle}
              </span>
            )}
          </div>
          <span style={{
            fontSize: '12px',
            color: 'var(--color-charcoal-muted)',
          }}>
            {time}
          </span>
        </div>
      </div>

      {/* Content */}
      <p style={{
        fontSize: '14px',
        lineHeight: '1.6',
        color: 'var(--color-charcoal)',
        marginBottom: 'var(--space-sm)',
      }}>
        {displayContent}
        {isLong && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-terracotta)',
              fontWeight: '500',
              fontSize: '13px',
              cursor: 'pointer',
              padding: '0 4px',
            }}
          >
            Read more
          </button>
        )}
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <ReactionBar reactions={reactions} />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-md)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: 'var(--color-charcoal-muted)',
            fontSize: '12px',
          }}>
            <MessageCircle size={14} />
            {comments}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-charcoal-muted)',
              padding: '2px',
              display: 'flex',
            }}
          >
            <Bookmark size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
