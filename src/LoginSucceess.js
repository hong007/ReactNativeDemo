/**
 * Created by hongty on 2016/12/22.
 */
import React, {Component} from 'react';
import{
  View,
  TextInput,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import FetchComp from './FetchComp';
export default class LoginSucceess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
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
          <Text style={{flex: 1, textAlign: 'center', color: '#313131', fontSize: 18,}}>登录成功</Text>
        </View>
        <View style={{flex:1,alignItem:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{flex:1,alignItem:'center',}}>
            <Text onPress={()=>this.props.navigator.pop()}>点我返回登录页</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
