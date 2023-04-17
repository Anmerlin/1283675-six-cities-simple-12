import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from 'components';
import { cityNames } from 'const';
import EmptyList from './empty-list';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const selectedCity = cityNames[Math.floor(Math.random() * cityNames.length)];

const fakeStore = mockStore({
  OFFER: {
    city: selectedCity,
  },
});

describe('Component: EmptyList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <EmptyList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(
      screen.getByText(
        `We could not find any property available at the moment in ${selectedCity}`
      )
    ).toBeInTheDocument();
  });
});
