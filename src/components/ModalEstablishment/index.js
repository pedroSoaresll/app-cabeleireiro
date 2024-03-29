import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
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
} from './styles';

function ModalEstablishment({visible, close, queue}) {
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
  }, [visible, queue]);

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

ModalEstablishment.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  queue: PropTypes.shape({
    establishment: PropTypes.shape({
      _id: PropTypes.string,
    }),
    currentQueue: PropTypes.number,
  }).isRequired,
};

export default ModalEstablishment;
