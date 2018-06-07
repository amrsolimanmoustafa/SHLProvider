import React, { Component } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  ImageBackground,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import styles from './styles/verifyPhoneScreenStyle'
import {Images} from '../Themes';
//The box inside the elevation
import VerifyPhone from "../components/VerifyPhone";

class VerifyPhoneScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.loginBackground} source={Images.loginBackground} resizeMode={'cover'}>
          <View style={styles.main}>
            <Image source={Images.loginLogo} style={styles.loginLogo}/>
            <View style={styles.input}>
            <VerifyPhone />
            </View>
          </View>
        </ImageBackground> 
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneScreen)