import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from  'react-fontawesome';

import SignOut from '../auth/SignOut';

class Header extends Component {
    render() {
        return (
            <header>
            { this.props.userAuthenticated ?
            <div>
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
                        <li><Link to='/Admin/Categories'>
                                <FontAwesome name='user-circle-o'/>
                            </Link>
                            <ul>
                                <li><Link to="/Admin/Categories">
                                    <FontAwesome name='copyright'/>  
                                    </Link>
                                </li>
                                <li><Link to="/Admin/Products">
                                        <FontAwesome name='product-hunt'/>
                                    </Link>
                                </li> 
                            </ul>
                        </li> 
                    </ul>
                </nav>
            </div>
            
            : null
            }
        </header>
    )};
}

export default Header;