import React, { Component } from 'react';

import * as Constants from '../../../utils/Constants';

class ColorHeader extends Component {
    render() {
    return (
        <div className="popup-header" style={{backgroundColor: this.props.color}}>
            <label className="popup-header-text"> {Constants.POPUP.CHOOSE_COLOR} </label>
        </div>
        );
    }
}

export default ColorHeader;
