import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';
import {Map, MarkerIcon} from './styles';
import userImg from '../../assets/images/user.png';
import ModalEstablishment from '../../components/ModalEstablishment';
import cabeleireiroImg from '../../assets/images/cabeleireiro.png';
import LoginButton from '../../components/LoginButton';

function MapPage({navigation}) {
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
  const [queue, setQueue] = useState({});
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    function getLocationPermission() {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

    async function loadUserPostition() {
      try {
        const granted = await getLocationPermission();

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;

        Geolocation.getCurrentPosition(
          ({coords: {latitude, longitude}}) => {
            setErrorState(false);
            const newRegion = {
              ...region,
              latitude,
              longitude,
            };

            setUserRegion(newRegion);
            setRegion(newRegion);
          },
          () => {
            setErrorState(true);
          },
        );
      } catch (e) {
        setErrorState(true);
      }
    }

    async function loadEstablishmentsPosition() {
      const coordinate = `${region.latitude},${region.longitude}`;
      const {data} = await api.get(
        `/coordinates/${coordinate}?distance=${DISTANCE}`,
      );

      if (!data.length) return;

      setEstablishments(data);
    }

    loadUserPostition();
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
    return (
      <View>
        <Text style={{marginTop: 50, color: '#333'}}>Error State Here</Text>
      </View>
    );
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
