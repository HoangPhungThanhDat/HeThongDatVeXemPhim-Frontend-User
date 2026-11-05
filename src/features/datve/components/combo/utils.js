import { CAT_KEYWORDS, CAT_COLOR } from './constants';

export const removeAccents = (str) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const detectCategory = (name) => {
  const normalized = removeAccents(name);
  for (const { cat, keywords } of CAT_KEYWORDS) {
    if (keywords.some((kw) => normalized.includes(kw))) return cat;
  }
  return 'snack';
};

export const toSizes = (item) => [{ label: 'Tiêu chuẩn', price: Number(item.Price) }];

export const mapItem = (item) => {
  const cat = detectCategory(item.Name);
  return {
    id: item.ItemId,
    cat,
    name: item.Name,
    desc: item.Description || '',
    tag: null,
    tagColor: null,
    img: item.ImageUrl || 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=500&q=85',
    color: CAT_COLOR[cat] ?? '#c9a84c',
    sizes: toSizes(item),
  };
};

export const formatPrice = (n) => new Intl.NumberFormat('vi-VN').format(n) + 'đ';

export const getCartKey = (productId, sizeIdx) => `${productId}_${sizeIdx}`;
