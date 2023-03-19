import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { App } from 'components';
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
    <HelmetProvider>
      <App
        rentalOffersCount={Setting.RentalOffersCount}
        offers={offers}
        reviews={reviews}
      />
    </HelmetProvider>
  </React.StrictMode>,
);
