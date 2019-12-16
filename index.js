/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler' //this code provide can make swipe drawers

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
