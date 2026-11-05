// src/features/datve/pages/ChonComboPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  ParticleBurst,
  ComboHeader,
  ProductGrid,
  CartDrawer,
  BottomBar,
  useComboData,
  useTimer,
  useCart,
} from '../components/combo';

import '../../../assets/styles/Combo.css';

export default function ChonComboPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Data from ChonGhePage
  const {
    showtimeId,
    showtimeInfo,
    movie,
    selectedSeats = [],
    totalAmount = 0,
    movieTitle = '—',
    roomName = '—',
    roomType = '2D',
    cinemaName = '',
    showTimeRaw = '',
    showDate = '',
  } = location.state || {};

  // Validate - redirect if no seats selected
  useEffect(() => {
    if (!showtimeId || selectedSeats.length === 0) {
      navigate('/lich-chieu', { replace: true });
    }
  }, [showtimeId, selectedSeats, navigate]);

  // State
  const [activeCat, setActiveCat] = useState('all');
  const [showDrawer, setShowDrawer] = useState(false);

  // Custom hooks
  const { products, loading, error } = useComboData();
  const timeLeft = useTimer();
  const {
    cart,
    selectedSize,
    bursts,
    totalItems,
    totalPrice,
    cartList,
    add,
    sub,
    pickSize,
    setBursts,
  } = useCart(products);

  // Navigate to checkout
  const goToCheckout = ({ items, total }) => {
    navigate('/thanh-toan', {
      state: {
        showtimeId,
        showtimeInfo,
        movie,
        selectedSeats,
        ticketTotal: totalAmount,
        movieTitle,
        roomName,
        roomType,
        cinemaName,
        showTimeRaw,
        showDate,
        snacks: items,
        snackTotal: total,
      },
    });
  };

  const handleSkip = () => goToCheckout({ items: [], total: 0 });

  const handleNext = () =>
    goToCheckout({
      items: cartList.map((item) => ({
        itemId: item.id,
        name: item.name,
        size: item.sizeLabel,
        qty: item.qty,
        price: item.unitPrice,
      })),
      total: totalPrice,
    });

  return (
    <>
      {/* Particle bursts */}
      {bursts.map((b) => (
        <ParticleBurst key={b.id} x={b.x} y={b.y} color={b.color} pid={b.pid} />
      ))}

      <div className="sn">
        {/* Header */}
        <ComboHeader
          movieTitle={movieTitle}
          showTimeRaw={showTimeRaw}
          showDate={showDate}
          cinemaName={cinemaName}
          roomName={roomName}
          roomType={roomType}
          selectedSeats={selectedSeats}
          timeLeft={timeLeft}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />

        {/* Body */}
        <div className="sn-body">
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            activeCat={activeCat}
            selectedSize={selectedSize}
            cart={cart}
            add={add}
            sub={sub}
            pickSize={pickSize}
          />
          <div style={{ height: 24 }} />
        </div>

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={showDrawer}
          onClose={() => setShowDrawer(false)}
          cartList={cartList}
          totalItems={totalItems}
          totalPrice={totalPrice}
          add={add}
          sub={sub}
        />

        {/* Bottom Bar */}
        <BottomBar
          totalItems={totalItems}
          totalPrice={totalPrice}
          onCartClick={() => totalItems > 0 && setShowDrawer(true)}
          onSkip={handleSkip}
          onNext={handleNext}
        />
      </div>
    </>
  );
}
