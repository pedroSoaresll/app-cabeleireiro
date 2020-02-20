import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {StackActions, NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';

import {
  Container,
  Title,
  SubTitle,
  ActiveGPSButton,
  ContainerCenter,
} from './styles';

function ErrorState({navigation}) {
  function requestLocationPermission() {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2 style='color: #0af13e'>Usar localização?</h2>Este aplicativo quer alterar as configuralções do dispositivo:<br/><br/>Usar GPS para localização<br/>",
      ok: 'Configuração',
      cancel: 'Cancelar',
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
      preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
      providerListener: false, // true ==> Trigger locationProviderStatusChange listener when the location state changes
    }).then(() => {
      const resetNavigationActions = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Map',
          }),
        ],
      });

      navigation.dispatch(resetNavigationActions);
    });
  }

  return (
    <ContainerCenter>
      <Container>
        <Icon name="location-off" size={150} />

        <Title>Seu GPS está desativado</Title>
        <SubTitle>
          O aplicativo necessita do GPS para seu funcionamento
        </SubTitle>

        <ActiveGPSButton onPress={requestLocationPermission}>
          <Text>Ativar GPS</Text>
        </ActiveGPSButton>
      </Container>
    </ContainerCenter>
  );
}

ErrorState.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};

export default ErrorState;
