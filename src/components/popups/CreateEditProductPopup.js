import React, { Component } from 'react';
import PropType from 'prop-types';
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
                name: '',
                category: '',
                color: ''
            },
            initialCategory: undefined,
            itemToEdit: {},
            errorMessage: undefined
        }
        this.inputChange = this.inputChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.categoryChanged = this.categoryChanged.bind(this);

        this.confirm = this.confirm.bind(this);
        this.close = this.close.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }

    componentWillReceiveProps(props) {
        if(props){
            if(props.item){
                 this.setState({
                    itemToEdit: props.item,
                    item: props.item.value,
                    initialCategory: props.item.value.category
                });
            }
        }
    }

    inputChange(event) {
        let value = event.target.value;
        if(value){
            let modified = this.state.item;
            modified.name = value;
            this.setState({
                item : modified
            });
        }
        this.clearError();
    }
    
    clearInput(event){
        if(event) {
            event.preventDefault();
        }
        let modified = this.state.item;
        modified.name = '';
        this.setState({
            item: modified
        });
    }

    categoryChanged(category) {
        let modified = this.state.item;
        modified.category = category;
        DataSource.getColorForCategory(category, color => {
            modified.color = color;
            this.setState({
                item: modified
            });
        });
    }

    confirm(event) {
        event.preventDefault();
        this.clearError();
        if(this.props.type === Constants.UTILS.CREATE) {
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
        DataSource.addProduct(this.state.item, error => this.setError(error));
    }

    edit() {
        DataSource.updateProduct(this.state.itemToEdit.key, this.state.item, error => this.setError(error));
    }
    
    setError(error){
        if(error && error.message){
            this.setState({
                errorMessage : error.message
            });
        }else{
            this.props.closePopup(true);
            this.clearInput();
        }
    }

    render() {
        return (
            <Modal ariaHideApp={false} isOpen={this.props.isOpened}>

                <div className="popup-remove-container">
                    <div className="popup-remove-header">
                        {this.props.type === Constants.UTILS.CREATE ? 
                            <label> Create product </label>    
                        : 
                            <label> Edit product </label>
                        }
                    </div>

                    <div className="popup-body">
                        <DropdownCategories initialCategory={this.state.initialCategory}
                                            categorySelected={(category) => this.categoryChanged(category)}/>
                        <div className="flex space-between"> 
                            Name: <input type="text" value={this.state.item.name}
                                         onChange={(event) => this.inputChange(event)}/>
                            <FontAwesome name="close" onClick={(event) => this.clearInput(event)}/>
                         </div>
                            
                        <div> Photo </div>
                            
                        { this.state.errorMessage ? 
                            <div className="red">{this.state.errorMessage} </div>
                            : null
                        }
                        <button className="popup-btn btn-ok" onClick={(event) => this.confirm(event)}>{Constants.POPUP.YES}</button>
                        <button className="popup-btn btn-cancel" onClick={(event) => this.close(event)}>{Constants.POPUP.NO}</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

CreateEditProductPopup.propTypes = {
    item: PropType.object,
    type: PropType.string,
    isOpened: PropType.bool,
    closePopup: PropType.func
}

export default CreateEditProductPopup;
