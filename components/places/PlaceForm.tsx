import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { Colors } from '../../constants/colors';
import { PickedLocation, PlaceType } from '../../types';

import { ImagePicker } from './ImagePicker';
import { LocationPicker } from './LocationPicker';
import { CustomButton } from '../ui/CustomButton';

type Props = {
  onCreatePlace: (placeData: Omit<PlaceType, 'id'>) => void;
}

export const PlaceForm = ({ onCreatePlace }: Props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [pickedLocation, setPickedLocation] = useState<PickedLocation | null>(null);

  const changeTitleHandler = async (enteredText: string) => {
    setEnteredTitle(enteredText);
    await AsyncStorage.setItem('form-title', enteredText);
  };

  const takeImageHandler = async (imageUri: string) => {
    setSelectedImage(imageUri);
    await AsyncStorage.setItem('form-image', imageUri);
  };

  const pickLocationHandler = useCallback((location: PickedLocation) => {
    setPickedLocation(location);

  }, []);

  const savePlaceHandler = async () => {
    if (pickedLocation) {
      const address = pickedLocation?.address;
      const placeData = {
        title: enteredTitle,
        imageUri: selectedImage,
        address: address,
        location: pickedLocation,
      };
      onCreatePlace(placeData);
    }

    await AsyncStorage.multiRemove(['form-title', 'form-image']);
  };

  useFocusEffect(
    useCallback(() => {
      const loadFormData = async () => {
        const savedTitle = await AsyncStorage.getItem('form-title');
        const savedImage = await AsyncStorage.getItem('form-image');

        if (savedTitle) setEnteredTitle(savedTitle);
        if (savedImage) setSelectedImage(savedImage);
      };

      loadFormData();
    }, [])
  );

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker selectedImage={selectedImage} onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <CustomButton onPress={savePlaceHandler}>Add Place</CustomButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});