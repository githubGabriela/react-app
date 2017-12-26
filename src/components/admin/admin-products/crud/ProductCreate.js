import React, { Component } from 'react';

import ProductNameCreate from './ProductNameCreate';

class ProductCreate extends Component {
    render() {
        return (
            <ProductNameCreate category={this.props.selectedCategory}/>
        );
    }
}

export default ProductCreate;
