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

export const dataCategories = dbRef.child(Constants.CATEGORIES);
export const dataCategoriesByKey = dbRef.child(Constants.CATEGORIES).orderByKey();
export const dataCategoriesByName = dbRef.child(Constants.CATEGORIES).orderByChild('name');

export const dataProducts = dbRef.child(Constants.PRODUCTS);
export const dataShoppingBasket = dbRef.child(Constants.SHOPPING_BASKET);
export const dataHistory = dbRef.child(Constants.HISTORY);
export const dataLastModified = dbRef.child(Constants.LAST_MODIFIED);

export const dataProductsByCategory = dbRef.child(Constants.PRODUCTS).orderByChild('categoryName');
export const storage = firebase.storage();

export const auth = firebase.auth();