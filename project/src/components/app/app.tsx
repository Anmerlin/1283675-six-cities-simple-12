import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MainScreen, LoginScreen, OfferScreen } from 'pages';
import { AppRoute } from 'const';
import { Layout, PageNotFound, ScrollTop } from 'components';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <ScrollTop />
      <Routes>
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route
            index
            element={<MainScreen />}
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
    </HelmetProvider>
  );
}

export default App;
