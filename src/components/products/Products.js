import React, { Component } from 'react';

import './Products.css';

import CategoryWithProducts from '../categories/CategoryWithProducts';
import { hocCategories } from '../categories/HocCategories';


class AllProducts extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSectionForKey : undefined
        }
        this.toggleSection = this.toggleSection.bind(this);
    }

    toggleSection(key){
        this.setState({
            showSectionForKey: key
        });
    }

    render() {
        return (
            <div>
              {this.props.categories.map((category) => {
                  return <div className="categoryItem" key={category.key} onClick={()=> this.toggleSection(category.key)}>
                            <CategoryWithProducts showSectionForKey={this.state.showSectionForKey}
                                               category={category}/>
                      </div>
             })}
            </div>
        )
    }
}

const Products = hocCategories(AllProducts);

export default Products;
