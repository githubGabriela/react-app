import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../../../assets/css/General.css';

class ProductItemInfo extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.item !== nextProps.item
               || this.props.isChecked !== nextProps.isChecked
               || this.props.showSettingsFields !== nextProps.showSettingsFields;
    }
    
    render() {
        let borderStyle = {
            borderColor: this.props.item.value.color
        }

        let showCheckbox = () => {
            return (
                <div>
                    {this.props.showSettingsFields ?
                        <div  className="center-from-top icon-on-left">
                            <input type="checkbox" checked={this.props.isChecked}
                                value={this.props.item.value.name}
                                onChange={(event)=> this.props.checkedItem(event.target.checked, this.props.item)}/>
                        </div>
                    : null
                    }
                </div>
            );
        }

        return (
            <div>
                <div className="container-product-img flex">
                    {showCheckbox()}
                    <div className="item-image product-image" style={borderStyle}></div> 
                </div>
                <label>name: {this.props.item.value.name}</label>   
                <label>category: {this.props.item.value.category}</label>
            </div>
        );
    }
}

ProductItemInfo.propTypes = {
    item: PropTypes.object,
    isChecked: PropTypes.bool,
    checkedItem: PropTypes.func
}

export default ProductItemInfo;
