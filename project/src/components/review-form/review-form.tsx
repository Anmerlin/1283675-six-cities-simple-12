import { FormEvent, ChangeEvent, Fragment, useState } from 'react';
import { useAppDispatch } from 'hooks';
import { sendReviewAction } from 'store/offer/api-actions';
import { RatingScores } from 'const';
import { OfferCard } from 'types/offer';

const MIN_LENGTH_INPUT = 50;
const MAX_LENGTH_INPUT = 300;

type Form = {
  rating: number;
  review: string;
}

type ReviewFormProps = {
  targetId: OfferCard['id'];
};

function ReviewForm({ targetId }: ReviewFormProps): JSX.Element {
  const [formData, setFormData] = useState<Form>({
    rating: 0,
    review: ''
  });

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };


  const isFormValid = () => {
    const isTextValid = formData.review.length > MIN_LENGTH_INPUT && formData.review.length < MAX_LENGTH_INPUT;
    const isRated = Number(formData.rating) > 0;

    return isTextValid && isRated;
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = { ...formData, targetId };
    dispatch(sendReviewAction(payload));
    setFormData({ review: '', rating: 0 });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {RatingScores.map((score) => (
          <Fragment key={score.id}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={score.value}
              id={`${score.value}-stars`}
              type="radio"
              checked={formData.rating.toString() === score.value.toString()}
              onChange={handleFieldChange}
            />
            <label htmlFor={`${score.value}-stars`} className="reviews__rating-label form__rating-label" title={score.title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}

      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={MIN_LENGTH_INPUT}
        maxLength={MAX_LENGTH_INPUT}
        onChange={handleFieldChange}
        value={formData.review}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_LENGTH_INPUT} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid()}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
