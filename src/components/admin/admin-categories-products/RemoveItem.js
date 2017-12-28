import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import '../../../assets/css/General.css';

class RemoveItem extends Component {

    render() {
        return (
            <div className="center-from-top icon-on-right">
            { this.props.showRemoveButton ? 
                <FontAwesome name="close" onClick={()=> this.props.removeIconClicked(this.props.item)}/>
                : null
            }
        </div>
        );
    }
}

export default RemoveItem;
