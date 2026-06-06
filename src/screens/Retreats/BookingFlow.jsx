import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar as CalendarIcon, Users, CreditCard, Check, Lock, Plus, Minus } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import TopBar from '../../components/layout/TopBar';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ConfirmationBloom from '../../components/ui/ConfirmationBloom';
import { mockExperiences } from '../../data/mockExperiences';

export default function BookingFlow({ navigate, params }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(null);
  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBloom, setShowBloom] = useState(false);

  const expId = params?.id || mockExperiences[0].id;
  const exp = mockExperiences.find(e => e.id === expId) || mockExperiences[0];
  const totalPrice = exp.price * guests.adults + (exp.price * 0.5) * guests.children;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBook = () => {
    setIsProcessing(true);
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expId: exp.id,
        expName: exp.name,
        date,
        adults: guests.adults,
        children: guests.children,
        totalPrice,
        paymentMethod
      })
    })
    .then(res => res.json())
    .then(data => {
      setIsProcessing(false);
      setStep(4);
      setShowBloom(true);
    })
    .catch(err => {
      console.error('Booking error:', err);
      setIsProcessing(false);
      setStep(4);
      setShowBloom(true);
    });
  };

  // Step animations
  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3 }
  };

  const renderStep1 = () => (
    <motion.div key="step1" {...slideVariants}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-coffee)', marginBottom: 'var(--space-md)' }}>Select Date</h2>
      
      {/* Custom Calendar Grid Simulation */}
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '8px' }}>
          {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)' }}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const dayNum = i + 1;
            const fullDateStr = `2026-06-${dayNum.toString().padStart(2, '0')}`;
            const isAvailable = exp.available.includes(fullDateStr);
            const isSelected = date === fullDateStr;

            return (
              <motion.button
                key={i}
                whileTap={isAvailable ? { scale: 0.9 } : {}}
                onClick={() => isAvailable && setDate(fullDateStr)}
                disabled={!isAvailable}
                style={{
                  aspectRatio: '1/1',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? '2px solid var(--color-terracotta)' : '1px solid transparent',
                  background: isSelected ? 'var(--color-terracotta)' : isAvailable ? 'rgba(122,158,126,0.15)' : 'transparent',
                  color: isSelected ? '#FFF' : isAvailable ? 'var(--color-sage)' : 'var(--color-charcoal-muted)',
                  opacity: isAvailable ? 1 : 0.3,
                  cursor: isAvailable ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: isSelected ? '600' : '400',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                {dayNum}
              </motion.button>
            );
          })}
        </div>
      </Card>
      
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <Button fullWidth onClick={handleNext} disabled={!date}>Continue to Guests</Button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div key="step2" {...slideVariants}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-coffee)', marginBottom: 'var(--space-md)' }}>Who is going?</h2>
      
      <Card style={{ marginBottom: 'var(--space-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
          <div>
            <div style={{ fontWeight: '600', color: 'var(--color-coffee)' }}>Adults</div>
            <div style={{ fontSize: '13px', color: 'var(--color-charcoal-muted)' }}>Age 13+</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setGuests(p => ({...p, adults: Math.max(1, p.adults - 1)}))} style={styles.counterBtn}><Minus size={16} /></button>
            <span style={{ fontSize: '18px', fontWeight: '600', width: '20px', textAlign: 'center' }}>{guests.adults}</span>
            <button onClick={() => setGuests(p => ({...p, adults: p.adults + 1}))} style={styles.counterBtn}><Plus size={16} /></button>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: '600', color: 'var(--color-coffee)' }}>Children</div>
            <div style={{ fontSize: '13px', color: 'var(--color-charcoal-muted)' }}>Ages 2-12</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setGuests(p => ({...p, children: Math.max(0, p.children - 1)}))} style={styles.counterBtn}><Minus size={16} /></button>
            <span style={{ fontSize: '18px', fontWeight: '600', width: '20px', textAlign: 'center' }}>{guests.children}</span>
            <button onClick={() => setGuests(p => ({...p, children: p.children + 1}))} style={styles.counterBtn}><Plus size={16} /></button>
          </div>
        </div>
      </Card>
      
      <div style={{ padding: 'var(--space-md) 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '600', color: 'var(--color-coffee)' }}>
          <span>Total</span>
          <span>ETB {totalPrice.toLocaleString()}</span>
        </div>
      </div>
      
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <Button fullWidth onClick={handleNext}>Continue to Payment</Button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div key="step3" {...slideVariants}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-coffee)', marginBottom: 'var(--space-md)' }}>Payment</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: 'var(--space-xl)' }}>
        {/* Telebirr */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => setPaymentMethod('telebirr')} style={{
          ...styles.paymentCard,
          borderColor: paymentMethod === 'telebirr' ? '#FF6B00' : 'transparent',
          background: paymentMethod === 'telebirr' ? 'rgba(255,107,0,0.05)' : 'var(--color-ivory-dark)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '24px', background: '#FF6B00', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '10px', fontWeight: 'bold' }}>Telebirr</div>
            <span style={{ fontWeight: '500', color: 'var(--color-coffee)' }}>Pay with Telebirr</span>
          </div>
          {paymentMethod === 'telebirr' && <div style={styles.radioChecked}><Check size={12} color="#FFF"/></div>}
          {paymentMethod !== 'telebirr' && <div style={styles.radioUnchecked} />}
        </motion.div>

        {/* CBE Birr */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => setPaymentMethod('cbe')} style={{
          ...styles.paymentCard,
          borderColor: paymentMethod === 'cbe' ? '#0033A0' : 'transparent',
          background: paymentMethod === 'cbe' ? 'rgba(0,51,160,0.05)' : 'var(--color-ivory-dark)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '24px', background: '#0033A0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '10px', fontWeight: 'bold' }}>CBE</div>
            <span style={{ fontWeight: '500', color: 'var(--color-coffee)' }}>CBE Birr</span>
          </div>
          {paymentMethod === 'cbe' && <div style={styles.radioChecked}><Check size={12} color="#FFF"/></div>}
          {paymentMethod !== 'cbe' && <div style={styles.radioUnchecked} />}
        </motion.div>

        {/* Card */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => setPaymentMethod('card')} style={{
          ...styles.paymentCard,
          borderColor: paymentMethod === 'card' ? 'var(--color-coffee)' : 'transparent',
          background: paymentMethod === 'card' ? 'rgba(44,24,16,0.05)' : 'var(--color-ivory-dark)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '24px', background: 'var(--color-parchment)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-coffee)' }}><CreditCard size={16} /></div>
            <span style={{ fontWeight: '500', color: 'var(--color-coffee)' }}>Visa / Mastercard</span>
          </div>
          {paymentMethod === 'card' && <div style={styles.radioChecked}><Check size={12} color="#FFF"/></div>}
          {paymentMethod !== 'card' && <div style={styles.radioUnchecked} />}
        </motion.div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--color-charcoal-muted)', fontSize: '12px', marginBottom: 'var(--space-md)' }}>
        <Lock size={12} />
        Secure payment processing
      </div>

      <Button fullWidth onClick={handleBook} disabled={!paymentMethod || isProcessing}>
        {isProcessing ? 'Processing...' : `Pay ETB ${totalPrice.toLocaleString()}`}
      </Button>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div key="step4" {...slideVariants} style={{ textAlign: 'center', paddingTop: 'var(--space-2xl)' }}>
      {/* Bloom animation handled by ConfirmationBloom component at root */}
      
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--color-coffee)', marginBottom: 'var(--space-sm)' }}>
        Your healing awaits.<br/>ሰላም ✨
      </h2>
      <p style={{ color: 'var(--color-charcoal-soft)', fontSize: '15px', marginBottom: 'var(--space-xl)' }}>
        Your booking for {exp.name} is confirmed.
      </p>

      <Card variant="parchment" style={{ textAlign: 'left', marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
          <span style={{ color: 'var(--color-charcoal-muted)', fontSize: '13px' }}>Date</span>
          <span style={{ fontWeight: '500', color: 'var(--color-coffee)' }}>{date}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
          <span style={{ color: 'var(--color-charcoal-muted)', fontSize: '13px' }}>Guests</span>
          <span style={{ fontWeight: '500', color: 'var(--color-coffee)' }}>{guests.adults} Adults{guests.children > 0 ? `, ${guests.children} Children` : ''}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--color-charcoal-muted)', fontSize: '13px' }}>Reference</span>
          <span style={{ fontWeight: '600', color: 'var(--color-coffee)', fontFamily: 'monospace' }}>S-8924A</span>
        </div>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button variant="primary" fullWidth onClick={() => navigate('retreats')}>Add to Calendar</Button>
        <Button variant="secondary" fullWidth onClick={() => navigate('home')}>Return Home</Button>
      </div>
    </motion.div>
  );

  return (
    <PageWrapper>
      <ConfirmationBloom show={showBloom} />
      
      {step < 4 && (
        <TopBar 
          title="Booking" 
          showBack 
          onBack={() => step > 1 ? setStep(step - 1) : navigate('experience', { id: expId })} 
        />
      )}

      {/* Progress Bar */}
      {step < 4 && (
        <div style={{ display: 'flex', gap: '4px', marginBottom: 'var(--space-xl)' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{
              height: '4px',
              flex: 1,
              background: i <= step ? 'var(--color-terracotta)' : 'rgba(44,24,16,0.1)',
              borderRadius: '2px',
            }} />
          ))}
        </div>
      )}

      {/* Summary Header */}
      {step < 4 && (
        <div style={{ display: 'flex', gap: '12px', marginBottom: 'var(--space-xl)', paddingBottom: 'var(--space-md)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: 'var(--color-terracotta)', opacity: 0.8 }} />
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--color-coffee)', marginBottom: '4px' }}>{exp.name}</h3>
            <div style={{ fontSize: '12px', color: 'var(--color-charcoal-muted)' }}>{exp.location}</div>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </AnimatePresence>

    </PageWrapper>
  );
}

const styles = {
  counterBtn: {
    width: '32px', height: '32px', borderRadius: '50%',
    border: '1px solid rgba(44,24,16,0.2)', background: 'transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--color-coffee)', cursor: 'pointer',
  },
  paymentCard: {
    padding: '16px', borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    border: '2px solid transparent', cursor: 'pointer',
    transition: 'all 0.2s',
  },
  radioChecked: {
    width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-coffee)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  radioUnchecked: {
    width: '20px', height: '20px', borderRadius: '50%', border: '2px solid rgba(44,24,16,0.2)',
  }
};
