import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';
import { MapPressEvent } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MapRouteProp, TypeRootStackParamList } from '../navigation/types';
import { Location } from '../types';

import { IconButton } from '../components/ui/IconButton';
import { MapViewContainer } from '../components/places/MapViewContainer';

export const Map = () => {
  const navigation = useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();
  const { params } = useRoute<MapRouteProp>();

  const initialLocation = params && {
    lat: params.initialLat,
    lng: params.initialLng,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(initialLocation);

  const selectLocationHandler = (event: MapPressEvent) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location (by tapping on the map) first!'
      );
      return;
    }

    navigation.navigate('AddPlace', {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor as string}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);


  return (
    <MapViewContainer
      selectedLocation={selectedLocation}
      zoomLevel={0.0922}
      onPress={selectLocationHandler} />
  );
};