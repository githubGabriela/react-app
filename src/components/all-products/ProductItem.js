//  Usage:
// <ProductItem key={product.key} product={product} 
//color={this.props.category.color} showOnlyRemoveCart="true"/>

import React, { Component } from 'react';
import PropTypes, { bool } from 'prop-types';
import FontAwesome from  'react-fontawesome';

import * as Utils from '../../utils/Utils';
import '../../assets/css/General.scss';

class ProductItem extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.color !== nextProps.color
            || this.props.product !== nextProps.product
            || this.props.hideIcons !== nextProps.hideIcons
            || this.props.showOnlyRemoveCart !== nextProps.showOnlyRemoveCart
    }

    render() {
        let imageStyle = {
            borderColor: this.props.color
        }

        return (
            <div className="item">
                <div className="item-content">
                    <div className="item-left">
                        <div className="rounded-image">
                            I
                        </div>
                    </div>
                    <div className="item-center">
                        {this.props.product.value.name}
                    </div>
                    <div className="item-right">
                        Fructe
                        <div className="action">
                            {!this.props.hideIcons ?
                                <div className="icon-on-right">
                                    {this.props.showOnlyRemoveCart ?
                                        <FontAwesome name="shopping-cart" className="cart-remove"
                                                     onClick={(event) => {
                                                         Utils.preventDefault(event);
                                                         this.props.removeFromShoppingList(this.props.product)
                                                     }}/>
                                        : <FontAwesome name="cart-plus" className="cart-add"
                                                       onClick={(event) => {
                                                           Utils.preventDefault(event);
                                                           this.props.addToShoppingList(this.props.product)
                                                       }}/>
                                    }
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>


            // <div className="flex space-between section-item">
            //     <div className="flex">
            //         <div className="container-product-img">
            //             <div className="item-image product-image" style={imageStyle}>
            //             </div>
            //         </div>
            //         <label className="center-from-top">{this.props.product.value.name}</label>
            //     </div>
            //
            //     { !this.props.hideIcons ?
            //         <div className="center-from-top icon-on-right">
            //             { this.props.showOnlyRemoveCart ?
            //             <FontAwesome name="shopping-cart" className="cart-remove"
            //                         onClick={(event) => { Utils.preventDefault(event);
            //                                             this.props.removeFromShoppingList(this.props.product)}}/>
            //             : <FontAwesome name="cart-plus" className="cart-add"
            //                         onClick={(event) => { Utils.preventDefault(event);
            //                                             this.props.addToShoppingList(this.props.product)}}/>
            //             }
            //         </div>
            //         : null
            //     }
            // </div>
        );
    }
}

ProductItem.propTypes = {
    color: PropTypes.string,
    product: PropTypes.object,
    showOnlyRemoveCart: PropTypes.bool,
    hideIcons: PropTypes.bool,
    removeFromShoppingList: PropTypes.func
}

export default ProductItem;
