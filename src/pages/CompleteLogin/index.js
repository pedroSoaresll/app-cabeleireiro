import React from 'react';
import {TextInput} from 'react-native';

import {Container, AreaCepNumber, Input} from './styles';

export default function CompleteLogin() {
  return (
    <Container>
      <Title>Complete o cadastro para começar:</Title>
      <AreaCepNumber>
        <Input
          placeholder="Cep"
          keyboardType="number-pad"
          autoCompleteType="postal-code"
        />
        <Input
          placeholder="Número"
          keyboardType="number-pad"
          autoCompleteType="off"
        />
      </AreaCepNumber>

      <Input editable={false} placeholder="Endereço" />
    </Container>
  );
}
