import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { store } from 'store';
import { App } from 'components';
import { offers } from 'mocks/offers';
import { reviews } from 'mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App
          offers={offers}
          reviews={reviews}
        />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);
