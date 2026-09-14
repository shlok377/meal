import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OrderModal } from './OrderModal';
import { mealData } from '../data/mealData';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('OrderModal', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <OrderModal
        isOpen={false}
        onClose={vi.fn()}
        config={mealData}
        theme="light"
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders ingredients, macros, and calculates total price based on quantity', () => {
    render(
      <OrderModal
        isOpen={true}
        onClose={vi.fn()}
        config={mealData}
        theme="light"
      />
    );

    expect(screen.getByText('Double Angus Smashed Patties')).toBeInTheDocument();
    expect(screen.getByText('780 kcal')).toBeInTheDocument();
    expect(screen.getByText('₹349')).toBeInTheDocument();

    // Increase quantity
    const plusBtn = screen.getByRole('button', { name: /increase quantity/i });
    fireEvent.click(plusBtn);
    expect(screen.getByText('₹698')).toBeInTheDocument();
  });

  it('handles checkout submission and shows confirmation state', () => {
    render(
      <OrderModal
        isOpen={true}
        onClose={vi.fn()}
        config={mealData}
        theme="light"
      />
    );

    const checkoutBtn = screen.getByRole('button', { name: /confirm order/i });
    fireEvent.click(checkoutBtn);

    expect(screen.getByText('Order Received!')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <OrderModal
        isOpen={true}
        onClose={handleClose}
        config={mealData}
        theme="light"
      />
    );

    const closeBtn = screen.getByRole('button', { name: /close order modal/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
