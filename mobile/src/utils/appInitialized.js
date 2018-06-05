import { AsyncStorage } from 'react-native';
import { iconsLoaded } from '../utils/themes'

import { startLogin, startMainApp } from "../Nav";
import { AsyncStorageAuthToken } from "../utils/constants";

export default async function appInitialized() {
  await iconsLoaded();

  const token = await AsyncStorage.getItem(AsyncStorageAuthToken);

  if (!token) {
    startLogin();
  } else {
    startMainApp();
  }
}