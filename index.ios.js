/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

// import api from './App/Utils/api';
import Main from './App/Components/Main';
import Photo from './App/Components/Photo';
import React, {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  View,
  Text
} from 'react-native';

class flickr_photos extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Flickr Photos',
          component: Main,
        }}/>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

AppRegistry.registerComponent('flickr_photos', () => flickr_photos);
