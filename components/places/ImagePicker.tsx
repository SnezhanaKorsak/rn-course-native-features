import { Alert, View, Text, Image, StyleSheet } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

import { Colors } from '../../constants/colors';

import { OutlinedButton } from '../ui/OutlinedButton';

type Props = {
  selectedImage: string;
  onTakeImage: (imageUri: string) => void;
}

export const ImagePicker = ({ selectedImage, onTakeImage }: Props) => {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  const verifyPermissions = async () => {
    // Если статус неопределён, запрашиваем
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    // Если статус "отказано", пробуем повторно запросить
    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      const permissionResponse = await requestPermission();

      if (!permissionResponse.granted) {
        Alert.alert(
          'Insufficient Permissions!',
          'You need to grant camera permissions to use this app.'
        );
        return false;
      }
      return true;
    }

    // Даже если статус "DENIED", но запрос вернул granted: true — значит всё ок
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (image?.assets) {
      const imageUri = image.assets[0]?.uri;
      onTakeImage(imageUri);
    }
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (selectedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: selectedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  image: {
    width: '100%',
    height: '100%'
  }
});