import { formatPrice } from './utils';

export default function CartDrawer({
  isOpen,
  onClose,
  cartList,
  totalItems,
  totalPrice,
  add,
  sub,
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="sn-backdrop" onClick={onClose} />
      <div className="sn-drawer">
        <div className="sn-drw-handle" />
        <div className="sn-drw-hd">
          <div className="sn-drw-title">
            Giỏ hàng
            {totalItems > 0 && <span className="sn-bdg">{totalItems}</span>}
          </div>
          <button className="sn-drw-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="sn-drw-line" />

        {cartList.length === 0 ? (
          <div className="sn-empty">
            <span className="sn-empty-ico">🛒</span>
            <div className="sn-empty-txt">Chưa có món nào — hãy chọn thêm</div>
          </div>
        ) : (
          <>
            {cartList.map((item) => (
              <div key={item.key} className="sn-drw-row">
                <img className="sn-drw-thumb" src={item.img} alt={item.name} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="sn-drw-iname">{item.name}</div>
                  <div className="sn-drw-size">{item.sizeLabel}</div>
                  <div className="sn-drw-isub">
                    {formatPrice(item.unitPrice)} × {item.qty} ={' '}
                    <span className="sn-drw-iprice">{formatPrice(item.unitPrice * item.qty)}</span>
                  </div>
                </div>
                <div className="sn-qty">
                  <button className="sn-qbtn minus" onClick={(e) => sub(item.key, e)}>
                    −
                  </button>
                  <span className="sn-qnum">{item.qty}</span>
                  <button className="sn-qbtn plus" onClick={(e) => add(item.id, item.sizeIdx, e)}>
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="sn-drw-foot">
              <span className="sn-drw-flbl">Tổng cộng</span>
              <span className="sn-drw-ftotal">{formatPrice(totalPrice)}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
