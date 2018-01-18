// Usage:
// <CollapseSections/>

import React, { Component } from 'react';

import * as Constants from '../../utils/Constants';
import * as Utils from '../../utils/Utils';

class CollapseSections extends Component {

    constructor() {
        super();
        this.state = {
            collapseAll: true
        }
        this.setCollapse = this.setCollapse.bind(this);
    }

    setCollapse(value) {
        this.setState({
            collapseAll : value
        });
    }

    render() {
        return (
            <div className="collapse-sections small-font">
                 {this.state.collapseAll ?
                        <div onClick={(event) => {Utils.preventDefault(event);
                            this.props.expandAll(true);
                            this.setCollapse(false);
                            }}>
                        {Constants.TITLES.EXPAND_ALL}</div>
                        :
                        <div onClick={(event) => {Utils.preventDefault(event);
                            this.props.collapseAll(true);
                            this.setCollapse(true);
                            }}>
                            {Constants.TITLES.COLLAPSE_ALL}
                        </div>
                }
            </div>
        );
    }
}


export default CollapseSections;
