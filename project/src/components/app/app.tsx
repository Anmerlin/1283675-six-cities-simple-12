import MainScreen from '../../pages/main/main';

type AppScreenProps = {
  rentalOffersNumber: number;
}

function App({rentalOffersNumber}: AppScreenProps): JSX.Element {
  return (
    <MainScreen rentalOffersNumber={rentalOffersNumber} />
  );
}

export default App;
