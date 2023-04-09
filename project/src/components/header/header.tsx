import { useEffect } from 'react';
import { checkAuthAction } from 'store/user/api-actions';
import { getUserData, getAuthorizationStatus } from 'store/user/selectors';
import { useAppSelector, useAppDispatch } from 'hooks';
import { HeaderAuth, HeaderUnknown, Logo } from 'components';
import { AuthorizationStatus } from 'const';

function Header(): JSX.Element {
  const currentUser = useAppSelector(getUserData);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      dispatch(checkAuthAction());
    }
  }, [authorizationStatus, dispatch]); // требует включить dispathc в зависимости

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            {authorizationStatus === AuthorizationStatus.Auth ?
              <HeaderAuth avatar={currentUser?.avatarUrl || ''} email={currentUser?.email} /> :
              <HeaderUnknown />}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
