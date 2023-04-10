import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'hooks';
import { fetchTargetOfferAction } from 'store/offers-data/api-actions';
import { getDataLoadingStatus, getTargetOffer, getNearbyOffers, getReviews, getErrorStatus } from 'store/offers-data/selectors';
import { OfferItem } from 'types/offer';
import { Loader, Offer, PageNotFound } from 'components';

function OfferScreen(): JSX.Element {
  const { id: offerId } = useParams();
  const isDataLoading = useAppSelector(getDataLoadingStatus);
  const isError = useAppSelector(getErrorStatus);
  const targetOffer = useAppSelector(getTargetOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchTargetOfferAction(Number(offerId)));
    }
  }, [offerId, dispatch]);

  if (isError && !isDataLoading) {
    return <PageNotFound />;
  }

  if (isDataLoading) {
    return <Loader />;
  }

  return (
    <Offer
      targetOffer={targetOffer as OfferItem}
      nearbyOffers={nearbyOffers}
      reviews={reviews}
    />
  );
}

export default OfferScreen;
