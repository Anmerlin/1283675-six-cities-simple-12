import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/main/main';
import LoginScreen from '../../pages/login/login';
import OfferScreen from '../../pages/offer/offer';
import Layout from '../layout/layout';
import PageNotFound from '../page-not-found/page-not-found';
import { OfferCards } from '../../types/offer';

type AppScreenProps = {
  rentalOffersCount: number;
  offers: OfferCards;
}

function App({ rentalOffersCount, offers }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route
            index
            element={<MainScreen rentalOffersCount={rentalOffersCount} />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Room}
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
