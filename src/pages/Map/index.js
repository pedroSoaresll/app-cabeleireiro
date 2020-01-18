import React, {useState, useEffect, useCallback} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Modal from 'react-native-modal';

import api from '../../services/api';

import {
  Map,
  MarkerIcon,
  SearchEstablishment,
  AreaModal,
  AreaEstablishmentInfo,
  AreaQueue,
  EstablishmentImage,
  EstablishmentName,
  EstablishmentQueue,
  EstablishmentStatusOperation,
} from './styles';

import userImg from '../../assets/images/user.png';
import cabeleireiroImg from '../../assets/images/cabeleireiro.png';
import establishmentImg from '../../assets/images/establishment.jpeg';

export default function MapPage() {
  const delta = {
    longitudeDelta: 0.006000436842441559,
    latitudeDelta: 0.009136713084487269,
  };

  const [visible, setVisible] = useState(false);
  const [userRegion, setUserRegion] = useState({
    ...delta,
    latitude: -10,
    longitude: -10,
  });
  const [region, setRegion] = useState({
    ...delta,
    longitude: -10.0,
    latitude: -10.0,
  });

  const latitude = -23.548948;
  const longitude = -46.87224;

  const establishments = [
    [-23.549292, -46.873335],
    [-23.548299, -46.871897],
    [-23.549587, -46.872069],
  ];

  useEffect(() => {
    function getLocationPermission() {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

    async function loadUserPostition() {
      const granted = await getLocationPermission();

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;

      Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
        const newRegion = {
          ...region,
          latitude,
          longitude,
        };

        setUserRegion(newRegion);
        setRegion(newRegion);
      });
    }

    loadUserPostition();
  }, []);

  const handleNewRegion = useCallback(
    region => {
      setRegion(region);
    },
    [region],
  );

  function loadEstablishment(establishment) {
    setVisible(true);
  }

  return (
    <View>
      <Map region={region} onRegionChangeComplete={handleNewRegion}>
        <Marker coordinate={userRegion}>
          <MarkerIcon source={userImg} />
        </Marker>

        {establishments.map(([estabLat, estabLong]) => (
          <Marker
            key={estabLat + estabLong}
            coordinate={{latitude: estabLat, longitude: estabLong}}
            onPress={() => loadEstablishment(estabLat)}>
            <MarkerIcon source={cabeleireiroImg} />
          </Marker>
        ))}
      </Map>

      <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <AreaModal>
          <EstablishmentImage source={establishmentImg} />
          <AreaEstablishmentInfo>
            <EstablishmentName>Mercadao Alvorada</EstablishmentName>
            <EstablishmentStatusOperation>Aberto</EstablishmentStatusOperation>
            <AreaQueue>
              <EstablishmentQueue>8</EstablishmentQueue>
            </AreaQueue>
          </AreaEstablishmentInfo>
        </AreaModal>
      </Modal>

      <SearchEstablishment />
    </View>
  );
}

MapPage.navigationOptions = {
  headerShown: false,
};
