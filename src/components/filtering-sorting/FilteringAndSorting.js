// Usage:
// <FilteringAndSorting items={this.state.categories} 
// setFilteredItems = {items => this.setState({categories: items})}/>

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import * as DataSource from '../../config/DataSource';
import * as Utils from '../../utils/Utils';
import * as Constants from '../../utils/Constants';
import _ from "lodash";

const options = [
    {label: Constants.TITLES.RECENTLY_ADDED, value: 'recently_added'},
    {label: Constants.TITLES.ASCENDING, value: 'ASC'},
    {label: Constants.TITLES.DESCENDING, value: 'DESC'}
]

class FilteringAndSorting extends Component {
    constructor() {
        super();
        this.state = {
            order: '',
            filterValue: undefined,
            dropdownOptions: [],
            selectedDropdown: undefined
        }
        this._onSelect = this._onSelect.bind(this);
        this.orderBy = this.orderBy.bind(this);
        this.filterChanged = this.filterChanged.bind(this);
    }

    componentDidMount() {
        this.setState({
            order: 'recently_added',
            dropdownOptions: options
        });
    }

    shouldComponentUpdate(nexProps) {
        return this.props.showComponent !== nexProps.showComponent
            || this.props.dataType !== nexProps.dataType
            || this.props.initialItems !== nexProps.initialItems;
    }

    _onSelect(option) {
        this.setState({selectedDropdown: option});
        if (option.value !== Constants.TITLES.ORDER_BY) {
            this.orderBy(option.value);
        }
    }

    filterChanged(event) {
        let value = event.target.value;
        this.state.filterValue = value;
        this.setState({
            filterValue: value
        });

        if (!this.state.filterValue) {
            this.orderBy(this.state.order);
        } else {
            this.getFilteredItems();
        }
    }

    orderBy(order) {
        this.setState({
            order: order
        });

        switch (order) {
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

    getFilteredItems() {
        const filter = this.state.filterValue.toLocaleLowerCase();
        let filtered = _.filter(this.props.initialItems, item => {
            if ((item.value.name && item.value.name.toLowerCase().indexOf(filter) !== -1) |
                (item.value.categoryName && item.value.categoryName.toLowerCase().indexOf(filter) !== -1)) {
                return item;
            }
        });
        this.props.setFilteredItems(filtered);
    }

    render() {
        let showOrdering = () => {
            return (
                <div>
                    { /*!this.props.hideOrdering ? 
                        // replace dropdown

                      // <Dropdown className="dropdown-input" options={this.state.dropdownOptions}
                        //         value={this.state.selectedDropdown}
                        //         onChange={this._onSelect}
                        //         placeholder={Constants.TITLES.ORDER_BY}/>
                    : null 
                    */}
                </div>
            );
        }

        return (
            <div>
                {/* { this.props.initialItems && this.props.initialItems.length > 0 ?  */}
                <div class="settings">
                    <input type="text" className="white-input" placeholder="Search..."
                           onChange={(event) => this.filterChanged(event)}/>
                    {showOrdering()}
                </div>
                {/* : null
                }  */}
            </div>
        );
    }
}

FilteringAndSorting.propTypes = {
    showComponent: PropTypes.bool,
    dataType: PropTypes.string,
    hideOrdering: PropTypes.bool,
    initialItems: PropTypes.array,
    setFilteredItems: PropTypes.func
}

export default FilteringAndSorting;
