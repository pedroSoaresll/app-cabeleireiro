import React, {useState} from 'react';
import axios from 'axios';

import {
  Container,
  RowBetween,
  Input,
  Title,
  InputSide,
  CustomButton,
  CustomButtonText,
  AreaAddreessResult,
} from './styles';

function CompleteLogin() {
  const [addressPostalCode, setAddressPostalCode] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [addressName, setAddressName] = useState('');
  const [addressNeighborhood, setAddressNeighborhood] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressState, setAddressState] = useState('');

  async function handleSearchAddress() {
    // desfazer a validacao
    const isValidPostalCode =
      addressPostalCode && addressPostalCode.length === 8;

    if (!isValidPostalCode || !addressNumber) {
      // denhar os campos para ficarem invalidos
      return;
    }

    const address = await axios.get(
      `https://viacep.com.br/ws/${addressPostalCode}/json/`,
    );
    console.tron.log(address.data);

    const {logradouro, bairro, localidade, uf} = address.data;
    setAddressName(logradouro);
    setAddressNeighborhood(bairro);
    setAddressCity(localidade);
    setAddressState(uf);
  }

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

      <CustomButton
        enabled={true}
        onPress={handleSearchAddress}
        style={{backgroundColor: '#42A5F5'}}>
        <CustomButtonText>Procurar Endereço</CustomButtonText>
      </CustomButton>

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

      <CustomButton
        enabled={!!addressName}
        onPress={handleSearchAddress}
        style={{marginTop: 64}}>
        <CustomButtonText>Começar!</CustomButtonText>
      </CustomButton>
    </Container>
  );
}

CompleteLogin.navigationOptions = {
  title: 'Completar cadastro',
};

export default CompleteLogin;