import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import {Dimensions, Image} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Map = styled(MapView)`
  width: ${width}px;
  height: ${height}px;
`;

export const MarkerIcon = styled(Image)`
  width: 50px;
  height: 50px;
`;

export const SearchEstablishment = styled.TextInput.attrs({
  placeholder: 'Digite o nome do cabeleireiro...',
  autoCaptalize: 'none',
  autoCorrect: false,
})`
  flex: 1;
  align-self: center;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  position: absolute;
  top: 20px;
  width: ${width - 50}px;
  elevation: 2;
  padding: 10px 15px;
`;

export const AreaModal = styled.View`
  flex: 1;
  background-color: #fff;
  max-height: 170px;
  padding: 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const AreaEstablishmentInfo = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const EstablishmentImage = styled.Image`
  width: 150px;
  height: 150px;
`;

export const EstablishmentName = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

export const EstablishmentStatusOperation = styled.Text`
  background-color: green;
  align-self: flex-start;
  color: white;
  border-radius: 4px;
  padding: 3px;
`;

export const AreaQueue = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EstablishmentQueue = styled.Text`
  font-size: 48px;
  font-weight: bold;
`;
