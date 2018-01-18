// Usage:
// <CollapseSections/>

import React, { Component } from 'react';

import * as Constants from '../../utils/Constants';
import * as Utils from '../../utils/Utils';

class CollapseSections extends Component {

    render() {
        return (
            <div className="collapse-sections small-font" onClick={(event) => {Utils.preventDefault(event);
                                                                               this.props.toggleCollapseAll(event)}}>
                {this.props.collapseAll ? 
                        <div>{Constants.TITLES.COLLAPSE_ALL}</div>
                        : 
                        <div>{Constants.TITLES.EXPAND_ALL}</div>
                }
            </div>
        );
    }
}


export default CollapseSections;
