import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from 'const';

const logoImg = <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />;

function Logo(): JSX.Element {
  const location = useLocation();

  if (location.pathname === AppRoute.Main) {
    return (
      <a className='header__logo-link header__logo-link--active' data-testid='logo-main'>
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
