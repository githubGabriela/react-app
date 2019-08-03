import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';


import SignOut from '../auth/SignOut';
import * as Constants from '../../utils/Constants';
import '../../config/Router.css';

class Header extends Component {

    render() {
        return (
            <header>
                {this.props.userAuthenticated ?
                    <div>
                        <div className="header flex space-between">
                            <div className="small-font"> Connected
                                as {this.props.userAuthenticated.name ? this.props.userAuthenticated.name : this.props.userAuthenticated.email}
                            </div>
                            <span data-tip="Sign out" data-place="left">
                            <SignOut/>
                            <ReactTooltip/>
                        </span>
                        </div>
                        <ul className="menu">
                            <li><NavLink to='/Products' activeClassName="selected">
                                <div className="link">
                                    <span data-tip="All products" data-place="top">
                                        {Constants.TITLES.ALL_PRODUCTS}     
                                    </span>
                                </div>
                            </NavLink>
                            </li>
                            <li><NavLink to='/History' activeClassName="selected">
                                <div className="link">
                                    <span data-tip="Shopping history" data-place="top">
                                        {Constants.TITLES.HISTORY}
                                    </span>
                                </div>
                            </NavLink>
                            </li>
                            <li><NavLink to='/Admin/Categories' activeClassName="selected">
                                <div className="link">
                                    <span data-tip="Admin - all products/categories" data-place="top">
                                        {Constants.TITLES.ADMIN}     
                                    </span>
                                </div>
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to='/' activeClassName="selected">
                                    <div className="link">
                                    <span data-tip="Shopping basket" data-place="top">
                                         {Constants.TITLES.SHOPPING_BASKET}
                                    </span>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    :
                    null
                }
            </header>
        )
    };
}

export default Header;