/**
 * Created by Skipper on 2017/3/21.
 */
import React, {Component} from 'react'
import{
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native'
import Main from './Main';
import CustomMarkers from './CustomMarkers';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: (Platform.OS === 'android' ? 42 : 70),
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default class GMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
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
            maps</Text >
        </View >
        <View style={styles.container}>
          <CustomMarkers/>
        </View>
      </View>
    );
  }
}