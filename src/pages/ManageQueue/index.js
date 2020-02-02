import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Title,
  AreaQueue,
  TextQuantity,
  ActionButton,
} from './styles';

function ManageQueue() {
  return (
    <Container>
      <Title>Controle o número de pessoas na fila de espera:</Title>

      <AreaQueue>
        <ActionButton style={{marginRight: 32}}>
          <Icon name="remove" size={64} color="#777" />
        </ActionButton>

        <TextQuantity>0</TextQuantity>

        <ActionButton style={{marginLeft: 32}}>
          <Icon name="add" size={64} color="#777" />
        </ActionButton>
      </AreaQueue>
    </Container>
  );
}

ManageQueue.navigationOptions = {
  title: 'Nome cabeleireiro',
};

export default ManageQueue;
