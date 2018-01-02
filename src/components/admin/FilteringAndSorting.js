import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import * as DataSource from '../../config/DataSource';

class FilteringAndSorting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.orderBy = this.orderBy.bind(this);
    }

    orderBy(event) {
        switch(event.value){
            case 'ASC':
            DataSource.order('categories', items => {
                this.setState({
                    items: items
                });
            });
            break;

            case 'DESC':
            DataSource.order('categories', items => {
                this.setState({
                    items: items.reverse()
                });
            });
            break;
            case 'recently_added': 
                this.setState({
                    items: this.props.items.reverse()
                });
            break;
            default:
            break;          
        }
        this.props.setFilteredItems(this.state.items);
    }

    render() {
        let options = [
            { label: 'Recently added', value: 'recently_added'},
            { label: 'Ascending', value: 'ASC'},
            { label: 'Descending', value: 'DESC'}
        ]
        return (
            <div>
                <Dropdown options={options}
                        onChange={(event) => this.orderBy(event)} 
                        placeholder="Order by..."/>
            </div>
        );
    }
}

export default FilteringAndSorting;
