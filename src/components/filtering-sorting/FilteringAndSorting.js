// Usage:
// <FilteringAndSorting items={this.state.categories} 
// setFilteredItems = {items => this.setState({categories: items})}/>

import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import * as DataSource from '../../config/DataSource';

class FilteringAndSorting extends Component {
    constructor() {
        super();
        this.state= {
            order: 'recently_added',
            filterValue: undefined
        }

        this.orderBy = this.orderBy.bind(this);
        this.filterChanged = this.filterChanged.bind(this);
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
        this.props.setFilteredItems(this.props.items.reverse());
        // NOT HANDLED
    }

    getFilteredItems(){
        DataSource.orderAndFilter(this.props.dataType, this.state.filterValue, items => {
            this.props.setFilteredItems(items);
        });
    }


    render() {
        let options = [
            { label: 'Recently added', value: 'recently_added'},
            { label: 'Ascending', value: 'ASC'},
            { label: 'Descending', value: 'DESC'}
        ]
        return (
            <div>

                <input type="text" onChange={(event) => this.filterChanged(event)} />
                <Dropdown options={options}
                        onChange={(event) => this.orderBy(event.value)}
                        placeholder="Order by..."/>
            </div>
        );
    }
}

export default FilteringAndSorting;
