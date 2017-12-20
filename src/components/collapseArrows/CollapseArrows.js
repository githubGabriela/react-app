import React, { Component } from 'react';
import FontAwesome from  'react-fontawesome';

import './CollapseArrows.css';

class CollapseArrows extends Component {
    render() {
        return (
                <div className="arrow">
                {this.props.arrowUp ? 
                   <FontAwesome name='angle-up'/>
                   :
                   <FontAwesome name='angle-down'/>
                }
                </div>
        );
    }
}

export default CollapseArrows;
