import { logoutAction } from 'store/user/api-actions';
import { useAppDispatch } from 'hooks';

type HeaderAuthProps = {
  avatar: string;
  email: string | undefined;
}

function HeaderAuth({ avatar, email }: HeaderAuthProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <div className="header__nav-profile">
          <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${avatar})` }}></div>
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
  );
}

export default HeaderAuth;
