import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
            this.setState({errorMessage: result});
        });
    }
    connectExternal(event, app) {
        Utils.preventDefault(event);
        Auth.connectExternalApp(app);
    }


    render() {
        return (
        <div>
            <div className="header flex space-between">
            <NavLink to='/Login' className="white">
                <FontAwesome name="arrow-left" size="lg"/>
            </NavLink>
            </div>
             <div className="connection-form"> 
                <div className="app-title">
                    Shopping App
                </div>
                    <div className="connection-title">Créer un nouvel utilisateur </div>
                            <input type="text" placeholder="Nom" className="connection-input"
                                    onChange={(event) => this.setState({name: event.target.value})}/>
                            <input type="text" placeholder="E-mail" className="connection-input"
                                    onChange={(event) => this.setState({email: event.target.value})}/>
                        <div className="password-inputs">
                            <input type="password" placeholder="Mot de passe" className="connection-input"
                                        onChange={(event) => this.setState({password: event.target.value})}/>  
                            <input type="password" placeholder="Confirmer le mot de passe" className="connection-input"
                                        onChange={(event) => this.setState({passwordVerification: event.target.value})}/>  
                        </div>
                    {
                        this.state.errorMessage ? 
                        <div className="errorMessage">{this.state.errorMessage}</div>
                        : null
                    }
                <div className="connection-form-buttons">
                    <button className="connection-button" onClick={(event) => this.create(event)}> Valider </button>
                </div>
            </div>

        </div>
    );
    }
}

export default CreateUser;
