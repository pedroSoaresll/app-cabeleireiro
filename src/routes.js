import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Map from './pages/Map';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Map,
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
