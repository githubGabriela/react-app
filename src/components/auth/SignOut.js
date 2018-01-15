import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, Route } from 'react-router-dom';

import * as Auth from '../../config/Auth';
import * as Utils from '../../utils/Utils';
import Login from '../auth/Login';
import '../../assets/css/General.css';

class SignOut extends Component {
    
    constructor() {
        super();
        this.state = {
            errorMessage: ''
        }
        this.signOut = this.signOut.bind(this);
    }

    signOut(){
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
            <Link to='/Login'>
                <FontAwesome name="sign-out" size="lg" onClick={this.signOut}/>
            </Link>
                { this.state.errorMessage ? 
                    <div className="red"> { this.state.errorMessage } </div>
                : null
                }
            </div>
        );
    }
}


export default SignOut;
