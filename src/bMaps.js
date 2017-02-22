/**
 * Created by Skipper on 2017/2/20.
 */
import React, {Component,PropTypes} from 'react';
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

class Buttton extends Component {
  static propTypes = {
    label: PropTypes.string,
    onPress: PropTypes.func
  };

  static defaultProps = {
    label: 'Buttton',
    onPress() {

    }
  };

  render() {
    return (
      <TouchableHighlight
        style={styles.btn}
        onPress={this.props.onPress}>
        <Text style={{color: 'white'}}>{this.props.label}</Text>
      </TouchableHighlight>
    );
  }
}
;
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

        <View style={styles.row}>
          <Buttton label="Normal" onPress={() => {
            this.setState({
              mapType: MapTypes.NORMAL
            });
          }}/>
          <Buttton label="Satellite" onPress={() => {
            this.setState({
              mapType: MapTypes.SATELLITE
            });
          }}/>

          <Buttton label="Locate" onPress={() => {
            Geolocation.getCurrentPosition()
              .then(data => {
                this.setState({
                  zoom: 15,
                  marker: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    title: 'Your location'
                  },
                  center: {
                    latitude: data.latitude,
                    longitude: data.longitude
                  }
                });
              })
              .catch(e => {
                console.warn(e, 'error');
              })
          }}/>
        </View>

        <View style={styles.row}>
          <Buttton label="Zoom+" onPress={() => {
            this.setState({
              zoom: this.state.zoom + 1
            });
          }}/>
          <Buttton label="Zoom-" onPress={() => {
            if (this.state.zoom > 0) {
              this.setState({
                zoom: this.state.zoom - 1
              });
            }

          }}/>
        </View>

        <View style={styles.row}>
          <Buttton label="Traffic" onPress={() => {
            this.setState({
              trafficEnabled: !this.state.trafficEnabled
            });
          }}/>

          <Buttton label="Baidu HeatMap" onPress={() => {
            this.setState({
              baiduHeatMapEnabled: !this.state.baiduHeatMapEnabled
            });
          }}/>


        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  // container: {
  //   flex: 1
  // },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  btn: {
    height: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cccccc',
    paddingLeft: 8,
    paddingRight: 8,
    margin: 4
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
    marginBottom: 16
  }
});

