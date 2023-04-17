import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from 'components';
import SortingForm from './sorting-form';
import { sortingOptions } from 'const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const sortingCurrent = sortingOptions['priceToLow'];

const fakeStore = mockStore({
  OFFER: {
    sorting: sortingCurrent,
  },
});

describe('Component: SortingForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <SortingForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTitle(sortingCurrent.text)).toBeInTheDocument();
  });
});
