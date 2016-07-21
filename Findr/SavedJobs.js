'use strict';

import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  CGRect
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 20,
    alignItems: 'flex-start'
  },
  listItem: {
    paddingRight: 30,
    fontSize: 18
  },
  url: {
    paddingRight: 30,
    fontSize: 20,
    paddingBottom: 10,
    color: 'blue'
  }
})

class SavedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      savedData: this.props.savedJobs,
      legacyData: []
    }
  }


  // start account and save past savedJobs
  listJobs() {
    var list = [];
    var scrollHeight = 0;
    for (var i = 0; i < this.state.savedData.length; i++) {
      console.log(this.state.savedData);
      let linkExcerpt = this.state.savedData[i][1];
      list.push([
        <View key={i}>
          <Text style={styles.listItem}>
            {(i+1)+". "}{this.state.savedData[i][0]}
          </Text>
          <Text style={styles.url}
            onPress={() => Linking.openURL(linkExcerpt)}>
            {'Learn more about jobs at ' + this.state.savedData[i][2] + '!'}
          </Text>
        </View>
      ])
    }
    return list;
  }

  // right now scrollview size is static
  // create a backend that saves data
  // add authentication

  render() {
    var scrollView: ScrollView;
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(scrollView) => { scrollView = scrollView; }}
          keyboardDismissMode={'on-drag'}
          showsVerticalScrollIndicator={true}>
          {this.listJobs()}
        </ScrollView>
      </View>
    )
  }

}


module.exports = SavedJobs;
