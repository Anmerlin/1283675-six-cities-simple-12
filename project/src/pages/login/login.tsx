import { FormEvent, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from 'const';
import { useAppSelector, useAppDispatch } from 'hooks';
import { getSelectedCity, getAuthorizationStatus } from 'store/selectors';
import { loginAction } from 'store/user/api-actions';
import { AuthData } from 'types/auth-data';

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const selectedCity = useAppSelector(getSelectedCity);

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required />
          </div>
          <button className="login__submit form__submit button" type="submit">Sign in</button>
        </form>
      </section>
      <section className="locations locations--login locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/#">
            <span>{selectedCity}</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default LoginScreen;
