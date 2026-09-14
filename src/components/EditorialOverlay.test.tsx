import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditorialOverlay } from './EditorialOverlay';
import { mealData } from '../data/mealData';

describe('EditorialOverlay', () => {
  it('renders editorial categories, title, price, and cursive signature', () => {
    render(
      <EditorialOverlay
        config={mealData}
        theme="light"
        preset="combo"
        onToggleTheme={vi.fn()}
        onSelectPreset={vi.fn()}
        onOpenOrder={vi.fn()}
      />
    );

    expect(screen.getByText('AMERICAN CLASSIC')).toBeInTheDocument();
    expect(screen.getByText('GOURMET EDITION')).toBeInTheDocument();
    expect(screen.getByText('@ ₹349')).toBeInTheDocument();
    expect(screen.getByText('Flavour trails')).toBeInTheDocument();
    expect(screen.getAllByText('SMASH BURGER').length).toBeGreaterThanOrEqual(3);
  });

  it('triggers onToggleTheme when theme toggle button is clicked', () => {
    const handleToggle = vi.fn();
    render(
      <EditorialOverlay
        config={mealData}
        theme="light"
        preset="combo"
        onToggleTheme={handleToggle}
        onSelectPreset={vi.fn()}
        onOpenOrder={vi.fn()}
      />
    );

    const toggleBtn = screen.getByRole('button', { name: /toggle theme mode/i });
    fireEvent.click(toggleBtn);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('triggers onSelectPreset when camera preset buttons are clicked', () => {
    const handleSelectPreset = vi.fn();
    render(
      <EditorialOverlay
        config={mealData}
        theme="light"
        preset="combo"
        onToggleTheme={vi.fn()}
        onSelectPreset={handleSelectPreset}
        onOpenOrder={vi.fn()}
      />
    );

    const burgerBtn = screen.getByRole('button', { name: /focus burger/i });
    fireEvent.click(burgerBtn);
    expect(handleSelectPreset).toHaveBeenCalledWith('burger');

    const friesBtn = screen.getByRole('button', { name: /focus fries/i });
    fireEvent.click(friesBtn);
    expect(handleSelectPreset).toHaveBeenCalledWith('fries');
  });

  it('triggers onOpenOrder when order button is clicked', () => {
    const handleOpenOrder = vi.fn();
    render(
      <EditorialOverlay
        config={mealData}
        theme="light"
        preset="combo"
        onToggleTheme={vi.fn()}
        onSelectPreset={vi.fn()}
        onOpenOrder={handleOpenOrder}
      />
    );

    const orderBtn = screen.getByRole('button', { name: /order combo/i });
    fireEvent.click(orderBtn);
    expect(handleOpenOrder).toHaveBeenCalledTimes(1);
  });
});
