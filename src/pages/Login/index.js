import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import {Container, LoginText} from './styles';

function Login({navigate}) {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  async function handleSignIn() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const googleUserInfo = await GoogleSignin.signIn();
      console.tron.log('ola mundo', googleUserInfo);
      setUserInfo(googleUserInfo);
    } catch (error) {
      console.tron.log('erro to signin', error);
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
        color={GoogleSigninButton.Color.Dark}
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
