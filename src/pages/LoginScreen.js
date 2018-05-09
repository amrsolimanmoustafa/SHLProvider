import React, { Component } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  TouchableOpacity,
  I18nManager
} from 'react-native'
import { connect } from 'react-redux'
import LoginInsertPhone from "../components/LoginInsertPhone.js"
import styles from './styles/LoginScreenStyle'
import {Images} from '../Themes';
import * as Animatable from "react-native-animatable";
import strings from '../strings'
import RNRestart from 'react-native-restart'

class LoginScreen extends Component {
  constructor(props){
    super(props)
    //LoginScreen = Animatable.createAnimatableComponent(LoginScreen);
  }

  render () {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.loginBackground}
          source={Images.loginBackground}
          resizeMode={"cover"}
        >
          <Animatable.View
            animation="fadeInLeftBig"
            iterationCount={1}
            direction="alternate"
            style={styles.main}
          >
            <Animatable.Image
              source={Images.loginLogo}
              style={styles.loginLogo}
              animation="bounceIn"
              iterationCount={4}
              direction="alternate"
              resizeMode={"cover"}
            />
            <View style={styles.input}>
              <LoginInsertPhone />
            </View>
            <View style={styles.allLanguages}>
              <TouchableOpacity
                onPress={()=>{}}
                style={styles.languages}
              >
                <Text style={styles.flagTextStyle}>
                  اردو
                </Text>
                <Image
                  source={Images.IndiaFlag}
                  style={styles.flagStyle}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>{}}
                style={styles.languages}
              >
                <Text style={styles.flagTextStyle}>
                  English
                </Text>
                <Image
                  source={Images.USFlag}
                  style={styles.flagStyle}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>this.goToHomeScreen()}
                style={styles.languages}
              >
                <Text style={styles.flagTextStyle}>
                  العربية
                </Text>
                <Image
                  source={Images.SaudiFlag}
                  style={styles.flagStyle}
                />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }

  goToHomeScreen() {
    const { navigation } = this.props
    this.onLanguageChange()
    navigation.navigate("HomeScreen");
  }
          
  onLanguageChange(){
    if(I18nManager.isRTL){
        I18nManager.forceRTL(false);
        I18nManager.isRTL = false;
        I18nManager.allowRTL(false)
        strings.setLanguage('en');
    }else{
        I18nManager.forceRTL(true);
        I18nManager.isRTL = true;
        strings.setLanguage('ar');
    }
    RNRestart.Restart();
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)