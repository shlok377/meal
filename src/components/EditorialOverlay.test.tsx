import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditorialOverlay } from './EditorialOverlay';
import { mealData } from '../data/mealData';

describe('EditorialOverlay', () => {
  it('renders editorial categories, price, and cursive signature for combo preset', () => {
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
    expect(screen.getByText('GOURMET COMBO')).toBeInTheDocument();
    expect(screen.getByText('@ ₹349')).toBeInTheDocument();
    expect(screen.getByText('Flavour trails')).toBeInTheDocument();
    expect(screen.getByText(mealData.presetDetails.combo.description)).toBeInTheDocument();
  });

  it('renders burger-specific information when burger preset is active', () => {
    render(
      <EditorialOverlay
        config={mealData}
        theme="light"
        preset="burger"
        onToggleTheme={vi.fn()}
        onSelectPreset={vi.fn()}
        onOpenOrder={vi.fn()}
      />
    );

    expect(screen.getByText('THE HERO')).toBeInTheDocument();
    expect(screen.getByText('DOUBLE SMASHED ANGUS BURGER')).toBeInTheDocument();
    expect(screen.getByText(mealData.presetDetails.burger.description)).toBeInTheDocument();
  });

  it('renders fries-specific information when fries preset is active', () => {
    render(
      <EditorialOverlay
        config={mealData}
        theme="light"
        preset="fries"
        onToggleTheme={vi.fn()}
        onSelectPreset={vi.fn()}
        onOpenOrder={vi.fn()}
      />
    );

    expect(screen.getByText('SIDES & DIP')).toBeInTheDocument();
    expect(screen.getByText('CRISPY GOLDEN FRIES & KETCHUP')).toBeInTheDocument();
    expect(screen.getByText(mealData.presetDetails.fries.description)).toBeInTheDocument();
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
