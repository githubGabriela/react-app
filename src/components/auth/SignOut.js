import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, Route } from 'react-router-dom';

import * as Utils from '../../utils/Utils';
import SignOutPopup from './SignOutPopup';

import * as Auth from '../../config/Auth';
import '../../assets/css/General.scss';

class SignOut extends Component {
    
    constructor() {
        super();
        this.state = {
            showPopup: false,
            errorMessage: ''
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.signOutAndClose = this.signOutAndClose.bind(this);
    }
   
    open(event){
        Utils.preventDefault(event);
        this.setState({showPopup: true});
    }

    close(){
        this.setState({showPopup: false});
    }
   
    signOutAndClose() {
        Auth.signOut(error => {
            if(error) {
                this.setState({
                    errorMessage: error
                });
            }
        });
        this.close();
    }

    render() {
        const showErrorMessage = () => {
            return ( <div>
                { this.state.errorMessage ? 
                    <div className="red"> { this.state.errorMessage } </div>
                : null
                }
                </div>
            );
        }

        return (
            <div>
                <FontAwesome name="sign-out" size="lg" onClick={(event) => this.open(event)}/>
                <SignOutPopup showPopup= {this.state.showPopup}
                              closePopup = {this.close}
                              confirmAndClosePopup = {this.signOutAndClose}
                />
               {showErrorMessage()}
            </div>
        );
    }
}


export default SignOut;
