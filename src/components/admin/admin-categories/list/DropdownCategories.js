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

    setSelected(firstItem) {
        let selected = this.props.defaultCategory ? this.props.defaultCategory : firstItem;
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
                Category: {this.state.selected ? this.state.selected.value.name : ''}
                <select onChange={this.optionChanged.bind(this)} value={this.state.value}>
                    {this.state.categories.map((item, index) => {
                        return <option defaultValue={this.state.selected && item.key === this.state.selected.key ? this.state.selected.value.name : ''} value={index}
                            key={item.key}>{item.value.name}</option>
                    })
                    }
                </select>
            </div>
        );
    }
}

DropdownCategories.propTypes = {
    defaultCategory: PropTypes.string,
    categorySelected: PropTypes.func
}

export default DropdownCategories;