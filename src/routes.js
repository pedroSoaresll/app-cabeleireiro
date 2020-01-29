import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Map from './pages/Map';
import Login from './pages/Login';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Map,
      Login,
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
