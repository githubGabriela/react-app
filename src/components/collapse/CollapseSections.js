// Usage:
// <CollapseSections/>

import React, { Component } from 'react';

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
                        <div>Collapse All</div>
                        : 
                        <div>Expand All</div>
                }
            </div>
        );
    }
}


export default CollapseSections;
