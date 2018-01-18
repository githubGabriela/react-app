// Usage:
// <CollapseArrows arrowUp={this.props.showSectionForKey === this.props.category.key}/>

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from  'react-fontawesome';

import * as Utils from '../../utils/Utils';

class CollapseArrows extends Component {
    
    shouldComponentUpdate(nextProps) {
        return this.props.arrowDown !== nextProps.arrowDown;
    }

    render() {
        return (
                <div className="arrow"> 
                {this.props.arrowDown ? 
                   <FontAwesome name='angle-down'/>
                   :
                   <FontAwesome name='angle-up'/>
                }
                </div>
        );
    }
}

CollapseArrows.propTypes = {
    arrowDown: PropTypes.bool
}

export default CollapseArrows;
