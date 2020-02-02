import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  margin: 16px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export const AreaQueue = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextQuantity = styled.Text`
  font-size: 80px;
  font-weight: bold;
`;

export const ActionButton = styled(RectButton)`
  padding: 10px;
`;
