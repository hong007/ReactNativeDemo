/**
 * Created by hongty on 2016/12/14.
 */
// import React from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   ScrollView,
//   View,
//   Image,
//   Text,
// } from 'react-native';
// const {Component} = React;
// const window = Dimensions.get('window');
// const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
import BarcodeScannerParent from './BarcodeScannerParent';

// const styles = StyleSheet.create({
//   menu: {
//     flex: 1,
//     width: window.width,
//     height: window.height,
//     backgroundColor: 'gray',
//     padding: 20,
//   },
//   avatarContainer: {
//     marginBottom: 20,
//     marginTop: 20,
//   },
//   avatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     flex: 1,
//   },
//   name: {
//     position: 'absolute',
//     left: 70,
//     top: 20,
//   },
//   item: {
//     fontSize: 14,
//     fontWeight: '300',
//     paddingTop: 5,
//   },
// });
//
// module.exports = class Menu extends Component {
//   static propTypes = {
//     onItemSelected: React.PropTypes.func.isRequired,
//   };
//
//   render() {
//     return (
//       <ScrollView scrollsToTop={false} style={styles.menu}>
//         <View style={styles.avatarContainer}>
//           <Image
//             style={styles.avatar}
//             source={{uri,}}/>
//           <Text style={styles.name}>Your name</Text>
//         </View>
//
//         <Text
//           onPress={() => this.props.onItemSelected('About')}
//           style={styles.item}>
//           About
//         </Text>
//
//         <Text
//           onPress={() => this.props.onItemSelected('Contacts')}
//           style={styles.item}>
//           Contacts
//         </Text>
//         <Text
//           onPress={() => {
//             this.props.navigator.push({
//               name: 'BarcodeScannerParent',
//               component: BarcodeScannerParent
//             });
//           }}
//           style={styles.item}>
//           扫码测试
//         </Text>
//
//       </ScrollView>
//     );
//   }
// };
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



