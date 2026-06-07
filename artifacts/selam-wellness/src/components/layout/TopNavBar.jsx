import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, LogOut, ChevronDown } from 'lucide-react';

export default function TopNavBar({ activeTab, onNavigate, user, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const tabs = [
    { id: 'home',         label: 'Home' },
    { id: 'circles',      label: 'Circles' },
    { id: 'womens',       label: "Women's" },
    { id: 'events',       label: 'Events' },
    { id: 'growth',       label: 'Growth' },
    { id: 'profile',      label: 'Profile' },
  ];

  const isActive = (id) => activeTab === id;

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--space-2xl)',
      height: '64px',
      background: 'rgba(253,249,244,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-outline-variant)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo */}
      <div
        onClick={() => onNavigate('home')}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: '700',
          fontSize: '18px',
          color: 'var(--color-coffee)',
          cursor: 'pointer',
          letterSpacing: '0.01em',
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        Selam Wellness
      </div>

      {/* Center Tabs */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            style={{
              background: isActive(tab.id) ? 'rgba(44,24,16,0.07)' : 'transparent',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '999px',
              fontSize: '13.5px',
              fontWeight: isActive(tab.id) ? '600' : '500',
              color: isActive(tab.id) ? 'var(--color-coffee)' : 'var(--color-charcoal-soft)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
              position: 'relative',
            }}
          >
            {tab.label}
            {isActive(tab.id) && (
              <motion.div
                layoutId="nav-indicator"
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: '14px',
                  right: '14px',
                  height: '2px',
                  background: 'var(--color-terracotta)',
                  borderRadius: '1px',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Right — Bell + User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* Notification Bell Placeholder (no active route for MVP) */}
        <button
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-charcoal-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px', borderRadius: '50%',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(44,24,16,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <Bell size={20} strokeWidth={1.6} />
        </button>

        {/* User Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: showUserMenu ? 'rgba(44,24,16,0.08)' : 'rgba(44,24,16,0.05)',
              border: 'none',
              padding: '6px 12px 6px 6px',
              borderRadius: '999px',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-coffee))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FAF3E0', fontSize: '13px', fontWeight: '700',
              flexShrink: 0,
            }}>
              {user?.name?.[0] || 'H'}
            </div>
            <span style={{
              fontSize: '13px', fontWeight: '600',
              color: 'var(--color-coffee)',
              maxWidth: '80px',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {user?.name?.split(' ')[0] || 'Hana'}
            </span>
            <ChevronDown
              size={14}
              color="var(--color-charcoal-muted)"
              style={{ transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
            />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  background: '#FFF',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(44,24,16,0.14)',
                  border: '1px solid rgba(44,24,16,0.08)',
                  minWidth: '200px',
                  overflow: 'hidden',
                  zIndex: 200,
                }}
              >
                {/* User info header */}
                <div style={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(44,24,16,0.06)',
                }}>
                  <div style={{ fontWeight: '600', color: 'var(--color-coffee)', fontSize: '14px' }}>
                    {user?.name || 'Hana M.'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)', marginTop: '2px' }}>
                    {user?.email || 'hana@selam.et'}
                  </div>
                </div>

                {[
                  { label: 'My Profile',    icon: User,    action: 'profile' },
                  { label: 'Self-Care Hub', icon: null,    action: 'journal', emoji: '🌿' },
                ].map(item => (
                  <button
                    key={item.action}
                    onClick={() => { onNavigate(item.action); setShowUserMenu(false); }}
                    style={{
                      width: '100%', background: 'none', border: 'none',
                      padding: '11px 16px',
                      display: 'flex', alignItems: 'center', gap: '10px',
                      fontSize: '14px', color: 'var(--color-charcoal-soft)',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(44,24,16,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    {item.icon ? (
                      <item.icon size={16} color="var(--color-charcoal-muted)" />
                    ) : (
                      <span style={{ fontSize: '16px', lineHeight: 1 }}>{item.emoji}</span>
                    )}
                    {item.label}
                  </button>
                ))}

                {/* Divider + Logout */}
                <div style={{ borderTop: '1px solid rgba(44,24,16,0.06)' }}>
                  <button
                    onClick={() => { setShowUserMenu(false); onLogout(); }}
                    style={{
                      width: '100%', background: 'none', border: 'none',
                      padding: '11px 16px',
                      display: 'flex', alignItems: 'center', gap: '10px',
                      fontSize: '14px', color: 'var(--color-terracotta)',
                      cursor: 'pointer', fontWeight: '500',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(164,74,58,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
