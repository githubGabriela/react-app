import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Utils from '../../utils/Utils';
import * as Constants from '../../utils/Constants'
import * as Auth from '../../config/Auth';;
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

    signOut(){
        Auth.signOut( result => {
            console.log(result);
        });
    }s

    render() {
        return (
            <div className="connection-form"> 
                <div className="app-title">
                    Shopping App
                </div>
                        <div className="connection-title">Déjà inscrit?</div>
                        <input type="text" placeholder="E-mail" className="connection-input"
                                onChange={(event) => this.setState({email: event.target.value})}/>
                        <input type="text" placeholder="Mot de passe" className="connection-input"
                                onChange={(event) => this.setState({password: event.target.value})}/>
                        <div className="underlined-link password-forgoten">
                            <a href=""/> Mot de passe oublié?
                        </div> 
                    {
                        this.state.errorMessage ? 
                        <div className="errorMessage">{this.state.errorMessage}</div>
                        : null
                    }
                <div className="connection-form-buttons">
                    <button className="connection-button" onClick={(event) => this.login(event)}> Connexion </button>

                    <div className="separator">ou</div>

                    <button className="connection-facebook" onClick={(event) => this.connectExternal(event, Constants.TITLES.FACEBOOK)}> 
                        <FontAwesome className="connection-external-logo" name="facebook-official" size="lg"/>Connexion avec Facebook </button>
                    <button className="connection-google" onClick={(event) => this.connectExternal(event,  Constants.TITLES.GOOGLE)}> 
                        <FontAwesome className="connection-external-logo" name="google" size="lg"/>Connexion avec Google </button>
                </div>

                <div className="register-form-buttons">
                <div className="connection-title">Pas encore inscrit?</div>
                     <div className="underlined-link">
                        <a href="" onClick={(event) => this.login(event)}/> Créer un compte
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Login;
