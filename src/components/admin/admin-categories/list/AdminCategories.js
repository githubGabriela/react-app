// Usage:
// <AdminCategories/>

import React, { Component } from 'react';

import * as DataSource from '../../../../config/DataSource';
import CategoriesList from './CategoriesList';
import CategoryCreate from '../crud/CategoryCreate';

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
                <CategoriesList sectionTitle="Categories" items={this.state.categories}/>
            </div>
        );
    }
}


export default AdminCategories;
