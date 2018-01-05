// Usage:
// <LastModified/>

import React, { Component } from 'react';

import * as Constants from '../../utils/Constants';
import * as DataSource from '../../config/DataSource';

class LastModified extends Component {

    render() {
        return (
            <div>
                { this.props.lastModified ? 
                    <div className="transparent-text small-font">
                        {Constants.TITLES.LAST_MODIFIED}: {this.props.lastModified}
                    </div>
                : null
                }
            </div>
        );
    }
}

export default LastModified;
