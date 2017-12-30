import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as DataSource from '../../../../config/DataSource';
import EditProductPopup from '../../../popups/EditProductPopup';

class ProductEdit extends Component {
    constructor(){
        super();
        this.state = {
            openPopup : false,
            name : ''
        }
        this.openEditPopup = this.openEditPopup.bind(this);
        this.closeEditPopup = this.closeEditPopup.bind(this);
        this.edit = this.edit.bind(this);
        this.itemNameChanged = this.itemNameChanged.bind(this);

    }

    openEditPopup(value){
        value.preventDefault();
        this.setState({
            openPopup: true
        })
    }
    closeEditPopup(){
        this.setState({
            openPopup : false
        })
    }
    edit(item){
        this.closeEditPopup();
    }

    itemNameChanged(value){
        this.setState({
            name: value
        })
    }

    render() {
        return (
            <div className="item-edit">
                <div className="center-from-top flex space-between">
                        <label>{this.props.item.value.name}</label>
                        <FontAwesome name="pencil" onClick={(value) => this.openEditPopup(value)}/>
                </div>
                <EditProductPopup item={this.props.item} 
                                  isOpened={this.state.openPopup}
                                  confirmEdit={(item)=> this.edit(item)}
                                  closePopup={(value)=> this.closeEditPopup(value)}
                                  nameChanged={(value) => this.itemNameChanged(value)}
                                  />
            </div>
        );
    }
}

export default ProductEdit;
