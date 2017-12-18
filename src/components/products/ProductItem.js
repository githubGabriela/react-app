import React, { Component } from 'react';

class ProductItem extends Component {
    render() {
        let imageStyle = {
            backgroundImage: 'url("./tomatoes.jpg")'
        }

        return (
            <div>
            <div className="product-image" 
                style={imageStyle}>
            </div>
            {this.props.product.label}</div>
        );
    }
}

export default ProductItem;
