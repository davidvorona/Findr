
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
var SettingsPage = require('./SettingsPage');

const styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'blue',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

class FindrApp extends React.Component {
  render() {
    return (
      <NavigatorIOS
      style={styles.container}
      initialRoute={{
        title: 'Findr',
        component: SettingsPage
      }}
      />
    )
  }
}

AppRegistry.registerComponent('Findr', function() { return FindrApp });
