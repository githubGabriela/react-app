//  Usage:
// <ProductItem key={product.key} product={product} 
//color={this.props.category.color} hideCart="false" showRemoveCart="true"/>

import React, { Component } from 'react';

import '../../assets/css/General.css';
import FontAwesome from  'react-fontawesome';

class ProductItem extends Component {
    constructor(){
        super();
        this.add = this.add.bind(this);
    }

    add(event){
        event.preventDefault();
        this.props.addToShoppingList(this.props.product);
    }

    remove(event){
        event.preventDefault();
        this.props.removeFromShoppingList(this.props.product);
    }

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
                            <FontAwesome name="shopping-cart" className="cart-remove" onClick={(event) => this.remove(event)}/>
                            : <FontAwesome name="cart-plus" className="cart-add" onClick={(event) => this.add(event)}/>
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
