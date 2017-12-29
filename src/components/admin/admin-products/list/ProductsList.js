// Usage:
// <AdminProducts />

import React, { Component } from 'react';

import { dbDataProducts } from '../../../../config/constants';
import { hocCategoriesProductsList } from '../../hoc/HocCategoriesProductsList';

import '../../../../assets/css/General.css';

class Products extends Component {

    render() {
        return (
            <div>
            </div>
        )
    }
}

const ProductsList = hocCategoriesProductsList(
    Products,
    {
        headerTitle: 'Products',
        dbDataType: dbDataProducts,
        type: 'products'
    }
);

export default ProductsList;
