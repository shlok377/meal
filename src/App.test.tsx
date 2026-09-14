import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock OrbitStage since WebGL context is not supported in jsdom
vi.mock('./components/OrbitStage', () => ({
  OrbitStage: ({ theme, preset }: { theme: string; preset: string }) => (
    <div data-testid="mock-orbit-stage" data-theme={theme} data-preset={preset}>
      3D Stage ({theme} / {preset})
    </div>
  ),
}));

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('App Integration', () => {
  it('renders top-level application with 3D stage and editorial overlay', () => {
    render(<App />);

    expect(screen.getByTestId('mock-orbit-stage')).toBeInTheDocument();
    expect(screen.getByText('AMERICAN CLASSIC')).toBeInTheDocument();
    expect(screen.getByText('@ ₹349')).toBeInTheDocument();
    expect(screen.getByText('Flavour trails')).toBeInTheDocument();
  });

  it('updates theme mode across app and 3D stage when theme toggle is clicked', () => {
    render(<App />);

    const stage = screen.getByTestId('mock-orbit-stage');
    expect(stage).toHaveAttribute('data-theme', 'light');

    const toggleBtn = screen.getByRole('button', { name: /toggle theme mode/i });
    fireEvent.click(toggleBtn);

    expect(stage).toHaveAttribute('data-theme', 'dark');
  });

  it('updates camera preset across 3D stage when preset pills are clicked', () => {
    render(<App />);

    const stage = screen.getByTestId('mock-orbit-stage');
    expect(stage).toHaveAttribute('data-preset', 'combo');

    const burgerPreset = screen.getByRole('button', { name: /smash burger/i });
    fireEvent.click(burgerPreset);
    expect(stage).toHaveAttribute('data-preset', 'burger');

    const friesPreset = screen.getByRole('button', { name: /crispy fries/i });
    fireEvent.click(friesPreset);
    expect(stage).toHaveAttribute('data-preset', 'fries');
  });

  it('opens and closes order modal from CTA button', () => {
    render(<App />);

    const orderBtn = screen.getByRole('button', { name: /order combo/i });
    fireEvent.click(orderBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('What\'s in the Box')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close order modal/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
