import React, { Component } from 'react'
import {
  View,
  Image,
  ImageBackground
} from 'react-native'
import { connect } from 'react-redux'
import styles from './styles/SplashScreenStyle'
import * as Animatable from "react-native-animatable";

class SplashScreen extends Component {
  constructor(){
    super()
    SplashScreen = Animatable.createAnimatableComponent(SplashScreen);
  }

  componentDidMount(){
    const { navigate } = this.props.navigation;
    setTimeout(() => {
      navigate('LoginScreen')
    },5000);
  }

  render () {
    return (
      <ImageBackground source ={require('../assets/images/shlSplash_bg.png')}
        style={styles.backgroundImage}
        resizeMode={"cover"}
      >
        <Animatable.Image
          animation="bounceIn"
          iterationCount={9}
          direction="alternate"
          source ={require("../assets/images/shlSplash_logo.png")}
          resizeMode={"cover"}
        />
      </ImageBackground>
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

// export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
module.exports =connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
