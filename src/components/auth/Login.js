import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import * as Utils from '../../utils/Utils';
import * as Constants from '../../utils/Constants';
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


    login() {
        Auth.login(this.state.email, this.state.password, result => {
           this.setState({errorMessage: result});
        });
    }


    render() {
        return (
            <div className="connection-form"> 
                <div className="app-title-login">
                    Shopping App
                </div>
                        <div className="connection-title">Déjà inscrit?</div>
                        <input type="text" placeholder="E-mail" className="connection-input"
                                    onChange={(event) => this.setState({email: event.target.value})}/>
                        <input type="password" placeholder="Mot de passe" className="connection-input"
                                    onChange={(event) => this.setState({password: event.target.value})}/>
                        <div className="underlined-link password-forgoten small-font">
                                <a href=""/> Mot de passe oublié?
                        </div> 
                    {
                        this.state.errorMessage ? 
                        <div>{this.state.errorMessage}</div>
                        : null
                    }
                <div className="connection-form-buttons">
                    <Link to='/'>
                        <button className="connection-button" onClick={this.login}> Connexion </button>
                    </Link>
                </div>

                <div className="register-form-buttons">
                <div className="connection-title">Pas encore inscrit?</div>
                
                <div className="underlined-link small-font">
                    <Link to="/CreateUser" className="white"> 
                            Créer un compte
                    </Link> 
                </div>
                </div>
                
            </div>
        );
    }
}


export default Login;
