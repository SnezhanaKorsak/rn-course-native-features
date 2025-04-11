import { RouteProp } from '@react-navigation/native';

export type TypeRootStackParamList  = {
  AllPlaces: undefined;
  AddPlace: {lat: number, lng: number};
  Map: undefined;
};

export type AddPlaceRouteProp = RouteProp<TypeRootStackParamList, 'AddPlace'>;