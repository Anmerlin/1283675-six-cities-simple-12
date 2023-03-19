import { Link } from 'react-router-dom';
import { AppRoute } from 'const';

function PageNotFound(): JSX.Element {
  return (
    <main className='page__main page__main--404 container'>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Main}>Go back to the main page</Link>
    </main>
  );
}

export default PageNotFound;
