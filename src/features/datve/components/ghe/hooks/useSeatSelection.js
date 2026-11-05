// src/features/datve/components/ghe/hooks/useSeatSelection.js

import { useState } from 'react';
import { isSeatSold, isCoupleSeat } from '../utils';

export function useSeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const isSeatSelected = (id) => selectedSeats.some((s) => s.ShowtimeSeatId === id);

  const handleSeatClick = (seat, seatMap) => {
    if (isSeatSold(seat.Status)) return;

    if (isCoupleSeat(seat.SeatType)) {
      const rowSeats = seatMap[seat.Row] ?? [];
      const idx = rowSeats.findIndex((s) => s.ShowtimeSeatId === seat.ShowtimeSeatId);
      const partnerIdx = seat.Number % 2 === 1 ? idx + 1 : idx - 1;
      const partner = rowSeats[partnerIdx];
      if (!partner || isSeatSold(partner.Status)) return;

      const bothSelected =
        isSeatSelected(seat.ShowtimeSeatId) && isSeatSelected(partner.ShowtimeSeatId);
      if (bothSelected) {
        setSelectedSeats((prev) =>
          prev.filter(
            (s) =>
              s.ShowtimeSeatId !== seat.ShowtimeSeatId &&
              s.ShowtimeSeatId !== partner.ShowtimeSeatId,
          ),
        );
      } else {
        setSelectedSeats((prev) => [
          ...prev.filter(
            (s) =>
              s.ShowtimeSeatId !== seat.ShowtimeSeatId &&
              s.ShowtimeSeatId !== partner.ShowtimeSeatId,
          ),
          seat,
          partner,
        ]);
      }
      return;
    }

    setSelectedSeats((prev) =>
      isSeatSelected(seat.ShowtimeSeatId)
        ? prev.filter((s) => s.ShowtimeSeatId !== seat.ShowtimeSeatId)
        : [...prev, seat],
    );
  };

  const clearSelectedSeats = () => setSelectedSeats([]);

  return {
    selectedSeats,
    setSelectedSeats,
    isSeatSelected,
    handleSeatClick,
    clearSelectedSeats,
  };
}
