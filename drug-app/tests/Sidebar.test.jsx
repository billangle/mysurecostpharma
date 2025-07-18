import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../src/layout/Sidebar';

describe('Sidebar', () => {
  it('renders navigation links', () => {
    render(<MemoryRouter><Sidebar /></MemoryRouter>);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Add New Drug')).toBeInTheDocument();
  });
});
