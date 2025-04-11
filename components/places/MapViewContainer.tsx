import { useEffect, useState } from 'react';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { Location } from '../../types';

type Props = {
  selectedLocation: Location | null;
  zoomLevel?: number;
  onPress?: (event: MapPressEvent) => void;
}

export const MapViewContainer = ({ selectedLocation, zoomLevel, onPress }: Props) => {
  const zoom = 0.07;

  const [region, setRegion] = useState({
    latitude: selectedLocation ? selectedLocation.lat : 53.9,
    longitude: selectedLocation ? selectedLocation.lng : 27.57,
    latitudeDelta: zoom ,
    longitudeDelta: zoom,
  })
  const isFocused = useIsFocused();

  useEffect(() => {
    if(selectedLocation && isFocused) {
      setRegion({
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        latitudeDelta: zoom,
        longitudeDelta: zoom,
      })
    }

  }, [selectedLocation, isFocused]);


  return <MapView
    style={styles.map}
    initialRegion={region}
    onPress={onPress}
  >
    {selectedLocation && (
      <Marker
        title="Picked Location"
        coordinate={{
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        }}
      />
    )}
  </MapView>;
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: 'red'
  },
});
