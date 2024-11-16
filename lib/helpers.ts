import { Users } from '@/constants/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const handleImagePicker = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert("You've refused to allow this app to access your photos!");
    return null;
  }

  return new Promise((resolve, reject) => {
    Alert.alert(
      'Upload Photo',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: async () => {
            try {
              const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });

              if (!result.canceled) {
                resolve(result.assets[0].uri);
              } else {
                resolve(null);
              }
            } catch (error) {
              console.error('Camera Error:', error);
              reject(error);
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            try {
              const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });

              if (!result.canceled) {
                resolve(result.assets[0].uri);
              } else {
                resolve(null);
              }
            } catch (error) {
              console.error('Gallery Error:', error);
              reject(error);
            }
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => resolve(null),
        },
      ],
      { cancelable: true }
    );
  });
};

export const addData = async (key: string, newData: Users) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(newData));
  } catch (error) {
    console.error('Error adding data:', error);
  }
};

export const getData = async (key: string): Promise<object[]> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving data:', error);
    return [];
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
