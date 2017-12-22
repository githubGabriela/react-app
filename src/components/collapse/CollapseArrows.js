// Usage:
// <CollapseArrows arrowUp={this.props.showSectionForKey === this.props.category.key}/>

import React, { Component } from 'react';
import FontAwesome from  'react-fontawesome';

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
