import { getInitialOffers } from 'store/offer/selectors';
import { useAppSelector } from 'hooks';
import { CityList, Main, EmptyList, } from 'components';

function MainScreen(): JSX.Element {
  const offers = useAppSelector(getInitialOffers);

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
