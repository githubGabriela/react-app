// Usage:
// <CollapseSections/>

import React, { Component } from 'react';

import * as Constants from '../../utils/Constants';

class CollapseSections extends Component {

    constructor() {
        super();
        this.state={
            collapseAll : true
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle(event){
        event.preventDefault();
        this.setState({
            collapseAll : !this.state.collapseAll
        });
    }

    render() {
        return (
            <div className="collapse-sections small-font" onClick={this.toggle}>
                {this.state.collapseAll ? 
                        <div>{Constants.TITLES.COLLAPSE_ALL}</div>
                        : 
                        <div>{Constants.TITLES.EXPAND_ALL}</div>
                }
            </div>
        );
    }
}


export default CollapseSections;
