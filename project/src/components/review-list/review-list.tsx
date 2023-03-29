import { ReviewOfferCards } from 'types/review';
import { Review } from 'components';

type ReviewsListProps = {
  reviews: ReviewOfferCards;
};

function ReviewList({ reviews }: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <li className="reviews__item" key={review.id}>
          <Review review={review} />
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;
