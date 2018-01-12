import React, { Component } from 'react';

import * as Utils from '../../utils/Utils';
import * as Auth from '../../config/Auth';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
        this.login = this.login.bind(this);
    }


    login(event) {
        Utils.preventDefault(event);
        Auth.login(this.state.email, this.state.password, result => {
           this.setState({errorMessage: result});
        });
    }

    signOut(){
        Auth.signOut( result => {
            console.log(result);
        });
    }s

    render() {
        return (
            <div> 
                <div> Login </div>
                <input type="text" placeholder="Email" 
                        onChange={(event) => this.setState({email: event.target.value})}/>
                <input type="text" placeholder="Password"
                        onChange={(event) => this.setState({password: event.target.value})}/>  
                
                {
                    this.state.errorMessage ? 
                    <div>{this.state.errorMessage}</div>
                    : null
                }
               <div>
                <button onClick={(event) => this.login(event)}> Login </button>
                <button onClick={(event) => this.signOut(event)}> Sign out </button>
               </div>
            </div>
        );
    }
}

export default Login;
