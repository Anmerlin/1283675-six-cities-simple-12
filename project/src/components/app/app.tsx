import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from 'const';
import { OfferCards } from 'types/offer';
import { ReviewOfferCards } from 'types/review';
import { MainScreen, LoginScreen, OfferScreen } from 'pages';
import { Layout, PageNotFound, ScrollTop } from 'components';

type AppScreenProps = {
  offers: OfferCards;
  reviews: ReviewOfferCards;
}

function App({ offers, reviews }: AppScreenProps): JSX.Element {
  return (
    <HelmetProvider>
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
              element={<OfferScreen reviews={reviews} offers={offers} />}
            />
            <Route
              path={AppRoute.NotFound}
              element={<PageNotFound />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
