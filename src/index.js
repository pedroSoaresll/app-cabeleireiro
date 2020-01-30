import './config/reactotron';
import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import './config/google-signin';
import Routes from './routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <Routes />
    </>
  );
}
