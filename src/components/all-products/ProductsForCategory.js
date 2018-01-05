import React, { Component } from 'react';

import * as DataSource from '../../config/DataSource';
import ProductItem from './ProductItem';

class ProductsForCategory extends Component {
    render() {
        return (
            <div style={{backgroundColor: '#34495e'}}>
                { this.props.products.map(item => {
                    return (
                        <ProductItem key={item.key}
                                        product={item}
                                        color={item.value.color}
                                        addToShoppingList={(item)=> DataSource.addToShoppingList(item)}/>
                    )
                })}
            </div>
        );
    }
}

export default ProductsForCategory;