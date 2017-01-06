/**
 * Created by hongty on 2016/12/5.
 */
/**
 * Created by hongty on 2016/11/29.
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
import BarScanner from 'react-native-barcodescanner';
import Camera from 'react-native-camera';

export default class BarcodeScanner extends Component {
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
    if (Platform.OS === 'android') {
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
          <BarScanner
            onBarCodeRead={(e)=> {
              this._barcodeReceived(e)
            }}
            style={{flex: 1, backgroundColor: 'rgba(0,0,0,.1)'}}
            torchMode={this.state.torchMode}
            cameraType={this.state.cameraType}
          />
        </View>
      );
    } else {
      console.log('为嘛打开二维码就挂了~~~')
      return (
        <View style={styles.container}>
          <Camera
            ref={(cam) => {this.camera = cam;}}
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

