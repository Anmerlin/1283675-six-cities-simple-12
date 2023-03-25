import { Fragment } from 'react';
import { ReviewOfferCards } from 'types/review';
import { Review } from 'components';

type ReviewsListProps = {
  reviews: ReviewOfferCards;
};

function ReviewList({ reviews }: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Fragment key={review.id}>
          <Review review={review} />
        </Fragment>
      ))}
    </ul>
  );
}

export default ReviewList;
