import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions, NavigationActions} from 'react-navigation';
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
    const authValue = mountAuthValue(establishment, googleSession);

    console.tron.log('auth value', authValue);

    await AsyncStorage.setItem(
      STORAGE_KEY_ESTABLISHMENT,
      JSON.stringify(authValue),
    );
  }

  function goTo(routeName) {
    const resetNavigationAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})],
    });

    navigation.dispatch(resetNavigationAction);
  }

  function handleError(error) {
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
