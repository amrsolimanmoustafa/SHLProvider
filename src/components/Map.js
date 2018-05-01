import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native'
import styles from './styles/mapStyle'
import MapView from 'react-native-maps';
import {reverseCoordinatesToAdress} from "../actions/commonServicesActions"
import { withNavigation } from "react-navigation";
import { connect } from 'react-redux'

class Map extends Component {
  constructor(props) {
    super(props);
  
  }
  
  render () {
    console.log('lat ',this.props.commonServices.lat)
    return (
      <View style={styles.container}>
       <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.props.commonServices.lat? this.props.commonServices.lat : 6.2672295570373535,
            longitude:this.props.commonServices.lng? this.props.commonServices.lng : 31.229478498675235,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: this.props.commonServices.lat? this.props.commonServices.lat : 6.2672295570373535,
            longitude:this.props.commonServices.lng? this.props.commonServices.lng : 31.229478498675235,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Marker.Animated 
              coordinate={
                new MapView.AnimatedRegion({
                  latitude: this.props.commonServices.lat? this.props.commonServices.lat : 6.2672295570373535,
                  longitude:this.props.commonServices.lng? this.props.commonServices.lng : 31.229478498675235,
                })
              }
          />
        </MapView>
        {/*<OtlobMain/>*/}
      </View>
    )
  }
 }
 const mapStateToProps = state => {
   console.log(state.commonServices)
  return {
    commonServices: state.commonServices
   }
  }

  
 export default connect(mapStateToProps, {reverseCoordinatesToAdress }) (withNavigation(Map))