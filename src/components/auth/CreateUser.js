import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Utils from '../../utils/Utils';
import * as Auth from '../../config/Auth';
import * as Constants from '../../utils/Constants';
class CreateUser extends Component {    
    
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordVerification: ''
        }
        this.create = this.create.bind(this);
        this.connectExternal = this.connectExternal.bind(this);
    }
    
    create(event) {
        Utils.preventDefault(event);
        Auth.createUser(this.state.email, this.state.password, result => {
            console.log('result', result);
                this.setState({errorMessage: result});
        });
    }
    connectExternal(event, app) {
        Utils.preventDefault(event);
        Auth.connectExternalApp(app);
    }


    render() {
        return (
             <div className="connection-form"> 
                <div className="app-title">
                    Shopping App
                </div>
                    <div className="connection-title">Créer un nouvel utilisateur </div>
                        <div>
                            <input type="text" placeholder="Name" className="connection-input"
                                    onChange={(event) => this.setState({name: event.target.value})}/>
                            <input type="text" placeholder="E-mail" className="connection-input"
                                    onChange={(event) => this.setState({email: event.target.value})}/>
                        </div>
                        <div className="password-inputs">
                            <input type="text" placeholder="Créer un mot de passe" className="connection-input"
                                        onChange={(event) => this.setState({password: event.target.value})}/>  
                            <input type="text" placeholder="Entrer à nouveau le mot de passe" className="connection-input"
                                        onChange={(event) => this.setState({passwordVerification: event.target.value})}/>  
                        </div>
                    {
                        this.state.errorMessage ? 
                        <div className="errorMessage">{this.state.errorMessage}</div>
                        : null
                    }
                <div className="connection-form-buttons">
                    <div className="connection-button" onClick={(event) => this.create(event)}> Créer</div>

                    <div className="separator">ou</div>

                    <div className="connection-facebook" onClick={(event) => this.connectExternal(event, Constants.TITLES.FACEBOOK)}> 
                        <FontAwesome className="connection-external-logo" name="facebook-official" size="lg"/>Continuer avec Facebook </div>
                    <div className="connection-google" onClick={(event) => this.connectExternal(event,  Constants.TITLES.GOOGLE)}> 
                        <FontAwesome className="connection-external-logo" name="google" size="lg"/>Continuer avec Google </div>
                </div>
            </div>
    );
    }
}

export default CreateUser;
