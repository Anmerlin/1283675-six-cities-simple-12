import Header from '../../components/header/header';
import MainContent from '../../components/main/main';

type MainScreenProps = {
  rentalOffersNumber: number;
}

function MainScreen({rentalOffersNumber}: MainScreenProps): JSX.Element {
  return (
    <>
      <Header />
      <MainContent rentalOffersNumber={rentalOffersNumber} />
    </>
  );
}

export default MainScreen;
