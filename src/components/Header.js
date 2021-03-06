import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native'
import  { Button,Icon } from "native-base"
import styles from './styles/HeaderStyle'
import {Images} from '../Themes';
const {width,height} = Dimensions.get('window')

export default class Header extends Component {
  render () {
    return (
      <View style={{width: width,height: 70,paddingTop: 20,flexDirection:"row",alignItems: 'center',justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('LeftSideMenu')}
          style={{paddingVertical: 10,paddingHorizontal: 15}}
        >
          <Image
            source={require('../assets/icons/Settings-icon.png')}
            style={{}}
          />
        </TouchableOpacity>
        <View style={styles.componentCenter}>
          <Image
            source={Images.logoCenter}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('RightSideMenu')}
          style={{paddingVertical: 10,paddingHorizontal: 15}}
        >
          <Image
            source={require('../assets/icons/User-icon.png')}
            style={{}}
          />
        </TouchableOpacity>
      </View>
    )
  }
}