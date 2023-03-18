import MainContent from '../../components/main/main';
import { OfferCards } from '../../types/offer';

type MainScreenProps = {
  rentalOffersCount: number;
  offers: OfferCards;
}

function MainScreen({ rentalOffersCount, offers }: MainScreenProps): JSX.Element {
  return (
    <MainContent rentalOffersCount={rentalOffersCount} offers = {offers}/>
  );
}

export default MainScreen;
