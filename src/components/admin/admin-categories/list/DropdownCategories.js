// Udage
// <DropdownCategories/>

import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import * as DataSource from '../../../../config/DataSource';

class DropdownCategories extends Component {
    constructor(){
        super();
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        this.getCategoriesForDropdown();
    }

    getCategoriesForDropdown(){
        DataSource.getCategoriesForDropdown(items => {
            this.setState({
                categories: items
            });
        });
    }

    render() {
        return (
            <Dropdown options={this.state.categories}
                      onChange={(event) => this.props.categorySelected(event)} 
                      placeholder="Select a category"/>
        );
    }
}



export default DropdownCategories;