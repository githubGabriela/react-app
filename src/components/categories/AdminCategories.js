import React, { Component } from 'react';
import './Categories.css';

import { dbData } from '../../config/constants';
import Items from '../items/Items';
import CategoryCreate from '../categories/CategoryCreate';

class AdminCategories extends Component {
    
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
                items.push({ key: childSnap.key, label: childSnap.val().category, value:childSnap.key});
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

export default AdminCategories;
