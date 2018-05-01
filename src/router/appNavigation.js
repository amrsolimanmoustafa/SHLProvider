import { StackNavigator } from 'react-navigation'
import HomePage from '../pages/home'

import styles from '../pages/styles/navigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  HomeScreen: { 
    screen: HomePage 
  },
}, {
  // Default config for all screens
  headerMode: 'none',
  //initialRouteName: 'SplashScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
