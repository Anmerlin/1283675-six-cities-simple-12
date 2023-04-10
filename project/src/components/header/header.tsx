import { useEffect } from 'react';
import { checkAuthAction } from 'store/user-process/api-actions';
import { getAuthorizationStatus } from 'store/user-process/selectors';
import { useAppSelector, useAppDispatch } from 'hooks';
import { AuthorizationStatus } from 'const';
import { UserAuth, UserUnknown, Logo } from 'components';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      dispatch(checkAuthAction());
    }
  }, [authorizationStatus, dispatch]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            {authorizationStatus === AuthorizationStatus.Auth ? <UserAuth /> : <UserUnknown />}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
