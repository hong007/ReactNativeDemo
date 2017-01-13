/**
 * Created by hongty on 2016/12/14.
 */
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
} from 'react-native';
// import BarcodeScannerChild from './BarcodeScannerChild';
import BarcodeScannerChildCamera from './BarcodeScannerChildCamera';
export default class BarcodeScannerParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scannerResult: '',
      modalVisible: false,

      scannerResult2:'',
    }
  }

  componentWillMount() {
    let _this = this;
    DeviceEventEmitter.addListener("changeBarCode", (events)=> {
      _this.setState({scannerResult: events})
    });

    // DeviceEventEmitter.addListener("changeBarCode2", (events)=> {
    //   _this.setState({scannerResult2: events})
    // });
  }

  _openScannerPage() {
    // if (Platform.OS === 'android') {
    //   this.props.navigator.push({
    //     name: 'BarcodeScannerChild',
    //     component: BarcodeScannerChild
    //   });
    // } else {
      this.props.navigator.push({
        name: 'BarcodeScannerChildCamera',
        component: BarcodeScannerChildCamera
      });
    // }
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
          <Text style={{flex: 1, textAlign: 'center', color: '#313131', fontSize: 18,}}>扫码实例</Text>
        </View>
        <View>
          <TextInput style={{height: 44,}}
                     placeholder="扫码或输入二维码"
                     value={this.state.scannerResult}
                     onChangeText={
                       (scannerResult)=> {
                         this.setState({
                           scannerResult
                         })
                       }
                     }
          >

          </TextInput>
          <Text>输入框输入的值或扫码结果是：{this.state.scannerResult}</Text>
          <Image style={{position: 'absolute', right: 18, top: 10}}
                 source={require('../img/scanner.png')}><Text
            style={{backgroundColor: 'transparent', height: 44,}}
            onPress={()=> {
              this._openScannerPage()
              }}></Text></Image>
        </View>
      </View>
    )
  }
}
