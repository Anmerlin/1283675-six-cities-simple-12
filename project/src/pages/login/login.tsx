import { FormEvent, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from 'hooks';
import { redirectToRoute } from 'store/actions';
import { checkAuthAction, loginAction } from 'store/user/api-actions';
import { changeCity } from 'store/offers-list/offers-list';
import { getAuthorizationStatus } from 'store/user/selectors';
import { AppRoute, AuthorizationStatus, PagesOption, cityNames } from 'const';
import { Header } from 'components';

type Form = {
  email: string;
  password: string;
}

function LoginScreen(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(event.target as HTMLFormElement)) as Form;
    dispatch(loginAction({ email, password }));
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      dispatch(checkAuthAction());
    }

    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Main));
    }
  }, [authorizationStatus, dispatch]);

  const randomCity = cityNames[Math.floor(Math.random() * cityNames.length)];
  const onCitySelect = () => {
    dispatch(changeCity({ targetCity: randomCity }));
    dispatch(redirectToRoute(AppRoute.Main));
  };

  return (
    <section className={`page page--gray page--${PagesOption.Login.postfixCls}`}>
      <Helmet>
        <title>{PagesOption.Login.title}</title>
      </Helmet >
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" autoComplete="off" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  title="Email must be in the correct format: example@example.ex"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$"
                  title="Password must contain at least one letter and number"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/#" onClick={onCitySelect}>
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </section >
  );
}

export default LoginScreen;
