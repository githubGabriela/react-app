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
                    <ul>
                        <li className="shoppingList">
                            <NavLink to='/' activeClassName="selected">
                                <FontAwesome name='shopping-basket'/>
                            </NavLink>
                        </li>
                        <li><NavLink to='/Products' activeClassName="selected"> 
                                <FontAwesome name='list'/>
                            </NavLink>
                        </li>
                        <li><NavLink to='/History' activeClassName="selected"> 
                                <FontAwesome name='history'/>
                            </NavLink>
                        </li>
                        <li><NavLink to='/Admin/Categories' activeClassName="selected">
                                <FontAwesome name='user-circle-o'/>
                            </NavLink>
                            <ul>
                                <li><NavLink to="/Admin/Categories" activeClassName="selected">
                                    <FontAwesome name='copyright'/>  
                                    </NavLink>
                                </li>
                                <li><NavLink to="/Admin/Products" activeClassName="selected">
                                        <FontAwesome name='product-hunt'/>
                                    </NavLink>
                                </li> 
                            </ul>
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