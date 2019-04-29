import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesome from  'react-fontawesome';
import ReactTooltip from 'react-tooltip';


import SignOut from '../auth/SignOut';
import * as Constants from '../../utils/Constants';
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
                        <span data-tip="Sign out" data-place="left">
                            <SignOut/>
                            <ReactTooltip />
                        </span>
                </div>
                <nav>
                    <ul className="links">
                        <li className="shoppingList">
                            <NavLink to='/' activeClassName="selected">
                                <div className="link">
                                    <span data-tip="Shopping basket" data-place="top">
                                        <FontAwesome name='shopping-basket'/>
                                    </span>
                                </div>
                            </NavLink>
                        </li>
                        <li><NavLink to='/Products' activeClassName="selected"> 
                                <div className="link">
                                    <span data-tip="All products" data-place="top">
                                        {Constants.TITLES.ALL_PRODUCTS}     
                                        <FontAwesome name='list'/>
                                    </span>
                                </div>
                            </NavLink>
                        </li>
                        <li><NavLink to='/History' activeClassName="selected"> 
                                <div className="link">
                                    <span data-tip="Shopping history" data-place="top">
                                        {Constants.TITLES.HISTORY}
                                        <FontAwesome name='history'/>
                                    </span>
                                </div>
                            </NavLink>
                        </li>
                        <li><NavLink to='/Admin/Categories' activeClassName="selected">
                                <div className="link">
                                    <span data-tip="Admin - all products/categories" data-place="top">
                                        {Constants.TITLES.ADMIN}     
                                        <FontAwesome name='user-circle-o'/>
                                    </span>
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