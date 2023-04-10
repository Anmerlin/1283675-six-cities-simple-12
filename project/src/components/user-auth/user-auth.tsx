import { logoutAction } from 'store/user-process/api-actions';
import { getUserData } from 'store/user-process/selectors';
import { useAppSelector, useAppDispatch } from 'hooks';

function UserAuth(): JSX.Element {
  const currentUser = useAppSelector(getUserData);
  const dispatch = useAppDispatch();

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <div className="header__nav-profile">
          <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${currentUser?.avatarUrl || ''})` }}></div>
          <span className="header__user-name user__name">{currentUser?.email}</span>
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

export default UserAuth;
