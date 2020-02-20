import AsyncStorage from '@react-native-community/async-storage';

export const STORAGE_KEY_ESTABLISHMENT = '@hairstylist';

export async function getSession() {
  const establishmentStored = await AsyncStorage.getItem(
    STORAGE_KEY_ESTABLISHMENT,
  );

  return JSON.parse(establishmentStored);
}

export async function setSession(authValue) {
  await AsyncStorage.setItem(
    STORAGE_KEY_ESTABLISHMENT,
    JSON.stringify(authValue),
  );
}
