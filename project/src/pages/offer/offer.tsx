import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'hooks';
import { HousingTypes } from 'types/housing';
import { getTargetOffer, getNearbyOffers, getReviews } from 'store/offer/selectors';
import { getAuthorizationStatus } from 'store/user/selectors';
import { AppRoute, AuthorizationStatus, housingType } from 'const';
import { fetchTargetOfferAction } from 'store/offer/api-actions';
import { Offers, Rating, Reviews, Form, Map } from 'components';

function OfferScreen(): JSX.Element {
  const { id: offerId } = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const targetOffer = useAppSelector(getTargetOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchTargetOfferAction(Number(offerId)));
    }
  }, [dispatch, offerId]); //?? спросить

  if (!targetOffer || !nearbyOffers || !reviews) {
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
  } = targetOffer;

  const currentType = housingType[type as HousingTypes];

  return (
    <>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {
              images.slice(0, 6).map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>
              ))
            }
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
              <li className="property__feature property__feature--bedrooms">{bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</li>
              <li className="property__feature property__feature--adults">Max {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}</li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {
                  goods.map((good) => (
                    <li className="property__inside-item" key={good}>{good}</li>
                  ))
                }
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

              {authorizationStatus === AuthorizationStatus.Auth ? <Form targetId={targetOffer.id} /> : null}
            </section>
          </div>
        </div>

        <Map
          city={targetOffer.city}
          offers={[...nearbyOffers, targetOffer]}
          targetOffer={targetOffer}
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
