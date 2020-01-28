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
