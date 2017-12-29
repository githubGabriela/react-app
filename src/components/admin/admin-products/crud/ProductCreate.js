import React, { Component } from 'react';

import ProductNameCreate from './ProductNameCreate';
import DropdownCategories from '../../admin-categories/list/DropdownCategories';

class ProductCreate extends Component {

    constructor() {
        super();
        this.state = {
            category: {}
        }
        this.categoryChanged = this.categoryChanged.bind(this);
    }

    categoryChanged(event) {
        this.setState({
            category: {
                key : event.value,
                name: event.label
            }
        });
        console.log('categoryChanged', this.state.category);
    }


    render() {
        return (
            <div> 
                <DropdownCategories categorySelected={(event) => this.categoryChanged(event)}/>
                <ProductNameCreate categoryForProduct={this.state.category.name}/>
            </div>
          
        );
    }
}

export default ProductCreate;
