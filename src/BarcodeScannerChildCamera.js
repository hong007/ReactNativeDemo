import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import Camera from 'react-native-camera';
// import Main from './Main';
import BarcodeScannerParent from './BarcodeScannerParent';

export default class BarcodeScannerChildCamera extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      isBarCodeScann: false,
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false
    };
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.error(err));
    }
  }

  startRecording = () => {
    if (this.camera) {
      this.camera.capture({mode: Camera.constants.CaptureMode.video})
        .then((data) => console.log(data))
        .catch(err => console.error(err));
      this.setState({
        isRecording: true
      });
    }
  }

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false
      });
    }
  }

  switchType = () => {
    let newType;
    const {back, front} = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const {back, front} = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('../assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('../assets/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const {auto, on, off} = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashIcon() {
    let icon;
    const {auto, on, off} = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('../assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('../assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('../assets/ic_flash_off_white.png');
    }

    return icon;
  }

  _onBarCodeRead(data) {
    let _this = this;
    if (data.data != '') {
      console.log('这下你不嘚瑟了吧', data.data);
      // 只扫一次
      if (this.state.isBarCodeScann) {
        return true;
      } else {
        this.setState({
          isBarCodeScann: true,
        });
        // alert('扫码结果是',data.data)
        DeviceEventEmitter.emit("changeBarCode", data.data);
        console.log('有没有执行');
        this.props.navigator.pop();
      }
    }
  }

  render() {
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
        <View style={styles.container}>
          <StatusBar
            animated
            hidden
          />
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={this.state.camera.aspect}
            captureTarget={this.state.camera.captureTarget}
            type={this.state.camera.type}
            flashMode={this.state.camera.flashMode}
            onBarCodeRead={(data)=> {
              this._onBarCodeRead(data)
            }}
            defaultTouchToFocus
            mirrorImage={false}
          >
            <View style={styles.rectangleContainer}>
              <View style={styles.rectangle}/>
            </View>
          </Camera>
          <View style={[styles.overlay, styles.topOverlay]}>
            <TouchableOpacity
              style={styles.typeButton}
              onPress={this.switchType}
            >
              <Image
                source={this.typeIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flashButton}
              onPress={this.switchFlash}
            >
              <Image
                source={this.flashIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.overlay, styles.bottomOverlay]}>
            {
              !this.state.isRecording
              &&
              <TouchableOpacity
                style={styles.captureButton}
                onPress={this.takePicture}
              >
                <Image
                  source={require('../assets/ic_photo_camera_36pt.png')}
                />
              </TouchableOpacity>
              ||
              null
            }
            <View style={styles.buttonsSpace}/>
            {
              !this.state.isRecording
              &&
              <TouchableOpacity
                style={styles.captureButton}
                onPress={this.startRecording}
              >
                <Image
                  source={require('../assets/ic_videocam_36pt.png')}
                />
              </TouchableOpacity>
              ||
              <TouchableOpacity
                style={styles.captureButton}
                onPress={this.stopRecording}
              >
                <Image
                  source={require('../assets/ic_stop_36pt.png')}
                />
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
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
});
