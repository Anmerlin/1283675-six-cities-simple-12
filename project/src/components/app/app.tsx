import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from 'const';
import { MainScreen, LoginScreen, OfferScreen } from 'pages';
import { Layout, PageNotFound, ScrollTop } from 'components';

function App(): JSX.Element {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
