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

    getCategory(categoryName){
        return this.state.categories.filter(item => {
            return item.value.name === categoryName
        });
    }

    setSelected(firstItem) {
        let selected = this.props.defaultCategoryName ? this.getCategory(this.props.defaultCategoryName) : firstItem;
        this.setState({
            selected: selected
        });
        this.props.categorySelected(selected);
    }

    optionChanged(event) {
        if (event) {
            let category = this.getCategory(event.target.value);
            this.props.categorySelected(category[0]);
        }
    }


    render() {
        return (
            <div className="popup-header">
                <select onChange={this.optionChanged.bind(this)} >
                    {this.state.categories.map((item, index) => {
                        return <option
                            value={this.state.selected ? this.state.selected : item.value.name} key={item.key}>{item.value.name}</option>
                    })
                    }
                </select>

                selected : {this.state.selected ? this.state.selected.value : 'lol'}
            </div>
        );
    }
}

DropdownCategories.propTypes = {
    categorySelected: PropTypes.func
};

export default DropdownCategories;