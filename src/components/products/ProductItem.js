import React, { Component } from 'react';

import './Products.css';
import FontAwesome from  'react-fontawesome';

class ProductItem extends Component {
    render() {
        let imageStyle = {
            backgroundImage: 'url("./tomatoes.jpg")',
            borderColor: this.props.color
        }

        return (
            <div className="product-item">
                <div className="left">
                    <div className="product-image" style={imageStyle}>
                    </div>
                    <label>{this.props.product.label}</label>
                </div>
                <div className="right">
                        <FontAwesome name="cart-plus"/>
                </div>
            </div>
        );
    }
}

export default ProductItem;
