import { Routes, Route } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from 'components';
import Logo from './logo';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByTestId('logo-main')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="*" element={<Logo />} />
          <Route path="/" element={<h1>This is start page</h1>} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is start page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    await waitFor(()=>{
      expect(screen.getByText(/This is start page/i)).toBeInTheDocument();
    });
  });
});
