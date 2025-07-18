import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../src/layout/Header';

describe('Header', () => {
  it('displays the logo and title', () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    expect(screen.getByAltText(/MySureCostPharma/i)).toBeInTheDocument();
  });
});
