import React, { Component } from 'react';

import './Products.css';

import CategoryWithProducts from '../categories/CategoryWithProducts';
import { hocCategories } from '../categories/HocCategories';


class AllProducts extends Component {
    render() {
        return (
            <div className="Container">
              {this.props.categories.map((category) => {
                  return <CategoryWithProducts key={category.key} category={category}/>
              })}
            </div>
        )
    }
}

const Products = hocCategories(AllProducts);

export default Products;
