import { RouteProp } from '@react-navigation/native';
import { PlaceType } from '../types';

export type TypeRootStackParamList = {
  AllPlaces: { place: Omit<PlaceType, 'id'> };
  AddPlace: { lat: number, lng: number } | undefined;
  Map: { initialLat: number, initialLng: number };
  PlaceDetails: { placeId: string };
};

export type AddPlaceRouteProp = RouteProp<TypeRootStackParamList, 'AddPlace'>;
export type PlaceDetailsRouteProp = RouteProp<TypeRootStackParamList, 'PlaceDetails'>;
export type MapRouteProp = RouteProp<TypeRootStackParamList, 'Map'>;