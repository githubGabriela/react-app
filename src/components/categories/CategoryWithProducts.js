import React, { Component } from 'react';
import '../../assets/css/General.css';


import ProductItem from '../products/ProductItem';

class CategoryWithProducts extends Component {

    render() {
        let categoryStyle = {
            backgroundColor: this.props.category.color,
            height: this.props.categoryHeight
        }
        return (
            <div>
                <div>{this.props.showSection}</div>
                <div className="category"
                         style={categoryStyle}> 
                            {this.props.category.label}
                         </div>
                    {this.props.category.products.map(product => {
                        return ( 
                            <div key={product.key}> 
                                { this.props.showSection ? 
                                <ProductItem key={product.key} product={product} 
                                            color={this.props.category.color}/>
                                : <span></span>
                                }     
                            </div>      
                        );
                    })}
            </div>
        );
    }
}

export default CategoryWithProducts;
