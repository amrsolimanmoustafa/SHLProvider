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
  I18nManager,
} from 'react-native'
import { connect } from 'react-redux'
import OneSignal from 'react-native-onesignal';
import {Images} from '../Themes';
import styles from './styles/homeScreenStyle'
import Header from "../components/Header"
import MapView from 'react-native-maps';
import {
  updateProvidorLocation,
  updateProviderActive,
  updateUserToken,
  acceptOrder,
  getCancelResones,
  cancelOrder,
  endOrder
} from "../actions"
import PopupDialog from 'react-native-popup-dialog';
import strings from '../strings'
import { withNavigation } from "react-navigation";
import firebase from 'react-native-firebase';
import geofire from 'geofire';
import Communications from 'react-native-communications';
import MapViewDirections from 'react-native-maps-directions';

const {width,height} = Dimensions.get('window')
let self;

class HomePage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      position: {},
      isActive: 0,
      order: {}
    }
    self = this;
  }

  componentWillMount(){
    OneSignal.inFocusDisplaying(0);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.locationUpdated(position);      
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 50 },
    );
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
    navigator.geolocation.clearWatch(this.watchId);
    //Location.stopUpdatingLocation();
    //const myModuleEvt = new NativeEventEmitter(Location)
    //myModuleEvt.removeListener('locationUpdated')
  }
  
  onReceived(notification) {
    console.log("Notification received: ", notification);
    let additionalData = notification.payload.additionalData
    self.setState({
      order: additionalData
    })
    self.popupDialog.show()
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
    self.props.updateUserToken(device.userId)
  }

  render() {
    const {
      client,
      cancelResonesList,
      pageLoading,
      pageLoadingError,
      refreshing,
      navigation
    } = this.props
    console.log(this.props)
    const destination = {latitude: 30.0771, longitude: 31.2859};
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          style={{width: width,height: height}}
          source={Images.loginBackground}
          resizeMode={'contain'}
        >
          <Header navigation={navigation}/>
          {this.state.position.lat?
            <View style={{flex: 1}}>
              <MapView
                  style={{flex: 1,margin: 10,borderRadius: 5}}
                  region={{
                    latitude: this.state.position.lat? this.state.position.lat : 6.2672295570373535,
                    longitude: this.state.position.long? this.state.position.long : 31.229478498675235,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <MapViewDirections
                    origin={{latitude: this.state.position.lat, longitude: this.state.position.long}}
                    destination={destination}
                    language={'ar'}
                    apikey={'AIzaSyAMVAuZSku-7gAMuWMFEj1kdjNtP2TLFOg'}
                    strokeWidth={2}
                    strokeColor="#27ae60"
                  />
                  <MapView.Marker.Animated 
                      coordinate={
                        new MapView.AnimatedRegion(destination)
                      }
                  />
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
                  <TouchableOpacity
                    onPress={()=> this.endOrder()}
                    style={{width: 120,height: 44,borderRadius: 22}}
                  >
                    <ImageBackground
                      source={require('../assets/images/Gradient_Background_image.png')}
                      style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}
                    >
                      <Text style={{color: '#ffffff',fontSize: 13,fontFamily: 'NeoSansArabic'}}>
                        {strings.endOrder}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
                {client?//.user_id?
                  <View style={{height: 140,position: 'absolute',bottom: 10,right: 10,left: 10,backgroundColor: 'rgba(0,0,0,0.65)',justifyContent: 'center',}}>
                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',paddingHorizontal: 10}}>
                        <View style={{flexDirection: 'row',alignItems: 'center'}}>
                          <Image
                            source={require('../assets/images/User-profile-image.png')}
                          />
                          <View style={{marginLeft: 5}}>
                            <Text style={{color: '#ffffff',fontSize: 14,fontFamily: 'NeoSansArabic',textAlign: 'left'}}>
                              {client.user_name? client.user_name : 'Customer'}
                            </Text>
                            <Text style={{color: '#ffffff',fontSize: 14,fontFamily: 'NeoSansArabic',textAlign: 'left'}}>
                              {this.state.order.pric}
                            </Text>
                          </View>
                        </View>
                        <View style={{}}>
                          <Text style={{color: '#ffffff',fontSize: 14,fontFamily: 'NeoSansArabic',textAlign: 'left'}}>
                            {this.state.order.zone}
                          </Text>
                          <Text style={{color: '#ffffff',fontSize: 10,fontFamily: 'NeoSansArabic',textAlign: 'right'}}>
                            486 Manhattan Avenue
                          </Text>
                        </View>                    
                    </View>
                    <View style={{flexDirection: 'row',alignItems: 'center',alignSelf: 'center'}}>
                      <TouchableOpacity
                        onPress={()=> Communications.phonecall('0123456789', true)}
                        style={{padding: 10,marginRight: 5}}
                      >
                        <Text style={{textAlign: 'center',color: '#ffffff',fontSize: 10,textDecorationLine: 'underline',}}>
                          {strings.callClient}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={()=> this.showCancelOrderPopup()}
                        style={{padding: 10,marginLeft: 5}}
                      >
                        <Text style={{textAlign: 'center',color: '#ffffff',fontSize: 10,textDecorationLine: 'underline',}}>
                          {strings.cancelOrder}
                        </Text>
                      </TouchableOpacity>
                    </View>                
                  </View>
                  :
                  <View style={{width: 0,height: 0}}/>
                }
            </View>
            :
            <View />
          }
        </ImageBackground>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          width={200}
          height={240}
          haveTitleBar={false}
        >
          <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.43)',borderRadius: 9,padding: 10,alignItems: 'center'}}>
            <Text style={{fontFamily: 'NeoSansArabic',fontSize: 14,color: '#ffffff',textAlign: 'center'}}>
              {this.state.order.title}
            </Text>
            <View style={{width: 88,height: 88,marginTop: 8,borderColor: '#ffffff',borderWidth: 1,borderRadius: 44,justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{fontFamily: 'NeoSansArabic',fontSize: 32,color: '#ffffff',textAlign: 'center'}}>
                {this.state.order.duration}
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
                {this.state.order.zone}
              </Text>
            </View>
            <Text style={{marginTop: 8,color: '#ffffff',fontSize: 14,fontFamily: 'NeoSansArabic'}}>
                {this.state.order.pric}
            </Text>
            <TouchableOpacity
              onPress={()=> this.approveOrder()}
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
        <PopupDialog
          ref={(popupDialog) => { this.cancelPopupDialog = popupDialog; }}
          width={200}
          height={250}
          haveTitleBar={false}
        >
          <View style={{flex: 1,backgroundColor: '#FFFFFF',borderRadius: 9,padding: 10}}>
            <Text style={{fontFamily: 'NeoSansArabic',fontSize: 14,color: '#707070',textAlign: 'center'}}>
              الغاء الطلب
            </Text>
            {cancelResonesList.map((item,index)=>(
              <TouchableOpacity
                key={index}
                onPress={()=> this.setState({selectedReason: item})}
                style={{flexDirection: 'row',alignItems: 'center',paddingVertical: 10}}
              >
                <View style={{width: 20,height: 20,borderWidth: 1,borderColor: '#3C403F',borderRadius: 10,justifyContent: 'center',alignItems: 'center'}}>
                  <View style={{width: 10,height: 10,backgroundColor: this.state.selectedReason == item? '#3C403F' : 'transparent',borderRadius: 5}}/>
                </View>
                <Text style={{marginLeft: 10,fontFamily: 'NeoSansArabic',fontSize: 12,color: '#1D7AB3',textAlign: 'left'}}>
                  {item.cancel_order_reasons_en}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={()=> this.cancelOrder()}
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
  
  locationUpdated(position) {
    console.log(position)
    this.setState({
      position:{
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
    })
    const ref = firebase.database().ref('orders');
    const geofireRef = new geofire(ref)
    geofireRef.set('298',[position.coords.latitude,position.coords.longitude])
    //ref.push(position);
  }

  activeOrNot(){
    const data = {
      active: 1
    }
    this.props.updateProviderActive(data)
    this.setState({isActive: !this.state.isActive})
  }

  approveOrder(){
    this.popupDialog.dismiss()
    let order = this.state.order
    this.props.acceptOrder(order.order_id)
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.locationUpdated(position);      
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 50 },
    );
  }

  showCancelOrderPopup(){
    this.props.getCancelResones()
    this.cancelPopupDialog.show()
  }

  cancelOrder(){
    const reason = this.state.selectedReason
    const reasonText = this.state.reasonText
    this.props.cancelOrder(order_id,reason.cancel_order_reasons_id,reasonText)
  }

  endOrder(){
    this.props.endOrder(298)
    navigator.geolocation.clearWatch(this.watchId);
  }
}

const mapStateToProps = ({main}) => {
  const {
    client,
    cancelResonesList,
    pageLoading,
    pageLoadingError,
    refreshing
  } = main;
  return {
    client,
    cancelResonesList,
    pageLoading,
    pageLoadingError,
    refreshing,
  };
};

export default connect(mapStateToProps,{
  updateProvidorLocation,
  updateProviderActive,
  updateUserToken,
  acceptOrder,
  getCancelResones,
  cancelOrder,
  endOrder
})(withNavigation(HomePage));