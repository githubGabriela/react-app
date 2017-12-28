import React, { Component } from 'react';

import ProductNameCreate from './ProductNameCreate';
import DropdownCategories from '../../admin-categories/list/DropdownCategories';

class ProductCreate extends Component {

    constructor() {
        super();
        this.state = {
            categoryForProduct: {
                key: '',
                name: ''
            }
        }
        this.categorySelected = this.categorySelected.bind(this);
    }

    categorySelected(category) {
            // this.setState({
            //     categoryForProduct: category  //format of the categoryForProduct: ({key : '', name: ''}
            // });
    }


    render() {
        return (
            <div> 
                <DropdownCategories categories={this.props.categories} 
                                    categoryChanged={(category) => {this.categorySelected(category)}}/>
                <ProductNameCreate categoryForProduct={this.state.categoryForProduct.name}/>
            </div>
          
        );
    }
}

export default ProductCreate;
