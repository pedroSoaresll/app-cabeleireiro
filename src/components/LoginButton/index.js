import React from 'react';
import PropTypes from 'prop-types';

import {AreaLoginButton, ButtonLogin, TextButtonLogin} from './styles';

function LoginButton({navigation}) {
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

LoginButton.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func(),
  }).isRequired,
};

export default LoginButton;
