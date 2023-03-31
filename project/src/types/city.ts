import { cityNames } from 'const';
import { Location } from './location';

export type CityName = typeof cityNames[number];

export type City = {
  location: Location;
  name: CityName;
}
