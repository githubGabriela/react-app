// Udage
// <DropdownCategories/>

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import * as Constants from '../../../../utils/Constants';
import * as DataSource from '../../../../config/DataSource';


class DropdownCategories extends Component {
    constructor(){
        super();
        this.state = {
            categories: [],
            selected: undefined
        }
    }

    componentDidMount() {
        this.setState({
            selected: {label: this.props.initialCategory, value: this.props.initialCategory}
        })
        this.getCategoriesForDropdown();
    }

    componentWillUpdate(nextProps) {
        return this.props.initialCategory !== nextProps.initialCategory 
               || this.props.categories !== nextProps.categories;
    }

    getCategoriesForDropdown() {
        DataSource.getCategoriesForDropdown(items => {
            let initialCategory = this.state.initialCategory ? this.state.initialCategory : items[0];
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

DropdownCategories.propTypes = {
    initialCategory: PropTypes.object,
    categorySelected: PropTypes.func
}

export default DropdownCategories;