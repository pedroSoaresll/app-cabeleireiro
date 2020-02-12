import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_KEY_ESTABLISHMENT} from '../../async-storage';
import {get as getQueue, update as updateQueue} from '../../services/queue';

import {
  Container,
  Title,
  AreaQueue,
  TextQuantity,
  ActionButton,
} from './styles';

function ManageQueue() {
  const [session, setSession] = useState({});
  const [queue, setQueue] = useState(0);

  useEffect(() => {
    async function loadEstablishment() {
      let establishmentStored = await AsyncStorage.getItem(
        STORAGE_KEY_ESTABLISHMENT,
      );

      establishmentStored = JSON.parse(establishmentStored);

      setSession(establishmentStored);

      const {data} = await getQueue(establishmentStored.app._id);
      setQueue(data.currentQueue);
    }

    loadEstablishment();
  }, []);

  async function handleUpdateQueue(quantity) {
    try {
      const newQueue = parseInt(queue) + quantity;

      if (newQueue < 0) return;

      await updateQueue(session, newQueue);

      setQueue(newQueue);
    } catch (error) {
      console.error('error to update', error);
    }
  }

  return (
    <Container>
      <Title>Controle o número de pessoas na fila de espera:</Title>

      <AreaQueue>
        <ActionButton
          style={{marginRight: 32}}
          onPress={() => handleUpdateQueue(-1)}>
          <Icon name="remove" size={64} color="#777" />
        </ActionButton>

        <TextQuantity>{queue}</TextQuantity>

        <ActionButton
          style={{marginLeft: 32}}
          onPress={() => handleUpdateQueue(+1)}>
          <Icon name="add" size={64} color="#777" />
        </ActionButton>
      </AreaQueue>
    </Container>
  );
}

ManageQueue.navigationOptions = {
  title: 'Gerenciar Fila',
};

export default ManageQueue;
