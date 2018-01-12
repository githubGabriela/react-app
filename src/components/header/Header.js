import React, { Component } from 'react';

import SignOut from '../auth/SignOut';

class Header extends Component {
    render() {
        return (
            <div className="header flex space-between">
                <div className="small-font"> Connected as {this.props.user.name ? this.props.user.name : this.props.user.email}</div>
                <SignOut/>
            </div>
        );
    }
}

export default Header;
