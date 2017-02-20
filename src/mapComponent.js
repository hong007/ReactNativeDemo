/**
 * Created by Skipper on 2017/2/20.
 */
'use strict';
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  DeviceEventEmitter,
  View,
} from 'react-native';
import Main from './Main'
import MapView from 'react-native-maps';

export default class mapComponent extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      region: {
        latitude: 30.78825,
        longitude: 120.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  onRegionChange(region) {
    this.setState({ region });
  }
  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    return (
      <View style={{flex: 1, backgroundColor: '#f7f7f7',}}>
        <View style={{
          height: (Platform.OS === 'android' ? 42 : 50),
          backgroundColor: '#fff',
          flexDeriction: 'row',
          alignItem: 'center',
          marginTop: 24,
          paddingTop: 15,
          paddingLeft: 18
        }}>
          <TouchableOpacity
            style={{
              height: 44,
              width: 44,
              top: 0,
              left: 0,
              position: 'absolute',
              zIndex: 999999,
              paddingLeft: 15,
              paddingTop: 18,
            }}
            onPress={() => this.props.navigator.pop()}
          >
            <Image source={require('../img/ic_back.png')}/>
          </TouchableOpacity>
          <Text style={{flex: 1, textAlign: 'center', color: '#313131', fontSize: 18,}}>地图</Text>
        </View>
        <MapView
          style={styles.mapcontainer}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapcontainer:{
    flex:1,
  }
});

