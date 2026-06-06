import { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import TopBar from '../components/layout/TopBar';

export default function Profile({ navigate }) {
  const [profile, setProfile] = useState({ name: 'Hana M.', bio: 'Growing day by day, finding peace in community.' });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/profile').then(r => r.json()),
      fetch('/api/bookings').then(r => r.json()),
    ])
    .then(([profileData, bookingsData]) => {
      if (profileData) setProfile(profileData);
      if (bookingsData) setBookings(bookingsData);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, []);

  return (
    <PageWrapper>
      <TopBar title="Profile" showBack onBack={() => navigate('home')} />

      {/* Avatar + Name */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-terracotta), var(--color-coffee))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#FFF', fontSize: '32px', fontWeight: '700',
          marginBottom: 'var(--space-md)',
          boxShadow: '0 4px 20px rgba(193,68,14,0.3)',
        }}>
          {profile.name?.[0] || 'H'}
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-coffee)', marginBottom: '4px' }}>
          {profile.name}
        </h2>
        <p style={{ color: 'var(--color-charcoal-soft)', fontSize: '14px', textAlign: 'center', maxWidth: '280px' }}>
          {profile.bio}
        </p>
      </div>

      {/* Stats Row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        background: '#FFF', borderRadius: '16px', padding: 'var(--space-lg)',
        boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
        marginBottom: 'var(--space-xl)',
        textAlign: 'center',
      }}>
        {[
          { label: 'Circles', value: '4' },
          { label: 'Bookings', value: bookings.length },
          { label: 'Day Streak', value: '12' },
        ].map((stat, i) => (
          <div key={i} style={{ borderRight: i < 2 ? '1px solid rgba(44,24,16,0.08)' : 'none' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-terracotta)', fontFamily: 'var(--font-display)' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)', marginTop: '2px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Booking History */}
      <section>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-coffee)', marginBottom: 'var(--space-md)' }}>
          Booking History
        </h3>

        {loading && (
          <div style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--color-charcoal-muted)' }}>
            Loading...
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <div style={{
            background: '#FFF', borderRadius: '16px', padding: 'var(--space-xl)',
            textAlign: 'center', color: 'var(--color-charcoal-muted)',
            boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
          }}>
            <p style={{ marginBottom: '4px' }}>No bookings yet.</p>
            <p style={{ fontSize: '13px' }}>Book a retreat to see your history here.</p>
            <button
              onClick={() => navigate('retreats')}
              style={{
                marginTop: 'var(--space-md)', background: 'var(--color-terracotta)',
                color: '#FFF', border: 'none', padding: '10px 24px',
                borderRadius: 'var(--radius-full)', fontSize: '14px',
                fontWeight: '500', cursor: 'pointer',
              }}
            >
              Explore Retreats
            </button>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {bookings.map((booking) => (
              <div key={booking.id} style={{
                background: '#FFF', borderRadius: '16px', padding: 'var(--space-lg)',
                boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
                borderLeft: '4px solid var(--color-sage)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--color-coffee)', fontSize: '15px' }}>
                    {booking.expName}
                  </span>
                  <span style={{ fontSize: '11px', color: '#FFF', background: 'var(--color-sage)', padding: '2px 10px', borderRadius: '99px', fontWeight: '600' }}>
                    Confirmed
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-xl)', fontSize: '13px', color: 'var(--color-charcoal-muted)' }}>
                  <span>📅 {booking.date}</span>
                  <span>👥 {booking.adults} adult{booking.adults > 1 ? 's' : ''}</span>
                  <span>💳 ETB {booking.totalPrice?.toLocaleString()}</span>
                </div>
                <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--color-charcoal-muted)', fontFamily: 'monospace' }}>
                  Ref: {booking.reference}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
