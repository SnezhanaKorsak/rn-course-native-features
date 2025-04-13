import { RouteProp } from '@react-navigation/native';
import { PlaceType } from '../types';

export type TypeRootStackParamList = {
  AllPlaces: { place: PlaceType };
  AddPlace: { lat: number, lng: number } | undefined;
  Map: undefined;
};

export type AddPlaceRouteProp = RouteProp<TypeRootStackParamList, 'AddPlace'>;