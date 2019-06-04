// Udage
// <DropdownCategories/>

import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        this.getCategories();
    }

    shouldComponentUpdate() {
        return true;
    }

    getCategories() {
        DataSource.getCategories(items => {
            this.setState({
                categories: items
            });
            this.setSelected(items[0]);
        });
    }

    setSelected(item) {
        let selected = this.props.selectedCategory ? this.props.selectedCategory : item;
        this.setState({
            selected: selected
        });
        this.props.categorySelected(selected);
    }

    optionChanged(event){
        let index = event.target.value;
        this.props.categorySelected(this.state.categories[index]);
    }


    render() {
        return (
            <div className="popup-header">
                Category:
                <select onChange={this.optionChanged.bind(this)} value={this.state.value}>
                    {this.state.categories.map((item, index) => {
                          return <option defaultValue={item.key === this.state.selected.key} value={index} 
                          key={item.key}>{item.value.name}</option>
                    })
                    }
                </select>
            </div>
        );
    }
}

DropdownCategories.propTypes = {
    selectedCategory: PropTypes.string,
    categorySelected: PropTypes.func
}

export default DropdownCategories;