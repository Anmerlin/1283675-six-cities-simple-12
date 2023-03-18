import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';

const Setting = {
  RentalOffersCount: 312,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      rentalOffersCount={Setting.RentalOffersCount}
      offers={offers}
      reviews={reviews}
    />
  </React.StrictMode>,
);
