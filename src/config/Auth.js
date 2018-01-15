import {auth} from './constants';
import * as Constants from '../utils/Constants';

export function createUser(email, pass, customFct){
    auth.createUserWithEmailAndPassword(email.trim(), pass.trim()).catch( error => {
        customFct(error.message);
    });
}

export function login(email, pass, customFct) {
    var user = auth.currentUser;
    if (user) {
        customFct('User is already signed in');
    } else {
        auth.signInWithEmailAndPassword(email.trim(), pass.trim()).catch( error => {
            customFct(error.message);
        });
    }
}

export function isAuthenticated(customFct) {
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('authenticated true');
            customFct(user);
        }else{
            customFct(false);
        }
    });
}

export function signOut(customFct){
     auth.signOut().then(result => {
     }).catch(function(error) {
        customFct('Cannot sign out');
     });
}

export function connectExternalApp(app){
    switch(app){
        case Constants.TITLES.FACEBOOK : 
            connectByFacebook();
        break;
        case Constants.TITLES.GOOGLE:
            connectByGoogle();
        break;
        default:
        break;
    }
}

function connectByFacebook() {
    console.log('connect by facebook');
    // https://awesomeproject-88cb7.firebaseapp.com/__/auth/handler
}

function connectByGoogle(){
    console.log('connect by google');
}