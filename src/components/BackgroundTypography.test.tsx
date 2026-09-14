import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BackgroundTypography } from './BackgroundTypography';

describe('BackgroundTypography', () => {
  it('renders repeated stacked titles with pointer-events-none styling', () => {
    const { container } = render(<BackgroundTypography title="SMASH BURGER" />);

    const titles = screen.getAllByText('SMASH BURGER');
    expect(titles.length).toBeGreaterThanOrEqual(3);

    // Check pointer-events-none on parent container to guarantee drag pass-through
    expect(container.firstChild).toHaveClass('pointer-events-none');
  });
});
