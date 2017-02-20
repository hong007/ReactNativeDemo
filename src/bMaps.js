/**
 * Created by Skipper on 2017/2/20.
 */
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
  View
} from 'react-native';
import Main from './Main';
import {MapView, MapTypes, MapModule, Geolocation} from 'react-native-baidu-map';

export default class bMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mayType: MapTypes.NORMAL,
      zoom: 15,
      center: {
        longitude: 113.981718,
        latitude: 22.542449
      },
      trafficEnabled: false,
      baiduHeatMapEnabled: false,
      markers: [{
        longitude: 113.981718,
        latitude: 22.542449,
        title: "Window of the world"
      }, {
        longitude: 113.995516,
        latitude: 22.537642,
        title: ""
      }]
    };
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    return (
      <View style={{
        flex: 1, backgroundColor: '#f7f7f7',
      }}>
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
            onPress={() => this.props.navigator.pop() }>
            <Image source={require('../img/ic_back.png')}/>
          </TouchableOpacity >
          <Text style={{
            flex: 1, textAlign: 'center', color: '#313131', fontSize: 18,
          }}>
            地图</Text >
        </View >
        <MapView
          trafficEnabled={this.state.trafficEnabled}
          baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
          zoom={this.state.zoom}
          mapType={this.state.mapType}
          center={this.state.center}
          marker={this.state.marker}
          markers={this.state.markers}
          style={styles.map}
          onMapClick={(e) => {
          }}
        >
        </MapView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapcontainer: {
    flex: 1,
  }
});

