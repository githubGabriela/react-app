import React, { Component } from 'react';

import '../../assets/css/General.css';
import FontAwesome from  'react-fontawesome';

class ProductItem extends Component {
    render() {
        let imageStyle = {
            backgroundImage: 'url("./tomatoes.jpg")',
            borderColor: this.props.color
        }

        return (
            <div className="item-section">
                <div className="left-section">
                    <div className="item-image" style={imageStyle}>
                    </div>
                    <label>{this.props.product.label}</label>
                </div>
                <div className="right-section">
                        <FontAwesome name="cart-plus"/>
                </div>
            </div>
        );
    }
}

export default ProductItem;
