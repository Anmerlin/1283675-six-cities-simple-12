import { Provider } from 'react-redux';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from 'types/state';
import { createMemoryHistory } from 'history';
import { createAPI } from 'services/api';
import { datatype } from 'faker';
import { HistoryRouter } from 'components';
import ReviewForm from './review-form';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = mockStore({
  DATA: {
    review: {
      isSending: false,
      isSendingError: false,
    }
  },
});

const history = createMemoryHistory();

describe('Component: ReviewForm', () => {
  it('should render correctly and update user review', async () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <ReviewForm targetId={datatype.number(77)} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Submit')).toBeInTheDocument();
    userEvent.type(screen.getByRole('textbox'), 'test message review');
    await waitFor(() => {
      expect(screen.getByDisplayValue(/test message review/i)).toBeInTheDocument();
    });
  });
});
