import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchOffersAction } from 'store/offers-data/api-actions';
import { getOffers } from 'store/offers-data/selectors';
import { AppRoute, PagesOption } from 'const';
import { useAppSelector, useAppDispatch } from 'hooks';
import { Header } from 'components';

const getPagesOption = (location: string, id: string | undefined, isNotEmptyOffers: boolean) => {
  const appRouteOffer = id ? AppRoute.OfferById.replace(/:id/, id) : AppRoute.Offer;

  switch (location) {
    case AppRoute.Main:
      if (!isNotEmptyOffers) {
        return PagesOption.Empty;
      }
      return PagesOption.Main;
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const { title, postfixCls } = getPagesOption(pathname, offerId, Boolean(offers.length));

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className={`page__main ${offers.length ? '' : 'page__main--index'} page__main--${postfixCls}`}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
