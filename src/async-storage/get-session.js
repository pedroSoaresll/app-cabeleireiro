import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_KEY_ESTABLISHMENT} from './index';

export default async function getSession() {
  const establishmentStored = await AsyncStorage.getItem(
    STORAGE_KEY_ESTABLISHMENT,
  );

  return await JSON.parse(establishmentStored);
}
