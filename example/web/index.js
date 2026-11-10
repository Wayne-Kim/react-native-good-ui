import { AppRegistry } from 'react-native';
import App from '../App';

AppRegistry.registerComponent('GoodUIExample', () => App);
AppRegistry.runApplication('GoodUIExample', {
  rootTag: document.getElementById('root'),
});
