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
            selected: {
                label: '',
                value: ''
            }
        }
    }

    componentDidMount() {
        this.getCategories();
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }

    getCategories() {
        DataSource.getCategoriesForDropdown(items => {
            this.setState({
                categories: items
            });
            this.setSelected(items);
        });
    }

    setSelected(items) {
        let selected = this.props.selectedCategory ? 
                        { label: this.props.selectedCategory, value: this.props.selectedCategory } : items[0];
        this.setState({
            selected:  selected
        });
    }

    
    render() {
        return (
            <div className="popup-header"> 
                Categories
            <Dropdown options={this.state.categories}
                    value={this.state.selected}
                    onChange={(option) => {
                        this.setState({ selected: option });
                        this.props.categorySelected(option.label);
                    }}
                    placeholder={Constants.TITLES.SELECT_CATEGORY} />
            </div>
        );
    }
}

DropdownCategories.propTypes = {
    selectedCategory: PropTypes.string,
    categorySelected: PropTypes.func
}

export default DropdownCategories;