import { Link } from 'react-router-dom';
import { AppRoute } from 'const';
import './page-not-found.css';

function PageNotFound(): JSX.Element {
  return (
    <>
      <h1>404. Page not found</h1>
      <Link className='page-not-found__link' to={AppRoute.Main}>Go back to the main page</Link>
    </>
  );
}

export default PageNotFound;
