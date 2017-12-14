import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import './Products.css';

import { dbData } from '../../config/constants';
import Items from '../items/Items';
import ItemCreate from '../items/ItemCreate';
import ItemEdit from '../items/ItemEdit';


class AdminProducts extends Component {
    constructor(){
        super();
        this.state = {
            categories: []
       };
       this.getSelectedCategory = this.getSelectedCategory.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        dbData.on('value', snap => {
            const items = [];
            snap.forEach( childSnap => {
                let item = { key: childSnap.key, label: childSnap.val().category, value: childSnap.key, products:[]};
                childSnap.forEach(itemWithProduct => {
                    if(itemWithProduct.val().product){
                        item['products'].push({key: itemWithProduct.key, label: itemWithProduct.val().product, value: itemWithProduct.key, product: itemWithProduct});
                    }
                })
                items.push(item);
            });
            this.setState({
                categories : items,
                selectedCategory: items[0]
            });
        });
    }

    getSelectedCategory(category) {
        this.state.categories.forEach( item => {
            if(item.value === category.value){
                this.setState({
                    selectedCategory : item
                });
            }
        });
    }

    render() {
        return (
            <div className="Container">
            <div> Products </div>
            <Dropdown options={this.state.categories} value={this.state.selectedCategory} 
                      onChange={(event) => this.getSelectedCategory(event)} placeholder="Select a category" />
            {
                this.state.selectedCategory ? 
                <div> 
                    <ItemCreate placeholder='Add a new product' isProduct='true' entryToCreate={this.state.selectedCategory}/>
                    <Items items={this.state.selectedCategory.products}/>
                    </div>
                :
                <div>No category selected</div>
            }
            </div>
        )
    }
}

export default AdminProducts;
