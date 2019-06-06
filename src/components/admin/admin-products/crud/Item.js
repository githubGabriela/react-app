import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../../../assets/css/General.css';

class Item extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.item !== nextProps.item
            || this.props.isChecked !== nextProps.isChecked
            || this.props.showSettingsFields !== nextProps.showSettingsFields;
    }

    render() {
        let borderStyle = {
            borderColor: this.props.item.value.color
        }

        return (
            <div className="flex space-between">
                <div className="container-product-img flex">
                    <div className="item-image product-image" style={borderStyle}></div>
                </div>
                <div className="item-edit">
                    <div className="center-from-top"> {this.props.item.value.name} </div>
                    <label>category: {this.props.item.value.category}</label>
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    item: PropTypes.object,
    isChecked: PropTypes.bool,
    checkedItem: PropTypes.func
}

export default Item;
