// Udage
// <DropdownCategories/>

import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import * as DataSource from '../../../../config/DataSource';
import * as Constants from '../../../../utils/Constants';


class DropdownCategories extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            selected: {label: props.initialCategory, value: props.initialCategory}
        }
        this._onSelect = this._onSelect.bind(this);
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

    _onSelect(option){
        this.setState({selected: option});
        this.props.categorySelected(option.label);
    }
    
    render() {
        return (
            <Dropdown options={this.state.categories}
                      value={this.state.selected}
                      onChange={this._onSelect} 
                      placeholder={Constants.TITLES.SELECT_CATEGORY}/>
        );
    }
}

export default DropdownCategories;