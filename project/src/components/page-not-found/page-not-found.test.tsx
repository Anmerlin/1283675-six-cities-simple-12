import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from 'components';
import PageNotFound from './page-not-found';

const history = createMemoryHistory();

describe('Component: PageNotFound', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <PageNotFound />
        </HelmetProvider>
      </HistoryRouter>
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByRole('link').textContent).toBe('Go back to the main page');
  });
});
