import * as firebase from 'firebase';
require('firebase/app');
require('firebase/messaging');
// should go in a secret file
var config = {
  apiKey: "AIzaSyAm7qwx12pV5PdH100bkZQTtLfR6BGKk5U",
  authDomain: "shlapp-fd7eb.firebaseapp.com",
  databaseURL: "https://shlapp-fd7eb.firebaseio.com",
  projectId: "shlapp-fd7eb",
  storageBucket: "shlapp-fd7eb.appspot.com",
  messagingSenderId: "663864784757"
};

firebase.initializeApp(config);


firebase.messaging().onMessage((message) => {
  console.log(message)
});

export default firebase;
//export const messaging = firebase.messaging();
