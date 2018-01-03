import React, { Component } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

import * as DataSource from '../../config/DataSource';
import * as Constants from '../../utils/Constants';
import DropdownCategories from '../admin/admin-categories/list/DropdownCategories';
import '../../assets/css/General.css';

class CreateEditProductPopup extends Component {

    constructor(props){
        super(props);
        this.state = {
            item: {
                name : '',
                color: ''
            },
            category: '',
            errorMessage: undefined
        }

        this.inputChange = this.inputChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.categoryChanged = this.categoryChanged.bind(this);

        this.confirm = this.confirm.bind(this);
        this.close = this.close.bind(this);
    }

    inputChange(event){
        let value = event.target.value;
        if(value){
            let newItem = this.state.item;
            newItem.name = value;
            this.setState({
                item : newItem
            });
        }
        this.clearError();
    }
    
    clearInput(event){
        event.preventDefault();
        this.setState({
            item: undefined
        });
    }

    categoryChanged(event) {
        this.setState({
            category: {
                key : event.value,
                name: event.label
            }
        });
        console.log('categoryChanged', this.state.category);
    }

    confirm(event) {
        event.preventDefault();
        this.clearError();
        if(this.props.type === 'create') {
            this.create();
        } else {
            this.edit();
        }
    }

    clearError(){
        this.setState({
            errorMessage: undefined
        });
    }

    close(event) {
        event.preventDefault();
        this.setState({
            errorMessage: undefined
        });
        this.props.closePopup(true);
    }

    create() {
        DataSource.addProduct(this.state.item, exists => this.setError(exists));
    }

    edit() {
        DataSource.update(Constants.PRODUCTS, this.state.item.key, this.state.item, exists => this.setError(exists));
    }

    setError(exists){
        if(exists) {
            this.setState({
                errorMessage : 'This product already exists'
            });
        } else {
            this.props.closePopup(true);
        }
    }

    render() {
        return (
            <Modal
                ariaHideApp={false}
                isOpen={this.props.isOpened}>

                <div className="popup-remove-container">
                    <div className="popup-remove-header">
                        {this.props.type === 'create' ? 
                            <label> Create product </label>    
                        : 
                            <label> Edit product </label>
                        }
                    </div>

                    <div className="popup-body">
                        <DropdownCategories categorySelected={(event) => this.categoryChanged(event)}/>
                        <div className="flex space-between"> 
                            Name: <input type="text" onChange={(event) => this.inputChange(event)}/>
                            <FontAwesome name="close" onClick={(event) => this.clearInput(event)}/>
                         </div>
                            
                        <div> Photo </div>
                            
                        { this.state.errorMessage ? 
                            <div className="red">{this.state.errorMessage} </div>
                            : null
                        }
                        <button className="popup-btn btn-ok" onClick={(event) => this.confirm(event)}>Yes</button>
                        <button className="popup-btn btn-cancel" onClick={(event) => this.close(event)}>No</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default CreateEditProductPopup;
