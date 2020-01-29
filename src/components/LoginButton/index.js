import React from 'react';

import {AreaLoginButton, ButtonLogin, TextButtonLogin} from './styles';

export default function LoginButton({navigation}) {
  function handleLogin() {
    navigation.push('Login');
  }

  return (
    <AreaLoginButton>
      <ButtonLogin onPress={handleLogin}>
        <TextButtonLogin>Login</TextButtonLogin>
      </ButtonLogin>
    </AreaLoginButton>
  );
}
