import { StackNavigator } from 'react-navigation'
import HomePage from '../pages/home'
import VerifyPhoneScreen from '../pages/VerifyPhoneScreen'
import LoginScreen from '../pages/LoginScreen'
import SplashScreen from '../pages/SplashScreen'

import styles from '../pages/styles/navigationStyles'

// Manifest of possible screens
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
    headerStyle: styles.header
  }
})

export default PrimaryNav
