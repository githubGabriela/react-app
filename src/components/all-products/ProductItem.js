//  Usage:
// <ProductItem key={product.key} product={product} 
//color={this.props.category.color} hideCart="false" showRemoveCart="true"/>

import React, { Component } from 'react';
import FontAwesome from  'react-fontawesome';

import * as Utils from '../../utils/Utils';
import '../../assets/css/General.css';

class ProductItem extends Component {


    render() {
        let imageStyle = {
            borderColor: this.props.color
        }

        return (
            <div className="section-item">
                <div className="flex">
                    <div className="container-product-img">
                        <div className="item-image product-image" style={imageStyle}>
                        </div>
                    </div>
                    <label className="center-from-top">{this.props.product.value.name}</label>
                </div>

                <div>
                    {!this.props.hideCart ? 
                        <div className="center-from-top icon-on-right">
                            { this.props.showRemoveCart ? 
                            <FontAwesome name="shopping-cart" className="cart-remove" onClick={(event) => {Utils.preventDefault(event); this.props.removeFromShoppingList(this.props.product)}}/>
                            : <FontAwesome name="cart-plus" className="cart-add" onClick={(event) => {Utils.preventDefault(event); this.props.addToShoppingList(this.props.product)}}/>
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
