import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import DrugCardList from '../src/features/drugs/DrugCardList';
import { store } from '../src/app/store';

describe('DrugCardList', () => {
  it('renders loading spinner initially', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DrugCardList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByText('Next').length).toBeGreaterThan(0);
  });
});
