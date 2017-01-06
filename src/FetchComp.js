/**
 * Created by hongty on 2016/12/22.
 */
import React, {Component} from 'react';
import{
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import Ctrl from './Ctrl';
import EditView from './EditView';
import Button from './Button';
import LoginSucceess from './LoginSucceess';
import NetUtil from './NetUtil';
export default class FetchComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scannerResult: '',
      modalVisible: false
    }
  }

  componentDidMount() {
    let _this = this;
    DeviceEventEmitter.addListener("changeBarCode", (events)=> {
      _this.setState({scannerResult: events})
    });
  }

  onPressCallback() {
    // this.pageJump();

    let _this = this;
    this.setState({
      isLoadModalVisible: true
    });
    let url = "http://jieyan.xyitech.com/login/?username=" + this.userName + "&password=" + this.passWord;

    NetUtil.postJson(url, (responseText)=> {
      let curdata = JSON.parse(responseText);
      // let curdata = responseText;
      if (curdata.err == '0') {
        // AsyncStorage.setItem("LOGIN_USERNAME", this.userName);
        // AsyncStorage.setItem("LOGIN_USERPWD", this.passWord);
        // AsyncStorage.setItem("LOGIN_TOKEN", curdata.token);
        this.timer = setTimeout(
          ()=> {
            ToastAndroid.show('登录成功', ToastAndroid.SHORT);
            _this.setState({
              isLoadModalVisible: false
            });
            _this.pageJump();
          },
          300
        );
      } else {
        _this.setState({
          isLoadModalVisible: false
        });
        // alert("用户名或密码错误，请重试");
        ToastAndroid.show('用户名或密码错误，请重试', ToastAndroid.SHORT);
      }
    });
  };

  //登录成功页面跳转
  pageJump() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.push({
        title: '登录成功',
        name: 'LoginSucceess',
        component: LoginSucceess,
      });
    }
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    return (
      <View style={{flex: 1, backgroundColor: '#313131',}}>
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
          <Text style={{flex: 1, textAlign: 'center', color: '#313131', fontSize: 18,}}>网络请求</Text>
        </View>
        <View style={{backgroundColor: '#313131'}}>
          <View style={LoginStyles.loginview}>
            <Text style={{fontSize: 22 * Ctrl.pxToDp(), color: '#fff', height: 30 * Ctrl.pxToDp(),}}>用户登录</Text>
            <View style={{paddingTop: 38,}}>
              <Text style={{color: '#a09f9f', marginTop: 20, fontSize: 14 * Ctrl.pxToDp(),height: 30 * Ctrl.pxToDp(),}}>用户名</Text>
              <EditView name='' onChangeText={(text) => {
                this.userName = text;
              }}/>
              <Text style={{color: '#a09f9f', marginTop: 20, fontSize: 14 * Ctrl.pxToDp(),height: 30 * Ctrl.pxToDp(),}}>密码</Text>
              <EditView name='password' onChangeText={(text) => {
                this.passWord = text;
              }}/>
              <Button name='登录' onPressCallback={()=>this.onPressCallback()}/>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const LoginStyles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 30,
    paddingTop: (Platform.OS === 'android' ? 102 : 110),
    backgroundColor: '#313131',
    zIndex: -1,
  },
});
