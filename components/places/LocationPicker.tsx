import { useEffect, useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';

import { Colors } from '../../constants/colors';
import { Location } from '../../types';

import { OutlinedButton } from '../ui/OutlinedButton';
import { AddPlaceRouteProp, TypeRootStackParamList } from '../../navigation/types';
import { MapViewContainer } from './MapViewContainer';

export const LocationPicker = () => {
  const navigation = useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();
  const { params } = useRoute<AddPlaceRouteProp>();
  const isFocused = useIsFocused();

  const [pickedLocation, setPickedLocation] = useState<null | Location>(null);

  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    if (isFocused && params) {
      const mapPickedLocation = {
        lat: params.lat,
        lng: params.lng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [params, isFocused]);

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app.'
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  /*let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }*/

  return (
    <View>
      <View style={styles.mapPreviewContainer}>
        <MapViewContainer selectedLocation={pickedLocation} zoomLevel={0.005} />
      </View>

      {/*<View style={styles.mapPreview}>
        {locationPreview}
      </View>*/}

      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  mapPreviewContainer: {
    width: '100%',
    height: 350,
    marginVertical: 8,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});