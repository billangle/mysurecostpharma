import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DrugForm from '../src/features/drugs/DrugForm';
import { vi } from 'vitest';

describe('DrugForm validation', () => {
  it('displays validation errors on empty submit', async () => {
    const onSubmit = vi.fn();
    render(<DrugForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText(/save/i));
    expect(await screen.findByText(/name is a required/i)).toBeInTheDocument();
  });
});
