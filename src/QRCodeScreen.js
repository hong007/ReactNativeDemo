/**
 * Created by Skipper on 2017/2/10.
 */
'use strict';
import React, {Component} from 'react';
import{
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  DeviceEventEmitter,
  VibrationIOS
} from 'react-native';
import Camera from 'react-native-camera';
import BarcodeScannerParent from './BarcodeScannerParent';

export default class BarcodeScanner extends React.Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      isBarCodeScann: false,
      scanResult: '',
    }
  }

  _onBarCodeRead(result) {
    let _this = this;
    if (result.data != '') {
      console.log('这下你不嘚瑟了吧', result.data);
      // 只扫一次
      if (_this.state.isBarCodeScann) {
        return true;
      } else {
        _this.setState({
          isBarCodeScann: true,
        });
        DeviceEventEmitter.emit("changeBarCode", result.data);
        console.log('有没有执行');
        _this.props.navigator.pop()
      }
    }
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
          <Text style={{flex: 1, textAlign: 'center', color: '#313131', fontSize: 18,}}>扫一扫</Text>
        </View>
        <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera}>
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle}/>
          </View>
        </Camera>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  camera: {
    height: 568,
    alignItems: 'center',
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    width: 100,
    bottom: 10,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0097CE',
  },
});
