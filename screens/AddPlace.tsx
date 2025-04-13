import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { PlaceForm } from '../components/places/PlaceForm';

import { TypeRootStackParamList } from '../navigation/types';
import { insertPlace } from '../utils/database';
import { PlaceType } from '../types';

export const AddPlace = () => {
  const navigation = useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

  const onCreatePlace = async (place: PlaceType) => {
    await insertPlace(place);
    navigation.navigate('AllPlaces', { place });
  };

  return <PlaceForm onCreatePlace={onCreatePlace} />;
};