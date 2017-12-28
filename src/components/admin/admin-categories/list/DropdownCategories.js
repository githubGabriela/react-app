// Udage
// <DropdownCategories categories={this.props.categories} />

import React, { Component } from 'react';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class DropdownCategories extends Component {
q
    render() {
        let options = [];
        this.props.categories.forEach(item => {
            options.push({ value: item.key, label : item.value.name });
        });

        return (
            <Dropdown options={options}
                      onChange={(event) => this.props.categoryChanged({key : event.value, name: event.label})} 
                      placeholder="Select a category" />
        );
    }
}

export default DropdownCategories;
