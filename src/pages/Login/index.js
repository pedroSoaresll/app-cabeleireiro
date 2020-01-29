import React from 'react';

import {Container, LoginText} from './styles';

function Login({navigate}) {
  return (
    <Container>
      <LoginText>
        Gostaria de ter seu estabelecimento disponível em nosso app?
      </LoginText>
    </Container>
  );
}

Login.navigationOptions = {
  title: 'Entrar',
};

export default Login;
