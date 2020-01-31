import LegacyFactory from '@react-native-community/async-storage-backend-legacy';
import AsyncStorageFactory from '@react-native-community/async-storage';

export default AsyncStorageFactory.create(new LegacyFactory());
