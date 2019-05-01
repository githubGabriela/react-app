import * as firebase from 'firebase';
import * as Constants from '../utils/Constants';

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
export const dbDataCategories = dbRef.child(Constants.CATEGORIES);
export const dbDataProducts = dbRef.child(Constants.PRODUCTS);
export const dbDataShoppingBasket = dbRef.child(Constants.SHOPPING_BASKET);
export const dbDataHistory = dbRef.child(Constants.HISTORY);
export const dbDataLastModified = dbRef.child(Constants.LAST_MODIFIED);

export const dbDataOrderProductsByCategory = dbRef.child(Constants.PRODUCTS).orderByChild('category/id');

export const storage = firebase.storage();

export const auth = firebase.auth();