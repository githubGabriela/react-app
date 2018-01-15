import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import * as Utils from '../../utils/Utils';
import * as Constants from '../../utils/Constants';
import * as Auth from '../../config/Auth';
import '../../assets/css/General.css';

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
                        <div className="errorMessage">{this.state.errorMessage}</div>
                        : null
                    }
                <div className="connection-form-buttons">
                    <button className="connection-button" onClick={(event) => this.login(event)}> Connexion </button>
                    <button className="connection-facebook" onClick={(event) => this.connectExternal(event, Constants.TITLES.FACEBOOK)}> 
                        <FontAwesome className="connection-external-logo" name="facebook-official" size="lg"/>Connexion avec Facebook </button>
                    <button className="connection-google" onClick={(event) => this.connectExternal(event,  Constants.TITLES.GOOGLE)}> 
                        <FontAwesome className="connection-external-logo" name="google" size="lg"/>Connexion avec Google </button>
                </div>

                <div className="register-form-buttons">
                <div className="connection-title">Pas encore inscrit?</div>
                    <Link to="/CreateUser"> 
                        <div className="underlined-link small-font">
                            Créer un compte
                        </div>
                    </Link> 
                  
                </div>
                
            </div>
        );
    }
}


export default Login;
