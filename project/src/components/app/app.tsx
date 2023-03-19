import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from 'const';
import { OfferCards } from 'types/offer';
import { ReviewOfferCards } from 'types/review';
import { MainScreen } from 'pages';
import { LoginScreen } from 'pages';
import { OfferScreen } from 'pages';
import { Layout } from 'components';
import { PageNotFound } from 'components';

type AppScreenProps = {
  rentalOffersCount: number;
  offers: OfferCards;
  reviews: ReviewOfferCards;
}

function App({ rentalOffersCount, offers, reviews }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route
            index
            element={<MainScreen rentalOffersCount={rentalOffersCount} offers={offers} />}
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
            path='*'
            element={<PageNotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
