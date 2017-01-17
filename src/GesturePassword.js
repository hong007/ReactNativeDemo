/**
 *
 * Created by Skipper on 2017/1/17.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import PasswordGesture from 'react-native-gesture-password';
import AppIntro from './AppIntro';

var Password1 = '123';

export default class GesturePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Please input your password.',
      status: 'normal'
    }
  }

  onEnd(password) {
    if (password == Password1) {
      this.setState({
        status: 'right',
        message: 'Password is right, success.'
      });
      this.props.navigator.push({
        name:'AppIntro',
        component:AppIntro
      })

      // your codes to close this view
    } else {
      this.setState({
        status: 'wrong',
        message: 'Password is wrong, try again.'
      });
    }
  }

  onStart() {
    this.setState({
      status: 'normal',
      message: 'Please input your password.'
    });
  }

  onReset() {
    this.setState({
      status: 'normal',
      message: 'Please input your password (again).'
    });
  }

  render() {
    return (
      <PasswordGesture
        ref='pg'
        status={this.state.status}
        message={this.state.message}
        onStart={() => this.onStart()}
        onEnd={(password) => this.onEnd(password)}
        innerCircle={true}
        outerCircle={true}
      />
    );
  }
}
