import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

import SignOut from '../auth/SignOut';

import '../../config/Router.css';

class Header extends Component {

    render() {
        return (
            <header>
            { this.props.userAuthenticated ?
            <div>
                <div className="header flex space-between">
                    <div className="small-font"> Connected as { this.props.userAuthenticated.name ? this.props.userAuthenticated.name : this.props.userAuthenticated.email}
                    </div>
                    <SignOut/>
                </div>
                <nav>
                    <ul className="links">
                        <li className="shoppingList">
                            <NavLink to='/' activeClassName="selected">
                                <div className="link">
                                    <FontAwesome name='shopping-basket'/>
                                </div>
                            </NavLink>
                        </li>
                        <li><NavLink to='/Products' activeClassName="selected"> 
                                <div className="link">
                                    <FontAwesome name='list'/>
                                </div>
                            </NavLink>
                        </li>
                        <li><NavLink to='/History' activeClassName="selected"> 
                                <div className="link">
                                    <FontAwesome name='history'/>
                                </div>
                            </NavLink>
                        </li>
                        <li><NavLink to='/Admin/Categories' activeClassName="selected">
                                <div className="link">
                                    <FontAwesome name='user-circle-o'/>
                                </div>
                            </NavLink>
                        </li>                         
                    </ul>
                </nav>
            </div>
            : 
            null
            }
        </header>
    )};
}

export default Header;