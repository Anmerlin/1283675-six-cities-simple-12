import MainContent from '../../components/main/main';

type MainScreenProps = {
  rentalOffersCount: number;
}

function MainScreen({ rentalOffersCount }: MainScreenProps): JSX.Element {
  return (
    <MainContent rentalOffersCount={rentalOffersCount} />
  );
}

export default MainScreen;
