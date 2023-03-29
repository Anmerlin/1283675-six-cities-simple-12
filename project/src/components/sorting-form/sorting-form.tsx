import { SyntheticEvent, useState } from 'react';
import { selectSorting, sortOffers } from 'store/action';
import { SortingOptions } from 'const';
import { useAppDispatch, useAppSelector } from 'hooks';

function SortingForm(): JSX.Element {
  const [activeOption, toggleOptions] = useState<boolean>(false);

  const selectedSorting = useAppSelector((state) => state.selectedSorting);
  const dispatch = useAppDispatch();

  // разобрать функцию на созвоне в частности смотрел отсюда https://stackoverflow.com/questions/42081549/typescript-react-event-types
  const handleSortingChange = (event: SyntheticEvent<HTMLLIElement, MouseEvent>) => {
    const target = event.target as HTMLLIElement;

    dispatch(selectSorting({targetSorting: target.innerText as typeof SortingOptions[number]}));
    dispatch(sortOffers());
    toggleOptions(!activeOption);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => toggleOptions(!activeOption)}
      >
        {selectedSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${activeOption ? 'places__options--opened' : ''}`}>
        {SortingOptions.map((option, index) => {
          const keyValue = `${index}-${option}`;
          const isActive = option === selectedSorting;
          return (
            <li
              className={`places__option ${isActive ? ' places__option--active' : ''}`}
              tabIndex={0}
              key={keyValue}
              onClick={handleSortingChange}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default SortingForm;
