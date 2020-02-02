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
      const establishmentStored = await AsyncStorage.getItem(
        STORAGE_KEY_ESTABLISHMENT,
      );

      console.tron.log('establishment stored', establishmentStored);
      setSession(JSON.parse(establishmentStored));

      const {data} = await getQueue(session.app._id);
      setQueue(data.currentQueue);
    }

    loadEstablishment();
  }, []);

  async function handleUpdateQueue(quantity) {
    const newQueue = parseInt(quantity);

    if (newQueue < 0) return;

    await updateQueue(session, newQueue);

    setQueue(newQueue);
  }

  return (
    <Container>
      <Title>Controle o número de pessoas na fila de espera:</Title>

      <AreaQueue>
        <ActionButton
          style={{marginRight: 32}}
          onPress={() => handleUpdateQueue(queue - 1)}>
          <Icon name="remove" size={64} color="#777" />
        </ActionButton>

        <TextQuantity>{queue}</TextQuantity>

        <ActionButton
          style={{marginLeft: 32}}
          onPress={() => handleUpdateQueue(queue + 1)}>
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
