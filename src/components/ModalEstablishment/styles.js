import styled from 'styled-components/native';

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
