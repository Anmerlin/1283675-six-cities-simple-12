import { ReviewOfferCard } from 'types/review';
import { Rating } from 'components';

type ReviewProps = {
  review: ReviewOfferCard;
};

function getDate(dateValue: string, property?: boolean): string {
  const date = new Date(dateValue);

  if (property) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return [year, month, day].join('-');
  }

  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function Review({ review }: ReviewProps): JSX.Element {
  const { user, rating, comment, date } = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">

        <Rating rating={rating} classValue={'reviews'} />

        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={getDate(date, true)}>{getDate(date)}</time>
      </div>
    </li>
  );
}

export default Review;
