/**
 * Created by hongty on 2016/11/15.
 */
import React, {Component}from 'react';
import{
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import Ctrl from './Ctrl';

export default class LeftMenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      pageName: this.props.pageName,
    };
  }

  render() {
    return (
      <TouchableOpacity value={this.props.pageName} style={LeftMenuStyles.menuContainer} onPress={(value)=> {
        this.props._leftMenuPress(this.state.pageName)
      }}>
        <Image
          style={LeftMenuStyles.menuImage}
          source={this.props.imageSource}
        />
        <Text style={LeftMenuStyles.menuText}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
const LeftMenuStyles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 80 * Ctrl.pxToDp(),
    paddingLeft: 30,
    borderBottomWidth: 1,
    backgroundColor: '#1b1b1b',
  },
  menuImage: {
    resizeMode: Image.resizeMode.strech,
    marginLeft: 5,
  },
  menuText: {
    fontSize: 16 * Ctrl.pxToDp(),
    marginLeft: 15,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
});



