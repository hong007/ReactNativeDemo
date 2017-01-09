/**
 * Created by hongty on 2017/1/9.
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
import Camera from 'react-native-camera';

export default class BarcodeScannerCamera extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      torchMode: 'off',
      cameraType: 'back',
      isBarCodeScann: false,
      scanResult: '',

      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
    };
  }

  _barcodeReceived(e) {
    let _this = this;
    if (e.data != '') {
      console.log('这下你不嘚瑟了吧', e.data);
      // 只扫一次
      if (this.state.isBarCodeScann) {
        return true;
      } else {
        this.setState({
          isBarCodeScann: true,
        });
        DeviceEventEmitter.emit("changeBarCode", e.data);
        this.props.navigator.push({
          name: 'Main',
          component: Main
        })
        // this.props.navigator.pop();
        console.log('有没有执行');
      }
    }
  }

  onBarCodeRead = (e)=> {
    console.log(e.data);
  }


  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    console.log('为嘛打开二维码就挂了~~~')
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          defaultTouchToFocus
          mirrorImage={false}>
        </Camera>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
});

