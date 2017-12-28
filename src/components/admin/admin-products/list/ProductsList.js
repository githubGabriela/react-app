// Usage:
// <AdminProducts />

import React, { Component } from 'react';

import { hocItems } from '../../hoc/HocItems';
import CategoriesProductsHeader from '../../admin-categories/list/CategoriesHeader';

import '../../../../assets/css/General.css';

class Products extends Component {

    render() {
        return (
            <div>
{/* 
                <ProductCreate selectedCategory='categoryTest'/>
                <ProductsList sectionTitle='categoryTest' 
                               items={this.props.products}/> */}

                {/* 
                {
                    this.props.selectedCategory ? 
                    

                    <div> 
                        <ProductCreate selectedCategory={this.props.selectedCategory}/>
                        <ProductsList sectionTitle={this.props.selectedCategory} 
                               items={this.props.products}/>
                        </div>

                        
                    :           
                    <div>No category selected</div>
                } */}
            </div>
        )
    }
}

const ProductsList = hocItems(Products);

export default ProductsList;
