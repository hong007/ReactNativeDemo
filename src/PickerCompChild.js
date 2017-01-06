/**
 * Created by hongty on 2016/11/14.
 */

import React, {Component} from 'react';
import{
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker,
  Image,
  DeviceEventEmitter,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';
import NetUtil from './NetUtil';
import Ctrl from './Ctrl';
import ModalComp from './ModalComp';


class PickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValue: '',
      pickerValue2: '',
      airports_status: false,
      start_airports_load: false,
      airportsData: null,
      airportsEndData: null,

      isLoadModalVisible: false,
      // test: this.props.test,
    };
  }

  componentDidMount() {
    // let url = "http://jieyan.xyitech.com/config/allroute?token=" + token;
    let _this = this;
    AsyncStorage.getItem("LOGIN_TOKEN", function (errs, result) {
      //TODO:错误处理
      if (!errs) {
        let Token = result;
        console.log("取得缓存中的Token是  ", Token, "  ");

        _this.setState({
          // isLoadModalVisible: true
        });

        let url = "http://jieyan.xyitech.com/spoint/search?token=" + 'MSMxNDgyMzkzMDIyQGppZXlhbi54eWl0ZWNoLmNvbSNQZUc2alhHT1JMTXZZRGF5b2hPY1VTdVhzUnc9';
        NetUtil.postJson(url, (responseText)=> {
          let curdata = JSON.parse(responseText);
          if (curdata.err == '0') {
            let airports = JSON.stringify(curdata.msg);
            airports = JSON.parse(airports);
            console.log('airports list is ', airports);
            _this.setState({
              airports_status: true,
              airportsData: airports,

              isLoadModalVisible: false
            });
          } else {
            ToastAndroid.show('获取航路失败请重试', ToastAndroid.SHORT);
            DeviceEventEmitter.emit("routeChange", false);
          }
        });
      }
    })
  }

  chooseAirPorts(value) {
    this.setState({
      pickerValue: value,
      start_airports_load: false,
    });
    console.log("取得的站点id是", value);
    let _this = this;
    // AsyncStorage.getItem("LOGIN_TOKEN", function (errs, result) {
    //   //TODO:错误处理
    //   if (!errs) {
    //     let Token = result;
    //     console.log("取得缓存中的Token是  ", Token, "  ");
    //     let url = "http://jieyan.xyitech.com/route/search?sid=" + value + "&token=" + Token;
    //     NetUtil.postJson(url, (responseText)=> {
    //       let curdata = JSON.parse(responseText);
    //       if (curdata.err == '0') {
    //         let routes = JSON.stringify(curdata.msg);
    //         routes = JSON.parse(routes);
    //         console.log('routes list is ', routes, '  ', typeof routes);
    //         if (routes.length > 0) {
    //           _this.setState({
    //             start_airports_load: true,
    //             airportsEndData: routes,
    //           });
    //           DeviceEventEmitter.emit("routeChange", true);
    //
    //         } else {
    //           ToastAndroid.show('该站点没有对应航路，请重试', ToastAndroid.SHORT);
    //           DeviceEventEmitter.emit("routeChange", false);
    //         }
    //
    //       } else {
    //         ToastAndroid.show('获取航路失败请重试', ToastAndroid.SHORT);
    //         DeviceEventEmitter.emit("routeChange", false);
    //       }
    //     });
    //   }
    // });
  }

  chooseAirPortsEnd(value) {
    this.setState({
      pickerValue2: value,
    });
    AsyncStorage.setItem("ROUTE_ID", value);
    console.log('存储的航路id是', value)

  }

  initStartAirports(n) {
    let item = n;
    return <Picker.Item style={PickerStyle.pickerItem} label={item.name} value={item.id} airportType="sid"
                        sidValue="item.id"/>;
  }

  initEndAirports(n) {
    let item = n;
    return <Picker.Item style={PickerStyle.pickerItem} label={item.ename} value={item.id} airportType="eid"
                        eidValue={item.eid} routeID={item.id}/>;
  }

  render() {
    if (!this.state.airports_status) {
      // console.log('页面未获得数据初始化');
      return (
        <View style={PickerStyle.Container}>
          <View style={PickerStyle.item}>
            <Text style={PickerStyle.bgSPoint}> </Text>
            <Picker
              mode={'dropdown'}
              selectedValue={this.state.pickerValue}
              onValueChange={(value) => this.chooseAirPorts(value)}>
              <Picker.Item style={PickerStyle.pickerItem} label="请选择" value="请选择" aid=""/>
            </Picker>
          </View>

          <View style={{marginLeft: 10, marginRight: 10, alignItems: 'center'}}>
            <Image source={require('../img/line.png')}/>
          </View>

          <ModalComp modalValue={this.state.isLoadModalVisible}/>

        </View>
      );
    } else {
      if (this.state.start_airports_load) {
        return (
          <View style={PickerStyle.Container}>
            <View style={PickerStyle.item}>
              <Text style={PickerStyle.bgSPoint}> </Text>
              <Picker
                mode={'dropdown'}
                selectedValue={this.state.pickerValue}
                onValueChange={(value) => this.chooseAirPorts(value)}>
                {this.state.airportsData.map((n)=>this.initStartAirports(n))}
              </Picker>
            </View>
            <View style={{marginLeft: 10, marginRight: 10, alignItems: 'center'}}>
              <Image source={require('../img/line.png')}/>
            </View>
            <View style={PickerStyle.item}>
              <Text style={PickerStyle.bgEPoint}> </Text>
              <Picker
                mode={'dropdown'}
                selectedValue={this.state.pickerValue2}
                onValueChange={(value) => this.chooseAirPortsEnd(value)}
              >
                {this.state.airportsEndData.map((n)=>this.initEndAirports(n))}
              </Picker>
            </View>
            <ModalComp modalValue={this.state.isLoadModalVisible}/>

          </View>

        );
      } else {
        return (
          <View style={PickerStyle.Container}>
            <View style={PickerStyle.item}>
              <Picker
                style={PickerStyle.picker}
                itemStyle={PickerStyle.pickerItem}
                selectedValue={this.state.pickerValue}
                onValueChange={(value) => this.chooseAirPorts(value)}>
                {this.state.airportsData.map((n)=>this.initStartAirports(n))}
              </Picker>
            </View>


            <ModalComp modalValue={this.state.isLoadModalVisible}/>

          </View>
        );
      }
    }
  }
}
const PickerStyle = StyleSheet.create({
  Container: {
    height: 100 * Ctrl.pxToDp(),
  },
  item: {
    height: 50 * Ctrl.pxToDp(),
  },
  picker: {
    backgroundColor: '#00f',
    height: 50 * Ctrl.pxToDp(),
  },
  pickerItem: {
    color: '#313131',
    fontSize: 23 * Ctrl.pxToDp(),
    height: 50 * Ctrl.pxToDp(),
  },
  bgSPoint: {
    width: 8 * Ctrl.pxToDp(),
    height: 8 * Ctrl.pxToDp(),
    borderRadius: 4 * Ctrl.pxToDp(),
    backgroundColor: '#3EC556',
    position: 'absolute',
    left: 10,
    top: 21 * Ctrl.pxToDp(),
  },
  bgEPoint: {
    width: 8 * Ctrl.pxToDp(),
    height: 8 * Ctrl.pxToDp(),
    borderRadius: 4 * Ctrl.pxToDp(),
    position: 'absolute',
    left: 10,
    top: 21 * Ctrl.pxToDp(),
    backgroundColor: '#ED684A'
  }
})

export default PickerComponent;