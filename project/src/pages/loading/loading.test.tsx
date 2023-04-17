import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { LoadingScreen } from 'pages';

describe('Page: LoadingScreen', () => {
  it('should render correctly', () => {
    render(
      <HelmetProvider>
        <LoadingScreen />
      </HelmetProvider>
    );

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });
});
