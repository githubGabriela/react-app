// Usage:
// <AdminCategories/>

import React, { Component } from 'react';

import * as Constants from '../../../../utils/Constants';
import * as DataSource from '../../../../config/DataSource';
import CategoriesList from './CategoriesList';
import CategoryCreate from '../crud/CategoryCreate';
import FilteringAndSorting from '../../../filtering-sorting/FilteringAndSorting';

import '../../../../assets/css/General.css';

class AdminCategories extends Component {
    constructor(){
        super();
        this.state = {
            categories : [],
            selectedCategory: {key : '', value: ''}
        }
        this.categoryChanged = this.categoryChanged.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        DataSource.getCategories( items => {
            this.setState({
                categories : items,
                selectedCategory: items[0]
            });
        });
    }

    categoryChanged(event) {
        this.setState({
                selectedCategory:  {
                    key: event.value, 
                    value: event.label
                }
            });
    }

    render() {
        return (
            <div>
                <div className="category-create">
                    <CategoryCreate/>
                </div>
                <FilteringAndSorting dataType={Constants.CATEGORIES}
                                     items={this.state.categories} 
                                     setFilteredItems = {items => this.setState({categories: items})}/>
                <CategoriesList sectionTitle={Constants.TITLES.CATEGORIES} items={this.state.categories}/>
            </div>
        );
    }
}


export default AdminCategories;
