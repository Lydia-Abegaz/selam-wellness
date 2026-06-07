/* Selam Wellness — Stitch Design System v3 tokens */

export const COLORS = {
  /* Primary — Terracotta Deep (Stitch primary) */
  primary:            '#9d3a17',
  primaryContainer:   '#bd522d',
  onPrimary:          '#ffffff',
  onPrimaryContainer: '#fff8f7',
  primaryFixed:       '#ffdbd0',
  primaryFixedDim:    '#ffb59d',

  /* Secondary — Wanza Gold */
  secondary:              '#785a00',
  secondaryContainer:     '#fdc73f',
  onSecondary:            '#ffffff',
  onSecondaryContainer:   '#705400',
  secondaryFixed:         '#ffdf9a',

  /* Tertiary — Abyssinian Forest */
  tertiary:             '#36634a',
  tertiaryContainer:    '#4f7c62',
  onTertiary:           '#ffffff',
  onTertiaryContainer:  '#e8ffee',

  /* Surface scale */
  background:                 '#fff8f6',
  surface:                    '#fff8f6',
  surfaceDim:                 '#edd5cc',
  surfaceContainerLowest:     '#ffffff',
  surfaceContainerLow:        '#fff1ec',
  surfaceContainer:           '#ffe9e2',
  surfaceContainerHigh:       '#fce3da',
  surfaceContainerHighest:    '#f6ddd5',
  onSurface:                  '#251913',
  onSurfaceVariant:           '#57423c',
  inverseSurface:             '#3c2d27',
  inverseOnSurface:           '#ffede7',

  /* Outline */
  outline:          '#8a726a',
  outlineVariant:   '#dec0b7',

  /* Error */
  error:            '#ba1a1a',
  errorContainer:   '#ffdad6',

  /* ── Legacy aliases (used in existing components) ── */
  coffee:           '#3c2d27',
  coffeeLight:      '#57423c',
  terracotta:       '#9d3a17',
  terracottaSoft:   '#bd522d',
  gold:             '#fdc73f',
  goldSoft:         '#f3bf37',
  ivory:            '#fff8f6',
  ivoryDark:        '#fce3da',
  parchment:        '#ffe9e2',
  sage:             '#36634a',
  sageLight:        '#4f7c62',
  roseSoft:         '#ffdbd0',
  roseDeep:         '#9d3a17',
  charcoal:         '#251913',
  charcoalSoft:     '#57423c',
  charcoalMuted:    '#8a726a',
};

export const CYCLE_PHASES = [
  { name: 'Inner Winter', amharic: 'ውስጣዊ ክረምት', emoji: '🌑', days: '1–7',   color: '#8B9DC3', traits: ['Rest', 'Reflect', 'Release']   },
  { name: 'Inner Spring', amharic: 'ውስጣዊ ጸደይ',  emoji: '🌱', days: '8–14',  color: '#36634a', traits: ['Plan', 'Create', 'Learn']      },
  { name: 'Inner Summer', amharic: 'ውስጣዊ በጋ',   emoji: '☀️', days: '15–21', color: '#fdc73f', traits: ['Connect', 'Express', 'Lead']   },
  { name: 'Inner Autumn', amharic: 'ውስጣዊ መኸር',  emoji: '🍂', days: '22–28', color: '#9d3a17', traits: ['Review', 'Harvest', 'Release'] },
];

export const REACTIONS = [
  { emoji: '🤍', label: 'I relate'   },
  { emoji: '🌱', label: 'Encouraged' },
  { emoji: '🙏', label: 'Thank you'  },
  { emoji: '☀️', label: 'Inspired'  },
];

export const CIRCLE_CATEGORIES = [
  'Career Anxiety', 'University Life', "Women's Wellness", 'New Mothers',
  'Relationships', 'Young Professionals', 'Entrepreneurs', 'Fitness',
  'Spiritual Wellness', 'Grief Support', 'ALX Learners',
];

export const WELLNESS_CONTENT_CATEGORIES = [
  'Mindfulness', 'Coffee Ceremony Rituals', 'Traditional Wellness',
  'Nutrition', "Women's Health", 'Stress Relief', 'Career Wellness',
  'Sleep', 'Beauty', 'Movement',
];

export const MOODS = [
  { emoji: '😔', label: 'Struggling', amharic: 'ከባድ' },
  { emoji: '😕', label: 'Low',        amharic: 'ዝቅተኛ' },
  { emoji: '😐', label: 'Okay',       amharic: 'ደህና' },
  { emoji: '🙂', label: 'Good',       amharic: 'ጥሩ' },
  { emoji: '😊', label: 'Great',      amharic: 'በጣም ጥሩ' },
];

export const SYMPTOMS = [
  'Headache', 'Fatigue', 'Cramps', 'Bloating', 'Mood swings',
  'Back pain', 'Breast tenderness', 'Insomnia', 'Anxiety', 'Cravings',
];
