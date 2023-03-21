import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { OfferCard } from 'types/offer';
import { MAX_RATING } from 'const';

type CardProps = {
  offer: OfferCard;
  setActive: Dispatch<SetStateAction<OfferCard | null>>;
}

function Card({ offer, setActive }: CardProps): JSX.Element {
  const { id, isPremium, previewImage, price, rating, title, type } = offer;

  const ratingStyleValue = Math.round(rating / MAX_RATING) * 100;

  const handleMouseEnter = () => {
    setActive(offer);
  };

  const handleMouseLeave = () => {
    setActive(null);
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingStyleValue}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
