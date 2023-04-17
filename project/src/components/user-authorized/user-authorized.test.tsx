import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { internet } from 'faker';
import { AuthorizationStatus } from 'const';
import { HistoryRouter } from 'components';
import UserAuthorized from './user-authorized';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component: UserAuthorized', () => {
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
          <UserAuthorized />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link').textContent).toBe('Sign out');
    expect(screen.getByText(fakeEmail)).toBeInTheDocument();
  });
});
