import { render, screen } from '@testing-library/react';
import { makeFakeReview } from 'utils/mocks';
import Review from './review';

const review = makeFakeReview();
const { comment, date, user } = review;
const dateMock = new Date(date);
const dateMockText = dateMock.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
user.isPro = true;

describe('Component: Review', () => {
  it('should render correctly and update user review', () => {
    render(<Review review={review} />);

    expect(screen.getByText(comment)).toBeInTheDocument();
    expect(screen.getByText(dateMockText)).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
});
