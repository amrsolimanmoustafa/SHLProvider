import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  I18nManager
} from 'react-native';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import store from './src/store'
import AppNavigation from './src/router/appNavigation'

export default class App extends Component<> {
  constructor(props){
    super(props),
    this.state = {
 
    }
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

});