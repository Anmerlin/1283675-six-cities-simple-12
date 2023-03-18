import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import { MainClassByPage } from '../../const';

function Layout() {
  const location = useLocation();

  let mainClassByPage = MainClassByPage.Main;

  if (location.pathname === '/login') {
    mainClassByPage = MainClassByPage.Login;
  }

  if (location.pathname === '/offer') {
    mainClassByPage = MainClassByPage.Offer;
  }

  return (
    <>
      <Header />
      <main className={`page__main page__main--${mainClassByPage}`}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
