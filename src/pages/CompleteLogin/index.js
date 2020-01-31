import React, {useState} from 'react';

import {
  Container,
  RowBetween,
  Input,
  Title,
  InputSide,
  SearchAddressButton,
  SearchAddressButtonText,
  AreaAddreessResult,
} from './styles';

function CompleteLogin() {
  const [addressPostalCode, setAddressPostalCode] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [addressName, setAddressName] = useState('');
  const [addressNeighborhood, setAddressNeighborhood] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressState, setAddressState] = useState('');

  return (
    <Container>
      <Title>Informe seu endereço:</Title>
      <RowBetween style={{marginTop: 16, marginBottom: 16}}>
        <InputSide
          placeholder="Cep"
          keyboardType="number-pad"
          autoCompleteType="postal-code"
          maxLength={8}
          onChangeText={text => setAddressPostalCode(text)}
          value={addressPostalCode}
        />
        <InputSide
          placeholder="Número"
          keyboardType="number-pad"
          autoCompleteType="off"
          maxLength={4}
          onChangeText={text => setAddressNumber(text)}
          value={addressNumber}
        />
      </RowBetween>

      <SearchAddressButton>
        <SearchAddressButtonText>Procurar Endereço</SearchAddressButtonText>
      </SearchAddressButton>

      <AreaAddreessResult>
        <Input editable={false} placeholder="Endereço" value={addressName} />
        <Input
          editable={false}
          placeholder="Bairro"
          style={{marginTop: 16}}
          value={addressNeighborhood}
        />
        <RowBetween>
          <InputSide
            editable={false}
            placeholder="Cidade"
            style={{marginTop: 16}}
            value={addressCity}
          />
          <InputSide
            editable={false}
            placeholder="Estado"
            style={{marginTop: 16}}
            value={addressState}
          />
        </RowBetween>
      </AreaAddreessResult>
    </Container>
  );
}

CompleteLogin.navigationOptions = {
  title: 'Completar cadastro',
};

export default CompleteLogin;
