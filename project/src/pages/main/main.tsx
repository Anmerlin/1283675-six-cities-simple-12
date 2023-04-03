import { useEffect } from 'react';
import { getSelectedCity } from 'store/selectors';
import { store } from 'store';
import { fetchOffersAction } from 'store/api-actions';
import { useAppSelector } from 'hooks';
import { CityList, Main, EmptyList, } from 'components';

function MainScreen(): JSX.Element {
  // спросить про offers
  const selectedCity = useAppSelector(getSelectedCity);
  const offers = useAppSelector((state) => state.offers.filter(({ city }) => city.name === selectedCity));

  useEffect(() => {
    store.dispatch(fetchOffersAction());
  }, [selectedCity]);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <CityList />
      <div className="cities">
        {offers.length ? <Main /> : <EmptyList />}
      </div>
    </>
  );
}

export default MainScreen;
