// Usage:
// <LastModified/>

import React, { Component } from 'react';

import * as Constants from '../../utils/Constants';

class LastModified extends Component {

    constructor() {
        super();
        const date= new Date();
        const month = date.getMonth() + 1;
        const today = date.getDate() + '/' + month + '/' +date.getFullYear() + ' ' 
                    + date.getHours() + ':' +date.getMinutes()+ ':'+ date.getSeconds();

        this.state= {
            today: today
        }
    }
    render() {
        return (
            <div className="transparent-text small-font">
                {Constants.TITLES.LAST_MODIFIED}: {this.state.today}
            </div>
           
        );
    }
}

export default LastModified;
