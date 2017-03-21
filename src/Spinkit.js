/**
 * Created by Skipper on 2017/3/9.
 */
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
  View
} from 'react-native';
import Main from './Main';
import Spinner from 'react-native-spinkit';


export default class Spinkit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 100,
      color: "#FFFFFF",
      isVisible: true
    }
  }

  next() {
    if (this.state.index++ >= this.state.types.length)
      this.setState({index: 0})
    else
      this.setState({index: this.state.index++})
  }

  increaseSize() {
    this.setState({size: this.state.size + 10});
  }

  changeColor() {
    this.setState({color: '#' + Math.floor(Math.random() * 16777215).toString(16)});
  }

  changeVisibility() {
    this.setState({isVisible: !this.state.isVisible});
  }


  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    var type = this.state.types[this.state.index];
    return (
      <View style={{
        flex: 1, backgroundColor: '#f7f7f7',
      }}>
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
            onPress={() => this.props.navigator.pop() }>
            <Image source={require('../img/ic_back.png')}/>
          </TouchableOpacity >
          <Text style={{
            flex: 1, textAlign: 'center', color: '#313131', fontSize: 18,
          }}>
            加载动画</Text >
        </View >

        <View style={styles.container}>
          <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type}
                   color={this.state.color}/>

          <Text style={styles.text}>Type: {type}</Text>

          <TouchableOpacity style={styles.btn} onPress={()=> {
            this.next()
          }}>
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={()=>{this.increaseSize()}}>
            <Text style={styles.text}>Increase size</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={()=>{this.changeColor()}}>
            <Text style={styles.text}>Change color</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={()=>{this.changeVisibility()}}>
            <Text style={styles.text}>Change visibility</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d35400',
  },

  spinner: {
    marginBottom: 50
  },

  btn: {
    marginTop: 20
  },

  text: {
    color: "white"
  }
});
