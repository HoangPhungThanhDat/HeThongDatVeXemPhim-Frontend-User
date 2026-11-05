import ProductCard from './ProductCard';
import SkeletonGrid from './SkeletonGrid';
import { CATEGORIES } from './constants';

export default function ProductGrid({
  products,
  loading,
  error,
  activeCat,
  selectedSize,
  cart,
  add,
  sub,
  pickSize,
}) {
  const filtered = activeCat === 'all' ? products : products.filter((p) => p.cat === activeCat);
  const categoryLabel =
    activeCat === 'all' ? 'Tất cả' : CATEGORIES.find((c) => c.id === activeCat)?.label;

  if (loading) return <SkeletonGrid />;

  if (error) {
    return (
      <div className="sn-empty">
        <span className="sn-empty-ico">⚠️</span>
        <div className="sn-empty-txt">{error}</div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="sn-empty">
        <span className="sn-empty-ico">🍿</span>
        <div className="sn-empty-txt">Không có sản phẩm nào trong danh mục này.</div>
      </div>
    );
  }

  return (
    <>
      <div className="sn-hd">
        <div className="sn-hd-left">
          <span className="sn-hd-title">{categoryLabel}</span>
          <span className="sn-hd-count">{filtered.length} món</span>
        </div>
        <div className="sn-hd-line" />
      </div>

      <div className="sn-grid">
        {filtered.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            selectedSize={selectedSize}
            cart={cart}
            add={add}
            sub={sub}
            pickSize={pickSize}
            index={i}
          />
        ))}
      </div>
    </>
  );
}
