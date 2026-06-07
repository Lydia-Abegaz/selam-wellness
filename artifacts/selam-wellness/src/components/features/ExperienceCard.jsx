import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const categoryGradients = {
  Spa: 'linear-gradient(135deg, #E8845A 0%, #C1440E 50%, #D4A017 100%)',
  Nature: 'linear-gradient(135deg, #7A9E7E 0%, #4A7A52 50%, #2C1810 100%)',
  Retreats: 'linear-gradient(135deg, #B5768A 0%, #8B5070 50%, #D4A017 100%)',
  Yoga: 'linear-gradient(135deg, #D4A017 0%, #C1440E 50%, #7A9E7E 100%)',
};

export default function ExperienceCard({ experience, featured = false, index = 0, onTap }) {
  const { name, location, distance, price, currency, rating, category, highlights } = experience;
  const gradient = categoryGradients[category] || categoryGradients.Spa;

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.35 }}
        whileTap={{ scale: 0.98 }}
        onClick={onTap}
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lift)',
          cursor: 'pointer',
        }}
      >
        {/* Image placeholder with gradient */}
        <div style={{
          height: '180px',
          background: gradient,
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'var(--space-md)',
          position: 'relative',
        }}>
          {/* Decorative Tibeb diamonds */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            opacity: 0.2,
          }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: '10px',
                height: '10px',
                background: '#FAF3E0',
                transform: `rotate(45deg) translateX(${i * 18}px)`,
                display: 'inline-block',
                margin: '0 4px',
              }} />
            ))}
          </div>
          <Badge variant="gold">{category}</Badge>
        </div>

        {/* Content */}
        <div style={{
          background: 'var(--color-ivory-dark)',
          padding: 'var(--space-lg)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: '700',
            fontSize: '22px',
            color: 'var(--color-coffee)',
            marginBottom: '6px',
          }}>
            {name}
          </h3>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            marginBottom: 'var(--space-sm)',
            fontSize: '13px',
            color: 'var(--color-charcoal-soft)',
          }}>
            <MapPin size={14} />
            <span>{location}</span>
            <span>·</span>
            <Clock size={14} />
            <span>{distance}</span>
          </div>

          {highlights && (
            <div style={{
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-md)',
            }}>
              {highlights.map((h, i) => (
                <Badge key={i}>{h}</Badge>
              ))}
            </div>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                fontSize: '20px',
                color: 'var(--color-coffee)',
              }}>
                {currency} {price.toLocaleString()}
              </span>
              <span style={{
                fontSize: '12px',
                color: 'var(--color-charcoal-muted)',
                marginLeft: '4px',
              }}>
                / person
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <Star size={16} fill="var(--color-gold)" color="var(--color-gold)" />
              <span style={{
                fontWeight: '600',
                fontSize: '14px',
                color: 'var(--color-coffee)',
              }}>
                {rating}
              </span>
            </div>
          </div>

          <Button variant="primary" fullWidth onClick={onTap} style={{ marginTop: 'var(--space-md)' }}>
            Book Now
          </Button>
        </div>
      </motion.div>
    );
  }

  // Grid card
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      whileTap={{ scale: 0.97 }}
      onClick={onTap}
      style={{
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        cursor: 'pointer',
        background: 'var(--color-ivory-dark)',
      }}
    >
      <div style={{
        height: '100px',
        background: gradient,
      }} />
      <div style={{ padding: 'var(--space-sm) var(--space-md) var(--space-md)' }}>
        <h4 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: '600',
          fontSize: '15px',
          color: 'var(--color-coffee)',
          marginBottom: '4px',
        }}>
          {name}
        </h4>
        <p style={{ fontSize: '11px', color: 'var(--color-charcoal-muted)', marginBottom: '6px' }}>
          {location}
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{
            fontWeight: '600',
            fontSize: '13px',
            color: 'var(--color-coffee)',
          }}>
            {currency} {price.toLocaleString()}
          </span>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontSize: '12px',
          }}>
            <Star size={12} fill="var(--color-gold)" color="var(--color-gold)" />
            {rating}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
