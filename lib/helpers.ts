import { Users } from '@/constants/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
