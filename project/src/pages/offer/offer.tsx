import { Navigate, useParams } from 'react-router-dom';
import { OfferCards } from 'types/offer';
import { HousingTypes } from 'types/housing';
import { ReviewOfferCards } from 'types/review';
import { AppRoute, housingType } from 'const';
import { Offers, Rating, Reviews, Form, Map } from 'components';

type OfferScreenProps = {
  offers: OfferCards;
  reviews: ReviewOfferCards;
};

function OfferScreen({ offers, reviews }: OfferScreenProps): JSX.Element {
  const { id: offerId } = useParams();

  const currentOffer = offers.find((offer) => offer.id.toString() === offerId);

  if (!currentOffer) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const {
    isPremium,
    images,
    price,
    rating,
    title,
    type,
    bedrooms,
    maxAdults,
    goods,
    description,
    host,
  } = currentOffer;

  const nearbyOffers = offers.filter((offer) => offer.id !== currentOffer.id);
  const currentType = housingType[type as HousingTypes];

  return (
    <>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.map((image, index) => {
              const keyValue = `${index}-${image}`;
              return (
                <div className="property__image-wrapper" key={keyValue}>
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium && <div className="property__mark"><span>Premium</span></div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">{title}</h1>
            </div>

            <Rating rating={rating} prefixCls={'property'}>
              <span className="property__rating-value rating__value">{rating}</span>
            </Rating>

            <ul className="property__features">
              <li className="property__feature property__feature--entire">{currentType}</li>
              <li className="property__feature property__feature--bedrooms">{bedrooms} Bedrooms</li>
              <li className="property__feature property__feature--adults">Max {maxAdults} adults</li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {goods.map((good, index) => {
                  const keyValue = `${index}-${good}`;
                  return (
                    <li className="property__inside-item" key={keyValue}>{good}</li>
                  );
                })}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''}`}>
                  <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">{host.name}</span>
                {host.isPro && <span className="property__user-status">Pro</span>}
              </div>
              <div className="property__description">
                <p className="property__text">{description}</p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
              <Reviews reviews={reviews} />
              <Form />
            </section>
          </div>
        </div>

        <Map
          city={currentOffer.city}
          offers={offers}
          selectedOffer={currentOffer}
          className={'property__map'}
        />

      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">

            {<Offers offers={nearbyOffers} />}

          </div>
        </section>
      </div>
    </>
  );
}

export default OfferScreen;
