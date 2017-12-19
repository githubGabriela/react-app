import React, { Component } from 'react';
import '../../assets/css/General.css';


import ProductItem from '../products/ProductItem';

class CategoryWithProducts extends Component {

    render() {
        let defafultHeight  = '80px';
        let reducedHeight = '40px';
        let categoryStyle = {
            backgroundColor: this.props.category.color,
            height: this.props.showSectionForKey === this.props.category.key ? reducedHeight: defafultHeight
        }        

        return (
            <div>
                <div className="category" style={categoryStyle}> 
                    {this.props.category.label}
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
