import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import AddDrugPage from '../src/features/drugs/AddDrugPage';
import { store } from '../src/app/store';

describe('AddDrugPage', () => {
  it('displays Add New Drug title', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddDrugPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Add New Drug/i)).toBeInTheDocument();
  });
});
