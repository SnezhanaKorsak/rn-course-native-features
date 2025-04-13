import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { PlaceForm } from '../components/places/PlaceForm';

import { PlaceType } from '../types';
import { TypeRootStackParamList } from '../navigation/types';

export const AddPlace = () => {
  const navigation = useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

  const onCreatePlace = (place: PlaceType) => {
    navigation.navigate('AllPlaces', { place });
  };

  return <PlaceForm onCreatePlace={onCreatePlace} />;
};