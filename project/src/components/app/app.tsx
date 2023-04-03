import { Routes, Route } from 'react-router-dom';
import { AppRoute } from 'const';
import { MainScreen, LoginScreen, OfferScreen } from 'pages';
import { HistoryRouter, Layout, PageNotFound, ScrollTop } from 'components';
import browserHistory from 'browser-history';

function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <ScrollTop />
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route
            index
            element={<MainScreen />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.OfferById}
            element={<OfferScreen />}
          />
          <Route
            path={AppRoute.NotFound}
            element={<PageNotFound />}
          />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
