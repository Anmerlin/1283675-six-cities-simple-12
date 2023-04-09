import { useState } from 'react';
import { selectSorting } from 'store/offer/action';
import { getSelectedSorting } from 'store/offer/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';
import { SortingType } from 'types/sorting';
import { sortingOptions } from 'const';

const sortingTypes = Object.values(sortingOptions);

function SortingForm(): JSX.Element {
  const [isSortListOpened, setIsSortListOpened] = useState(false);

  const selectedSorting = useAppSelector(getSelectedSorting);
  const dispatch = useAppDispatch();

  const handleSortingChange = (option: SortingType) => {
    dispatch(selectSorting({ targetSorting: option }));
    setIsSortListOpened(!isSortListOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsSortListOpened(!isSortListOpened)}
      >
        {selectedSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortListOpened ? 'places__options--opened' : ''}`}>
        {
          sortingTypes.map((option) => (
            <li
              className={`places__option ${option.value === selectedSorting ? ' places__option--active' : ''}`}
              tabIndex={0}
              key={option.value}
              onClick={() => handleSortingChange(option.value)}
            >
              {option.text}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default SortingForm;
