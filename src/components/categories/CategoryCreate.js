import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

import ItemCreate from '../items/ItemCreate';

class CategoryCreate extends Component {
    constructor() {
        super();
        this.state = {
            color: ''
        }
        this.colorChanged = this.colorChanged.bind(this);
    }

    colorChanged(event){
        this.setState({
            color: event.hex
        });
    }

    render() {
        return (
            <div>
                <ItemCreate placeholder='Add a category' propertyToShow='category' color={this.state.color}/>
                <SketchPicker onChange={this.colorChanged}/>
            </div>
        );
    }
}

export default CategoryCreate;
