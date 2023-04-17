import { render, screen } from '@testing-library/react';
import { makeFakeReviews } from 'utils/mocks';
import Reviews from './review-list';

const reviews = makeFakeReviews();

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    render(<Reviews reviews={reviews} />);

    expect(screen.getAllByTestId(/reviewItem/i).length).toBe(reviews.length);
  });
});
