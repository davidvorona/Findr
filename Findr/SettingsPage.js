'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';
const cheerio = require('cheerio-without-node-native');
var SwipeJobs = require('./SwipeJobs')

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    paddingBottom: 2,
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    marginRight: 6,
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 6,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 138
  },
  loading: {
    paddingBottom: 8
  },
  jobroll: {
    backgroundColor: '#FFFFFF',
    width: 100,
    fontSize: 10,
    borderRadius: 1,
    borderColor: '#000000'
  },
  error: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  }
});


function urlForQueryAndPage(location, type) {
  location = location.split(',');
  if (location.length !== 2) return null;
  else {
    var city = location[0];
    var state = location[1];
    state = state.replace(' ', '');
    city = city.replace(' ', '+')
    var type = type.replace(' ', '+');
    return (
      'http://www.indeed.com/jobs?q='+type+'&l='+city+'%2C+'+state
    )
  }
};

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobSearch: ['Los Angeles, CA', 'Software Development'],
      isLoading: false,
      message: ''
    };
  }

  onNewLocation(event) {
    this.setState({
      jobSearch: [event.nativeEvent.text, this.state.jobSearch[1]]
    })
  }

  onNewType(event) {
    this.setState({
      jobSearch: [this.state.jobSearch[0], event.nativeEvent.text]
    })
  }

  // underscore is convention to indicate 'private'
  _executeQuery(domain) {
    console.log(domain);
    this.setState({ isLoading: true });
    fetch(domain)
      .then(response => response.text())
      .then(html => this._handleResponse(html))
      .catch(error =>
      this.setState({
        isLoading: false,
        message: 'Something messed up--' + error
      })
    )
  }

  onGoPressed() {
    var domain = urlForQueryAndPage(this.state.jobSearch[0], this.state.jobSearch[1]);
    if (domain === null) this.setState({ message: 'Location not recognized; remember to add a state.' });
    else this._executeQuery(domain);
  }

  _handleResponse(response) {
    this.setState({ isLoading: false, message: '' });
    if (response) {
      let $ = cheerio.load(response);
      var jobs = [];
      var findings = [];
      var moreFindings = [];
      var bugIndex = 0;
      $('.jobtitle a').each(function(index, element) {
        jobs[index] = [];
        findings = $(this).attr('title');
        var link = ($(this).attr('href'));
        link = 'http://www.indeed.com' + link;
        jobs[index].push(findings);
        jobs[index].push(link);
      });
      $('.company span').each(function(index, element) {
        findings = $(this).find('a').text().replace(/[\n]/g, "").trim();
        moreFindings = $(this).text().replace(/[\n]/g, "").trim();
        if (findings === '') jobs[index].push(moreFindings);
        else jobs[index].push(moreFindings);
      });
      $('.row.result .location').each(function(index, element) {
        findings = $(this).find('span').first().text().replace(/[\n]/g, "").trim();
        if (findings !== '') {
          jobs[bugIndex].push(findings);
          bugIndex++;
        }
      });
      bugIndex = 0;
      $('.row.result .snip .summary').each(function(index, element) {
        var findings = $(this).text().replace(/[\n]/g, "").trim();
        if (index > 2 && index < 13) {
          jobs[bugIndex].push(findings);
          bugIndex++;
        }
      });
      if (jobs.length === 0) this.setState({ message: 'Location not recognized; please try again.' });
      else {
        this.props.navigator.push({
          title: 'Results',
          component: SwipeJobs,
          passProps: { postings: jobs }
        });
      }
    } else {
      this.setState({ message: 'Location not recognized; please try again.' });
    }
  }

  render() {
    var spinner = this.state.isLoading ?
      ( <ActivityIndicator
        style={styles.loading} size='small'/> ) :
      ( <View/>);
    console.log('SettingsPage.render');
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Find the right job for you--on the go!
        </Text>
        <Text style={styles.description}>
          Fill in your location and desired job type.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.jobSearch[0]}
            onChange={this.onNewLocation.bind(this)}
            placeholder='Where are you? (city, state)'/>
        </View>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.jobSearch[1]}
            onChange={this.onNewType.bind(this)}
            placeholder='What type of job?'/>
          <TouchableHighlight style={styles.button}
            onPress={this.onGoPressed.bind(this)}
            underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
          {spinner}
        </View>
        <View>
          <Image source={require('./resources/job.jpg')} style={styles.image}/>
        </View>
        <View>
          <Text style={styles.error}>{this.state.message}</Text>
        </View>
      </View>
    )
  }
}


module.exports = SettingsPage;
