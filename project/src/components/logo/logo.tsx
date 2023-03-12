import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

function Logo(): JSX.Element {
  const location = useLocation();

  const logoImg = <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />;

  if (location.pathname === '/') {
    return (
      <a className='header__logo-link header__logo-link--active'>
        {logoImg}
      </a>
    );
  }

  return (
    <Link className="header__logo-link" to={AppRoute.Main}>
      {logoImg}
    </Link>
  );
}

export default Logo;
