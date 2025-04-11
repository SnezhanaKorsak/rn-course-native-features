import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { TypeRootStackParamList } from '../navigation/types';
import { Location } from '../types';

import { IconButton } from '../components/ui/IconButton';
import { MapViewContainer } from '../components/places/MapViewContainer';

const region = {
  latitude: 107.78,
  longitude: -122.43,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const Map = () => {
  const navigation = useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

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