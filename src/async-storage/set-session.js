import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_KEY_ESTABLISHMENT} from '.';

export default async function setSession(authValue) {
  console.log('auth value', authValue);

  await AsyncStorage.setItem(
    STORAGE_KEY_ESTABLISHMENT,
    JSON.stringify(authValue),
  );
}
