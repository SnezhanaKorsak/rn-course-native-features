import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { PlaceType } from '../../types';
import { Colors } from '../../constants/colors';

import { PlaceItem } from './PlaceItem';

import { TypeRootStackParamList } from '../../navigation/types';

type Props = {
  places: PlaceType[];
}

export const PlacesList = ({ places }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<TypeRootStackParamList>>();

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  const selectPlaceHandler = (id: string) => {
    navigation.navigate('PlaceDetails', { placeId: id, });
  };

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler} />}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200
  },
});