import React from 'react'
import {
  Image,
  Dimensions
} from 'react-native'
const {width,height} = Dimensions.get('window')
import strings from '../strings'
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation'

import HomePage from '../pages/home'
import VerifyPhoneScreen from '../pages/VerifyPhoneScreen'
import LoginScreen from '../pages/LoginScreen'
import SplashScreen from '../pages/SplashScreen'

import ServicesCost from '../pages/ServicesCost'
import Rules from '../pages/Rules'
import ContactWithAdministration from '../pages/ContactWithAdministration'
import AboutApp from '../pages/AboutApp'
import OrdersHistory from '../pages/OrdersHistory'
import Notifications from '../pages/Notifications'

import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import styles from '../pages/styles/navigationStyles'

const PrimaryNav = StackNavigator({
  HomeScreen: { 
    screen: HomePage 
  },
  VerifyPhoneScreen: { screen: VerifyPhoneScreen },
  LoginScreen: { screen: LoginScreen },
  SplashScreen: { screen: SplashScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'transparent'
    },
    headerTitleStyle:{
      fontFamily: 'NeoSansArabic',
      fontSize: 18,
      color: '#ffffff'
    },
    headerTintColor: '#ffffff',
    headerBackground: (
      <Image
        source={require('../assets/images/rsz_123123.png')}
        style={{width: width,height: 64,resizeMode: 'cover'}}
      />
    )
  }
})

const MainDrawer = DrawerNavigator(
  {
    Home: {
      screen: PrimaryNav,
      navigationOptions: {
        drawerLabel: strings.home,
        drawerIcon: ({ tintColor }) => (
          <Ionicons name='ios-home-outline' size={28} tintColor={tintColor} color="#36B051" />
        ),
      }
    },
    Contact: {
      screen: ({ navigation }) => <ContactWithAdministration navigation={navigation} />,
      navigationOptions: {
        drawerLabel: strings.communicateWithManagement,
        drawerIcon: ({ tintColor }) => (
          <Ionicons name='ios-microphone-outline' size={28} tintColor={tintColor} color="#36B051" />
        ),
      }
    },
    Terms: {
      screen: ({ navigation }) => <Rules navigation={navigation} />,
      navigationOptions: {
        drawerLabel: strings.termsAndConditions,
        drawerIcon: ({ tintColor }) => (
          <Ionicons name='ios-paper-outline' size={28} tintColor={tintColor} color="#36B051" />
        ),
      }
    },
    About: {
      screen: ({ navigation }) => <AboutApp navigation={navigation} />,
      navigationOptions: {
        drawerLabel: strings.about,
        drawerIcon: ({ tintColor }) => (
          <EvilIcons name='question' size={28} tintColor={tintColor} color="#36B051" />
        ),
      }
    },
    Prices: {
      screen: ({ navigation }) => <ServicesCost navigation={navigation} />,
      navigationOptions: {
        drawerLabel: strings.pricesOfServices,
        drawerIcon: ({ tintColor }) => (
          <Ionicons name='md-pricetags' size={28} tintColor={tintColor} color="#36B051" />
        ),
      }
    },
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    drawerOpenRoute: 'LeftSideMenu',
    //drawerCloseRoute: 'LeftSideMenuClose',
    //drawerToggleRoute: 'LeftSideMenuToggle',
  },
);

const RootRoute = DrawerNavigator(
  {
    MainDrawer: {
      screen: MainDrawer,
      navigationOptions: {
        drawerLabel: strings.home,
      }
    },
    EditProfile: {
      screen: ({ navigation }) => <HomeScreen navigation={navigation} />,
      navigationOptions: {
        drawerLabel: strings.editPersonalData,
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name='account-edit' size={28} tintColor={tintColor} color="#36B051" />
        ),
      }
    },
    OrdersHistory: {
      screen: ({ navigation }) => <OrdersHistory navigation={navigation} />,
      navigationOptions: {
        drawerLabel: strings.ordersHistory,
        drawerIcon: ({ tintColor }) => (
          <FontAwesome name='history' size={28} tintColor={tintColor} color="#36B051" />
        ),
      }
    },
    Notifications: {
      screen: ({ navigation }) => <Notifications navigation={navigation} />,
      navigationOptions: {
        drawerLabel: strings.notifications,
        drawerIcon: ({ tintColor }) => (
          <FontAwesome name='heart' size={28} tintColor={tintColor} color="#36B051" />
        ),
      }
    },
  },
  {
    navigationOptions: {
    },
    // contentComponent: RightDrawerContent,
    drawerPosition: 'right',
    drawerOpenRoute: 'RightSideMenu',
    //drawerCloseRoute: 'RightSideMenuClose',
    //drawerToggleRoute: 'RightSideMenuToggle',
  },
);

export default RootRoute