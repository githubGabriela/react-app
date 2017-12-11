import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCcaraqh5VEYOO8zWh56fA276NXcwFXYbM",
    authDomain: "awesomeproject-88cb7.firebaseapp.com",
    databaseURL: "https://awesomeproject-88cb7.firebaseio.com",
    projectId: "awesomeproject-88cb7",
    storageBucket: "awesomeproject-88cb7.appspot.com",
    messagingSenderId: "663794427834"
};

firebase.initializeApp(config);

export const dbRef= firebase.database().ref();
export const dbData = dbRef.child('data');