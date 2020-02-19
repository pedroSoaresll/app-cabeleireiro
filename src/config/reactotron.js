import Reactotron from 'reactotron-react-native';

/* global __DEV__ */

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}
