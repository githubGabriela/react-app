import React, { Component } from 'react';

import { dbData } from '../../config/constants';

class ItemRemove extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            item : {
                key : this.props.item.key,
                value : this.props.item.value[this.props.propertyToShow]
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.removeFromDb(this.state.item.key);
    }

    removeFromDb(key) {
        if(key){
            dbData.child(key).remove();
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <button type="submit">Remove</button>
            </form>
        );
    }
}

export default ItemRemove;
