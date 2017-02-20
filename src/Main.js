/**
 * Created by hongty on 2016/12/5.
 */
import React, {Component} from 'react';
import{
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Modal,
  Linking,
  ToastAndroid,
  DeviceEventEmitter,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import CommonStyle from './CommonStyle';

import SideMenu from 'react-native-side-menu';

import Ctrl from './Ctrl';
import Menu from './Menu';
import DialPhoneParent from './DialPhoneParent';
import ModalComp from './Modal';
import FetchComp from './FetchComp';
import PickerCompParent from './PickerCompParent';
import ToastComponent from './ToastComponent';
import BarcodeScannerParent from './BarcodeScannerParent';

import mapComponent from './mapComponent';

// import PushyComp from './PushyComp';
import NetUtil from './NetUtil';

import _updateConfig from '../package.json';


const menu_user = require('../img/menu_user.png');
const menu_order = require('../img/menu_order.png');
const menu_phone = require('../img/menu_phone.png');
const menu_lay = require('../img/menu_lay.png');
const menu_about = require('../img/menu_about.png');
const menu_quit = require('../img/menu_quit.png');

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loginName: '犀利哥'
    }
  }

  state = {
    isOpen: false,
    selectedItem: 'About',
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  componentWillMount() {
    let _this = this;
    // let url = 'http://jieyan.xyitech.com/static/metadata.android.json';
    // NetUtil.postJson(url, (responseText)=> {
    //   let curdata = JSON.parse(responseText);
    //   // let curdata = responseText;
    //   let localVesion = _updateConfig.version;
    //   console.log('返回的JSON数据是  ', curdata, curdata.version, localVesion);
    //   if (curdata.version != localVesion) {
    //     // _this.setState({
    //     //   isLoadModalVisible: false
    //     // });
    //     _this._openBrowserLink();
    //   } else {
    //     ToastAndroid.show('已是最新版本', ToastAndroid.SHORT);
    //   }
    // });
  }

  updateMenuState(isOpen) {
    this.setState({isOpen,});
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  }

  _openLeftMenuPage(name) {
    let curPage = name;
    if (curPage == "LoginPage") {
      if (this.state.loginName == "登录") {
        this.props.navigator.push({
          name: "LoginPage",
          component: LoginPage,
        });
      } else {
        return
      }
    } else if (curPage == "BarcodeScannerParent") {
      this.props.navigator.push({
        name: "BarcodeScannerParent",
        component: BarcodeScannerParent,
      });
    } else if (curPage == "DialPhoneParent") {
      this.props.navigator.push({
        name: "DialPhoneParent",
        component: DialPhoneParent,
      });
    } else if (curPage == "ModalComp") {
      this.props.navigator.push({
        name: "ModalComp",
        component: ModalComp,
      });
    } else if (curPage == "FetchComp") {
      this.props.navigator.push({
        name: "FetchComp",
        component: FetchComp,
      });
    } else if (curPage == "PickerCompParent") {
      this.props.navigator.push({
        name: "PickerCompParent",
        component: PickerCompParent,
      });
    } else if (curPage == "PushyComp") {
      this.props.navigator.push({
        name: "PushyComp",
        component: PushyComp,
      });
    } else if (curPage == "ToastComponent") {
      this.props.navigator.push({
        name: "ToastComponent",
        component: ToastComponent,
      });
    }else if (curPage == "mapComponent") {
      this.props.navigator.push({
        name: "mapComponent",
        component: mapComponent,
      });
    } else if (curPage == "QuitLogin") {
      AsyncStorage.setItem("LOGIN_USERNAME", '');
      AsyncStorage.setItem("LOGIN_USERPWD", '');
      AsyncStorage.setItem("LOGIN_TOKEN", '');
      this.props.navigator.push({
        name: "LoginPage",
        component: LoginPage,
      });
    }
  }

  _openBrowserLink() {
    let url = 'http://jieyan.xyitech.com/static/app-release.apk';
    Linking.openURL(url)
      .catch((err)=> {
        console.log('An error occurred', err);
      });
  }

  //const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    var menu = (
      <View style={{flex: 1, backgroundColor: '#1b1b1b', paddingTop: 24,}}
            onPress={()=>this.closeDrawer()}
      >
        <Menu title='扫码' pageName="BarcodeScannerParent" imageSource={menu_lay} _leftMenuPress={(pageName)=> {
          this._openLeftMenuPage(pageName)
        }}/>
        <Menu title='电话' pageName="DialPhoneParent" imageSource={menu_phone} _leftMenuPress={(pageName)=> {
          this._openLeftMenuPage(pageName)
        }}/>
        <Menu title='模态框' pageName="ModalComp" imageSource={menu_about} _leftMenuPress={(pageName)=> {
          this._openLeftMenuPage(pageName)
        }}/>
        <Menu title='网络请求' pageName="FetchComp" imageSource={menu_about} _leftMenuPress={(pageName)=> {
          this._openLeftMenuPage(pageName)
        }}/>
        <Menu title='Picker下拉框' pageName="PickerCompParent" imageSource={menu_about} _leftMenuPress={(pageName)=> {
          this._openLeftMenuPage(pageName)
        }}/>
        <Menu title='Toast' pageName="ToastComponent" imageSource={menu_about} _leftMenuPress={(pageName)=> {
          this._openLeftMenuPage(pageName)
        }}/>
        <Menu title='maps' pageName="mapComponent" imageSource={menu_about} _leftMenuPress={(pageName)=> {
          this._openLeftMenuPage(pageName)
        }}/>
        {/*<Menu title='Pushy更新' pageName="PushyComp" imageSource={menu_about} _leftMenuPress={(pageName)=> {*/}
        {/*this._openLeftMenuPage(pageName)*/}
        {/*}}/>*/}

      </View>
    );
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <TouchableHighlight style={styles.button} onPress={() => this.toggle()}>
            <Image
              source={require('../img/menu.png')} style={{width: 32, height: 32}}/>
          </TouchableHighlight>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.welcome}>
              Welcome to React Native!
            </Text>
            <Text style={styles.instructions}>
              To get started, edit index.ios.js
            </Text>
            <Text style={styles.instructions}>
              Press Cmd+R to reload,{'\n'}
              Cmd+Control+Z for dev menu
            </Text>
            <Text style={styles.instructions}>
              Current selected menu item is: {this.state.selectedItem}
            </Text>
            <Text onPress={()=> {
              this._openBrowserLink()
            }}>点我链接到浏览器中</Text>
          </View>
        </View>
      </SideMenu>
    )
  }
}
const styles = StyleSheet.create({
  view: {
    marginBottom: 50,
    flex: 1,
  },
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
