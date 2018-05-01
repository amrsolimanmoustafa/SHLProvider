import React, { Component } from 'react'
import { 
  View,
  Text,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  PermissionsAndroid,
  DeviceEventEmitter,
  NativeEventEmitter,
} from 'react-native'
import { connect } from 'react-redux'
import {Images} from '../Themes';
import styles from './styles/homeScreenStyle'
//import Header from "../components/Header"
import Map from '../components/Map';
import {reverseCoordinatesToAdress,setCoordnates} from "../actions/commonServicesActions"
var { RNLocation: Location } = require('NativeModules');

import { withNavigation } from "react-navigation";

class HomePage extends Component  {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log(position)
        // this.setState({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        //   error: null,
        // });
        this.props.setCoordnates(position.coords.latitude,position.coords.longitude)
        this.locationUpdated();      
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
      //Location.stopUpdatingLocation();
      const myModuleEvt = new NativeEventEmitter(Location)
      myModuleEvt.removeListener('locationUpdated')
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.loginBackground}
          source={Images.loginBackground}
          resizeMode={'cover'}
        >
          {/*<Header/>*/}
          <View style={styles.Map}>
            <Map/>
          </View>
        </ImageBackground>
      </View>
    );
  }
  
  locationUpdated() {
    if (Platform.OS=='ios'){
        Location.requestAlwaysAuthorization();
        Location.setAllowsBackgroundLocationUpdates(true);
        Location.setDistanceFilter(5.0);
        Location.requestWhenInUseAuthorization();
    }else{
        Location.requestWhenInUseAuthorization();
    }
    Location.startUpdatingLocation();
    const myModuleEvt = new NativeEventEmitter(Location)
    var subscription = myModuleEvt.addListener(
        'locationUpdated',
        (location) => {
            console.log(location)
            var address = {
                lat: (Platform.OS=='ios')?location.coords.latitude : location.latitude,
                lng: (Platform.OS=='ios')?location.coords.longitude : location.longitude
            };
        }
    );
  }
}

const mapStateToProps = state => {
  return {
    commonServices: state.common,
   }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps,
  { 
    reverseCoordinatesToAdress,
    setCoordnates
  }) (withNavigation(HomePage))
