import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './Styles/HeaderStyle'
import { Button,Icon } from "native-base"
import {Images} from '../Themes';
 
export default class Header extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.component}>
          <Button style={styles.headerButton} transparent>
            <Icon name="md-settings" type="Ionicons" style={styles.Icon}/>
          </Button>
        </View>
        <View style={styles.componentCenter}>
          <Image source={Images.logoCenter}/>
        </View>
        <View style={styles.component}>
          <Button style={styles.headerButton2} transparent>
            <Image source={Images.User}/>
          </Button>
        </View>
      </View>
    )
  }
}