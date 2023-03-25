import { useRef, useEffect } from 'react';
import { Icon, Marker, PointTuple } from 'leaflet';
import { MarkerIcon } from 'const';
import { City } from 'types/city';
import { OfferCard, OfferCards } from 'types/offer';
import useMap from 'hooks/use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: OfferCards;
  selectedOffer: OfferCard | null;
  classValue: string;
};

const iconSize: PointTuple = [MarkerIcon.Size.Width, MarkerIcon.Size.Height];
const iconAnchor: PointTuple = [MarkerIcon.Size.Width / 2, MarkerIcon.Size.Height];

const defaultCustomIcon = new Icon({
  iconUrl: MarkerIcon.Image.Default,
  iconSize,
  iconAnchor
});

const currentCustomIcon = new Icon({
  iconUrl: MarkerIcon.Image.Active,
  iconSize,
  iconAnchor
});

function Map(props: MapProps): JSX.Element {
  const { city, offers, selectedOffer, classValue } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(offer.id === selectedOffer?.id ? currentCustomIcon : defaultCustomIcon)
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return <section className={`${classValue}__map map`} ref={mapRef} />;
}

export default Map;
