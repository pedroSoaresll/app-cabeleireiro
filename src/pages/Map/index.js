import React, {useState, useEffect, useCallback} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import PropTypes from 'prop-types';

import api from '../../services/api';
import {Map, MarkerIcon} from './styles';
import userImg from '../../assets/images/user.png';
import ModalEstablishment from '../../components/ModalEstablishment';
import cabeleireiroImg from '../../assets/images/cabeleireiro.png';
import LoginButton from '../../components/LoginButton';
import ErrorState from '../../components/ErrorState';

function MapPage({navigation}) {
  const DISTANCE = 300;

  const delta = {
    longitudeDelta: 0.003,
    latitudeDelta: 0.003,
  };

  const [visible, setVisible] = useState(false);
  const [userRegion, setUserRegion] = useState({
    ...delta,
    latitude: -10.0,
    longitude: -10.0,
  });
  const [region, setRegion] = useState({
    ...delta,
    longitude: -10.0,
    latitude: -10.0,
  });
  const [establishments, setEstablishments] = useState([]);
  const [queue, setQueue] = useState({});
  const [errorState, setErrorState] = useState(false);

  function getLocationPermission() {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
  }

  useEffect(() => {
    async function loadUserPostition() {
      try {
        setErrorState(false);

        const granted = await getLocationPermission();

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error('Hasnt location permission');
        }

        Geolocation.watchPosition(
          ({coords: {latitude, longitude}}) => {
            const newRegion = {
              longitudeDelta: 0.003,
              latitudeDelta: 0.003,
              latitude,
              longitude,
            };

            setUserRegion(newRegion);
            setRegion(newRegion);
          },
          () => {
            setErrorState(true);
          },
          {
            timeout: 10000,
            maximumAge: 1000,
            enableHighAccuracy: true,
          },
        );
      } catch (e) {
        setErrorState(true);
      }
    }

    loadUserPostition();

    return () => {
      Geolocation.clearWatch();
    };
  }, []);

  useEffect(() => {
    async function loadEstablishmentsPosition() {
      const coordinate = `${region.latitude},${region.longitude}`;
      const {data} = await api.get(
        `/coordinates/${coordinate}?distance=${DISTANCE}`,
      );

      if (!data.length) return;

      setEstablishments(data);
    }

    loadEstablishmentsPosition();
  }, [region]);

  const handleNewRegion = useCallback(newRegion => {
    setRegion(newRegion);
  }, []);

  async function loadEstablishment(establishmentId) {
    const {data} = await api.get(`/establishments/${establishmentId}/queue`);
    setQueue(data);
    setVisible(true);
  }

  function mapRender() {
    return (
      <View>
        <Map region={region} onRegionChangeComplete={handleNewRegion}>
          <Marker coordinate={userRegion}>
            <MarkerIcon source={userImg} />
          </Marker>

          {establishments.map(
            ({
              establishmentId,
              location: {
                coordinates: [estabLat, estabLong],
              },
            }) => (
              <Marker
                key={estabLat + estabLong}
                coordinate={{latitude: estabLat, longitude: estabLong}}
                onPress={() => loadEstablishment(establishmentId)}>
                <MarkerIcon source={cabeleireiroImg} />
              </Marker>
            ),
          )}
        </Map>

        <ModalEstablishment
          visible={visible}
          queue={queue}
          close={() => setVisible(false)}
        />
        {/* <SearchEstablishment /> */}
        <LoginButton navigation={navigation} />
      </View>
    );
  }

  function errorStateRender() {
    return <ErrorState navigation={navigation} />;
  }

  return (!errorState && mapRender()) || (errorState && errorStateRender());
}

MapPage.navigationOptions = {
  headerShown: false,
};

MapPage.propTypes = {
  navigation: PropTypes.func.isRequired,
};

export default MapPage;
