import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute, MainClassModifierByPage, PagesTitle } from 'const';
import { Header } from 'components';

const setParamsModifier = (location: string, id: string | undefined, param?: string) => {
  const appRouteOffer = (id) ? AppRoute.OfferById.replace(/:id/, id) : AppRoute.Offer;

  switch (location) {
    case AppRoute.Main:
      if (param === 'title') {
        return PagesTitle.Main;
      }
      return MainClassModifierByPage.Main;
    case AppRoute.Login:
      if (param === 'title') {
        return PagesTitle.Login;
      }
      return MainClassModifierByPage.Login;
    case appRouteOffer:
      if (param === 'title') {
        return PagesTitle.Offer;
      }
      return MainClassModifierByPage.Offer;
    default:
      if (param === 'title') {
        return PagesTitle.NotFound;
      }
      return MainClassModifierByPage.NotFound;
  }
};

function Layout() {
  const { pathname } = useLocation();

  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>{setParamsModifier(pathname, id, 'title')}</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--${setParamsModifier(pathname, id)}`}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
