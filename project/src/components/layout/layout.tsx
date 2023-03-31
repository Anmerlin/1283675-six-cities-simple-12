import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getOffers } from 'store/selectors';
import { AppRoute, PagesOption } from 'const';
import { useAppSelector } from 'hooks';
import { Header } from 'components';

const getPagesOption = (location: string, id: string | undefined, isNotEmptyOffers: boolean) => {
  const appRouteOffer = id ? AppRoute.OfferById.replace(/:id/, id) : AppRoute.Offer;

  switch (location) {
    case AppRoute.Main:
      if (!isNotEmptyOffers) {
        return PagesOption.Empty;
      }
      return PagesOption.Main;
    case AppRoute.Login:
      return PagesOption.Login;
    case appRouteOffer:
      return PagesOption.Offer;
    default:
      return PagesOption.NotFound;
  }
};

function Layout() {
  const { pathname } = useLocation();
  const { id: offerId } = useParams();

  const offers = useAppSelector(getOffers);
  const { title, postfixCls } = getPagesOption(pathname, offerId, Boolean(offers.length));

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--${postfixCls}`}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
