import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../../assets/css/General.css';

class CategoryItemInfo extends Component {

    constructor(){
        super();
        this.toggleColorPopup = this.toggleColorPopup.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.isChecked !== nextProps.isChecked
               || this.props.item !== nextProps.item;
    }

    toggleColorPopup(){}


    render() {
        return (
        <div className="container-category-img flex">
                <div className="center-from-top icon-on-left">
                    <input type="checkbox" checked={this.props.isChecked}
                                           value={this.props.item.value.name}
                                           onChange={(event)=> this.props.checkedItem(event.target.checked, this.props.item)}/>
                </div>        
            <div className="item-image category-image"></div>
            <div className="color-bullet center-bullet-from-top" 
                            style={{backgroundColor: this.props.item.value.color}}
                            onClick={(event)=> this.toggleColorPopup(this.props.item)}>
            </div>
        </div>
        );
    }
}

CategoryItemInfo.propTypes = {
    isChecked: PropTypes.bool,
    item: PropTypes.object,
    checkedItem: PropTypes.func
}

export default CategoryItemInfo;
