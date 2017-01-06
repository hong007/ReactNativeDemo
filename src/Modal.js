/**
 * Created by hongty on 2016/12/15.
 */
/**
 * Created by hongty on 2016/12/15.
 */
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
  Modal,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import DialPhoneChild from './DialPhoneChild';
export default class BarcodeScannerParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
          <Text style={{flex: 1, textAlign: 'center', color: '#313131', fontSize: 18,}}>模态框Modal</Text>
        </View>
        <View style={{marginTop: 22}}>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.")
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.2)',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <View style={{backgroundColor: '#fff'}}>
                <Text>Hello World!</Text>
                <TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                  <Text>Hide Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity onPress={() => {
              this.setModalVisible(true)
            }}>
              <Text>Show Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
