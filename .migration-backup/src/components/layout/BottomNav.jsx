import { motion } from 'framer-motion';
import { Home, Users, Flower2, Mountain, User } from 'lucide-react';

const TABS = [
  { id: 'home',     label: 'Home',     Icon: Home     },
  { id: 'circles',  label: 'Circles',  Icon: Users    },
  { id: 'womens',   label: 'Wellness', Icon: Flower2  },
  { id: 'retreats', label: 'Retreats', Icon: Mountain },
  { id: 'profile',  label: 'Profile',  Icon: User     },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <nav style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '72px',
      background: 'rgba(250, 243, 224, 0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderTop: '1px solid rgba(44, 24, 16, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <motion.button
            key={id}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate(id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? 'var(--color-coffee)' : 'var(--color-charcoal-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: isActive ? '600' : '400',
              padding: '8px 12px',
              position: 'relative',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  width: '24px',
                  height: '3px',
                  background: 'var(--color-terracotta)',
                  borderRadius: '0 0 4px 4px',
                  transform: 'translateX(-50%)',
                }}
              />
            )}
            <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
            {label}
          </motion.button>
        );
      })}
    </nav>
  );
}
