import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './styles/VerifyPhoneStyle'
import {Form,Label,Input,Item,Radio,Right} from "native-base"
import {Images} from '../Themes';
import LinearGradientButton from "./LinearGradientButton";
import { withNavigation } from "react-navigation";
import { connect } from 'react-redux'

import {loginUser} from "../actions/authAction"

class VerifyPhone extends Component {
  constructor (props) {
    super(props)
    console.log(this.props)

  }

  componentDidMount(){
    console.log(this.props)
  }
                 
  render() {
    return (
      <View style={styles.container}>
        {/* Headings */}
        <Text style={styles.heading2}>
          {" "}
          تم ارسال كود التأكيد للرقم التالي
          {" "}
        </Text>
        <Text style={styles.heading}>
          {" "}
          {this.props.user_phone}
          {" "}
        </Text>
        {/* Input */}
        <View style={styles.inputBoxView}>
          <Item stackedLabel style={styles.itemStyle}>
            <Label
              style={styles.formInputPlaceholder}
            >
              {" "}
              ادخل الكود
              {" "}
            </Label>
            <Input style={styles.input} />
          </Item>
        </View>
        {/* Radio Button Needs Modfication */}
        <View style={styles.radioButton}>
          <Radio selected={true} />
          <Text
            style={styles.radioButtonTextBlue}
          >
            الشروط و الاحكام{" "}
          </Text>
          <Text style={styles.radioButtonText}>
            الموافقة علي{" "}
          </Text>
        </View>
        {/* Two Linear Gradient */}
        <View style={{flex:1,width:"100%",justifyContent:'space-between'}} >
          <LinearGradientButton style={{flex:1}}  press={this.goToLoginScreen.bind(this)} navigateScreen="LoginScreen" text="تغيير رقم الجوال" />
        </View>
        <View style={{flex:1,width:"100%",position:'relative',zIndex:-2,justifyContent:'space-between'}} >
          <LinearGradientButton  press={this.goToHomeScreen.bind(this)} navigateScreen="HomeScreen" text="الدخول" />
        </View>
      </View>
      );
  }

  goToLoginScreen() {
    const { navigation } = this.props
    navigation.navigate('LoginScreen');
  }

  goToHomeScreen() {
    const { navigation } = this.props
    navigation.navigate('HomeScreen');
  }
}
              
const mapStateToProps = state => {
  let v=state
  console.log(v.auth.user_phone)
  return {
    user: state.auth.user.data,
    user_phone:state.auth.user_phone
  }
}

export default connect(mapStateToProps, { loginUser }) (withNavigation(VerifyPhone));