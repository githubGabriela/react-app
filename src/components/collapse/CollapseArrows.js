// Usage:
// <CollapseArrows arrowUp={this.props.showSectionForKey === this.props.category.key}/>

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from  'react-fontawesome';

import * as Utils from '../../utils/Utils';

class CollapseArrows extends Component {
    render() {
        return (
                <div className="arrow">
                {this.props.arrowUp ? 
                   <FontAwesome name='angle-up' onClick={(event) => {Utils.preventDefault(event); this.props.expandSection(true)}}/>
                   :
                   <FontAwesome name='angle-down' onClick={(event) => {Utils.preventDefault(event); this.props.expandSection(true)}}/>
                }
                </div>
        );
    }
}

CollapseArrows.propTypes = {
    arrowUp: PropTypes.bool,
    expandSection: PropTypes.func
}

export default CollapseArrows;
