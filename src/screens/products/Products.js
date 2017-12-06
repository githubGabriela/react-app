import React, { Component } from 'react';
import './Products.css';

import { data } from '../../config/data';

class Products extends Component {
    goToDetail = (item) => {
        // this.props.navigation.navigate('ProductDetail', { ...item } );
    };
    
    render() {
        return (
            <div className="Container">
                <div>All Products</div>
            </div>
        );
    }
}

export default Products;
