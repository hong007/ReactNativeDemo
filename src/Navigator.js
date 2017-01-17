/**
 * Created by hongty on 2016/12/5.
 */
/**
 * Created by hongty on 2016/11/15.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Platform,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
// import Main from './Main';
import GesturePassword from './GesturePassword';
class navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  // pageJump() {
  //   this.props.navigator.push({
  //     name: 'BarcodeScanner',
  //     component: BarcodeScanner
  //   });
  // }

  render() {
    let defaultName = 'GesturePassword';
    let defaultComponent = GesturePassword;
    return (
      <Navigator
        initialRoute={{name: defaultName, component: defaultComponent}}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator}/>
        }}
      />
    );
  }
}

AppRegistry.registerComponent('ReactNativeDemo', () => navigator) ;
