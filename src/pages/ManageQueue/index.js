import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Title, AreaQueue, TextQuantity} from './styles';

function ManageQueue() {
  return (
    <Container>
      <Title>Controle o número de pessoas na fila de espera:</Title>

      <AreaQueue>
        <Icon name="remove" size={16} color="#333" />
        <TextQuantity>0</TextQuantity>
        <Icon name="add" size={16} color="#333" />
      </AreaQueue>
    </Container>
  );
}

ManageQueue.navigationOptions = {
  title: 'Nome cabeleireiro',
};

export default ManageQueue;
