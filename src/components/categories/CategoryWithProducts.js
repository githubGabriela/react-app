import React, { Component } from 'react';

import ProductItem from '../products/ProductItem';

class CategoryWithProducts extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div>
                <div>{this.props.category.label}</div>
                {this.props.category.products.map(product => {
                    return <ProductItem key={product.key} product={product}/>
                })}
            </div>
        );
    }
}

export default CategoryWithProducts;
