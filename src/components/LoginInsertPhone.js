import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from "react-native";
import styles from './styles/LoginInsertPhoneStyle'
import {Form,Label,Input,Item} from "native-base"
import {Images} from '../Themes';
import  LinearGradientButton  from "./LinearGradientButton";
import axios from 'axios';
import { withNavigation } from "react-navigation";
import { connect } from 'react-redux'
import {loginUser} from "../actions/authAction"

class LoginInsertPhone extends Component<props> {
  constructor(props){
    super(props)
    this.state = {
      token_id:'',
      lang_id:'',
      phone: "",
      logedIn: null,
      loading: false,
      VerifyPhoneScreen: "",
      error: "" 
    }
  }

  componentWillMount() {

  }
   
  render() {
    return (
      <View style={styles.container}>
        {/* Headings */}
        <Text style={styles.heading}>
          ادخل رقم الجوال
        </Text>
        <Text style={styles.heading2}>
          يجب تسجيل الدخول حتي تستطيع الاستفادة من تطبيق سهل
        </Text>
        <View style={styles.inputBoxView}>
          {/* Input */}
          <Item stackedLabel style={styles.itemStyle}>
            <Label style={styles.formInputPlaceholder}>
              رقم الهاتف
            </Label>
            <TextInput
              placeholder={''}
              onChangeText={text => this.setState({phone: text})}
              style={styles.input}
            />
            {this.props.text}
          </Item>
          {/* Flags */}
          <View style={styles.countryView}>
            <Text style={styles.countryText}>
              الدولة
            </Text>
            <Image
              source={Images.SaudiFlag}
              style={styles.countryFlag}
            />
          </View>
        </View>
        {/* Linear Gradient */}
        {this.buttonFaces()}
      </View>);
  }
   //switch loading and login
  buttonFaces = () => {
    /*if (this.state.loading) {
      return (<ActivityIndicator start={{ x: 0.0, y: 0.25 }} end={{ x: 0.9, y: 1.0 }} locations={[0, 0.5, 0.9]} size="large" colors={["rgb(57,180,76)", "#299386", "rgb(29,122,179)"]}) />;
    } else {*/
      return (
        <View style={styles.opacity}>
          <LinearGradientButton
            press={()=>this.doLogIn()}
            navigateScreen={this.state.VerifyPhoneScreen}
            text={'التسجيل'}
            style={{}}
          />
        </View>
      );
  //}
  };

  doLogIn() {
    const { phone, token_id, logedIn, loading, VerifyPhoneScreen, error, lang_id} = this.state;
    let data = { phone: phone, token_id: token_id, lang_id: 1 };
    this.props.loginUser(data,this)
    this.setState({ loading: true });
  }
}

const mapStateToProps = state => {
  return {
    user:state.auth.user,
    posts:state.posts
  }
}
export default connect(mapStateToProps, { loginUser }) (withNavigation(LoginInsertPhone));