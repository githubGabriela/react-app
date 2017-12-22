//  Usage:
// <ProductItem key={product.key} product={product} 
//color={this.props.category.color} hideCart="false" showRemoveCart="true"/>

import React, { Component } from 'react';

import '../../assets/css/General.css';
import FontAwesome from  'react-fontawesome';

class ProductItem extends Component {
    render() {
        let imageStyle = {
            // backgroundImage: 'url("./tomatoes.jpg")',
            borderColor: this.props.color
        }

        return (
            <div className="section-item">
                <div className="flex">
                    <div className="container-product-img">
                        <div className="item-image product-image" style={imageStyle}>
                        </div>
                    </div>
                    <label className="center-from-top">{this.props.product.label}</label>
                </div>

                <div>
                    {!this.props.hideCart ? 
                        <div className="center-from-top icon-on-right">
                            { this.props.showRemoveCart ? 
                            <FontAwesome name="shopping-cart" className="cart-remove"/>
                            :
                            <FontAwesome name="cart-plus" className="cart-add"/>
                            }
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

export default ProductItem;
