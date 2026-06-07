// WebRTC peer connection logic goes here in production (using a signaling server).
// In demo mode, the connection is simulated after a 3-second match delay.

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mic, MicOff, X } from 'lucide-react';

export default function CallModal({ onClose }) {
  const [callState, setCallState] = useState('waiting'); // waiting, connected, ended
  const [muted, setMuted] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (callState === 'waiting') {
      const timeout = setTimeout(() => {
        setCallState('connected');
      }, 3000);
      return () => clearTimeout(timeout);
    }
    
    if (callState === 'connected') {
      const interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [callState]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleEndCall = () => {
    setCallState('ended');
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(26,26,26,0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: '#FFF',
          borderRadius: '24px',
          padding: '32px',
          width: '90%',
          maxWidth: '360px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
      >
        {callState === 'waiting' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{
                width: '80px', height: '80px',
                borderRadius: '50%',
                background: 'rgba(122,158,126,0.2)',
                border: '2px solid var(--color-sage)',
                marginBottom: '24px',
              }}
            />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-coffee)', marginBottom: '8px' }}>
              Finding someone in your circle...
            </h3>
            <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '14px', marginBottom: '32px' }}>
              You will both remain completely anonymous
            </p>
            <button onClick={onClose} style={{
              background: 'none', border: '1px solid rgba(44,24,16,0.2)',
              padding: '10px 24px', borderRadius: '999px',
              color: 'var(--color-charcoal-soft)', fontWeight: '600', cursor: 'pointer'
            }}>
              Cancel
            </button>
          </div>
        )}

        {callState === 'connected' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={styles.avatar}>A</div>
              <div style={styles.avatar}>A</div>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-coffee)', marginBottom: '8px' }}>
              Connected anonymously
            </h3>
            <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '14px', marginBottom: '8px' }}>
              Remember: be kind. This person trusted your circle.
            </p>
            <div style={{ fontSize: '24px', fontFamily: 'monospace', fontWeight: '600', color: 'var(--color-terracotta)', marginBottom: '32px' }}>
              {formatTime(timer)}
            </div>
            
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
              <button onClick={() => setMuted(!muted)} style={{ ...styles.actionBtn, background: muted ? 'rgba(44,24,16,0.1)' : 'transparent', border: '1px solid rgba(44,24,16,0.2)' }}>
                {muted ? <MicOff size={24} color="var(--color-charcoal-soft)" /> : <Mic size={24} color="var(--color-coffee)" />}
              </button>
              <button onClick={handleEndCall} style={{ ...styles.actionBtn, background: '#D32F2F' }}>
                <Phone size={24} color="#FFF" style={{ transform: 'rotate(135deg)' }} />
              </button>
            </div>
          </div>
        )}

        {callState === 'ended' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(44,24,16,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Phone size={32} color="var(--color-charcoal-muted)" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-coffee)', marginBottom: '8px' }}>
              Call ended
            </h3>
            <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '14px', marginBottom: '32px' }}>
              Thank you for showing up for someone today.
            </p>
            <button onClick={onClose} style={{
              background: 'var(--color-coffee)', border: 'none',
              padding: '12px 32px', borderRadius: '999px',
              color: '#FFF', fontWeight: '600', cursor: 'pointer'
            }}>
              Close
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

const styles = {
  avatar: {
    width: '64px', height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--color-rose-soft), var(--color-terracotta))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#FFF', fontSize: '24px', fontWeight: '600'
  },
  actionBtn: {
    width: '56px', height: '56px',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', border: 'none',
  }
};
