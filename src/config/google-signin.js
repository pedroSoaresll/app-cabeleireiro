import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  scopes: [], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '990056976668-j7hf5at4iq1cupg9mn0pvr19avfj4g8j.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  // accountName: 'near-hair-stylist', // [Android] specifies an account name on the device that should be used
});
