import { OfferCards } from 'types/offer';
import { Main } from 'components';

type MainScreenProps = {
  offers: OfferCards;
}

function MainScreen({ offers }: MainScreenProps): JSX.Element {
  return (
    <Main offers={offers} />
  );
}

export default MainScreen;
