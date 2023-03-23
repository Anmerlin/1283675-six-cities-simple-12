import { Link } from 'react-router-dom';
import { Cities, DEFAULT_CITY } from 'const';

const setActiveCity = (city: string): JSX.Element => {
  if (city === DEFAULT_CITY) {
    return (
      <a className="locations__item-link tabs__item tabs__item--active">
        <span>{city}</span>
      </a>
    );
  }

  return (
    <Link className="locations__item-link tabs__item" to="#">
      <span>{city}</span>
    </Link>
  );
};

function CityList(): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {
        Cities.map((city, index) => {
          const keyValue = `${index}-${city}`;

          return (
            <li className="locations__item" key={keyValue}>
              {setActiveCity(city)}
            </li>
          );
        })
      }
    </ul>
  );
}

export default CityList;
