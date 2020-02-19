import './config/reactotron';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import './config/google-signin';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';
import Routes from './routes';

class App extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('cec3a921-28b6-43b3-a2f2-0b70df7d8988');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  // onReceived = data => {};

  // onOpened = notification => {};

  // onIds = id => {};

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#333" />
        <Routes />
      </>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
