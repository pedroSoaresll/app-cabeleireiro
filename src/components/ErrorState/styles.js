import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const ContainerCenter = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 24px;
`;

export const SubTitle = styled.Text`
  font-size: 16px;
`;

export const ActiveGPSButton = styled(RectButton)`
  background-color: #60b9fd;
  padding: 8px;
  border-radius: 8px;
  margin-top: 40px;
`;
