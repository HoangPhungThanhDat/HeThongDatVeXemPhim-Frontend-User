import { formatPrice } from './utils';

export default function BottomBar({ totalItems, totalPrice, onCartClick, onSkip, onNext }) {
  return (
    <div className="sn-bar">
      <div className="sn-bar-inner">
        <div className="sn-bar-sum" onClick={totalItems > 0 ? onCartClick : undefined}>
          <div className="sn-bar-lbl">
            Đã chọn
            {totalItems > 0 && (
              <span className="sn-bdg" key={totalItems}>
                {totalItems} món
              </span>
            )}
          </div>
          {totalItems > 0 ? (
            <>
              <div className="sn-bar-total" key={totalPrice}>
                {formatPrice(totalPrice)}
              </div>
              <div className="sn-bar-hint">Nhấn để xem giỏ hàng →</div>
            </>
          ) : (
            <div className="sn-bar-empty">Chưa chọn món nào</div>
          )}
        </div>
        <button className="sn-btn-skip" onClick={onSkip}>
          Bỏ qua
        </button>
        <button className="sn-btn-next" onClick={onNext}>
          Tiếp tục →
        </button>
      </div>
    </div>
  );
}
