import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import establishmentImg from '../../assets/images/establishment.jpeg';
import io from '../../libs/socket-io';

import {
  AreaModal,
  AreaEstablishmentInfo,
  AreaQueue,
  EstablishmentImage,
  EstablishmentName,
  EstablishmentQueue,
  EstablishmentStatusOperation,
} from './styles.js';

export default function ModalEstablishment({visible, close, queue}) {
  const [currentQueue, setCurrentQueue] = useState(0);
  useEffect(() => {
    if (!queue.establishment) return;

    setCurrentQueue(queue.currentQueue);
  }, [queue]);

  useEffect(() => {
    if (visible) {
      io.connect();
      io.on(`${queue.establishment._id}-room`, socket => {
        setCurrentQueue(socket);
      });
    } else {
      io.removeAllListeners();
      io.disconnect();
    }
  }, [visible]);

  return (
    <Modal isVisible={visible} onBackdropPress={() => close()}>
      <AreaModal>
        <EstablishmentImage source={establishmentImg} />
        <AreaEstablishmentInfo>
          <EstablishmentName>{queue.establishment?.name}</EstablishmentName>
          <EstablishmentStatusOperation>Aberto</EstablishmentStatusOperation>
          <AreaQueue>
            <EstablishmentQueue>{currentQueue}</EstablishmentQueue>
          </AreaQueue>
        </AreaEstablishmentInfo>
      </AreaModal>
    </Modal>
  );
}
