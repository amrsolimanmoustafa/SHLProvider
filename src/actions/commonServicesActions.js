import {REVERSE_GEOLOCATION,SETCOORDINATES} from './types'
import Base from "../Base"
import axios from 'axios';

export const reverseCoordinatesToAdress=(lat,lng)=>dispatch=>{

 var base_url =new Base()
var  GOOGLEGEOLOCATION_URL="https://maps.googleapis.com/maps/api/geocode/json" 
var APIKEY='AIzaSyBSSYckZ59ZW5MBPlGmPDvZu5Rzh9snPaQ'
    try {
axios.get(GOOGLEGEOLOCATION_URL+'?latlng=' + lat + ','
  + lng + '&location_type=APPROXIMATE&result_type=locality&'
  +
  'key='+APIKEY+'&language=en&region=EN"')
  .then((response) =>{
    dispatch({
    type:REVERSE_GEOLOCATION,
    payload:response.data.results[0]
  }) 
}).catch(function(error) {
          console.log(error);
        });

    } catch (error) {
      console.error(error);
    }

}
export const setCoordnates=(lat,lng)=>dispatch=>{
    console.log('setCoordnates ::')
    try{
    dispatch({
type:SETCOORDINATES,
payload:{lat:lat,lng:lng}
    })}catch(e){}
}