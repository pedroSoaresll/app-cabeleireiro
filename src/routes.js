import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Map from './pages/Map';
import Login from './pages/Login';
import CompleteLogin from './pages/CompleteLogin';
import ManageQueue from './pages/ManageQueue';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Map,
      Login,
      CompleteLogin,
      ManageQueue,
    },
    {
      defaultNavigationOptions: {
        headerLayoutPresent: 'center',
        headerBackTitleVisible: false,
      },
    },
  ),
);

export default Routes;
