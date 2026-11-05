export const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'bap', label: 'Bắp rang' },
  { id: 'nuoc', label: 'Nước uống' },
  { id: 'combo', label: 'Combo' },
  { id: 'snack', label: 'Snack' },
];

export const CAT_KEYWORDS = [
  { cat: 'bap', keywords: ['bap', 'popcorn', 'bap rang', 'caramel', 'pho mai', 'duo', 'bo'] },
  {
    cat: 'nuoc',
    keywords: [
      'nuoc',
      'pepsi',
      'coca',
      '7up',
      'tra',
      'ca phe',
      'juice',
      'nuoc ep',
      'smoothie',
      'sprite',
      'mirinda',
    ],
  },
  {
    cat: 'combo',
    keywords: ['combo', 'set', 'bo doi', 'gia dinh', 'hen ho', 'doi', 'for 2', 'for 4'],
  },
  {
    cat: 'snack',
    keywords: ['snack', 'nachos', 'hot dog', 'khoai', 'banh', 'chip', 'kem', 'salsa'],
  },
];

export const CAT_COLOR = {
  bap: '#c9a84c',
  nuoc: '#4a9eff',
  combo: '#e05252',
  snack: '#4caf88',
};

export const TIMER_DURATION = 4 * 60;
