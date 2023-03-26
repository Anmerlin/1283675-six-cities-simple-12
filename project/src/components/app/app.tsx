import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route
            index
            element={<MainScreen offers={offers} />}
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
  );
}

export default App;
