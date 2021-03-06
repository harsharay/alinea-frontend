import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCjlrjFWYj5KLrQcg5M1u16CLBDhpINEOI",
    authDomain: "alinea-invest-login.firebaseapp.com",
    projectId: "alinea-invest-login",
    storageBucket: "alinea-invest-login.appspot.com",
    messagingSenderId: "954495321638",
    appId: "1:954495321638:web:9380977d95abd69d2108e7",
    measurementId: "G-FXMVQT1RSP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const user = firebase.auth().currentUser;

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({ prompt : 'select_account' })

export const googleSignIn = () => auth.signInWithRedirect(provider)

//Creating user document
export const createUserDocument = async (userAuth) => {
  if(userAuth){
      let reference = firestore.doc(`stocksData/${userAuth.uid}`)
      let snapshot = await reference.get()
      if(!snapshot.exists){
          let { displayName, uid, email } = userAuth
          let createdAt = new Date()
          let watchlistStocks = []
          try {
              reference.set({
                  displayName,
                  uid,
                  email,
                  createdAt,
                  watchlistStocks
              })
          } catch (e) {
              console.log(`${e.message} is the error`)
          }
      } else {
          return userAuth;
      }
  }
}
