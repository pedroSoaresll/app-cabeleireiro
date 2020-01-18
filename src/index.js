import React from 'react';
import Routes from './routes';
import {StatusBar, Text} from 'react-native';

import 'react-native-gesture-handler';

// import { Container } from './styles';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <Routes />
    </>
  );
}
