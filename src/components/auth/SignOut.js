import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Auth from '../../config/Auth';
import * as Utils from '../../utils/Utils';
import '../../assets/css/General.css';

class SignOut extends Component {
    
    constructor() {
        super();
        this.state = {
            errorMessage: ''
        }
        this.signOut = this.signOut.bind(this);
    }

    signOut(event){
        Utils.preventDefault(event);
        Auth.signOut(error => {
            if(error) {
                this.setState({
                    errorMessage: error
                });
            }
        });
    }
    
    render() {
        return (
            <div className="underlined-link small-font">
                <FontAwesome name="sign-out" size="lg" onClick={(event) => this.signOut(event)}/> 
                { this.state.errorMessage ? 
                    <div className="red"> { this.state.errorMessage } </div>
                : null
                }
            </div>
        );
    }
}

export default SignOut;
