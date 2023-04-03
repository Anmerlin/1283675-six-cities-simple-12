import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthAction, logoutAction } from 'store/user/api-actions';
import { getUserData, getAuthorizationStatus } from 'store/selectors';
import { store } from 'store';
import { useAppSelector, useAppDispatch } from 'hooks';
import { Logo } from 'components';
import { AppRoute, AuthorizationStatus } from 'const';

function Header(): JSX.Element {
  const { avatarUrl, email } = useAppSelector(getUserData);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // по аналогии с offers
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      store.dispatch(checkAuthAction());
    }
  }, [authorizationStatus]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            {authorizationStatus === AuthorizationStatus.Auth ? (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${avatarUrl})` }}></div>
                    <span className="header__user-name user__name">{email}</span>
                  </div>
                </li>
                <li className="header__nav-item">
                  <a
                    className="header__nav-link"
                    href="/#"
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(logoutAction());
                    }}
                  >
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="/#"
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(AppRoute.Login);
                    }}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
