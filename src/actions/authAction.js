import {
  REGISTER_SUBMIT_FAILED,
  REGISTER_SUBMIT_SUCESS,
  REGISTER_SUBMIT_RELOAD,
  REGISTER_SUBMIT_STARTED
} from './types'
import { AsyncStorage } from 'react-native'
import Backend from '../backend';
import Toast from 'react-native-toast'

export const registerProvider = () => {
  return(dispatch) => {
      dispatch({
          type: REGISTER_SUBMIT_STARTED
      })
      let data={
        "user_name":"23زود خدمة1",
        "phone":"95558454",
        "license_number":"54545464",
        "vehicle_number":"54654654",
        "services_id":1,
        "sub_services_id":1,
        "personal_pic":"",//string b64
        "license_pic":"",//string b64
        "long":"",//float
        "lat":""//float
      }
      Backend.updateProvidorLocation(3,data)
      .then(async (response) => {
          console.log(response)
          /*[
            {
              "user_id": 34,
              "phone": "95558454",
              "user_name": "23زود خدمة1",
              "email": null,
              "profile_pic": null,
              "activate": null,
              "v_code": null,
              "type": null,
              "token_id": null,
              "city_id": null,
              "zone_id": null,
              "lang_id": null,
              "created_at": "2018-05-01 10:02:07",
              "updated_at": "2018-05-01 10:02:07",
              "providor": [
                {
                    "provider_id": 3,
                    "user_id": 34,
                    "license_number": "54545464",
                    "vehicle_number": "54654654",
                    "services_id": 1,
                    "sub_services_id": 1,
                    "personal_pic": "/personal_pic/voice-1525168927.png",
                    "license_pic": "/license_pic/voice-1525168927.mp3",
                    "long": null,
                    "lat": null,
                    "created_at": "2018-05-01 10:02:07",
                    "updated_at": "2018-05-01 10:02:07"
                }
              ]
            }
          ]*/
        
          if(response != undefined){
              dispatch({
                  type: REGISTER_SUBMIT_SUCESS,
              })
          }else{
              dispatch({
                  type: REGISTER_SUBMIT_FAILED
              })
          }
      })
  }
}


export const updateUserToken = (token_id) => {
  return(dispatch) => {
      dispatch({
          type: REGISTER_SUBMIT_STARTED
      })
      let data= {
        token_id: token_id
      }
      
      Backend.updateprovidertoken(3,data)
      .then(async (response) => {
          console.log(response)        
          if(response != undefined){
              dispatch({
                  type: REGISTER_SUBMIT_SUCESS,
              })
          }else{
              dispatch({
                  type: REGISTER_SUBMIT_FAILED
              })
          }
      })
  }
}






export const loginUser=(user,context)=>dispatch=>{

  var base_url =new Base()
 var  LOGIN_URL="http://" + base_url.baseUrl + "login"
 ////////////////
 
 // login(data,context){
   // var base =new Base()
   // var p;
 // return p=new Promise((resolve,reject)=>{
 
 
     try {
 
       axios
         .post(LOGIN_URL, user)
         .then((user) =>{
           if (user && user.phone !="") {
             // console.log(user);
             context.setState({
               loading: false,
               VerifyPhoneScreen: "VerifyPhoneScreen"
             });
             context.props.navigation.navigate("VerifyPhoneScreen", user);
 // resolve(user)
             //  navigate(self.state.VerifyPhoneScreen);
 
       dispatch({
     type:LOGIN,
     payload:user
   })
 
 
           } else {
             context.setState({ loading: false });
           }
         })
         .catch(function(error) {
           context.setState({ loading: false });
           Toast.show("يرجي التاكد من البيانات", Toast.LONG);
 
           console.log(error);
         });
     } catch (error) {
       Toast.show("", Toast.LONG);
 
       context.setState({ loading: false });
       console.error(error);
     }
 
 
 
 // resolve()
 // reject()
 // })
 // }
 ////////////////
 
 
 
   // auth.login(user,context).
 //   then(userloged=>
 //     {
 //       dispatch({
 //     type:LOGIN,
 //     payload:userloged
 //   })
 
 
 // })
 }
 