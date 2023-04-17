import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { AuthorizationStatus } from 'const';
import { makeFakeUser } from 'utils/mocks';
import { User } from 'types/state';
import { LoginScreen } from 'pages';
import { HistoryRouter } from 'components';

const mockStore = configureMockStore();

const history = createMemoryHistory();

const mockUserState: User = {
  authorizationStatus: AuthorizationStatus.Auth,
  userData: makeFakeUser(),
};

const fakeStore = mockStore({
  USER: mockUserState,
});

describe('Page: LoginScreen', () => {
  it('should update login inputs', async () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <LoginScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'a123n');

    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('a123n')).toBeInTheDocument();
  });
});
