import { useAppSelector, useAppDispatch } from 'hooks';
import { changeCity } from 'store/offer/action';
import { getSelectedCity } from 'store/selectors';
import { CityName } from 'types/city';
import { cityNames } from 'const';

function CityList(): JSX.Element {
  const selectedCity = useAppSelector(getSelectedCity);
  const dispatch = useAppDispatch();

  const onChangeCity = (city: CityName) => {
    dispatch(changeCity({ targetCity: city }));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cityNames.map((city) => (
              <li className="locations__item" key={city}>
                <a
                  className={`locations__item-link tabs__item ${city === selectedCity ? 'tabs__item--active' : ''}`}
                  href="/#"
                  onClick={(event) => {
                    event.preventDefault();
                    onChangeCity(city);
                  }}
                >
                  <span>{city}</span>
                </a>
              </li>
            ))
          }
        </ul>
      </section>
    </div >
  );
}

export default CityList;
