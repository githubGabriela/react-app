// Udage
// <DropdownCategories/>

import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import * as Constants from '../../../../utils/Constants';
import * as DataSource from '../../../../config/DataSource';


class DropdownCategories extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            selected: {label: props.initialCategory, value: props.initialCategory}
        }
    }

    componentDidMount() {
        this.getCategoriesForDropdown();
    }

    getCategoriesForDropdown() {
        DataSource.getCategoriesForDropdown(items => {
            let initialCategory = this.props.initialCategory ? this.props.initialCategory : items[0];
            this.setState({
                categories: items,
                selected: initialCategory
            });
        });
    }

    
    render() {
        return (
            <Dropdown options={this.state.categories}
                      value={this.state.selected}
                      onChange={(option) => {
                                            this.setState({selected: option});
                                            this.props.categorySelected(option.label);
                                            }}
                      placeholder={Constants.TITLES.SELECT_CATEGORY}/>
        );
    }
}

export default DropdownCategories;