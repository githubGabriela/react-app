import React, { Component } from 'react';
import '../../assets/css/General.css';

import ProductItem from '../products/ProductItem';

class CategoryWithProducts extends Component {
    defaultHeight = '80px';
    reducedHeight = '40px';

    constructor(props){
        super(props);
        this.state = {
            showProducts: false,
            categoryStyle: {
                backgroundColor: this.props.category.color,
                height: this.defaultHeight
            }
        }
        this.toggleProducts = this.toggleProducts.bind(this);
    }

    toggleProducts(){
        let toggledProducts = !this.state.showProducts;
        this.setState({
            showProducts: toggledProducts,
            categoryStyle: {
                backgroundColor: this.props.category.color,
                height: toggledProducts ? this.reducedHeight : this.defaultHeight
            }
        })
    }

    render() {
        return (
            <div>
                    <div className="category"
                         style={this.state.categoryStyle} onClick={this.toggleProducts}> 
                            {this.props.category.label}
                         </div>
                    {this.props.category.products.map(product => {
                        return ( 
                            <div> 
                                { this.state.showProducts ? 
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
