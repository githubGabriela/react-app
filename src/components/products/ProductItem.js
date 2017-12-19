import React, { Component } from 'react';

class ProductItem extends Component {
    render() {
        let imageStyle = {
            backgroundImage: 'url("./tomatoes.jpg")'
        }
        let productColor = {
            // "rgba("+ this.props.color +", 0.5)"
            // background:  this.props.color,
            // opacity: 0.25
       }

        return (
            <div style={productColor}>
                <div className="product-image" 
                    style={imageStyle}>
                </div>
                {this.props.product.label}
            </div>
        );
    }
}

export default ProductItem;
