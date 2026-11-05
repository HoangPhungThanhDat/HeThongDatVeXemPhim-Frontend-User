import TiltCard from './TiltCard';
import { formatPrice, getCartKey } from './utils';

export default function ProductCard({ product, selectedSize, cart, add, sub, pickSize, index }) {
  const sIdx = selectedSize[product.id] ?? 0;
  const currentKey = getCartKey(product.id, sIdx);
  const qty = cart[currentKey] || 0;
  const hasAnyInCart = product.sizes.some((_, si) => cart[getCartKey(product.id, si)] > 0);
  const currentPrice = product.sizes[sIdx]?.price ?? 0;

  return (
    <TiltCard
      key={product.id}
      className={`sn-card${hasAnyInCart ? 'in-cart' : ''}`}
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      {product.tag && (
        <div className="sn-tag" style={{ background: product.tagColor }}>
          {product.tag}
        </div>
      )}
      {hasAnyInCart && (
        <div className="sn-qty-badge" key={qty}>
          {product.sizes.reduce((s, _, si) => s + (cart[getCartKey(product.id, si)] || 0), 0)}
        </div>
      )}

      <div className="sn-img-wrap">
        <img className="sn-img" src={product.img} alt={product.name} loading="lazy" />
        <div className="sn-img-overlay" />
        <div className="sn-shine" />
        <div className="sn-accent-line" style={{ background: product.color }} />
      </div>

      <div className="sn-info">
        <div className="sn-name">{product.name}</div>
        <div className="sn-desc">{product.desc}</div>

        {product.sizes.length > 1 && (
          <div className="sn-sizes">
            {product.sizes.map((sz, si) => (
              <button
                key={sz.label}
                className={`sn-size-btn${sIdx === si ? 'active' : ''}`}
                onClick={(e) => pickSize(product.id, si, e)}
              >
                {sz.label}
              </button>
            ))}
          </div>
        )}

        <div className="sn-price-row">
          <div className="sn-price">{formatPrice(currentPrice)}</div>
          <div className="sn-qty">
            {qty > 0 && (
              <>
                <button className="sn-qbtn minus" onClick={(e) => sub(currentKey, e)}>
                  −
                </button>
                <span className="sn-qnum" key={qty}>
                  {qty}
                </span>
              </>
            )}
            <button className="sn-qbtn plus" onClick={(e) => add(product.id, sIdx, e)}>
              +
            </button>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
