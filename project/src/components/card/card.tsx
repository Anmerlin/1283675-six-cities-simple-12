import { Link } from 'react-router-dom';
import { housingType } from 'const';
import { OfferCard } from 'types/offer';
import { Rating } from 'components';

type CardProps = {
  offer: OfferCard;
  selectOffer?: (value: OfferCard | null) => void;
}

function Card({ offer, selectOffer }: CardProps): JSX.Element {
  const { id, isPremium, previewImage, price, rating, title, type } = offer;
  const currentType = housingType[type as keyof typeof housingType]; // спросить

  const handleOfferHover = (value: OfferCard | null) => {
    if (selectOffer) {
      selectOffer(value);
    }
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => { handleOfferHover(offer); }}
      onMouseLeave={() => { handleOfferHover(null); }}
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

        <Rating rating={rating} classValue={'place-card'} />

        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{currentType}</p>
      </div>
    </article>
  );
}

export default Card;
