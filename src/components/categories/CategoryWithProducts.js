import React, { Component } from 'react';
import FontAwesome from  'react-fontawesome';

import './Categories.css';

import ProductItem from '../products/ProductItem';

class CategoryWithProducts extends Component {

    render() {
        let categoryStyle = {
            backgroundColor: this.props.category.color
        }        

        return (
            <div>
                <div className="category" style={categoryStyle}> 
                    <FontAwesome name='smile-o' className="icon"/>
                    <label className="category-label">{this.props.category.label}</label>
                </div>

                { this.props.category.products.length > 0 ? 
                    <div>
                        {this.props.category.products.map(product => {
                            return ( 
                                <div key={product.key}> 
                                    { this.props.showSectionForKey === this.props.category.key ? 
                                    <ProductItem key={product.key} product={product} 
                                                color={this.props.category.color}/>
                                    : null
                                    }     
                                </div>      
                            );
                        })}
                    </div>
                    : 
                    <div> 
                        {this.props.showSectionForKey === this.props.category.key ?
                            <div> There are no products yet </div>
                            : 
                            null
                        }
                    </div>
                }
            </div>
        );
    }
}

export default CategoryWithProducts;
