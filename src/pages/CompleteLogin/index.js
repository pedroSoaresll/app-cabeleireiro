import React from 'react';

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

export default function CompleteLogin() {
  return (
    <Container>
      <Title>Complete o cadastro para começar:</Title>
      <RowBetween style={{marginTop: 16, marginBottom: 16}}>
        <InputSide
          placeholder="Cep"
          keyboardType="number-pad"
          autoCompleteType="postal-code"
          maxLength={8}
        />
        <InputSide
          placeholder="Número"
          keyboardType="number-pad"
          autoCompleteType="off"
          maxLength={4}
        />
      </RowBetween>

      <SearchAddressButton>
        <SearchAddressButtonText>Procurar Endereço</SearchAddressButtonText>
      </SearchAddressButton>

      <AreaAddreessResult>
        <Input editable={false} placeholder="Endereço" />
        <Input editable={false} placeholder="Bairro" style={{marginTop: 16}} />
        <RowBetween>
          <InputSide
            editable={false}
            placeholder="Cidade"
            style={{marginTop: 16}}
          />
          <InputSide
            editable={false}
            placeholder="Estado"
            style={{marginTop: 16}}
          />
        </RowBetween>
      </AreaAddreessResult>
    </Container>
  );
}
