import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  margin: 16px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const RowBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  height: 40px;
  background-color: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #ccc;
`;

export const InputSide = styled(Input)`
  flex-basis: 45%;
`;

export const SearchAddressButton = styled(RectButton)`
  margin-bottom: 16px;
  background-color: #7159c1;
  padding: 8px 15px;
  border-radius: 4px;
`;

export const SearchAddressButtonText = styled.Text`
  color: #fff;
  text-align: center;
`;

export const AreaAddreessResult = styled.View`
  margin-top: 32px;
`;
