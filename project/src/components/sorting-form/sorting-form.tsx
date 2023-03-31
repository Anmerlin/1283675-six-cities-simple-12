import { SyntheticEvent, useState } from 'react';
import { selectSorting } from 'store/action';
import { getSelectedSorting } from 'store/selectors';
import { sortingOptions } from 'const';
import { SortingOption } from 'types/sorting';
import { useAppDispatch, useAppSelector } from 'hooks';

function SortingForm(): JSX.Element {
  const [isSortListOpened, setIsSortListOpened] = useState(false);

  const selectedSorting = useAppSelector(getSelectedSorting);
  const dispatch = useAppDispatch();

  const handleSortingChange = (event: SyntheticEvent<HTMLLIElement, MouseEvent>) => {
    const target = event.target as HTMLLIElement;

    dispatch(selectSorting({ targetSorting: target.textContent as SortingOption }));
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
          sortingOptions.map((option) => (
            <li
              className={`places__option ${option === selectedSorting ? ' places__option--active' : ''}`}
              tabIndex={0}
              key={option}
              onClick={handleSortingChange}
            >
              {option}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default SortingForm;
