import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  webClientId:
    '681660514084-lfovdbsoqfeo0os9cr910tg0h06tisug.apps.googleusercontent.com',
});
