import { render, screen } from '@testing-library/react';
import Rating from './rating';

const getRatingStyleValue = (rating: number) => (Math.round(rating) / 5) * 100;
describe('Component: Rating', () => {
  it('should render correctly without children prop', () => {
    render(
      <Rating rating={3.7} prefixCls='place_card' />
    );

    expect(screen.getByTestId('place_card')).toBeInTheDocument();
  });

  it('should render correctly with children prop', () => {
    render(
      <Rating rating={2.3} prefixCls='place_card'>
        <span>{`width: ${getRatingStyleValue(2.3)}% `}</span>
      </Rating>
    );

    expect(screen.getByText(/width: 40%/i)).toBeInTheDocument();
  });
});
