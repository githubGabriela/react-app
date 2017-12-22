// Usage:
// <Products/>

import React, { Component } from 'react';

import CategoryWithProducts from '../categories/CategoryWithProducts';
import { hocCategories } from '../categories/HocCategories';
import CollapseSections from '../collapse/CollapseSections';

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
                <div className="section-header">
                    <div className="section-title"> Products </div>
                    <CollapseSections />
                </div>
              {this.props.categories.map((category) => {
                  return <div key={category.key} onClick={()=> this.toggleSection(category.key)}>
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
