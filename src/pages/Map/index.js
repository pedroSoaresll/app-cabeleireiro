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
  const DISTANCE = 300;

  const delta = {
    longitudeDelta: 0.003,
    latitudeDelta: 0.003,
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

  const [establishments, setEstablishments] = useState([]);

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

  useEffect(() => {
    async function loadEstablishmentsPosition() {
      const coordinate = `${region.latitude},${region.longitude}`;
      const {data} = await api.get(
        `/coordinates/${coordinate}?distance=${DISTANCE}`,
      );

      if (!data.length) return;

      const geolocations = data.map(geo => geo.location.coordinates);

      setEstablishments(geolocations);
    }

    loadEstablishmentsPosition();
  }, [region]);

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
