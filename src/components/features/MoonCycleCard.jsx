import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { CYCLE_PHASES } from '../../design-system/tokens';

export default function MoonCycleCard({ day = 11, onTap, index = 0 }) {
  // Simple logic to find current phase based on day (1-28)
  const currentPhase = CYCLE_PHASES.find(p => {
    const [start, end] = p.days.split('–').map(Number);
    return day >= start && day <= end;
  }) || CYCLE_PHASES[1]; // Default to Inner Spring if invalid

  return (
    <Card
      variant="rose"
      index={index}
      onClick={onTap}
      style={{ padding: 'var(--space-md)' }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
      }}>
        {/* Large emoji */}
        <div style={{
          fontSize: '48px',
          lineHeight: 1,
          filter: 'drop-shadow(0 4px 12px rgba(44, 24, 16, 0.1))',
        }}>
          {currentPhase.emoji}
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              fontSize: '18px',
              color: 'var(--color-rose-deep)',
            }}>
              Day {day}
            </span>
            <span style={{
              fontSize: '12px',
              color: 'var(--color-rose-deep)',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              Tracker <ArrowRight size={12} />
            </span>
          </div>

          <h4 style={{
            fontSize: '15px',
            fontWeight: '600',
            color: 'var(--color-coffee)',
            marginBottom: '8px',
          }}>
            {currentPhase.name} · {currentPhase.amharic}
          </h4>

          <div style={{
            display: 'flex',
            gap: '4px',
            flexWrap: 'wrap',
          }}>
            {currentPhase.traits.map((trait, i) => (
              <Badge key={i} variant="women" style={{ fontSize: '10px', padding: '2px 8px' }}>
                {trait}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
