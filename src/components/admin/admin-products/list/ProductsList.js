// Usage:
// <AdminProducts />

import React, { Component } from 'react';

import * as Constants from '../../../../utils/Constants';
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
        headerTitle: Constants.TITLES.PRODUCTS,
        dbDataType: dbDataProducts,
        type: Constants.PRODUCTS
    }
);

export default ProductsList;
