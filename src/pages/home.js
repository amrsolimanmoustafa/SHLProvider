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
  TouchableOpacity,
  Dimensions,
  Image,
  I18nManager
} from 'react-native'
import { connect } from 'react-redux'
import {Images} from '../Themes';
import styles from './styles/homeScreenStyle'
import Header from "../components/Header"
import MapView from 'react-native-maps';
import {
  updateProvidorLocation,
  updateProviderActive
} from "../actions"
var { RNLocation: Location } = require('NativeModules');
import PopupDialog from 'react-native-popup-dialog';
import strings from '../strings'
import { withNavigation } from "react-navigation";
const {width,height} = Dimensions.get('window')

class HomePage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      position: {},
      isActive: 0
    }
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log(position)
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
          resizeMode={'contain'}
        >
          {<Header/>}
          <View style={{flex: 1}}>
            <MapView
                style={{flex: 1,margin: 10,borderRadius: 5}}
                initialRegion={{
                  latitude: this.state.position.lat? this.state.position.lat : 6.2672295570373535,
                  longitude:this.state.position.long? this.state.position.long : 31.229478498675235,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                region={{
                  latitude: this.state.position.lat? this.state.position.lat : 6.2672295570373535,
                  longitude:this.state.position.long? this.state.position.long : 31.229478498675235,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <MapView.Marker.Animated 
                    coordinate={
                      new MapView.AnimatedRegion({
                        latitude: this.state.position.lat? this.state.position.lat : 6.2672295570373535,
                        longitude:this.state.position.long? this.state.position.long : 31.229478498675235,
                      })
                    }
                />
              </MapView>
              <View style={{position: 'absolute',top: 20,left: width/2 - 60}}>
                <TouchableOpacity
                  onPress={()=> this.activeOrNot()}
                  style={{width: 120,height: 44,borderRadius: 22}}
                >
                  <ImageBackground
                    source={require('../assets/images/Gradient_Background_image.png')}
                    style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}
                  >
                    <Text style={{color: '#ffffff',fontSize: 13,fontFamily: 'NeoSansArabic'}}>
                      {this.state.isActive? strings.unavailable : strings.available}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={{height: 140,position: 'absolute',bottom: 10,right: 10,left: 10,backgroundColor: 'rgba(0,0,0,0.65)',justifyContent: 'center',}}>
                <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',paddingHorizontal: 10}}>
                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                      <Image
                        source={require('../assets/images/User-profile-image.png')}
                      />
                      <View style={{marginLeft: 5}}>
                        <Text style={{color: '#ffffff',fontSize: 14,fontFamily: 'NeoSansArabic',textAlign: 'left'}}>
                          محمد احمد مصطفي
                        </Text>
                        <Text style={{color: '#ffffff',fontSize: 14,fontFamily: 'NeoSansArabic',textAlign: 'left'}}>
                          $100
                        </Text>
                      </View>
                    </View>
                    <View style={{}}>
                      <Text style={{color: '#ffffff',fontSize: 14,fontFamily: 'NeoSansArabic',textAlign: 'left'}}>
                        حي الزهور
                      </Text>
                      <Text style={{color: '#ffffff',fontSize: 10,fontFamily: 'NeoSansArabic',textAlign: 'right'}}>
                        486 Manhattan Avenue
                      </Text>
                    </View>                    
                </View>
                <View style={{flexDirection: 'row',alignItems: 'center',alignSelf: 'center'}}>
                  <TouchableOpacity
                    onPress={()=>{}}
                    style={{padding: 10,marginRight: 5}}
                  >
                    <Text style={{textAlign: 'center',color: '#ffffff',fontSize: 10,textDecorationLine: 'underline',}}>
                      {strings.callClient}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={()=>{}}
                    style={{padding: 10,marginLeft: 5}}
                  >
                    <Text style={{textAlign: 'center',color: '#ffffff',fontSize: 10,textDecorationLine: 'underline',}}>
                      {strings.cancelOrder}
                    </Text>
                  </TouchableOpacity>
                </View>                
              </View>
          </View>
        </ImageBackground>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          width={200}
          height={240}
          haveTitleBar={false}
        >
          <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.43)',borderRadius: 9,padding: 10,alignItems: 'center'}}>
            <Text style={{fontFamily: 'NeoSansArabic',fontSize: 14,color: '#ffffff',textAlign: 'center'}}>
              {strings.youHaveNewOrder}
            </Text>
            <View style={{width: 88,height: 88,marginTop: 8,borderColor: '#ffffff',borderWidth: 1,borderRadius: 44,justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{fontFamily: 'NeoSansArabic',fontSize: 32,color: '#ffffff',textAlign: 'center'}}>
                50
              </Text>
              <Text style={{marginTop: 5,fontFamily: 'NeoSansArabic',fontSize: 14,color: '#ffffff',textAlign: 'center'}}>
                {strings.second}
              </Text>
            </View>
            <View style={{marginTop: 8,flexDirection: 'row',alignItems: 'center'}}>
              <Image
                source={require('../assets/icons/Location-small-icon.png')}
              />
              <Text style={{marginLeft: 5,color: '#ffffff',fontSize: 14,fontFamily: 'NeoSansArabic'}}>
                حي الزهور
              </Text>
            </View>
            <Text style={{marginTop: 8,color: '#ffffff',fontSize: 14,fontFamily: 'NeoSansArabic'}}>
              $100
            </Text>
            <TouchableOpacity
              onPress={()=> this.popupDialog.dismiss()}
              style={{width: 180,height: 40,borderRadius: 20,marginTop: 18}}
            >
              <ImageBackground
                source={require('../assets/images/Gradient_WideBackground_image.png')}
                style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}
              >
                <Text style={{color: '#ffffff',fontSize: 13,fontFamily: 'NeoSansArabic'}}>
                  {strings.approve}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </PopupDialog>
      </View>
    );
  }
  
  locationUpdated() {
    if (Platform.OS=='ios'){
        Location.requestAlwaysAuthorization();
        Location.setAllowsBackgroundLocationUpdates(true);
        Location.setDistanceFilter(50);
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
          var position = {
              lat: (Platform.OS=='ios')?location.coords.latitude : location.latitude,
              long: (Platform.OS=='ios')?location.coords.longitude : location.longitude
          };
          this.setState({position: position})
          this.props.updateProvidorLocation(position)
        }
    );
  }

  activeOrNot(){
    this.popupDialog.show()
    const data = {
      active: 1
    }
    this.props.updateProviderActive(data)
    this.setState({isActive: !this.state.isActive})
  }
}

const mapStateToProps = ({main}) => {
  const {
    pageLoading,
    pageLoadingError,
    refreshing
  } = main;
  return {
    pageLoading,
    pageLoadingError,
    refreshing,
  };
};

export default connect(mapStateToProps,{
  updateProvidorLocation,
  updateProviderActive
})(withNavigation(HomePage));