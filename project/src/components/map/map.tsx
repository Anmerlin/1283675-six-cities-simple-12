import { useState, useRef, useEffect } from 'react';
import { Icon, Marker, LayerGroup, PointTuple } from 'leaflet';
import { MarkerIcon } from 'const';
import { City } from 'types/city';
import { OfferCard, OfferCards } from 'types/offer';
import useMap from 'hooks/use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: OfferCards;
  selectedOffer: OfferCard | null;
  className?: string;
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
  const { city, offers, selectedOffer, className } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const [currentCity, setCurrentCity] = useState<City['name']>(city.name);

  useEffect(() => {
    if (map) {
      if (currentCity !== city.name) {
        map.flyTo(
          [
            city.location.latitude,
            city.location.longitude
          ],
          city.location.zoom,
          {
            animate: true,
            duration: 1
          }
        );

        setCurrentCity(city.name);
      }

      const markers = offers.map(
        (offer) =>
          new Marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon: offer.id === selectedOffer?.id ? currentCustomIcon : defaultCustomIcon,
            }
          )
      );

      const markersLayer = new LayerGroup(markers);
      markersLayer.addTo(map);

      return () => {
        map.removeLayer(markersLayer);
      };
    }
  }, [city, currentCity, map, offers, selectedOffer]);

  return <section className={`${className ? className : ''} map`} ref={mapRef} />;
}

export default Map;
