import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

import SignOut from '../auth/SignOut';

const Header = () => (
    <header>
         <div className="header flex space-between">
                  {/* <div className="small-font"> Connected as {this.props.user.name ? this.props.user.name : this.props.user.email}</div> */}
                <SignOut/>
        </div>
            <nav>
                <ul>
                    <li className="shoppingList">
                        <Link to='/'>
                            <FontAwesome name='shopping-basket'/>
                        </Link>
                    </li>
                    <li><Link to='/Products'> 
                            <FontAwesome name='list'/>
                        </Link>
                    </li>
                    <li><Link to='/History'> 
                            <FontAwesome name='history'/>
                        </Link>
                    </li>
                    <li><Link to='/Admin'>
                            <FontAwesome name='user-circle-o'/>
                        </Link>
                    </li> 
                </ul>
        </nav>
    </header>
)

export default Header;