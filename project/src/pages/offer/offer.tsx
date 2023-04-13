import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'hooks';
import { fetchTargetOfferAction } from 'store/offers-data/api-actions';
import { getTargetOffer, getNearbyOffers, getReviews, getInitialStatus, getDataOfferLoadingStatus, getErrorStatus } from 'store/offers-data/selectors';
import { OfferItem } from 'types/offer';
import { Loader, Offer, PageNotFound } from 'components';
import LoadingScreen from 'pages/loading/loading';

function OfferScreen(): JSX.Element {
  const { id: offerId } = useParams();
  const isInitial = useAppSelector(getInitialStatus);
  const isDataLoading = useAppSelector(getDataOfferLoadingStatus);
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

  if (!isInitial) {
    return <LoadingScreen />;
  }

  if (isDataLoading) {
    return <Loader />;
  }

  if (isError) {
    return <PageNotFound />;
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
