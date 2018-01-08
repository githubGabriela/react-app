// Usage:
// <FilteringAndSorting items={this.state.categories} 
// setFilteredItems = {items => this.setState({categories: items})}/>

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import * as DataSource from '../../config/DataSource';
import * as Constants from '../../utils/Constants';

const options = [
    { label: Constants.TITLES.RECENTLY_ADDED, value: 'recently_added'},
    { label: Constants.TITLES.ASCENDING, value: 'ASC'},
    { label: Constants.TITLES.DESCENDING, value: 'DESC'}
]

class FilteringAndSorting extends Component {
    constructor() {
        super();
        this.state= {
            order: 'recently_added',
            filterValue: undefined,
            dropdownOptions: options,
            dropdownSelected: undefined
        }
        this._onSelect = this._onSelect.bind(this);
        this.orderBy = this.orderBy.bind(this);
        this.filterChanged = this.filterChanged.bind(this);
    }


    _onSelect(option){
        this.setState({dropdownSelected: option});
        if(option.value !== Constants.TITLES.ORDER_BY){
            this.orderBy(option.value);
        }
    }

    filterChanged(event) {
        event.preventDefault();
        this.setState({
            filterValue: event.target.value
        });

        if(!this.state.filterValue){
            this.orderBy(this.state.order);
        } else { 
           this.getFilteredItems();
        }
    }

    orderBy(order) {
        this.setState({
            order: order
        });

        switch(order){
            case 'ASC':
                this.getAsc();
            break;
            case 'DESC':
                this.getDesc();
            break;
            case 'recently_added':
                this.getRecentlyAdded();
            break;
            default:
            break;
        }
    }

    getAsc() {
        // dataType can be 'categories', 'products', 'shoppingList', 'history'
        DataSource.orderAndFilter(this.props.dataType, this.state.filterValue, items => {
            this.props.setFilteredItems(items);
        });
    }

    getDesc() {
        DataSource.orderAndFilter(this.props.dataType, this.state.filterValue, items => {
            let desc = items.reverse();
            this.props.setFilteredItems(desc);
        });
    }

    getRecentlyAdded() {
        this.props.setFilteredItems(this.props.initialItems);
    }

    getFilteredItems(){
        DataSource.orderAndFilter(this.props.dataType, this.state.filterValue, items => {
            this.props.setFilteredItems(items);
        });
    }

   

    render() {
        return (
            <div>
                { this.props.showComponent ? 
                <div> 
                    <input type="text" placeholder="Search..." onChange={(event) => this.filterChanged(event)} />
                    <Dropdown options={this.state.dropdownOptions}
                            value={this.state.dropdownSelected}
                            onChange={this._onSelect}
                            placeholder={Constants.TITLES.ORDER_BY}/>
                </div>
                : null
                }
            </div>
        );
    }
}

FilteringAndSorting.propTypes = {
    showComponent: PropTypes.bool,
    dataType: PropTypes.string,
    initialItems: PropTypes.array,
    setFilteredItems: PropTypes.func
}

export default FilteringAndSorting;
