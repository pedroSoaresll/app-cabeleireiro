import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {StackActions, NavigationActions} from 'react-navigation';
import {setSession} from '../../async-storage';
import {create} from '../../services/establishment';
import {mountAuthValue} from '../../utils';
import {Container, LoginText} from './styles';

function Login({navigation}) {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  async function handleSignIn() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const googleUserInfo = await GoogleSignin.signIn();

      const {data} = await create(
        googleUserInfo.user.name,
        googleUserInfo.user.id,
      );

      storeAuthentication(data.payload, googleUserInfo);

      let routeName = '';

      if (data.existent) {
        routeName = 'ManageQueue';
      } else {
        routeName = 'CompleteLogin';
      }

      goTo(routeName);
    } catch (error) {
      handleError(error);
    }
  }

  async function storeAuthentication(establishment, googleSession) {
    try {
      const authValue = mountAuthValue(establishment, googleSession);
      await setSession(authValue);
    } catch (error) {
      console.error('error to save session', error);
    }
  }

  function goTo(routeName) {
    const resetNavigationAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})],
    });

    navigation.dispatch(resetNavigationAction);
  }

  function handleError(error) {
    console.error('erro to signin', error.message);
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
