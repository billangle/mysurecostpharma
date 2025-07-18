import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../src/App';
import { store } from '../src/app/store';

describe('App routing', () => {
  it('shows Drug List on root route', () => {
    window.history.pushState({}, '', '/'); // set initial route

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/drug list/i)).toBeInTheDocument();
  });

   it('shows Add Drug Page on /adddrugs', async () => {
    window.history.pushState({}, '', '/adddrugs');

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Try label first
    try {
      const priceInput = await screen.findByLabelText(/price/i);
      expect(priceInput).toBeInTheDocument();
    } catch {
      // Fallback to placeholder if label not found
      const fallbackInput = await screen.findByPlaceholderText(/price/i);
      expect(fallbackInput).toBeInTheDocument();
    }
  });
});
