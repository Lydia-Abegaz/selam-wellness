import { motion } from 'framer-motion';
import { Users, Lock, Phone } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useState } from 'react';

export default function CircleCard({ circle, compact = false, onTap, onCall, index = 0 }) {
  const [joined, setJoined] = useState(false);

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.3 }}
        whileTap={{ scale: 0.97 }}
        onClick={onTap}
        style={{
          background: 'var(--color-ivory-dark)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-md)',
          minWidth: '140px',
          cursor: 'pointer',
          borderTop: `3px solid ${circle.color}`,
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: '600',
          fontSize: '15px',
          color: 'var(--color-coffee)',
          marginBottom: '4px',
        }}>
          {circle.name}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '11px',
          color: 'var(--color-charcoal-muted)',
        }}>
          <Users size={12} />
          {circle.members.toLocaleString()}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      style={{
        background: 'var(--color-ivory-dark)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
        boxShadow: 'var(--shadow-card)',
        borderLeft: `4px solid ${circle.color}`,
        cursor: 'pointer',
      }}
      onClick={onTap}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 'var(--space-sm)',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '4px',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: '600',
              fontSize: '18px',
              color: 'var(--color-coffee)',
            }}>
              {circle.name}
            </h3>
            {circle.isWomensOnly && <Lock size={14} color="var(--color-rose-deep)" />}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
          }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              color: 'var(--color-charcoal-muted)',
            }}>
              <Users size={13} />
              {circle.members.toLocaleString()} members
            </span>
            <Badge variant={circle.activity === 'Very Active' ? 'active' : 'default'}>
              {circle.activity}
            </Badge>
          </div>
        </div>
      </div>

      <p style={{
        fontSize: '13px',
        color: 'var(--color-charcoal-soft)',
        lineHeight: '1.5',
        marginBottom: 'var(--space-md)',
      }}>
        {circle.description}
      </p>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <motion.div animate={joined ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 0.4 }}>
          <Button
            variant={joined ? 'secondary' : 'primary'}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setJoined(!joined);
            }}
          >
            {joined ? '✓ Joined' : 'Join Circle'}
          </Button>
        </motion.div>
        
        {joined && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (onCall) onCall();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-terracotta)' }}
          >
            <Phone size={14} />
            Anonymous Call
          </Button>
        )}
      </div>
    </motion.div>
  );
}
