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

                <div className="center-from-top icon-on-right">
                    <FontAwesome name="cart-plus"/>
                </div>
            </div>
        );
    }
}

export default ProductItem;
