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
            this.setSelected(items[0].value.name);
        });
    }

    setSelected(firstItem) {
        let selected = this.props.defaultCategory ? this.props.defaultCategory : firstItem;
        this.setState({
            selected: selected
        });
        this.props.categorySelected(selected);
    }

    optionChanged(event) {
        if (event) {
            let category = this.state.categories.filter(item => {
                return item.value.name === event.target.value
            });
            console.log(category[0]);
            this.props.categorySelected(category[0]);
        }
    }


    render() {
        return (
            <div className="popup-header">
                <select onChange={this.optionChanged.bind(this)} >
                    {this.state.categories.map((item, index) => {
                        return <option
                            defaultValue={this.state.selected === item.value.name}
                            value={item.value.name} key={item.key}>{item.value.name}    HERE {this.state.selected} {item.value.name} </option>
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
};

export default DropdownCategories;