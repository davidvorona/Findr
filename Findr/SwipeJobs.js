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
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
var SavedJobs = require('./SavedJobs');

var styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  title: {
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center'
  },
  company: {
    paddingTop: 10,
    fontSize: 22,
    paddingBottom: 10,
    textAlign: 'center'
  },
  location: {
    paddingTop: 10,
    fontSize: 18,
    paddingBottom: 10
  },
  description: {
    paddingTop: 10,
    fontSize: 18,
    textAlign: 'center'
  },
  url: {
    paddingTop: 10,
    fontSize: 20,
    color: 'blue'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
    width: 200,
    justifyContent: 'center'
  },
  no: {
    marginLeft: 10,
    width: 100,
    borderRadius: 50
  },
  yes: {
    marginLeft: 100,
    width: 100,
    borderRadius: 50
  },
  image: {
    marginBottom: 20
  }
})

class SwipeJobs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      dataSource: this.props.postings,
      savedJobs: []
    }
  }

  onYesPressed() {
    this.saveJob();
    this.setState({ index: this.state.index + 1 })
  }

  saveJob() {
    this.state.savedJobs.push([this.state.dataSource[this.state.index][0], this.state.dataSource[this.state.index][1], this.state.dataSource[this.state.index][2]])
  }

  onNoPressed() {
    this.setState({ index: this.state.index + 1 })
  }

  onMyJobsPressed() {
    this.props.navigator.push({
      title: 'My Jobs',
      component: SavedJobs,
      passProps: { savedJobs: this.state.savedJobs }
    });
  }

  parseAndPrepare() {
    if (this.state.index < 10) {
      var jobPost = this.state.dataSource[this.state.index];
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            {jobPost[0]}
          </Text>
          <Text>at</Text>
          <Text style={styles.company}>
            {jobPost[2]}
          </Text>
          <Text>in</Text>
          <Text style={styles.location}>
            {jobPost[3]}
          </Text>
          <Text style={styles.description}>
            {jobPost[4]}
          </Text>
          <Text style={styles.url}
            onPress={() => Linking.openURL(jobPost[1])}>
            Learn more!
          </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            No more jobs to see!
          </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View>
        <View>
          {this.parseAndPrepare()}
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center', height: 85, width: 300}}>
          <TouchableHighlight style={styles.no}
            underlayColor='transparent'
            onPress={this.onNoPressed.bind(this)}>
            <Image source={require('./resources/newnah.png')} style={styles.image}/>
          </TouchableHighlight>
          <TouchableHighlight style={styles.yes}
            underlayColor='transparent'
            onPress={this.onYesPressed.bind(this)}>
            <Image source={require('./resources/newheart.png')} style={styles.image}/>
          </TouchableHighlight>
       </View>
      <View>
        <TouchableHighlight style={styles.button}
          onPress={this.onMyJobsPressed.bind(this)}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>View saved postings!</Text>
        </TouchableHighlight>
      </View>
      </View>
    );
  }

}

module.exports = SwipeJobs;
