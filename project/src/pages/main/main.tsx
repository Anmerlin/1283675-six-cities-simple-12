import Header from '../../components/header/header';
import MainContent from '../../components/main/main';

type MainScreenProps = {
  rentalOffersCount: number;
}

function MainScreen({rentalOffersCount}: MainScreenProps): JSX.Element {
  return (
    <>
      <Header />
      <MainContent rentalOffersCount={rentalOffersCount} />
    </>
  );
}

export default MainScreen;
