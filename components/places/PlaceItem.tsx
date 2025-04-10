import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { PlaceType } from '../../types';

type Props = {
  place: PlaceType;
  onSelect?: () => void;
}

export const PlaceItem = ({ place, onSelect }: Props) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({});