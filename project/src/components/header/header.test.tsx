import { Route, Routes } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { internet } from 'faker';
import { AppRoute, AuthorizationStatus } from 'const';
import { HistoryRouter } from 'components';
import Header from './header';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render "Sign in" link when user is not authorized', () => {
    const fakeStore = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link').textContent).toBe('Sign in');
  });

  it('should render "Sign out" link and login email when user is authorized', () => {
    const fakeEmail = internet.email();
    const fakeStore = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: {
          email: fakeEmail,
        },
      },
    });

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link').textContent).toBe('Sign out');
    expect(screen.getByText(fakeEmail)).toBeInTheDocument();
  });

  it('should redirect to LoginScreen when "Sign in" clicked', async () => {
    const fakeStore = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<Header />} />
            <Route path={AppRoute.Login} element={<h1>Mock login page - testing</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByText('Sign in'));
    await waitFor(() => {
      expect(screen.getByText('Mock login page - testing')).toBeInTheDocument();
    });
  });
});
