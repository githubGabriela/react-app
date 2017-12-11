import React, { Component } from 'react';
import './Categories.css';

import { dbData } from '../../config/constants';
import Items from '../items/Items';
import CategoryCreate from '../categories/CategoryCreate';

class Categories extends Component {
    
    constructor(){
        super();
        this.state = {
            categories : []
       };
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        dbData.on('value', snap => {
            const items = [];
            snap.forEach( childSnap => {
                items.push({ key: childSnap.key, value: childSnap.val()});
            });
            this.setState({
                categories : items
            });
        });
    }

    render() {
        return (
            <div className="Container">
                <div>Categories</div>
                <Items items={this.state.categories} propertyToShow='category'/>
                <CategoryCreate/>
            </div>
        );
    }
}


export default Categories;
