import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
// import storage from '../../libs/storage';
import {create} from '../../services/establishment';
import {STORAGE_KEY_ESTABLISHMENT} from '../../async-storage';
import {mountAuthValue} from '../../utils';
import {Container, LoginText} from './styles';

function Login({navigation}) {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  async function handleSignIn() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const googleUserInfo = await GoogleSignin.signIn();

      console.tron.log('google authentication', googleUserInfo);

      const establishment = await create(
        googleUserInfo.user.name,
        googleUserInfo.user.id,
      );

      const authValue = mountAuthValue(establishment.data, googleUserInfo);

      await AsyncStorage.setItem(
        STORAGE_KEY_ESTABLISHMENT,
        JSON.stringify(authValue),
      );

      console.tron.log('auth value', authValue);
      navigation.navigate('CompleteLogin');
    } catch (error) {
      console.tron.log('erro to signin', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        setIsSigninInProgress(true);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        setIsSigninInProgress(false);
      }
    }
  }

  return (
    <Container>
      <LoginText>
        Gostaria de ter seu estabelecimento disponível em nosso app?
      </LoginText>

      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={handleSignIn}
        disabled={isSigninInProgress}
      />
    </Container>
  );
}

Login.navigationOptions = {
  title: 'Entrar',
};

export default Login;
