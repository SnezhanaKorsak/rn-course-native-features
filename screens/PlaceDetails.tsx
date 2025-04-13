import { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { fetchPlaceDetails } from '../utils/database';
import { PlaceDetailsRouteProp, TypeRootStackParamList } from '../navigation/types';

import { OutlinedButton } from '../components/ui/OutlinedButton';

import { Place } from '../models/place';

export const PlaceDetails = () => {
  const { params } = useRoute<PlaceDetailsRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

  const [fetchedPlace, setFetchedPlace] = useState<Place | null>(null);

  const showOnMapHandler = () => {
    if(!fetchedPlace) return;

    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  const selectedPlaceId = params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);

      setFetchedPlace(place);
      navigation.setOptions({
        title: place?.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});